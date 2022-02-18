import { atLeast } from "../../src/builtin/filters/math";
import { DefaultContext } from "../../src/context";
import { DefaultEnvironment } from "../../src/environment";
import { FilterContext } from "../../src/filter";
import { isInteger } from "../../src/number";

describe("at_least filter", () => {
  const env = new DefaultEnvironment({});
  const ctx = new DefaultContext(env, new Map<string, unknown>());
  const filterContext: FilterContext = { context: ctx };

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
