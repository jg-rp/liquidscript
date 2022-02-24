import { sort } from "../../src/builtin/filters/array";
import { Context } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";
import { LaxUndefined } from "../../src/undefined";

describe("sort filter", () => {
  const env = new Environment({});
  const ctx = new Context(env);
  const filterContext: FilterContext = { context: ctx };

  test("array of strings", () => {
    const result = sort.apply(filterContext, [["b", "a", "C", "B", "A"]]);
    expect(result).toStrictEqual(["A", "B", "C", "a", "b"]);
  });

  test("array of numbers", () => {
    const result = sort.apply(filterContext, [[1, 1000, 3, 30]]);
    expect(result).toStrictEqual([1, 3, 30, 1000]);
  });

  test("array of objects", () => {
    const result = sort.apply(filterContext, [
      [{ title: "foo" }, { title: "Baz" }, { title: "bar" }],
      "title",
    ]);
    expect(result).toStrictEqual([
      { title: "Baz" },
      { title: "bar" },
      { title: "foo" },
    ]);
  });

  test("array of objects with missing key", () => {
    const result = sort.apply(filterContext, [
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
  //     sort.apply(filterContext, [[3, 2, 1], "title", "hello"])
  //   ).toThrow(FilterArgumentError);
  // });

  test("can't sort a string", () => {
    const result = sort.apply(filterContext, ["cbaA"]);
    expect(result).toStrictEqual(["cbaA"]);
  });

  test("left value is undefined", () => {
    const result = sort.apply(filterContext, [undefined]);
    expect(result).toStrictEqual([undefined]);
  });

  test("left value is liquid undefined", () => {
    const result = sort.apply(filterContext, [new LaxUndefined("test")]);
    expect(result).toStrictEqual([]);
  });
});
