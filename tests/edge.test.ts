import { Environment } from "../src/environment";

describe("some edge cases", () => {
  const env = new Environment({});

  test("empty string", async () => {
    const template = env.fromString("");
    const result = await template.render();
    expect(result).toBe("");
  });
});
