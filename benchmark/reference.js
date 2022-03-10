const { performance, PerformanceObserver } = require("perf_hooks");

const { loadData } = require("./data");
const { loadThemes, includifyThemes } = require("./themes");
const { registerMocks } = require("./register");
const { MockMapLoader } = require("./mocks/loader");
const { Environment } = require("..");
const { LaxUndefined } = require("../lib/undefined");

// For reasons that I don't yet understand, use of `setTimeout`
// (wrapped in a promise) causes the performance observer callback
// to be called too early and too often, even with `buffer = true`.
// For now I'll resort to aggregating performance runs outside the
// callback. Also means I can't disconnect the observer in the
// callback.

// Without a `setTimeout` between performance marks, as used in our
// mock template loader to simulate reading from a database or file
// system, the current workaround fails, due to some kind of timing
// issue between the observer callback and the reporting function.

const measures = {
  parse: [],
  "render (async, not concurrent)": [],
  "render (sync)": [],
  "render (concurrent, with IO)": [],
  "render (sync, with IO)": [],
};

// Increase the number of loops per iteration for faster ops.
const parseWeight = 10;
const renderSyncWeight = 20;
const renderWeight = 1.8;
// Reduce the number of loops per iteration for slower ops.
const renderSimulatedIOWeight = 0.6;
const renderSimulatedIOSyncSWeight = 0.04;

const iterationWeightMap = {
  parse: parseWeight,
  "render (async, not concurrent)": renderWeight,
  "render (sync)": renderSyncWeight,
  "render (concurrent, with IO)": renderSimulatedIOWeight,
  "render (sync, with IO)": renderSimulatedIOSyncSWeight,
};

const obs = new PerformanceObserver((list) => {
  list.getEntries().forEach((e) => measures[e.name].push(e.duration));
  // observer.disconnect();
});

obs.observe({ entryTypes: ["measure"], buffer: true });

const themeSources = loadThemes("./fixtures/");
const includeThemeSources = includifyThemes(themeSources);

// Time to sleep in milliseconds for simulated IO.
const timeToSleep = 80;

/**
 * Create a new Liquid `Environment` configured for benchmarking.
 *
 * @returns {Environment} A Liquid `Environment`configured with a
 *  mock template loader and the benchmark fixture data.
 */
function environmentFactory() {
  // A mock template loader
  const m = new Map();
  const mockLoader = new MockMapLoader(m, timeToSleep);

  for (const theme of includeThemeSources) {
    for (const template of theme.templates) {
      m.set(template.path, template.source);
    }
  }

  const environment = new Environment({
    globals: loadData(),
    loader: mockLoader,
    undefinedFactory: (n) => new LaxUndefined(n),
  });

  registerMocks(environment);
  environment.globals.page_title = "Page Title";

  return environment;
}

const environment = environmentFactory();

/**
 * Parse one theme. Each theme contains the source for one layout
 * template and multiple "content" templates. Each template source
 * is parsed by the global environment.
 *
 * @param {Object} theme An object containing the theme's layout
 *  template source and path, and an array of content template
 *  sources and their paths.
 * @returns {Object} An object containing the theme's layout as a
 *  `Template` and an array of content `Template` objects.
 */
function parseTheme(theme) {
  const templates = [];
  for (const t of theme.templates) {
    templates.push(
      environment.fromString(t.source, t.path, {
        template: t.name,
      })
    );
  }

  return {
    layout: environment.fromString(theme.layout.source, theme.layout.path, {
      template: theme.layout.name,
    }),
    templates: templates,
  };
}

/**
 * Parse an array of themes using `ParseTheme`.
 *
 * @param {Array} themes An array of theme objects.
 * @returns {Array} An array of objects containing a layout
 *  `Template` and an array of content `Template` objects.
 */
function parseThemes(themes) {
  return themes.map(parseTheme);
}

/**
 * Parse themes that use `{% include %}`.
 *
 * @param {Object} themes An array of theme objects that have been
 * transformed to use `{% include %}`
 * @returns {Array} An array of Liquid `Template` objects.
 */
