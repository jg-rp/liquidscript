import { Environment, render, renderSync } from "./src";
import { StrictUndefined } from "./src/drops/undefined";
import type { _Undefined } from "./src/environment";
import { ObjectLoader } from "./src/loaders";
import { getTokenValue, REVERSE_T } from "./src/token";

const source = "Hello, {{ you[foo.baz[1]].bar }}!";

const data = {
  you: "World",
};

const loader = new ObjectLoader({
  "product-title": "{{ product-title.title }}",
});

const env = new Environment({ loader, strictFilters: true });

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

const template = env.parse(source);

console.log(template.variablesSync());
console.log(template.variablePathsSync());
console.log(template.variableSegmentsSync());
