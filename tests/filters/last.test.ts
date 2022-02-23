import { last } from "../../src/builtin/filters/array";
import { DefaultContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";

// TODO: Last of a range.

describe("last filter", () => {
  const env = new Environment({});
  const ctx = new DefaultContext(env, new Map<string, unknown>());
  const filterContext: FilterContext = { context: ctx };

  test("last of array", () => {
    const result = last.apply(filterContext, [[1, 2, 3]]);
    expect(result).toBe(3);
  });

  test("last of map", () => {
    const result = last.apply(filterContext, [
      new Map([
        ["a", 1],
        ["b", 2],
      ]),
    ]);
    expect(result).toBe(null);
  });

  test("last of an empty array", () => {
    const result = last.apply(filterContext, [[]]);
    expect(result).toBeUndefined();
  });

  test("last of an empty map", () => {
    const result = last.apply(filterContext, [new Map()]);
    expect(result).toBe(null);
  });

  test("last of a set", () => {
    const result = last.apply(filterContext, [new Set([1, 2, 3])]);
    expect(result).toBe(null);
  });

  test("last of a string", () => {
    const result = last.apply(filterContext, ["hello"]);
    expect(result).toBe(null);
  });

  test("last of a number", () => {
    const result = last.apply(filterContext, [7]);
    expect(result).toBe(null);
  });
});
