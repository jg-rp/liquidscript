import { render, renderSync } from "./src";

const source = `{% for x in y %}{{ x }}, {% endfor %}`;

const data = { y: [1, 2, 3] };

render(source, data).then(console.log);
console.log(renderSync(source, data));
