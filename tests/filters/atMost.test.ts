import { atMost } from "../../src/builtin/filters/math";
import { Context } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";
import { isInteger } from "../../src/number";

describe("at_most filter", () => {
  const env = new Environment({});
  const ctx = new Context(env);
  const filterContext: FilterContext = { context: ctx };

  test("two numbers", () => {
    const result = atMost.apply(filterContext, [5, 8]);
    expect(result.valueOf()).toBe(5);
  });
  test("two strings", () => {
    const result = atMost.apply(filterContext, ["5", "8"]);
    expect(result.valueOf()).toBe(5);
  });
  test("negative numbers", () => {
    const result = atMost.apply(filterContext, [-8, 5]);
    expect(result.valueOf()).toBe(-8);
  });
  test("left value defaults to zero", () => {
    const result = atMost.apply(filterContext, ["foo", 2]);
    expect(isInteger(result)).toBeTruthy();
    expect(result.valueOf()).toBe(0);
  });
  test("argument not a number", () => {
    const result = atMost.apply(filterContext, [5, "foo"]);
    expect(isInteger(result)).toBeTruthy();
    expect(result.valueOf()).toBe(0);
  });
});
