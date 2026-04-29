import { Environment, render, renderSync } from "./src";
import { StrictUndefined } from "./src/drops/undefined";
import type { _Undefined } from "./src/environment";

const source = `{% for item in (1..6) limit: 2 %}a{{ item }} {% endfor %}{% for item in (1..6) limit: 2 offset: continue %}b{{ item }} {% endfor %}{% for item in (1..6) offset: continue %}c{{ item }} {% endfor %}`;
// const source = `{% for tag in tags limit:1 %}{{ tag }} {% endfor %}`;

const data = {
  tags: ["sports", "garden", "home", "diy", "motoring", "fashion"],
};

class MyEnv extends Environment {
  // public override undefinedFactory: _Undefined = StrictUndefined;
}

const env = new MyEnv();

// render(source, data).then(console.log);
console.log(env.renderSync(source, data));
