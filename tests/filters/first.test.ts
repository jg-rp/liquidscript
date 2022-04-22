import { first } from "../../src/builtin/filters/array";
import { RenderContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";
import { Range } from "../../src/range";

describe("first filter", () => {
  const env = new Environment({});
  const ctx = new RenderContext(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("first of array", () => {
    const result = first.apply(filterContext, [[1, 2, 3]]);
    expect(result).toBe(1);
  });

  test("first of an object", () => {
    const result = first.apply(filterContext, [{ b: 1, c: 2 }]);
    expect(result).toStrictEqual(["b", 1]);
  });

  test("first of map", () => {
    const result = first.apply(filterContext, [
      new Map([
        ["a", 1],
        ["b", 2],
      ]),
    ]);
    expect(result).toStrictEqual(["a", 1]);
  });

  test("first of an empty array", () => {
    const result = first.apply(filterContext, [[]]);
    expect(result).toBeUndefined();
  });

  test("first of an empty map", () => {
    const result = first.apply(filterContext, [new Map()]);
    expect(result).toBeUndefined();
  });

  test("first of a set", () => {
    const result = first.apply(filterContext, [new Set([1, 2, 3])]);
    expect(result).toBe(1);
  });

  test("first of a string", () => {
    const result = first.apply(filterContext, ["hello"]);
    expect(result).toBe(null);
  });

  test("first of a number", () => {
    const result = first.apply(filterContext, [7]);
    expect(result).toBe(null);
  });

  test("first of a range", () => {
    const result = first.apply(filterContext, [new Range(1, 3)]);
    expect(result).toBe(1);
  });
});
