import { Environment, render, renderSync } from "./src";
import { StrictUndefined } from "./src/drops/undefined";
import type { _Undefined } from "./src/environment";
import { ObjectLoader } from "./src/loaders";

const source = `{%- liquid\n  for value in array\n    assign double_value = value | times: 2\n    echo double_value | times: 2\n    unless forloop.last\n      echo '#'\n    endunless\n  endfor\n\n  echo '#'\n  echo double_value\n-%}`;

const data = {
  array: [1, 2, 3],
};

const loader = new ObjectLoader({
  "product-title": "{{ product-title.title }}",
});

const env = new Environment({ loader, strictFilters: true });

// const template = env.getTemplateSync("foo", { you: "World" });

// env.render(source, data).then(console.log);
// console.log(env.renderSync(source, data));

console.log(env.renderSync(source, data));
