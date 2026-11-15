import { Environment } from "../src/environment.js";
import { WithTag } from "../src/tags/index.js";

describe("with tag", () => {
  const env = new Environment();
  env.tags["with"] = WithTag;

  test("block scoped variable", async () => {
    const template = env.parse("{{ x }}{% with x: 'foo' %}{{ x }}{% endwith %}{{ x }}");
    expect(template.renderSync()).toBe("foo");
    void expect(template.render()).resolves.toBe("foo");
  });

  test("block scoped alias", async () => {
    const template = env.parse(
      "{% with p: collection.products.first %}" +
        "{{ p.title }}" +
        "{% endwith %}" +
        "{{ p.title }}" +
        "{{ collection.products.first.title }}",
    );
    const data = { collection: { products: [{ title: "A Shoe" }] } };
    expect(template.renderSync(data)).toBe("A ShoeA Shoe");
    void expect(template.render(data)).resolves.toBe("A ShoeA Shoe");
  });

  test("multiple block scoped variables", async () => {
    const template = env.parse(
      "{% with a: 1, b: 3.4 %}{{ a }} + {{ b }} = {{ a | plus: b }}{% endwith %}",
    );
    expect(template.renderSync()).toBe("1 + 3.4 = 4.4");
    void expect(template.render()).resolves.toBe("1 + 3.4 = 4.4");
  });

  test("loop interrupt inside with block", async () => {
    const template = env.parse(
      "{% for x in (1..3) %}" +
        "{% with a: 'hello' %}" +
        "{{ a }}" +
        "{% break %}" +
        "{{ a | upcase }}" +
        "{% endwith %}" +
        "{% endfor %}" +
        "{{ a | upcase }}",
    );
    expect(template.renderSync()).toBe("hello");
    void expect(template.render()).resolves.toBe("hello");
  });
});
