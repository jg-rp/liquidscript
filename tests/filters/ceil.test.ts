import { ceil } from "../../src/builtin/filters/math";
import { Context } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";
import { Float, Integer, ZERO } from "../../src/number";

describe("ceil filter", () => {
  const env = new Environment({});
  const ctx = new Context(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("positive number", () => {
    const result = ceil.apply(filterContext, [2]);
    expect(result.valueOf()).toBe(2);
  });
  test("negative number", () => {
    const result = ceil.apply(filterContext, [-2]);
    expect(result.valueOf()).toBe(-2);
  });
  test("positive integer", () => {
    const result = ceil.apply(filterContext, [new Integer(2)]);
    expect(result.valueOf()).toBe(2);
  });
  test("negative integer", () => {
    const result = ceil.apply(filterContext, [new Integer(-2)]);
    expect(result.valueOf()).toBe(-2);
  });
  test("positive float", () => {
    const result = ceil.apply(filterContext, [new Float(2.1)]);
    expect(result).toBeInstanceOf(Integer);
    expect(result.valueOf()).toBe(3);
  });
  test("negative float", () => {
    const result = ceil.apply(filterContext, [new Float(-2.1)]);
    expect(result.valueOf()).toBe(-2);
  });
  test("primitive zero", () => {
    const result = ceil.apply(filterContext, [0]);
    expect(result.valueOf()).toBe(0);
  });
  test("liquid zero", () => {
    const result = ceil.apply(filterContext, [ZERO]);
    expect(result.valueOf()).toBe(0);
  });
  test("string", () => {
    const result = ceil.apply(filterContext, ["-42.2"]);
    expect(result.valueOf()).toBe(-42);
  });
  test("string not a number", () => {
    const result = ceil.apply(filterContext, ["foo"]);
    expect(result.valueOf()).toBe(0);
  });
});
