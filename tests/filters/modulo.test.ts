import { modulo } from "../../src/builtin/filters/math";
import { RenderContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterArgumentError } from "../../src/errors";
import { FilterContext } from "../../src/filter";
import { isFloat, Float, Integer, isInteger } from "../../src/number";

describe("modulo filter", () => {
  const env = new Environment({});
  const ctx = new RenderContext(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("two numbers", () => {
    const result = modulo.apply(filterContext, [10, 2]);
    expect(result.valueOf()).toBe(0);
  });
  test("two primitive floats", () => {
    const result = modulo.apply(filterContext, [10.1, 7.0]);
    expect(result.valueOf()).toBe(3.1);
  });
  test("two strings", () => {
    const result = modulo.apply(filterContext, ["10", "2.0"]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(0);
  });
  test("float and integer", () => {
    const result = modulo.apply(filterContext, [new Float(10), new Integer(3)]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(1);
  });
  test("integer and float", () => {
    const result = modulo.apply(filterContext, [
      new Integer(10),
      new Float(3.0),
    ]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(1);
  });
  test("number and float", () => {
    const result = modulo.apply(filterContext, [10, new Float(3.0)]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(1);
  });
  test("float and number", () => {
    const result = modulo.apply(filterContext, [new Float(10.0), 3]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(1);
  });
  test("argument is not a number", () => {
    expect(() => modulo.apply(filterContext, [10, "foo"])).toThrow(
      FilterArgumentError
    );
  });
  test("undefined left value", () => {
    const result = modulo.apply(filterContext, [undefined, 2]);
    expect(isInteger(result)).toBeTruthy();
    expect(result.valueOf()).toBe(0);
  });
  test("left value defaults to zero", () => {
    const result = modulo.apply(filterContext, ["foo", 2]);
    expect(isInteger(result)).toBeTruthy();
    expect(result.valueOf()).toBe(0);
  });
});
