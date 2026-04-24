import { render, renderSync } from "./src";

const source = `{% if '2' > 1 %}true{% else %}false{% endif %}`;

const data = {
  product: {
    title: "foo",
  },
};

render(source, data).then(console.log);
// console.log(renderSync(source, data));
