import { Environment } from "../src/environment";
import { Float, Integer } from "../src/number";

describe("some edge cases", () => {
  const env = new Environment({});

  test("empty string", async () => {
    const template = env.fromString("");
    const result = await template.render();
    expect(result).toBe("");
  });

  test("array contains wrapped number", () => {
    const template = env.fromString("{% if a contains i %}yes{% endif %}");
    const result = template.renderSync({ a: [1, 2, 3], i: new Integer(1) });
    expect(result).toBe("yes");
  });

  test("number equals integer", () => {
    const template = env.fromString("{% if x == y %}yes{% endif %}");
    const result = template.renderSync({ x: 5, y: new Integer(5) });
    expect(result).toBe("yes");
  });

  test("integer equals number", () => {
    const template = env.fromString("{% if x == y %}yes{% endif %}");
    const result = template.renderSync({ y: 5, x: new Integer(5) });
    expect(result).toBe("yes");
  });

  test("float equals integer", () => {
    const template = env.fromString("{% if x == y %}yes{% endif %}");
    const result = template.renderSync({
      x: new Float(5.0),
      y: new Integer(5),
    });
    expect(result).toBe("yes");
  });

  test("object contains key", () => {
    const template = env.fromString("{% if obj contains 'x' %}yes{% endif %}");
    const result = template.renderSync({ obj: { x: 1 } });
    expect(result).toBe("yes");
  });

  test("assign a range", () => {
    const template = env.fromString(
      "{% assign x = (1..3) %}{{ x | join: '#' }}"
    );
    expect(template.renderSync()).toBe("1#2#3");
  });
});
