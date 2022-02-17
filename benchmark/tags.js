const { performance, PerformanceObserver } = require("perf_hooks");
const { DefaultEnvironment } = require("..");

const obs = new PerformanceObserver((list, observer) => {
  console.log(list.getEntries());
  observer.disconnect();
});

obs.observe({ entryTypes: ["measure"], buffer: true });

const env = new DefaultEnvironment({});
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

async function parseAndRenderTags() {
  performance.mark("tags-start");
  for (let i = 0; i < 10000; i++) {
    Promise.all(templates.map((source) => env.fromString(source).render()));
  }
  performance.mark("tags-end");
  performance.measure("Parse and Render Tags", "tags-start", "tags-end");
}

parseAndRenderTags().then();

async function parseTags() {
  performance.mark("parse-tags-start");
  for (let i = 0; i < 10000; i++) {
    templates.map((source) => env.fromString(source));
  }
  performance.mark("parse-tags-end");
  performance.measure("Parse Tags", "parse-tags-start", "parse-tags-end");
}

parseTags().then();

async function renderTags() {
  const _templates = templates.map((source) => env.fromString(source));
  performance.mark("render-tags-start");
  for (let i = 0; i < 10000; i++) {
    Promise.all(
      _templates.map((t) => {
        t.render();
      })
    );
  }
  performance.mark("render-tags-end");
  performance.measure("Render Tags", "render-tags-start", "render-tags-end");
}

renderTags().then();

// TODO: LRU / proxy cache
// TODO: cache getParser
