import { Template } from "../src/template";

describe("template from string", () => {
  test("implicit environment", () => {
    const template = Template.fromString("Hello, {{ you }}!");
    expect(template.renderSync({ you: "World" })).toBe("Hello, World!");
    expect(template.renderSync({ you: "you" })).toBe("Hello, you!");
  });
  test("implicit environments are cached", () => {
    const template = Template.fromString("Hello, {{ you }}!");
    const anotherTemplate = Template.fromString("Goodbye, {{ you }}.");
    const yetAnotherTemplate = Template.fromString("foo", undefined, {
      autoEscape: true,
    });
    expect(Object.is(template.environment, anotherTemplate.environment)).toBe(
      true
    );
    expect(
      Object.is(template.environment, yetAnotherTemplate.environment)
    ).toBe(false);
  });
});
