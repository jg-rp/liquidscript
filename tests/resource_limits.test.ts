import { ObjectLoader } from "../src/builtin/loaders";
import { _assignScore, RenderContext } from "../src/context";
import { Environment } from "../src/environment";
import { Template } from "../src/template";
import {
  ContextDepthError,
  LocalNamespaceLimitError,
  LoopIterationLimitError,
  OutputStreamLimitError,
} from "../src/errors";
import { Float, Integer } from "../src/number";
import { Range } from "../src/range";

describe("calculate default assignment score", () => {
  test("number", () => {
    expect(_assignScore(1)).toBe(1);
  });
  test("integer", () => {
    expect(_assignScore(new Integer(1))).toBeGreaterThan(1);
  });
  test("float", () => {
    expect(_assignScore(new Float(1.1))).toBeGreaterThan(1);
  });
  test("string", () => {
    expect(_assignScore("hello")).toBe(10);
  });
  test("array of strings", () => {
    expect(_assignScore(["a", "abc"])).toBe(8);
  });
  test("set of strings", () => {
    expect(_assignScore(new Set(["a", "abc"]))).toBe(8);
  });
  test("map of strings to numbers", () => {
    const obj = new Map<string, number>([
      ["a", 1],
      ["b", 2],
    ]);
    expect(_assignScore(obj)).toBe(6);
  });
  test("iterable", () => {
    const obj = new Range(0, 3);
    expect(_assignScore(obj)).toBe(4);
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

describe("custom assign score", () => {
  class MyRenderContext extends RenderContext {
    public assignScore(): number {
      return 1;
    }
  }

  class MyTemplate extends Template {
    protected renderContextClass = MyRenderContext;
  }

  class MyEnvironment extends Environment {
    protected templateClass = MyTemplate;
  }
  test("count items in the local namespace", () => {
    const env = new MyEnvironment({ localNamespaceLimit: 1 });
    // One assignment is OK.
    let template = env.fromString("{% assign foo = 'bar' %}{{ foo }}");
    expect(template.renderSync()).toBe("bar");
    // Two assignments is not OK.
    template = env.fromString("{% assign foo = 'bar' %}{% assign x = 1 %}");
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

describe("loop iteration limit", () => {
  test("no default limit", async () => {
    const env = new Environment();
    const template = env.fromString(
      [
        "{% for i in (1..100) %}",
        "{% for j in (1..100) %}",
        "x",
        "{% endfor %}",
        "{% endfor %}",
      ].join("")
    );
    template.renderSync();
    await template.render();
  });

  test("set loop limit", async () => {
    const env = new Environment({ loopIterationLimit: 10000 });
    let template = env.fromString(
      [
        "{% for i in (1..100) %}",
        "{% for j in (1..100) %}",
        "x",
        "{% endfor %}",
        "{% endfor %}",
      ].join("")
    );
    template.renderSync();
    await template.render();

    template = env.fromString(
      [
        "{% for i in (1..101) %}",
        "{% for j in (1..100) %}",
        "x",
        "{% endfor %}",
        "{% endfor %}",
      ].join("")
    );
    expect(() => template.renderSync()).toThrowError(LoopIterationLimitError);
    expect(async () => await template.render()).rejects.toThrowError(
      LoopIterationLimitError
    );
  });

  test("render carries loop limit", async () => {
    const loader = new ObjectLoader({
      foo: [
        "{% for i in (1..50) %}",
        "{% for j in (1..50) %}",
        "{{ i }},{{ j }}",
        "{% endfor %}",
        "{% endfor %}",
      ].join(""),
    });
    const env = new Environment({ loader: loader, loopIterationLimit: 3000 });
    const template = env.fromString(
      "{% for i in (1..10) %}{% render 'foo' %}{% endfor %}"
    );

    expect(() => template.renderSync()).toThrowError(LoopIterationLimitError);
    expect(async () => await template.render()).rejects.toThrowError(
      LoopIterationLimitError
    );
  });

  test("include carries loop limit", async () => {
    const loader = new ObjectLoader({
      foo: [
        "{% for i in (1..50) %}",
        "{% for j in (1..50) %}",
        "{{ i }},{{ j }}",
        "{% endfor %}",
        "{% endfor %}",
      ].join(""),
    });
    const env = new Environment({ loader: loader, loopIterationLimit: 3000 });
    const template = env.fromString(
      "{% for i in (1..10) %}{% include 'foo' %}{% endfor %}"
    );

    expect(() => template.renderSync()).toThrowError(LoopIterationLimitError);
    expect(async () => await template.render()).rejects.toThrowError(
      LoopIterationLimitError
    );
  });

  test("tablerow contributes to loop limit", async () => {
    const env = new Environment({ loopIterationLimit: 99 });
    const template = env.fromString(
      [
        "{% for i in (1..10) %}",
        "{% tablerow i in (1..10) cols:2 %}",
        "{{ i }}",
        "{% endtablerow %}",
        "{% endfor %}",
      ].join("")
    );

    expect(() => template.renderSync()).toThrowError(LoopIterationLimitError);
    expect(async () => await template.render()).rejects.toThrowError(
      LoopIterationLimitError
    );
  });
});

describe("output stream limit", () => {
  test("set output stream limit with constructor", async () => {
    const env = new Environment({ outputStreamLimit: 5 });
    let template = env.fromString(
      "{% if false %}some literal that is longer then the limit{% endif %}hello"
    );
    expect(template.renderSync()).toBe("hello");

    template = env.fromString(
      "{% if true %}some literal that is longer then the limit{% endif %}hello"
    );
    expect(() => template.renderSync()).toThrowError(OutputStreamLimitError);
    expect(async () => await template.render()).rejects.toThrowError(
      OutputStreamLimitError
    );
  });

  test("set output stream limit after construction", async () => {
    const env = new Environment();
    env.outputStreamLimit = 5;
    let template = env.fromString(
      "{% if false %}some literal that is longer then the limit{% endif %}hello"
    );
    expect(template.renderSync()).toBe("hello");

    template = env.fromString(
      "{% if true %}some literal that is longer then the limit{% endif %}hello"
    );
    expect(() => template.renderSync()).toThrowError(OutputStreamLimitError);
    expect(async () => await template.render()).rejects.toThrowError(
      OutputStreamLimitError
    );
  });
});
