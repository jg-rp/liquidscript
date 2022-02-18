import { dividedBy } from "../../src/builtin/filters/math";
import { DefaultContext } from "../../src/context";
import { DefaultEnvironment } from "../../src/environment";
import { FilterArgumentError } from "../../src/errors";
import { FilterContext } from "../../src/filter";
import { isFloat, Float, Integer, isInteger } from "../../src/number";

describe("divide by filter", () => {
  const env = new DefaultEnvironment({});
  const ctx = new DefaultContext(env, new Map<string, unknown>());
  const filterContext: FilterContext = { context: ctx };

  test("two numbers", () => {
    const result = dividedBy.apply(filterContext, [10, 2]);
    expect(result.valueOf()).toBe(5);
  });
  test("two strings", () => {
    const result = dividedBy.apply(filterContext, ["10", "2"]);
    expect(result.valueOf()).toBe(5);
  });
  test("integer division", () => {
    const result = dividedBy.apply(filterContext, [5, 3]);
    expect(result.valueOf()).toBe(1);
  });
  test("float dividend, integer divisor", () => {
    const result = dividedBy.apply(filterContext, [
      new Float(5.0),
      new Integer(3),
    ]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(1.6666666666666667);
  });
  test("integer dividend, float divisor", () => {
    const result = dividedBy.apply(filterContext, [
      new Integer(5),
      new Float(3.0),
    ]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(1.6666666666666667);
  });
  test("number dividend, float divisor", () => {
    const result = dividedBy.apply(filterContext, [5, new Float(3.0)]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(1.6666666666666667);
  });
  test("float dividend, number divisor", () => {
    const result = dividedBy.apply(filterContext, [new Float(5), 3]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(1.6666666666666667);
  });
  test("argument is not a number", () => {
    expect(() => dividedBy.apply(filterContext, [10, "foo"])).toThrow(
      FilterArgumentError
    );
  });
  test("undefined left value", () => {
    const result = dividedBy.apply(filterContext, [undefined, 2]);
    expect(isInteger(result)).toBeTruthy();
    expect(result.valueOf()).toBe(0);
  });
  test("divide by zero", () => {
    expect(() => dividedBy.apply(filterContext, [10, 0])).toThrow(
      FilterArgumentError
    );
  });
  test("left value defaults to zero", () => {
    const result = dividedBy.apply(filterContext, ["foo", 2]);
    expect(isInteger(result)).toBeTruthy();
    expect(result.valueOf()).toBe(0);
  });
  test("divisor defaults to zero", () => {
    expect(() => dividedBy.apply(filterContext, [10, "foo"])).toThrow(
      FilterArgumentError
    );
  });
});
