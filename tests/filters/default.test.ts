import { default_ } from "../../src/builtin/filters/misc";
import { Context } from "../../src/context";
import { Environment } from "../../src/environment";
import { EMPTY, FALSE, NIL, TRUE } from "../../src/expression";
import { FilterContext } from "../../src/filter";

describe("default filter", () => {
  const env = new Environment({});
  const ctx = new Context(
    env,
    Object.fromEntries([
      ["a", true],
      ["b", false],
    ])
  );
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("false", () => {
    const result = default_.apply(filterContext, [false, "foo"]);
    expect(result).toBe("foo");
  });
  test("FALSE", () => {
    const result = default_.apply(filterContext, [FALSE, "foo"]);
    expect(result).toBe("foo");
  });
  test("EMPTY", () => {
    const result = default_.apply(filterContext, [EMPTY, "foo"]);
    expect(result).toBe("foo");
  });
  test("nil", () => {
    const result = default_.apply(filterContext, [NIL, "foo"]);
    expect(result).toBe("foo");
  });
  test("empty string", () => {
    const result = default_.apply(filterContext, ["", "foo"]);
    expect(result).toBe("foo");
  });
  test("empty array", () => {
    const result = default_.apply(filterContext, [[], "foo"]);
    expect(result).toBe("foo");
  });
  test("empty object", () => {
    const result = default_.apply(filterContext, [{}, "foo"]);
    expect(result).toBe("foo");
  });
  test("empty map", () => {
    const result = default_.apply(filterContext, [new Map(), "foo"]);
    expect(result).toBe("foo");
  });
  test("empty set", () => {
    const result = default_.apply(filterContext, [new Set(), "foo"]);
    expect(result).toBe("foo");
  });
  test("not empty string", () => {
    const result = default_.apply(filterContext, ["bar", "foo"]);
    expect(result).toBe("bar");
  });
  test("not empty array", () => {
    const result = default_.apply(filterContext, [[1], "foo"]);
    expect(result).toStrictEqual([1]);
  });
  test("not empty object", () => {
    const result = default_.apply(filterContext, [{ a: 1 }, "foo"]);
    expect(result).toStrictEqual({ a: 1 });
  });
  test("not empty map", () => {
    const result = default_.apply(filterContext, [new Map([["a", 1]]), "foo"]);
    expect(result).toStrictEqual(new Map([["a", 1]]));
  });
  test("not empty set", () => {
    const result = default_.apply(filterContext, [new Set([1]), "foo"]);
    expect(result).toStrictEqual(new Set([1]));
  });
  test("allow false", () => {
    const _filterContext: FilterContext = {
      context: ctx,
      options: { allow_false: true },
    };
    const result = default_.apply(_filterContext, [false, "foo"]);
    expect(result).toBe(false);
  });
  test("allow false with TRUE", () => {
    const _filterContext: FilterContext = {
      context: ctx,
      options: { allow_false: TRUE },
    };
    const result = default_.apply(_filterContext, [false, "foo"]);
    expect(result).toBe(false);
  });
  test("allow false with FALSE", () => {
    const _filterContext: FilterContext = {
      context: ctx,
      options: { allow_false: FALSE },
    };
    const result = default_.apply(_filterContext, [false, "foo"]);
    expect(result).toBe("foo");
  });
  test("allow false from false variable", async () => {
    const _filterContext: FilterContext = {
      context: ctx,
      options: { allow_false: await ctx.resolve("a") },
    };
    const result = default_.apply(_filterContext, [false, "foo"]);
    expect(result).toBe(false);
  });
  test("allow false from true variable", async () => {
    const _filterContext: FilterContext = {
      context: ctx,
      options: { allow_false: await ctx.resolve("b") },
    };
    const result = default_.apply(_filterContext, [false, "foo"]);
    expect(result).toBe("foo");
  });
});
