import { times } from "../../src/builtin/filters/math";
import { DefaultContext } from "../../src/context";
import { DefaultEnvironment } from "../../src/environment";
import { FilterContext } from "../../src/filter";
import { isFloat, Float, Integer, isInteger } from "../../src/number";

describe("times filter", () => {
  const env = new DefaultEnvironment({});
  const ctx = new DefaultContext(env, new Map<string, unknown>());
  const filterContext: FilterContext = { context: ctx };

  test("two numbers", () => {
    const result = times.apply(filterContext, [10, 2]);
    expect(result.valueOf()).toBe(20);
  });
  test("two primitive floats", () => {
    const result = times.apply(filterContext, [5.8, 2.1]);
    expect(result.valueOf()).toBe(12.18);
  });
  test("two strings", () => {
    const result = times.apply(filterContext, ["10", "2"]);
    expect(result.valueOf()).toBe(20);
  });
  test("float and integer", () => {
    const result = times.apply(filterContext, [new Float(5.0), new Integer(3)]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(15);
  });
  test("integer and float", () => {
    const result = times.apply(filterContext, [new Integer(5), new Float(3.0)]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(15);
  });
  test("number and float", () => {
    const result = times.apply(filterContext, [5, new Float(3.0)]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(15);
  });
  test("float and number", () => {
    const result = times.apply(filterContext, [new Float(5), 3]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(15);
  });
  test("argument is not a number", () => {
    const result = times.apply(filterContext, [5, "foo"]);
    expect(result.valueOf()).toBe(0);
  });
  test("undefined left value", () => {
    const result = times.apply(filterContext, [undefined, 2]);
    expect(isInteger(result)).toBeTruthy();
    expect(result.valueOf()).toBe(0);
  });
  test("left value defaults to zero", () => {
    const result = times.apply(filterContext, ["foo", 2]);
    expect(isInteger(result)).toBeTruthy();
    expect(result.valueOf()).toBe(0);
  });
});
