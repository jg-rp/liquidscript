import { sortNatural } from "../../src/builtin/filters/array";
import { DefaultContext } from "../../src/context";
import { DefaultEnvironment } from "../../src/environment";
import { FilterContext } from "../../src/filter";
import { LaxUndefined } from "../../src/undefined";

describe("sort natural filter", () => {
  const env = new DefaultEnvironment({});
  const ctx = new DefaultContext(env, new Map<string, unknown>());
  const filterContext: FilterContext = { context: ctx };

  test("array of strings", () => {
    const result = sortNatural.apply(filterContext, [
      ["b", "a", "C", "B", "A"],
    ]);
    expect(result).toStrictEqual(["a", "A", "b", "B", "C"]);
  });

  test("array of numbers", () => {
    const result = sortNatural.apply(filterContext, [[1, 1000, 3, 30]]);
    expect(result).toStrictEqual([1, 1000, 3, 30]);
  });

  test("array of objects", () => {
    const result = sortNatural.apply(filterContext, [
      [{ title: "foo" }, { title: "Baz" }, { title: "bar" }],
      "title",
    ]);
    expect(result).toStrictEqual([
      { title: "bar" },
      { title: "Baz" },
      { title: "foo" },
    ]);
  });

  test("array of objects with missing key", () => {
    const result = sortNatural.apply(filterContext, [
      [{ title: "foo" }, { heading: "Baz" }, { title: "bar" }],
      "title",
    ]);
    expect(result).toStrictEqual([
      { title: "bar" },
      { title: "foo" },
      { heading: "Baz" },
    ]);
  });

  // test("too many arguments", () => {
  //   expect(() =>
  //     sortNatural.apply(filterContext, [[3, 2, 1], "title", "hello"])
  //   ).toThrow(FilterArgumentError);
  // });

  test("can't sort a string", () => {
    const result = sortNatural.apply(filterContext, ["cbaA"]);
    expect(result).toStrictEqual(["cbaA"]);
  });

  test("left value is undefined", () => {
    const result = sortNatural.apply(filterContext, [undefined]);
    expect(result).toStrictEqual([undefined]);
  });

  test("left value is liquid undefined", () => {
    const result = sortNatural.apply(filterContext, [new LaxUndefined("test")]);
    expect(result).toStrictEqual([]);
  });

  test("array of strings with a null", () => {
    const result = sortNatural.apply(filterContext, [
      ["b", "a", null, "C", "B", "A"],
    ]);
    expect(result).toStrictEqual(["a", "A", "b", "B", "C", null]);
  });
});
