import { Environment } from "../../src/environment";

// TODO: Finish tests, reversed

describe("built-in for tag", () => {
  const env = new Environment({});
  test("range", async () => {
    const template = env.fromString("{% for i in (1..3) %}{{ i }}{% endfor %}");
    const result = await template.render();
    expect(result).toBe("123");
  });
  test("range with variable stop", async () => {
    const template = env.fromString("{% for i in (1..b) %}{{ i }}{% endfor %}");
    const result = await template.render({ b: 3 });
    expect(result).toBe("123");
  });
  test("range with limit", async () => {
    const template = env.fromString(
      "{% for i in (1..3) limit:2 %}{{ i }}{% endfor %}"
    );
    const result = await template.render();
    expect(result).toBe("12");
  });
  test("range with offset", async () => {
    const template = env.fromString(
      "{% for i in (1..3) offset:1 %}{{ i }}{% endfor %}"
    );
    const result = await template.render();
    expect(result).toBe("23");
  });
  test("range with offset and limit", async () => {
    const template = env.fromString(
      "{% for i in (1..4) offset:1 limit:2 %}{{ i }}{% endfor %}"
    );
    const result = await template.render();
    expect(result).toBe("23");
  });
  test("iterate an array", async () => {
    const template = env.fromString(
      "{% for tag in product.tags %}{{ tag }} {% endfor %}"
    );
    const result = await template.render({
      product: { tags: ["sports", "garden"] },
    });
    expect(result).toBe("sports garden ");
  });
  test("iterate a Set", async () => {
    const template = env.fromString(
      "{% for tag in product.tags %}{{ tag }} {% endfor %}"
    );
    const result = await template.render({
      product: { tags: new Set(["sports", "garden"]) },
    });
    expect(result).toBe("sports garden ");
  });
  test("iterate a hash/types", async () => {
    const template = env.fromString(
      "{% for field in collection %}{{ field[0] }}: {{ field[1] }}, {% endfor %}"
    );
    const result = await template.render({
      collection: { title: "Garden", description: "Things for the garden" },
    });
    expect(result).toBe("title: Garden, description: Things for the garden, ");
  });
  test("iterate a Map", async () => {
    const template = env.fromString(
      "{% for field in collection %}{{ field[0] }}: {{ field[1] }}, {% endfor %}"
    );
    const result = await template.render({
      collection: new Map([
        ["title", "Garden"],
        ["description", "Things for the garden"],
      ]),
    });
    expect(result).toBe("title: Garden, description: Things for the garden, ");
  });
  test("empty iterable with default", async () => {
    const template = env.fromString(
      "{% for tag in tags %}{{ tag }} {% else %}nothing{% endfor %}"
    );
    const result = await template.render({ tags: [] });
    expect(result).toBe("nothing");
  });
  test("break", async () => {
    const template = env.fromString(
      "{% for tag in tags %}" +
        "{% if tag == 'garden' %}{% break %}{% endif %}" +
        "{{ tag }} " +
        "{% endfor %}"
    );
    const result = await template.render({
      tags: ["sports", "garden", "household"],
    });
    expect(result).toBe("sports ");
  });
  test("continue", async () => {
    const template = env.fromString(
      "{% for tag in tags %}" +
        "{% if tag == 'garden' %}{% continue %}{% endif %}" +
        "{{ tag }} " +
        "{% endfor %}"
    );
    const result = await template.render({
      tags: ["sports", "garden", "household"],
    });
    expect(result).toBe("sports household ");
  });
  test("forloop length", async () => {
    const template = env.fromString(
      "{% for tag in tags %}{{ forloop.length }} {% endfor %}"
    );
    const result = await template.render({
      tags: ["sports", "garden", "household"],
    });
    expect(result).toBe("3 3 3 ");
  });
  test("forloop length with limit", async () => {
    const template = env.fromString(
      "{% for tag in tags limit:2 %}{{ forloop.length }} {% endfor %}"
    );
    const result = await template.render({
      tags: ["sports", "garden", "household"],
    });
    expect(result).toBe("2 2 ");
  });
  test("forloop length with offset", async () => {
    const template = env.fromString(
      "{% for tag in tags offset:1 %}{{ forloop.length }} {% endfor %}"
    );
    const result = await template.render({
      tags: ["sports", "garden", "household"],
    });
    expect(result).toBe("2 2 ");
  });
});
