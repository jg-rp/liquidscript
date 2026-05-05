import { Environment, render, renderSync } from "./src";
import { StrictUndefined } from "./src/drops/undefined";
import type { _Undefined } from "./src/environment";
import { ObjectLoader } from "./src/loaders";

const source = `{% include 'product-title' with collection.products[1] %}`;

const data = {
  collection: {
    products: [
      {
        title: "bike",
      },
      {
        title: "car",
      },
    ],
  },
};

const loader = new ObjectLoader({
  "product-title": "{{ product-title.title }}",
});

const env = new Environment({ loader });

// const template = env.getTemplateSync("foo", { you: "World" });

// env.render(source, data).then(console.log);
// console.log(env.renderSync(source, data));

console.log(env.renderSync(source, data));
