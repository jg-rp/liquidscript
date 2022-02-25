import { abs } from "../../src/builtin/filters/math";
import { Context } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";
import { Float, Integer, ZERO } from "../../src/number";

describe("abs filter", () => {
  const env = new Environment({});
  const ctx = new Context(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("positive number", () => {
    const result = abs.apply(filterContext, [2]);
    expect(result.valueOf()).toBe(2);
  });
  test("negative number", () => {
    const result = abs.apply(filterContext, [-2]);
    expect(result.valueOf()).toBe(2);
  });
  test("positive integer", () => {
    const result = abs.apply(filterContext, [new Integer(2)]);
    expect(result.valueOf()).toBe(2);
  });
  test("negative integer", () => {
    const result = abs.apply(filterContext, [new Integer(-2)]);
    expect(result.valueOf()).toBe(2);
  });
  test("positive float", () => {
    const result = abs.apply(filterContext, [new Float(2.1)]);
    expect(result.valueOf()).toBe(2.1);
  });
  test("negative float", () => {
    const result = abs.apply(filterContext, [new Float(-2.1)]);
    expect(result.valueOf()).toBe(2.1);
  });
  test("primitive zero", () => {
    const result = abs.apply(filterContext, [0]);
    expect(result.valueOf()).toBe(0);
  });
  test("liquid zero", () => {
    const result = abs.apply(filterContext, [ZERO]);
    expect(result.valueOf()).toBe(0);
  });
  test("string", () => {
    const result = abs.apply(filterContext, ["-42"]);
    expect(result.valueOf()).toBe(42);
  });
  test("string not a number", () => {
    const result = abs.apply(filterContext, ["foo"]);
    expect(result.valueOf()).toBe(0);
  });
});
