import { render, renderSync } from "./src";

const source = `{% for i in (0..product.end_range) %}{{ i }} - {{ product.tags[i] }} {% endfor %}`;

const data = {
  product: {
    tags: ["sports", "garden"],
    end_range: 1,
  },
};

// render(source, data).then(console.log);
console.log(renderSync(source, data));
