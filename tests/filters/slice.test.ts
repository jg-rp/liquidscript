import { slice } from "../../src/builtin/filters/misc";
import { Context } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterArgumentError } from "../../src/errors";
import { FilterContext } from "../../src/filter";
import { Integer } from "../../src/number";

describe("slice filter", () => {
  const env = new Environment({});
  const ctx = new Context(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("first character of a string", () => {
    const result = slice.apply(filterContext, ["hello", 0]);
    expect(result).toBe("h");
  });

  test("second character of a string", () => {
    const result = slice.apply(filterContext, ["hello", 1]);
    expect(result).toBe("e");
  });

  test("sub string", () => {
    const result = slice.apply(filterContext, ["hello", 1, 3]);
    expect(result).toBe("ell");
  });

  test("out of range", () => {
    const result = slice.apply(filterContext, ["hello", 99]);
    expect(result).toBe("");
  });

  test("not a string", () => {
    const result = slice.apply(filterContext, [5, 0]);
    expect(result).toBe("5");
  });

  test("string offset", () => {
    const result = slice.apply(filterContext, ["hello", "2"]);
    expect(result).toBe("l");
  });

  test("offset is an integer", () => {
    const result = slice.apply(filterContext, ["hello", new Integer(2)]);
    expect(result).toBe("l");
  });

  test("offset not a number", () => {
    expect(() => slice.apply(filterContext, ["hello", "foo"])).toThrow(
      FilterArgumentError
    );
  });

  test("offset is a float", () => {
    expect(() => slice.apply(filterContext, ["hello", 1.1])).toThrow(
      FilterArgumentError
    );
  });

  test("length not a number", () => {
    expect(() => slice.apply(filterContext, ["hello", 1, "foo"])).toThrow(
      FilterArgumentError
    );
  });

  test("length is a float", () => {
    expect(() => slice.apply(filterContext, ["hello", 1, 2.2])).toThrow(
      FilterArgumentError
    );
  });

  test("length is a string", () => {
    const result = slice.apply(filterContext, ["hello", 1, "2"]);
    expect(result).toBe("el");
  });

  test("length is an integer", () => {
    const result = slice.apply(filterContext, ["hello", 1, new Integer(2)]);
    expect(result).toBe("el");
  });

  test("array of strings", () => {
    const result = slice.apply(filterContext, [["a", "b", "c", "d"], 1, 2]);
    expect(result).toStrictEqual(["b", "c"]);
  });

  test("negative offset", () => {
    const result = slice.apply(filterContext, ["Liquid", -2]);
    expect(result).toBe("i");
  });

  test("negative offset positive length", () => {
    const result = slice.apply(filterContext, ["Liquid", -2, 2]);
    expect(result).toBe("id");
  });

  test("negative offset negative length", () => {
    const result = slice.apply(filterContext, ["Liquid", -2, -1]);
    expect(result).toBe("");
  });

  test("negative offset length out of range", () => {
    const result = slice.apply(filterContext, ["Liquid", -2, 99]);
    expect(result).toBe("id");
  });
});
