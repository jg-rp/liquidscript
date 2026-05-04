import { Environment, render, renderSync } from "./src";
import { StrictUndefined } from "./src/drops/undefined";
import type { _Undefined } from "./src/environment";
import { ObjectLoader } from "./src/loaders";

const source = `{{ a | sort: nosuchthing | join: '#' }}`;

const data = {
  a: ["b", "a"],
};

const loader = new ObjectLoader({ foo: "Hello, {{ you }}!" });

const env = new Environment({ loader });

const template = env.getTemplateSync("foo", { you: "World" });

// env.render(source, data).then(console.log);
// console.log(env.renderSync(source, data));

console.log(template.renderSync({ you: "Sue" }));
