import { Environment, ObjectLoader } from "../src/liquidscript";
import { ContextDepthError } from "../src/errors";

describe("context depth limit", () => {
  test("recursive render", () => {
    const loader = new ObjectLoader({
      foo: "{% render 'bar' %}",
      bar: "{% render 'foo' %}",
    });

    const env = new Environment({ loader });
    const template = env.parse("{% render 'foo' %}");

    expect(() => template.renderSync()).toThrow(ContextDepthError);
    expect(() => template.renderSync()).toThrow(ContextDepthError);
  });

  test("recursive include", () => {
    const loader = new ObjectLoader({
      foo: "{% include 'bar' %}",
      bar: "{% include 'foo' %}",
    });
    const env = new Environment({ loader });
    const template = env.parse("{% include 'foo' %}");
    expect(() => template.renderSync()).toThrow(ContextDepthError);
    expect(() => template.renderSync()).toThrow(
      "maximum context depth reached",
    );
  });

  test("set context depth limit", () => {
    const loader = new ObjectLoader({
      foo: "{% render 'bar' %}",
      bar: "{% render 'baz' %}",
      baz: "Hello",
    });
    const env = new Environment({ loader });
    const template = env.parse("{% render 'foo' %}");

    expect(template.renderSync()).toBe("Hello");
    const result = template.renderSync();
    expect(result).toBe("Hello");

    env.maxContextDepth = 2;
    expect(() => template.renderSync()).toThrow(ContextDepthError);
    expect(() => template.renderSync()).toThrow(
      "maximum context depth reached",
    );
  });

  test("set context depth limit include", () => {
    const loader = new ObjectLoader({
      foo: "{% include 'bar' %}",
      bar: "{% render 'baz' %}",
      baz: "Hello",
    });
    const env = new Environment({ loader });
    const template = env.parse("{% include 'foo' %}");

    expect(template.renderSync()).toBe("Hello");
    const result = template.renderSync();
    expect(result).toBe("Hello");

    env.maxContextDepth = 2;
    expect(() => template.renderSync()).toThrow(ContextDepthError);
    expect(() => template.renderSync()).toThrow(
      "maximum context depth reached",
    );
  });
});
