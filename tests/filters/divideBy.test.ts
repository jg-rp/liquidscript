import { divideBy } from "../../src/builtin/filters/math";
import { DefaultContext } from "../../src/context";
import { DefaultEnvironment } from "../../src/environment";
import { FilterContext } from "../../src/filter";
import { isFloat, Float, Integer } from "../../src/number";

describe("divide by filter", () => {
  const env = new DefaultEnvironment({});
  const ctx = new DefaultContext(env, new Map<string, unknown>());
  const filterContext: FilterContext = { context: ctx };

  test("two numbers", () => {
    const result = divideBy.apply(filterContext, [10, 2]);
    expect(result.valueOf()).toBe(5);
  });
  test("two strings", () => {
    const result = divideBy.apply(filterContext, ["10", "2"]);
    expect(result.valueOf()).toBe(5);
  });
  test("integer division", () => {
    const result = divideBy.apply(filterContext, [5, 3]);
    expect(result.valueOf()).toBe(1);
  });
  test("float dividend, integer divisor", () => {
    const result = divideBy.apply(filterContext, [
      new Float(5.0),
      new Integer(3),
    ]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(1.6666666666666667);
  });
  test("integer dividend, float divisor", () => {
    const result = divideBy.apply(filterContext, [
      new Integer(5),
      new Float(3.0),
    ]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(1.6666666666666667);
  });
  test("number dividend, float divisor", () => {
    const result = divideBy.apply(filterContext, [5, new Float(3.0)]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(1.6666666666666667);
  });
  test("float dividend, number divisor", () => {
    const result = divideBy.apply(filterContext, [new Float(5), 3]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(1.6666666666666667);
  });
});
