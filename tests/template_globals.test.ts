import { Environment } from "../src/environment";

describe("manage template global variables", () => {
  test("template globals via env string", () => {
    const env = new Environment();
    const template = env.fromString("{{ something }}", "some.liquid", {
      something: "hello",
    });
    expect(template.renderSync()).toBe("hello");
  });
  test("template globals shadow env globals", () => {
    const env = new Environment({ globals: { something: "foo" } });
    const template = env.fromString("{{ something }}", "some.liquid", {
      something: "hello",
    });
    expect(template.renderSync()).toBe("hello");
  });
});
