import { Environment, render, renderSync } from "./src";
import { StrictUndefined } from "./src/drops/undefined";
import type { _Undefined } from "./src/environment";

const source = `{% for i in (1..4) limit: 'foo' %}{{ i }} {% endfor %}`;

const data = {
  array: [1, 2, 3, 4, 5, 6],
};

class MyEnv extends Environment {
  // public override undefinedFactory: _Undefined = StrictUndefined;
}

const env = new MyEnv();

// render(source, data).then(console.log);
console.log(env.renderSync(source, data));
