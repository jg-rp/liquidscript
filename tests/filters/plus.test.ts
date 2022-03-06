import { plus } from "../../src/builtin/filters/math";
import { RenderContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";
import { isFloat, Float, Integer, isInteger } from "../../src/number";

describe("plus filter", () => {
  const env = new Environment({});
  const ctx = new RenderContext(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("two numbers", () => {
    const result = plus.apply(filterContext, [10, 2]);
    expect(result.valueOf()).toBe(12);
  });
  test("two primitive floats", () => {
    const result = plus.apply(filterContext, [5.8, 2.1]);
    expect(result.valueOf()).toBe(7.9);
  });
  test("two strings", () => {
    const result = plus.apply(filterContext, ["10", "2"]);
    expect(result.valueOf()).toBe(12);
  });
  test("float and integer", () => {
    const result = plus.apply(filterContext, [new Float(5.0), new Integer(3)]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(8);
  });
  test("integer and float", () => {
    const result = plus.apply(filterContext, [new Integer(5), new Float(3.0)]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(8);
  });
  test("number and float", () => {
    const result = plus.apply(filterContext, [5, new Float(3.0)]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(8);
  });
  test("float and number", () => {
    const result = plus.apply(filterContext, [new Float(5), 3]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(8);
  });
  test("argument is not a number", () => {
    const result = plus.apply(filterContext, [5, "foo"]);
    expect(result.valueOf()).toBe(5);
  });
  test("undefined left value", () => {
    const result = plus.apply(filterContext, [undefined, 2]);
    expect(isInteger(result)).toBeTruthy();
    expect(result.valueOf()).toBe(2);
  });
  test("left value defaults to zero", () => {
    const result = plus.apply(filterContext, ["foo", 2]);
    expect(isInteger(result)).toBeTruthy();
    expect(result.valueOf()).toBe(2);
  });
});
