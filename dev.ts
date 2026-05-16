import { Environment, render, renderSync } from "./src";
import { StrictUndefined } from "./src/drops/undefined";
import type { _Undefined } from "./src/environment";
import { ObjectLoader } from "./src/loaders";
import { getTokenValue, REVERSE_T } from "./src/token";

const source = "{% if a == true or b == false %} YES {% endif %}";

const data = {
  a: true,
  b: true,
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

console.log(JSON.stringify(env.renderSync(source, data)));
