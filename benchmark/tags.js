/* eslint-disable @typescript-eslint/no-var-requires */
const { performance, PerformanceObserver } = require("perf_hooks");
const { Environment } = require("..");

const obs = new PerformanceObserver((list, observer) => {
  const measures = {
    "Parse and Render Tags": [],
    "Parse Tags": [],
    "Render Tags": [],
    "Render Tags Sync": [],
  };

  list.getEntries().forEach((e) => measures[e.name].push(e.duration));

  for (const [name, durations] of Object.entries(measures)) {
    const best = Math.min(...durations) / 1000;
    console.log(
      `${name} (best of ${durations.length}): ${best.toFixed(2)} seconds`
    );
  }
  observer.disconnect();
});

obs.observe({ entryTypes: ["measure"], buffer: true });

const env = new Environment({});
const templates = [
  '{% if "foobar" %}foo{% endif %}',
  '{% unless "foo"%}true{% else %}false{% endunless %}',
  "{% for i in (1..3) %}{{ forloop.index }}{% endfor %}",
  "{% case 3%}{% when 1 %}1{% when 2 %}2{% when 3 %}3{% endcase %}",
  '{% assign a="foo bar" %}',
  "{% capture foo %}what is this{% endcapture %}",
  "{% increment a %}",
  "{% decrement a %}",
  "{% tablerow i in (1..10) cols:3 %}{% endtablerow %}",
];

// async function parseAndRenderTags(number = 100) {
//   performance.mark("tags-start");
//   for (let i = 0; i < number; i++) {
//     const _templates = templates.map((source) => env.fromString(source));
//     await Promise.all(_templates.map((t) => t.render()));
//   }
//   performance.mark("tags-end");
//   performance.measure("Parse and Render Tags", "tags-start", "tags-end");
// }

function parseAndRenderTagsSync(number = 100) {
  performance.mark("tags-start");
  for (let i = 0; i < number; i++) {
    templates.map((source) => env.fromString(source).renderSync());
  }
  performance.mark("tags-end");
  performance.measure("Parse and Render Tags", "tags-start", "tags-end");
}

function parseTags(number = 100) {
  performance.mark("parse-tags-start");
  for (let i = 0; i < number; i++) {
    templates.map((source) => env.fromString(source));
  }
  performance.mark("parse-tags-end");
  performance.measure("Parse Tags", "parse-tags-start", "parse-tags-end");
}

async function renderTagsAsync(number = 100) {
  const _templates = templates.map((source) => env.fromString(source));
  performance.mark("render-tags-start");
  for (let i = 0; i < number; i++) {
    for (const t of _templates) await t.render();
  }
  performance.mark("render-tags-end");
  performance.measure("Render Tags", "render-tags-start", "render-tags-end");
}

function renderTagsSync(number = 100) {
  const _templates = templates.map((source) => env.fromString(source));
  performance.mark("render-tags-sync-start");
  for (let i = 0; i < number; i++) {
    _templates.map((t) => t.renderSync());
  }
  performance.mark("render-tags-sync-end");
  performance.measure(
    "Render Tags Sync",
    "render-tags-sync-start",
    "render-tags-sync-end"
  );
}

function main(number = 1000, repeat = 5) {
  console.log(`parse and render, best of ${repeat}`);
  for (let i = 0; i < repeat; i++) {
    parseAndRenderTagsSync(number);
  }

  console.log(`parse, best of ${repeat}`);
  for (let i = 0; i < repeat; i++) {
    parseTags(number);
  }

  console.log(`render sync, best of ${repeat}`);
  for (let i = 0; i < repeat; i++) {
    renderTagsSync(number);
  }

  console.log(`render async, best of ${repeat}`);
  for (let i = 0; i < repeat; i++) {
    renderTagsAsync(number);
  }
}

main(10000);
