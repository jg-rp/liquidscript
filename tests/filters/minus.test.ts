import { minus } from "../../src/builtin/filters/math";
import { RenderContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";
import { isFloat, Float, Integer, isInteger } from "../../src/number";

describe("minus filter", () => {
  const env = new Environment({});
  const ctx = new RenderContext(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("two numbers", () => {
    const result = minus.apply(filterContext, [10, 2]);
    expect(result.valueOf()).toBe(8);
  });
  test("two primitive floats", () => {
    const result = minus.apply(filterContext, [10.1, 2.2]);
    expect(result.valueOf()).toBe(7.9);
  });
  test("two strings", () => {
    const result = minus.apply(filterContext, ["10", "2"]);
    expect(result.valueOf()).toBe(8);
  });
  test("float and integer", () => {
    const result = minus.apply(filterContext, [new Float(5.0), new Integer(3)]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(2);
  });
  test("integer and float", () => {
    const result = minus.apply(filterContext, [new Integer(5), new Float(3.0)]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(2);
  });
  test("number and float", () => {
    const result = minus.apply(filterContext, [5, new Float(3.0)]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(2);
  });
  test("float and number", () => {
    const result = minus.apply(filterContext, [new Float(5), 3]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(2);
  });
  test("argument is not a number", () => {
    const result = minus.apply(filterContext, [5, "foo"]);
    expect(result.valueOf()).toBe(5);
  });
  test("undefined left value", () => {
    const result = minus.apply(filterContext, [undefined, 2]);
    expect(isInteger(result)).toBeTruthy();
    expect(result.valueOf()).toBe(-2);
  });
  test("left value defaults to zero", () => {
    const result = minus.apply(filterContext, ["foo", 2]);
    expect(isInteger(result)).toBeTruthy();
    expect(result.valueOf()).toBe(-2);
  });
});
