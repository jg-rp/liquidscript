import { Environment } from "../../src/environment";

describe("built-in assign tag", () => {
  const env = new Environment({});

  test("assign a literal", async () => {
    const template = env.fromString("{% assign x = 'hello' %}{{ x }}");
    const result = await template.render();
    expect(result).toBe("hello");
  });
  test("assign a filtered literal", async () => {
    const template = env.fromString(
      "{% assign x = 'hello ' | append: 'world' %}{{ x }}"
    );
    const result = await template.render();
    expect(result).toBe("hello world");
  });
  test("assign a range literal", async () => {
    const template = env.fromString(
      "{% assign x = (1..3) %}{{ x | join: '#' }}"
    );
    const result = await template.render();
    expect(result).toBe("1#2#3");
  });
});
