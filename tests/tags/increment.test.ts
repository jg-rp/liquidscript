import { DefaultEnvironment } from "../../src/environment";

describe("built-in increment tag", () => {
  const env = new DefaultEnvironment({});
  test("named counter", async () => {
    const template = env.fromString(
      "{% increment foo %}{{ foo }} {% increment foo %}{{ foo }}"
    );
    const result = await template.render();
    expect(result).toBe("01 12");
  });
  test("increment and decrement named counter", async () => {
    const template = env.fromString(
      "{% increment foo %} {% increment foo %} {% decrement foo %} {{ foo }}"
    );
    const result = await template.render();
    expect(result).toBe("0 1 1 1");
  });
});
