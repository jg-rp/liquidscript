import { Environment, render, renderSync } from "./src";
import { StrictUndefined } from "./src/drops/undefined";
import type { _Undefined } from "./src/environment";

const source = `{% if nosuchthing %}bar{% else %}foo{% endif %}`;

const data = {
  product: {
    tags: ["sports", "garden"],
    end_range: 1,
  },
};

class MyEnv extends Environment {
  // public override undefinedFactory: _Undefined = StrictUndefined;
}

const env = new MyEnv();

// render(source, data).then(console.log);
console.log(env.renderSync(source, data));
