import { atLeast } from "../../src/builtin/filters/math";
import { RenderContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";
import { isInteger } from "../../src/number";

describe("at_least filter", () => {
  const env = new Environment({});
  const ctx = new RenderContext(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("two numbers", () => {
    const result = atLeast.apply(filterContext, [5, 8]);
    expect(result.valueOf()).toBe(8);
  });
  test("two strings", () => {
    const result = atLeast.apply(filterContext, ["5", "8"]);
    expect(result.valueOf()).toBe(8);
  });
  test("negative numbers", () => {
    const result = atLeast.apply(filterContext, [-8, 5]);
    expect(result.valueOf()).toBe(5);
  });
  test("left value defaults to zero", () => {
    const result = atLeast.apply(filterContext, ["foo", 2]);
    expect(isInteger(result)).toBeTruthy();
    expect(result.valueOf()).toBe(2);
  });
  test("argument not a number", () => {
    const result = atLeast.apply(filterContext, [5, "foo"]);
    expect(isInteger(result)).toBeTruthy();
    expect(result.valueOf()).toBe(5);
  });
});
