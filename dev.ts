import { Environment, render, renderSync } from "./src";
import { FalsyStrictUndefined, StrictUndefined } from "./src/drops/undefined";
import type { _Undefined } from "./src/environment";
import { DiagnosticError } from "./src/errors";
import { ObjectLoader } from "./src/loaders";
import { getTokenValue, REVERSE_T } from "./src/token";

const source =
  "{% for i in (1..3) %}" +
  "{% for j in (1..3) %}" +
  "{% for k in (1..3) %}" +
  "Hello, {{ you }}!" +
  "{% endfor %}" +
  "{% endfor %}" +
  "{% endfor %}";

const data = {};

const loader = new ObjectLoader({
  "product-args": "{{ foo }}{% assign foo='goodbye' %} {{ foo }}",
});

const env = new Environment({
  loader,
  strictFilters: true,
  maxContextDepth: 2,
});

// const tokens = env.lexer.tokenize(env, source);

// for (const token of tokens) {
//   console.log({
//     kind: REVERSE_T[token.kind],
//     value: getTokenValue(token, source),
//   });
// }

// const template = env.getTemplateSync("foo", { you: "World" });

// env.render(source, data).then(console.log);
// console.log(env.renderSync(source, data));

// console.log(JSON.stringify(env.renderSync(source, data)));

try {
  const template = env.parse(source, {}, { name: "index.liquid" });
  console.log(JSON.stringify(template.renderSync()));
} catch (err) {
  if (err instanceof DiagnosticError) {
    console.error(err.render());
    process.exit(1);
  }
  throw err;
}

// const template = env.parse(source);

// const a = template.analyzeSync();

// console.dir(a, { depth: null });

// console.log(template.variablesSync());
// console.dir(template.variablePathsSync(), { depth: null });
// console.log(template.variableSegmentsSync());
