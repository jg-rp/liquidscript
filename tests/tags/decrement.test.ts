import { DefaultEnvironment } from "../../src/environment";

describe("built-in decrement tag", () => {
  const env = new DefaultEnvironment({});
  test("named counter", async () => {
    const template = env.fromString(
      "{% decrement foo %}{{ foo }} {% decrement foo %}{{ foo }}"
    );
    const result = await template.render();
    expect(result).toBe("-1-1 -2-2");
  });
  test("increment and decrement named counter", async () => {
    const template = env.fromString(
      "{% decrement foo %} {% decrement foo %} {% increment foo %} {{ foo }}"
    );
    const result = await template.render();
    expect(result).toBe("-1 -2 -2 -1");
  });
});
