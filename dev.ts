import { render, renderSync } from "./src";

const source = `"{% if nosuchthing %}bar{% else %}foo{% endif %}"`;

const data = { y: [1, 2, 3] };

render(source, data).then(console.log);
console.log(renderSync(source, data));
