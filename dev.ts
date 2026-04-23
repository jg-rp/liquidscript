import { render, renderSync } from "./src";

const source = `{% if a contains false %}TRUE{% else %}FALSE{% endif %}`;

const data = {
  a: [1, 2, 3, false],
};

render(source, data).then(console.log);
console.log(renderSync(source, data));
