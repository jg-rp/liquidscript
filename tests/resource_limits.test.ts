import { ObjectLoader } from "../src/builtin/loaders";
import { assignScore, RenderContext } from "../src/context";
import { Environment } from "../src/environment";
import { ContextDepthError, LocalNamespaceLimitError } from "../src/errors";
import { Float, Integer } from "../src/number";
import { Range } from "../src/range";

describe("calculate assignment score", () => {
  test("number", () => {
    expect(assignScore(1)).toBe(1);
  });
  test("integer", () => {
    expect(assignScore(new Integer(1))).toBeGreaterThan(1);
  });
  test("float", () => {
    expect(assignScore(new Float(1.1))).toBeGreaterThan(1);
  });
  test("string", () => {
    expect(assignScore("hello")).toBe(10);
  });
  test("array of strings", () => {
    expect(assignScore(["a", "abc"])).toBe(8);
  });
  test("set of strings", () => {
    expect(assignScore(new Set(["a", "abc"]))).toBe(8);
  });
  test("map of strings to numbers", () => {
    const obj = new Map<string, number>([
      ["a", 1],
      ["b", 2],
    ]);
    expect(assignScore(obj)).toBe(6);
  });
  test("iterable", () => {
    const obj = new Range(0, 3);
    expect(assignScore(obj)).toBe(4);
  });
});

describe("local namespace limit", () => {
  test("set a limit", () => {
    const env = new Environment({ localNamespaceLimit: 10 });
    const template = env.fromString("{% assign greeting = 'hello' %}");
    const ctx = new RenderContext(env, {});
    template.renderWithContextSync(ctx, env.renderStreamFactory());
    expect(ctx.localsScore).toBe(10);
    env.localNamespaceLimit = 9;
    expect(() => template.renderSync()).toThrow(LocalNamespaceLimitError);
  });

  test("limit is carried through to copied render context objects", () => {
    const loader = new ObjectLoader({
      foo: "{% assign bar = 'goodbye' %}",
    });
    const env = new Environment({ loader: loader, localNamespaceLimit: 24 });
    const template = env.fromString(
      "{% assign greeting = 'hello' %}{% render 'foo' %}"
    );
    const ctx = new RenderContext(env, {});
    template.renderWithContextSync(ctx, env.renderStreamFactory());
    expect(ctx.localsScore).toBe(10);
    env.localNamespaceLimit = 23;
    expect(() => template.renderSync()).toThrow(LocalNamespaceLimitError);
  });
});

describe("render context depth limit", () => {
  test("recursive render", () => {
    const loader = new ObjectLoader({
      foo: "{% render 'bar' %}",
      bar: "{% render 'foo' %}",
    });
    const env = new Environment({ loader: loader });
    const template = env.fromString("{% render 'foo' %}");
    expect(() => template.renderSync()).toThrow(ContextDepthError);
    expect(async () => await template.render()).rejects.toThrowError(
      ContextDepthError
    );
  });
  test("recursive include", () => {
    const loader = new ObjectLoader({
      foo: "{% include 'bar' %}",
      bar: "{% include 'foo' %}",
    });
    const env = new Environment({ loader: loader });
    const template = env.fromString("{% include 'foo' %}");
    expect(() => template.renderSync()).toThrow(ContextDepthError);
    expect(async () => await template.render()).rejects.toThrowError(
      ContextDepthError
    );
    expect(async () => await template.render()).rejects.toThrowError(
      "maximum context depth reached"
    );
  });
  test("set context depth limit", async () => {
    const loader = new ObjectLoader({
      foo: "{% render 'bar' %}",
      bar: "{% render 'baz' %}",
      baz: "Hello",
    });
    const env = new Environment({ loader: loader });
    const template = env.fromString("{% render 'foo' %}");

    expect(template.renderSync()).toBe("Hello");
    const result = await template.render();
    expect(result).toBe("Hello");

    env.maxContextDepth = 2;
    expect(() => template.renderSync()).toThrow(ContextDepthError);
    expect(async () => await template.render()).rejects.toThrowError(
      ContextDepthError
    );
    expect(async () => await template.render()).rejects.toThrowError(
      "maximum context depth reached"
    );
  });
  test("set context depth limit include", async () => {
    const loader = new ObjectLoader({
      foo: "{% include 'bar' %}",
      bar: "{% render 'baz' %}",
      baz: "Hello",
    });
    const env = new Environment({ loader: loader });
    const template = env.fromString("{% include 'foo' %}");

    expect(template.renderSync()).toBe("Hello");
    const result = await template.render();
    expect(result).toBe("Hello");

    env.maxContextDepth = 2;
    expect(() => template.renderSync()).toThrow(ContextDepthError);
    expect(async () => await template.render()).rejects.toThrowError(
      ContextDepthError
    );
    expect(async () => await template.render()).rejects.toThrowError(
      "maximum context depth reached"
    );
  });
});
