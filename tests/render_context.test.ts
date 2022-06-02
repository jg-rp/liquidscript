import { Template } from "../src/template";

describe("render context", () => {
  test("resolve promise async", async () => {
    const template = Template.fromString("{{ foo }}");
    const result = await template.render({ foo: Promise.resolve("hello") });
    expect(result).toBe("hello");
  });

  test("resolve promise sync", () => {
    const template = Template.fromString("{{ foo }}");
    const result = template.renderSync({ foo: Promise.resolve("hello") });
    expect(result).toBe("[object Promise]");
  });

  test("resolve promise from chained identifier", async () => {
    const template = Template.fromString("{{ foo.bar }}");
    const result = await template.render({
      foo: { bar: Promise.resolve("hello") },
    });
    expect(result).toBe("hello");
  });

  test("resolve promise chain", async () => {
    const template = Template.fromString("{{ foo.bar }}");
    const result = await template.render({
      foo: Promise.resolve({ bar: Promise.resolve("hello") }),
    });
    expect(result).toBe("hello");
  });
});
