import { DefaultEnvironment } from "../src/environment";

describe("some edge cases", () => {
  const env = new DefaultEnvironment({});

  test("empty string", async () => {
    const template = env.fromString("");
    const result = await template.render();
    expect(result).toBe("");
  });
});
