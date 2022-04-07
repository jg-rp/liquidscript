import { Environment } from "../../../src/environment";
import { WithTag } from "../../../src/extra/tags/with";
import { LaxUndefined } from "../../../src/undefined";

describe("tokenize a 'with' tag expression", () => {
  const env = new Environment({ undefinedFactory: LaxUndefined.from });
  env.addTag("with", new WithTag());

  test("block scoped variable", async () => {
    const template = env.fromString(
      "{{ x }}{% with x: 'foo' %}{{ x }}{% endwith %}{{ x }}"
    );
    expect(template.renderSync()).toBe("foo");
    expect(template.render()).resolves.toBe("foo");
  });

  test("block scoped alias", async () => {
    const template = env.fromString(
      "{% with p: collection.products.first %}" +
        "{{ p.title }}" +
        "{% endwith %}" +
        "{{ p.title }}" +
        "{{ collection.products.first.title }}"
    );
    const data = { collection: { products: [{ title: "A Shoe" }] } };
    expect(template.renderSync(data)).toBe("A ShoeA Shoe");
    expect(template.render(data)).resolves.toBe("A ShoeA Shoe");
  });

  test("multiple block scoped variables", async () => {
    const template = env.fromString(
      "{% with a: 1, b: 3.4 %}" +
        "{{ a }} + {{ b }} = {{ a | plus: b }}" +
        "{% endwith %}"
    );
    expect(template.renderSync()).toBe("1 + 3.4 = 4.4");
    expect(template.render()).resolves.toBe("1 + 3.4 = 4.4");
  });

  test("loop interrupt inside with block", async () => {
    const template = env.fromString(
      "{% for x in (1..3) %}" +
        "{% with a: 'hello' %}" +
        "{{ a }}" +
        "{% break %}" +
        "{{ a | upcase }}" +
        "{% endwith %}" +
        "{% endfor %}" +
        "{{ a | upcase }}"
    );
    expect(template.renderSync()).toBe("hello");
    expect(template.render()).resolves.toBe("hello");
  });
});
