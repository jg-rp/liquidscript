import { round } from "../../src/builtin/filters/math";
import { Context } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";
import { isFloat, Float, Integer, isInteger } from "../../src/number";

describe("round filter", () => {
  const env = new Environment({});
  const ctx = new Context(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("number round down", () => {
    const result = round.apply(filterContext, [5.1]);
    expect(result.valueOf()).toBe(5);
  });
  test("number string round down", () => {
    const result = round.apply(filterContext, ["5.1"]);
    expect(result.valueOf()).toBe(5);
  });
  test("float round down", () => {
    const result = round.apply(filterContext, [new Float(5.1)]);
    expect(isInteger(result)).toBeTruthy();
    expect(result.valueOf()).toBe(5);
  });
  test("number round up", () => {
    const result = round.apply(filterContext, [5.5]);
    expect(result.valueOf()).toBe(6);
  });
  test("number string round up", () => {
    const result = round.apply(filterContext, ["5.5"]);
    expect(result.valueOf()).toBe(6);
  });
  test("float round up", () => {
    const result = round.apply(filterContext, [new Float(5.5)]);
    expect(isInteger(result)).toBeTruthy();
    expect(result.valueOf()).toBe(6);
  });
  test("decimal places", () => {
    const result = round.apply(filterContext, [5.5555, 2]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(5.56);
  });
  test("decimal places given as a string", () => {
    const result = round.apply(filterContext, [5.5555, "2"]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(5.56);
  });
  test("decimal places given as an Integer", () => {
    const result = round.apply(filterContext, [5.5555, new Integer(2)]);
    expect(isFloat(result)).toBeTruthy();
    expect(result.valueOf()).toBe(5.56);
  });
  test("explicit zero argument", () => {
    const result = round.apply(filterContext, [5.555, 0]);
    expect(result.valueOf()).toBe(6.0);
  });
  test("argument is not a number", () => {
    const result = round.apply(filterContext, [5.555, "foo"]);
    expect(result.valueOf()).toBe(6.0);
  });
  test("undefined left value", () => {
    const result = round.apply(filterContext, [undefined, 2]);
    expect(result.valueOf()).toBe(0);
  });
  test("left value defaults to zero", () => {
    const result = round.apply(filterContext, ["foo", 2]);
    expect(isInteger(result)).toBeTruthy();
    expect(result.valueOf()).toBe(0);
  });
});
