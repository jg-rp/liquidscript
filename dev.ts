import { Environment, render, renderSync } from "./src/liquidscript";
import { FalsyStrictUndefined, StrictUndefined } from "./src/drops/undefined";
import type { _Undefined } from "./src/environment";
import { DiagnosticError } from "./src/errors";
import { ObjectLoader } from "./src/loaders";
import { NodeFileSystemLoader } from "./src/loaders";
import { getTokenValue, REVERSE_T } from "./src/token";

const data = {};
const loader = new ObjectLoader({ a: "{{ x }}{% assign y = 42 %}" });
const env = new Environment({ loader });
const source = "{% include 'a' %}{{ y }}";

// const tokens = env.lexer.tokenize(env, source);

// for (const token of tokens) {
//   console.log({
//     kind: REVERSE_T[token.kind],
//     value: getTokenValue(token, source),
//   });
// }

// const template = env.getTemplateSync("foo", { you: "World" });

// env.render(source, data).then(console.log);
// console.log(env.renderSync(source, data));

// console.log(JSON.stringify(env.renderSync(source, data)));

// try {
//   const template = env.parse(source, {}, { name: "index.liquid" });
//   console.log(JSON.stringify(template.renderSync()));
//   console.dir(template.analyzeSync(), { depth: null });
// } catch (err) {
//   if (err instanceof DiagnosticError) {
//     console.error(err.render());
//     process.exit(1);
//   }
//   throw err;
// }

// const template = env.parse(source);

// console.log(template.variablesSync());
// console.dir(template.variablePathsSync(), { depth: null });
// console.log(template.variableSegmentsSync());

class MyEnv extends Environment {
  override setupFilters() {
    super.setupFilters();
    delete this.filters["base64_decode"];
    delete this.filters["base64_encode"];
    delete this.filters["base64_url_safe_decode"];
    delete this.filters["base64_url_safe_encode"];
  }
}
const myEnv = new MyEnv();

console.log(myEnv.filters);
