import { Environment, render, renderSync } from "./src";
import { StrictUndefined } from "./src/drops/undefined";
import type { _Undefined } from "./src/environment";

const source = `{% for i in (1..3) limit:1 %}{{ forloop.name }}{% endfor %}`;
// const source = `{% for tag in tags limit:1 %}{{ tag }} {% endfor %}`;

const data = {
  array: [1, 2, 3, 4, 5, 6],
};

class MyEnv extends Environment {
  // public override undefinedFactory: _Undefined = StrictUndefined;
}

const env = new MyEnv();

env.render(source, data).then(console.log);
// console.log(env.renderSync(source, data));
