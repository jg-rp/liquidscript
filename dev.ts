import { Environment, render, renderSync } from "./src";
import { StrictUndefined } from "./src/drops/undefined";
import type { _Undefined } from "./src/environment";

const source = `{% case title %}{% when 'Hello' %}foo{% when a, 'Hello' %}bar{% endcase %}`;

const data = {
  title: "Hello",
  a: "Hello",
};

class MyEnv extends Environment {
  // public override undefinedFactory: _Undefined = StrictUndefined;
}

const env = new MyEnv();

env.render(source, data).then(console.log);
// console.log(env.renderSync(source, data));
