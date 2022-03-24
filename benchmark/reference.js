const { performance, PerformanceObserver } = require("perf_hooks");

const { loadData } = require("./data");
const { loadThemes, includeThemes } = require("./themes");
const { registerMocks } = require("./register");
const { MockMapLoader } = require("./mocks/loader");
const { Environment, LaxUndefined } = require("..");

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
  renderSync: [],
  "parse & renderSync": [],
  render: [],
  "render + parse with IO": [],
};

// Weight the number of loops per iteration for faster/slower ops.
const parseWeight = 6;
const parseAndRenderWeight = 5;
const renderSyncWeight = 20;
const renderWeight = 10;
const renderSimulatedIOWeight = 1;

const iterationWeightMap = {
  parse: parseWeight,
  "parse & renderSync": parseAndRenderWeight,
  render: renderWeight,
  renderSync: renderSyncWeight,
  "render + parse with IO": renderSimulatedIOWeight,
};

const obs = new PerformanceObserver((list) => {
  list.getEntries().forEach((e) => measures[e.name].push(e.duration));
  // observer.disconnect();
});

obs.observe({ entryTypes: ["measure"], buffer: true });

const themeSources = loadThemes("./fixtures/");
const includedThemes = includeThemes(themeSources);

// Time to sleep in milliseconds for simulated IO.
const timeToSleep = 50;

// Populate mock loader with mock files from themes that have been
// converted to use `include` tags.
const mockFiles = new Map();
const mockLoader = new MockMapLoader(mockFiles, timeToSleep);
for (const theme of includedThemes) {
  for (const template of theme.templates) {
    mockFiles.set(template.path, template.source);
  }
}

// Configure a LiquidScript environment.
const environment = new Environment({
  globals: loadData(),
  loader: mockLoader,
  undefinedFactory: LaxUndefined.from,
});

registerMocks(environment);
environment.globals.page_title = "Page Title";

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

function parseThemes(themes) {
  return themes.map(parseTheme);
}

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

function parse(n = 100) {
  performance.mark("parse-start");
  for (let i = 0; i < n; i++) {
    for (const theme of themeSources) {
      for (const template of theme.templates) {
        environment.fromString(theme.layout.source, theme.layout.path, {
          template: theme.layout.name,
        });
        environment.fromString(template.source, template.path, {
          template: template.name,
        });
      }
    }
  }
  performance.mark("parse-end");
  performance.measure("parse", "parse-start", "parse-end");
}

function parseAndRenderSync(n = 100) {
  performance.mark("parse-render-start");
  for (let i = 0; i < n; i++) {
    for (const theme of themeSources) {
      for (const template of theme.templates) {
        const content = environment
          .fromString(template.source, template.path, {
            template: template.name,
          })
          .renderSync();

        environment
          .fromString(theme.layout.source, theme.layout.path, {
            template: template.name,
          })
          .renderSync({ content_for_layout: content });
      }
    }
  }
  performance.mark("parse-render-end");
  performance.measure(
    "parse & renderSync",
    "parse-render-start",
    "parse-render-end"
  );
}

async function render(n = 100) {
  const themes = parseThemes(themeSources);
  performance.mark("render-async-start");
  for (let i = 0; i < n; i++) {
    for (const theme of themes) {
      for (const template of theme.templates) {
        const content = await template.render();
        await theme.layout.render({
          template: template.name,
          content_for_layout: content,
        });
      }
    }
  }
  performance.mark("render-async-end");
  performance.measure("render", "render-async-start", "render-async-end");
}

function renderSync(n = 100) {
  const themes = parseThemes(themeSources);
  performance.mark("render-sync-start");
  for (let i = 0; i < n; i++) {
    for (const theme of themes) {
      for (const template of theme.templates) {
        const content = template.renderSync();
        theme.layout.renderSync({
          template: template.name,
          content_for_layout: content,
        });
      }
    }
  }
  performance.mark("render-sync-end");
  performance.measure("renderSync", "render-sync-start", "render-sync-end");
}

async function renderConcurrentWithIO(n = 100) {
  const templates = parseIncludeThemes(includedThemes);
  performance.mark("render-include-start");
  for (let i = 0; i < n; i++) {
    await Promise.all(templates.map((t) => t.render()));
  }
  performance.mark("render-include-end");
  performance.measure(
    "render + parse with IO",
    "render-include-start",
    "render-include-end"
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
  for (const [name, durations] of Object.entries(measures)) {
    const best = Math.min(...durations) / 1000;
    // const ranFor = durations.reduce((a, b) => a + b, 0) / 1000;
    const nIterations = number * iterationWeightMap[name];
    // Each layout template is rendered once for every associated
    // content template, either as `content_for_layout` or included
    // with the `include` tag. Hence the `* 2`.

    // const nOps = nIterations * nTemplates;
    // const opsPerSecond = (nOps * 2) / best;
    const iterationsPerSecond = (1 / (best / nIterations)).toFixed(2);

    console.log(
      `${name.padStart(22, " ")}:\t` +
        `${String(iterationsPerSecond).padEnd(7)} i/s - ` +
        `${String(nIterations).padEnd(4)} in ${best.toFixed(2)}s `
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

  console.log(`templates per iteration: ${nContentTemplates * 2}`);
  console.log(`rounds (best of):        ${repeat}`);
  console.log(`simulated IO time:       ${timeToSleep}ms\n`);

  console.log(`parse ...`);
  for (let i = 0; i < repeat; i++) {
    parse(number * parseWeight);
  }

  console.log(`renderSync ...`);
  for (let i = 0; i < repeat; i++) {
    renderSync(number * renderSyncWeight);
  }

  console.log(`parse & renderSync ...`);
  for (let i = 0; i < repeat; i++) {
    parseAndRenderSync(number * parseAndRenderWeight);
  }

  console.log(`render ...`);
  for (let i = 0; i < repeat; i++) {
    await render(number * renderWeight);
  }

  console.log(`render + parse with IO ...`);
  for (let i = 0; i < repeat; i++) {
    await renderConcurrentWithIO(number * renderSimulatedIOWeight);
  }

  setTimeout(() => report(number, nContentTemplates), 0);
}

main(50, 3);
