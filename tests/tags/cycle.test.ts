import { DefaultEnvironment } from "../../src/environment";

describe("built-in cycle tag", () => {
  const env = new DefaultEnvironment({});
  test("strings", async () => {
    const template = env.fromString(
      "{% cycle 'a', 'b', 'c' %} " +
        "{% cycle 'a', 'b', 'c' %} " +
        "{% cycle 'a', 'b', 'c' %} " +
        "{% cycle 'a', 'b', 'c' %}"
    );
    const result = await template.render();
    expect(result).toBe("a b c a");
  });
  test("integers", async () => {
    const template = env.fromString(
      "{% cycle 1, 2, 3 %} {% cycle 1, 2, 3 %} {% cycle 1, 2, 3 %} {% cycle 1, 2, 3 %}"
    );
    const result = await template.render();
    expect(result).toBe("1 2 3 1");
  });
  test("booleans", async () => {
    const template = env.fromString(
      "{% cycle true, true, false %} " +
        "{% cycle true, true, false %} " +
        "{% cycle true, true, false %} " +
        "{% cycle true, true, false %}"
    );
    const result = await template.render();
    expect(result).toBe("true true false true");
  });
  test("string named group", async () => {
    const template = env.fromString(
      "{% cycle 'x': 'a', 'b', 'c' %} " +
        "{% cycle 'x': 'a', 'b', 'c' %} " +
        "{% cycle 'x': 'a', 'b', 'c' %} " +
        "{% cycle 'x': 'a', 'b', 'c' %}"
    );
    const result = await template.render();
    expect(result).toBe("a b c a");
  });
  test("multiple string named groups", async () => {
    const template = env.fromString(
      "{% cycle 'x': 'a', 'b', 'c' %} " +
        "{% cycle 'x': 'a', 'b', 'c' %} " +
        "{% cycle 'y': 'a', 'b', 'c' %} " +
        "{% cycle 'x': 'a', 'b', 'c' %} " +
        "{% cycle 'x': 'a', 'b', 'c' %}"
    );
    const result = await template.render();
    expect(result).toBe("a b a c a");
  });
  test("variable named groups", async () => {
    const template = env.fromString(
      "{% cycle x: 'a', 'b', 'c' %} " +
        "{% cycle x: 'a', 'b', 'c' %} " +
        "{% cycle y: 'a', 'b', 'c' %} " +
        "{% cycle x: 'a', 'b', 'c' %} " +
        "{% cycle x: 'a', 'b', 'c' %}"
    );
    const result = await template.render({ x: "x", y: "y" });
    expect(result).toBe("a b a c a");
  });
  test("variable named groups with the same value", async () => {
    const template = env.fromString(
      "{% cycle x: 'a', 'b', 'c' %} " +
        "{% cycle x: 'a', 'b', 'c' %} " +
        "{% cycle y: 'a', 'b', 'c' %} " +
        "{% cycle x: 'a', 'b', 'c' %} " +
        "{% cycle x: 'a', 'b', 'c' %}"
    );
    const result = await template.render({ x: "x", y: "x" });
    expect(result).toBe("a b c a b");
  });
  test("variables", async () => {
    const template = env.fromString(
      "{% cycle a, b, c %} " +
        "{% cycle a, b, c %} " +
        "{% cycle a, b, c %} " +
        "{% cycle a, b, c %}"
    );
    const result = await template.render({ a: "x", b: "y", c: "z" });
    expect(result).toBe("x y z x");
  });
});
