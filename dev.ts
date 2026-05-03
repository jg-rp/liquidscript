import { Environment, render, renderSync } from "./src";
import { StrictUndefined } from "./src/drops/undefined";
import type { _Undefined } from "./src/environment";

const source = `{% cycle a: '1', '2' %}{% cycle a: '1', '2', '3' %}{% cycle a: '1' %}`;

const data = {
  title: "Hello",
  a: "Hello",
};

class MyEnv extends Environment {
  // public override undefinedFactory: _Undefined = StrictUndefined;
}

const env = new MyEnv();

// env.render(source, data).then(console.log);
console.log(env.renderSync(source, data));
