import { Environment } from "../src/liquidscript";

describe("manage global variables", () => {
  test("environment globals", () => {
    const env = new Environment();
    const template = env.parse("{{ something }}", {
      something: "hello",
    });
    expect(template.renderSync()).toBe("hello");
  });

  test("template globals shadow env globals", () => {
    const env = new Environment({ globals: { something: "foo" } });
    const template = env.parse("{{ something }}", {
      something: "hello",
    });
    expect(template.renderSync()).toBe("hello");
  });
});