function parseIncludeThemes(themes) {
  const templates = [];
  for (const theme of themes) {
    for (const layout of theme.layouts) {
      templates.push(
        environment.fromString(layout.source, layout.path, {
          template: layout.templateName,
        })
      );
    }
  }
  return templates;
}

/**
 * Render a theme synchronously. The theme's content template is
 * rendered first, then used as a variable to render the theme's
 * layout template.
 *
 * @param {Object} theme A theme object.
 */
function renderThemeSync(theme) {
  for (const template of theme.templates) {
    const content = template.renderSync();
    theme.layout.renderSync({ content_for_layout: content });
  }
}

/**
 * Render a single theme. The theme's layout will be rendered once
 * for each "content" template in the theme, with `content_for_layout`
 * set to the result of rendering the content template.
 *
 * @param {Object} theme A theme object containing the theme's layout
 *  as a `Template` and an array of content `Template`s.
 */
async function renderTheme(theme) {
  for (const template of theme.templates) {
    const content = await template.render();
    await theme.layout.render({ content_for_layout: content });
  }
}

/**
 * Render an array of themes synchronously.
 *
 * @param {Array} themes An array of parsed themes.
 */
function renderThemesSync(themes) {
  for (const theme of themes) {
    renderThemeSync(theme);
  }
}

/**
 * Render an array of themes.
 *
 * @param {Array} themes An array of parsed themes.
 */
async function renderThemes(themes) {
  // Note: Deliberately not gathering results with Promise.all().
  for (const theme of themes) {
    await renderTheme(theme);
  }
}

/**
 * Render templates concurrently, with simulated IO.
 *
 * @param {Array} templates Parsed "layout" templates, each with
 *  exactly one "include" tag.
 * @returns {Array} Rendered templates.
 */
async function renderConcurrentThemes(templates) {
  return Promise.all(
    templates.map((t) => {
      return t.render();
    })
  );
}

/**
 * Render templates synchronously with simulated IO.
 *
 * @param {Array} templates An array of parsed templates, each of
 * which includes exactly one other template.
 * @returns {Array} Rendered templates.
 */
function renderIncludeThemesSync(templates) {
  return templates.map((t) => {
    return t.renderSync();
  });
}

/**
 * Call `parseThemes()` with the global theme sources `n` times
 * with a performance mark before and after the loop.
 *
 * @param {number} n The number of times to parse all themes.
 */
function parse(n = 100) {
  performance.mark("parse-start");
  for (let i = 0; i < n; i++) {
    parseThemes(themeSources);
  }
  performance.mark("parse-end");
  performance.measure("parse", "parse-start", "parse-end");
}

/**
 * Call `renderThemes()` using the global theme sources, `n` times
 * with a performance mark before and after the loop.
 *
 * Note that this times the async render path. It does not render
 * templates concurrently. To put that another way, every call to
 * `render` is awaited. We don't gather templates rendering using
 * `Promise.all()`.
 *
 * @param {number} n The number of iterations. Each theme will be
 *  rendered once per iteration.
 */
async function render(n = 100) {
  const themes = parseThemes(themeSources);
  performance.mark("render-async-start");
  for (let i = 0; i < n; i++) {
    await renderThemes(themes);
  }
  performance.mark("render-async-end");
  performance.measure(
    "render (async, not concurrent)",
    "render-async-start",
    "render-async-end"
  );
}

/**
 * Repeatedly call `renderThemesSync` using the global theme sources.
 *
 * @param {number} n The number of iterations. Each theme will be
 *  rendered once per iteration.
 */
function renderSync(n = 100) {
  const themes = parseThemes(themeSources);
  performance.mark("render-sync-start");
  for (let i = 0; i < n; i++) {
    renderThemesSync(themes);
  }
  performance.mark("render-sync-end");
  performance.measure("render (sync)", "render-sync-start", "render-sync-end");
}

