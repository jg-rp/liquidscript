import { Environment, render, renderSync } from "./src";
import { StrictUndefined } from "./src/drops/undefined";
import type { _Undefined } from "./src/environment";

const source = `{{ a | reverse | join: '#' }}`;

const data = {
  a: ["a", "b", 1, [], {}],
};

class MyEnv extends Environment {
  // public override undefinedFactory: _Undefined = StrictUndefined;
}

const env = new MyEnv();

env.render(source, data).then(console.log);
// console.log(env.renderSync(source, data));
