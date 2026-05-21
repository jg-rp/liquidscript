import { parse } from "../src/liquidscript";

describe("edge cases", () => {
  test("empty string", async () => {
    const template = parse("");
    const result = await template.render();
    expect(result).toBe("");
  });

  test("object contains key", () => {
    const template = parse("{% if obj contains 'x' %}yes{% endif %}");
    const result = template.renderSync({ obj: { x: 1 } });
    expect(result).toBe("yes");
  });

  test("assign a range", () => {
    const template = parse("{% assign x = (1..3) %}{{ x | join: '#' }}");
    expect(template.renderSync()).toBe("1#2#3");
  });
});
