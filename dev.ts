import { render, renderSync } from "./src";

const source = `{% assign x = 'a,b,c' | split: ',' %}{% assign y = 'a,b,c' | split: ',' %}{% if x == y %}true{% else %}false{% endif %}`;

const data = { y: [1, 2, 3] };

render(source, data).then(console.log);
console.log(renderSync(source, data));
