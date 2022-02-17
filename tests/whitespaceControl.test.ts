import { DefaultEnvironment } from "../src/environment";

describe("built-in comment tag", () => {
  const env = new DefaultEnvironment({});

  test("strip whitespace preceding an output statement", async () => {
    const template = env.fromString("\t\n {{- 'hello' }}");
    const result = await template.render();
    expect(result).toBe("hello");
  });
  test("strip whitespace following an output statement", async () => {
    const template = env.fromString("{{ 'hello' -}}\t\n ");
    const result = await template.render();
    expect(result).toBe("hello");
  });
  test("strip whitespace preceding and following an output statement", async () => {
    const template = env.fromString("\t\n {{- 'hello' -}}\t\n ");
    const result = await template.render();
    expect(result).toBe("hello");
  });
  test("strip whitespace preceding a tag", async () => {
    const template = env.fromString("\t\n {%- increment a %}");
    const result = await template.render();
    expect(result).toBe("0");
  });
  test("strip whitespace following a tag", async () => {
    const template = env.fromString("{% increment a -%}\t\n ");
    const result = await template.render();
    expect(result).toBe("0");
  });
  test("strip whitespace preceding and following a tag", async () => {
    const template = env.fromString("\t\n {%- increment a -%}\t\n ");
    const result = await template.render();
    expect(result).toBe("0");
  });
});
