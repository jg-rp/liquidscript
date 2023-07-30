import { sum } from "../../src/builtin/filters";
import { RenderContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterArgumentError } from "../../src/errors";
import { FilterContext } from "../../src/filter";
import { Float, Integer, ZERO } from "../../src/number";

describe("sum filter", () => {
  const env = new Environment({});
  const ctx = new RenderContext(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("empty array", () => {
    const result = sum.apply(filterContext, [[]]);
    expect(result.valueOf()).toBe(0);
  });

  test("only primitive zeros", () => {
    const result = sum.apply(filterContext, [[0, 0, 0]]);
    expect(result.valueOf()).toBe(0);
  });

  test("zeros and primitive zeros", () => {
    const result = sum.apply(filterContext, [[ZERO, 0, 0]]);
    expect(result.valueOf()).toBe(0);
  });

  test("primitive ints", () => {
    const result = sum.apply(filterContext, [[1, 2, 3]]);
    expect(result.valueOf()).toBe(6);
  });

  test("ints and primitive ints", () => {
    const result = sum.apply(filterContext, [[new Integer(1), 2, 3]]);
    expect(result.valueOf()).toBe(6);
  });

  test("nested ints", () => {
    const result = sum.apply(filterContext, [[1, [2, [3]]]]);
    expect(result.valueOf()).toBe(6);
  });

  test("negative ints", () => {
    const result = sum.apply(filterContext, [[-1, -2, -3]]);
    expect(result.valueOf()).toBe(-6);
  });

  test("primitive floats", () => {
    const result = sum.apply(filterContext, [[0.1, 0.2, 0.3]]);
    expect(result.valueOf()).toBe(0.6);
  });

  test("floats and primitive floats", () => {
    const result = sum.apply(filterContext, [[new Float(0.1), 0.2, 0.3]]);
    expect(result.valueOf()).toBe(0.6);
  });

  test("floats and ints", () => {
    const result = sum.apply(filterContext, [
      [new Float(0.1), 0.2, 0.3, new Integer(1), 2, 3],
    ]);
    expect(result.valueOf()).toBe(6.6);
  });

  test("with property argument", () => {
    const result = sum.apply(filterContext, [
      [{ k: 1 }, { k: 2 }, { k: 3 }],
      "k",
    ]);
    expect(result.valueOf()).toBe(6);
  });

  test("with property argument and numeric strings", () => {
    const result = sum.apply(filterContext, [
      [{ k: "1" }, { k: "2" }, { k: "3" }],
      "k",
    ]);
    expect(result.valueOf()).toBe(6);
  });

  test("objects and no property", () => {
    const result = sum.apply(filterContext, [[{ k: 1 }, { k: 2 }, { k: 3 }]]);
    expect(result.valueOf()).toBe(0);
  });

  test("property argument and non-object elements", () => {
    expect(() => sum.apply(filterContext, [[1, 2, 3], "k"])).toThrow(
      FilterArgumentError,
    );
  });
});