/**
 * Repeatedly call `renderConcurrentThemes` using the global theme
 * sources.
 *
 * @param {number} n The number of iterations. Each template will
 * be rendered once per iteration.
 */
async function renderConcurrent(n = 100) {
  const templates = parseIncludeThemes(includeThemeSources);
  performance.mark("render-include-start");
  for (let j = 0; j < n; j++) {
    await renderConcurrentThemes(templates);
  }
  performance.mark("render-include-end");
  performance.measure(
    "render (concurrent, with IO)",
    "render-include-start",
    "render-include-end"
  );
}

/**
 * Repeatedly call `renderIncludeThemesSync()` using the global
 * theme sources.
 *
 * @param {number} n The number of iterations. Each template will
 * be rendered once per iteration.
 */
function renderIncludeSync(n = 100) {
  const templates = parseIncludeThemes(includeThemeSources);
  performance.mark("render-include-sync-start");
  for (let j = 0; j < n; j++) {
    renderIncludeThemesSync(templates);
  }
  performance.mark("render-include-sync-end");
  performance.measure(
    "render (sync, with IO)",
    "render-include-sync-start",
    "render-include-sync-end"
  );
}

/**
 * Print a performance report to the console.
 *
 * @param {number} number The base number of iterations. The base
 * number is weighted higher or lower for faster or slower
 * operations.
 * @param {number} nTemplates The number of templates in the
 * benchmark fixture.
 */
function report(number, nTemplates) {
  console.log("\n");
  for (const [name, durations] of Object.entries(measures)) {
    const best = Math.min(...durations) / 1000;
    const nIterations = number * iterationWeightMap[name];
    // Each layout template is rendered once for every associated
    // content template, either as `content_for_layout` or as an
    // included with the `include` tag. Hence the `* 2`.
    const nOps = nIterations * nTemplates;
    const opsPerSecond = nOps / best;
    const iterationsPerSecond = 1 / (best / nIterations);

    console.log(
      `${name.padStart(30, " ")}: ${best.toFixed(2)}s ` +
        `(${opsPerSecond.toFixed(2)} ops/s, ` +
        `${iterationsPerSecond.toFixed(2)} i/s)`
    );
  }
  obs.disconnect();
}

/**
 * Run the benchmark.
 *
 * @param {number} number Base number of iterations per round.
 * @param {number} repeat Number of rounds per operation.
 */
async function main(number = 100, repeat = 5) {
  const nContentTemplates = themeSources
    .map((t) => t.templates.length)
    .reduce((a, b) => a + b, 0);

  console.log(`templates:         ${nContentTemplates * 2}`);
  console.log(`rounds per op:     ${repeat}`);
  console.log(`simulated IO time: ${timeToSleep}ms\n`);

  console.log(
    `parsing ${number * parseWeight * nContentTemplates * 2} templates...`
  );
  for (let i = 0; i < repeat; i++) {
    parse(number * parseWeight);
  }

  console.log(
    `rendering (sync) ${
      number * renderSyncWeight * nContentTemplates * 2
    } templates...`
  );
  for (let i = 0; i < repeat; i++) {
    renderSync(number * renderSyncWeight);
  }

  console.log(
    `rendering (async not concurrent) ${
      number * renderWeight * nContentTemplates * 2
    } templates...`
  );
  for (let i = 0; i < repeat; i++) {
    await render(number * renderWeight);
  }

  console.log(
    `rendering (concurrent, with IO) ${
      number * renderSimulatedIOWeight * nContentTemplates * 2
    } templates...`
  );
  for (let i = 0; i < repeat; i++) {
    await renderConcurrent(number * renderSimulatedIOWeight);
  }

  console.log(
    `rendering (sync, with IO) ${
      number * renderSimulatedIOSyncSWeight * nContentTemplates * 2
    } templates...`
  );
  for (let i = 0; i < repeat; i++) {
    renderIncludeSync(number * renderSimulatedIOSyncSWeight);
  }

  setTimeout(() => report(number, nContentTemplates), 0);
}

main(100, 3);
