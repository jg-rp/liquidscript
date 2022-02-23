import { floor } from "../../src/builtin/filters/math";
import { DefaultContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";
import { Float, Integer, ZERO } from "../../src/number";

describe("floor filter", () => {
  const env = new Environment({});
  const ctx = new DefaultContext(env, new Map<string, unknown>());
  const filterContext: FilterContext = { context: ctx };

  test("positive number", () => {
    const result = floor.apply(filterContext, [2]);
    expect(result.valueOf()).toBe(2);
  });
  test("negative number", () => {
    const result = floor.apply(filterContext, [-2]);
    expect(result.valueOf()).toBe(-2);
  });
  test("positive integer", () => {
    const result = floor.apply(filterContext, [new Integer(2)]);
    expect(result.valueOf()).toBe(2);
  });
  test("negative integer", () => {
    const result = floor.apply(filterContext, [new Integer(-2)]);
    expect(result.valueOf()).toBe(-2);
  });
  test("positive float", () => {
    const result = floor.apply(filterContext, [new Float(2.1)]);
    expect(result).toBeInstanceOf(Integer);
    expect(result.valueOf()).toBe(2);
  });
  test("negative float", () => {
    const result = floor.apply(filterContext, [new Float(-2.1)]);
    expect(result.valueOf()).toBe(-3);
  });
  test("primitive zero", () => {
    const result = floor.apply(filterContext, [0]);
    expect(result.valueOf()).toBe(0);
  });
  test("liquid zero", () => {
    const result = floor.apply(filterContext, [ZERO]);
    expect(result.valueOf()).toBe(0);
  });
  test("string", () => {
    const result = floor.apply(filterContext, ["-42.2"]);
    expect(result.valueOf()).toBe(-43);
  });
  test("string not a number", () => {
    const result = floor.apply(filterContext, ["foo"]);
    expect(result.valueOf()).toBe(0);
  });
});
