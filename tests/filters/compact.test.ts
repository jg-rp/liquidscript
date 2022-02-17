import { compact } from "../../src/builtin/filters/array";
import { DefaultContext } from "../../src/context";
import { DefaultEnvironment } from "../../src/environment";
import { FilterContext } from "../../src/filter";
import { LaxUndefined } from "../../src/undefined";

describe("compact filter", () => {
  const env = new DefaultEnvironment({});
  const ctx = new DefaultContext(env, new Map<string, unknown>());
  const filterContext: FilterContext = { context: ctx };

  test("array with a null", () => {
    const result = compact.apply(filterContext, [["b", "a", null, "A"]]);
    expect(result).toStrictEqual(["b", "a", "A"]);
  });

  test("array with an undefined", () => {
    const result = compact.apply(filterContext, [["b", "a", undefined, "A"]]);
    expect(result).toStrictEqual(["b", "a", "A"]);
  });

  test("left value is undefined", () => {
    const result = compact.apply(filterContext, [new LaxUndefined("test")]);
    expect(result).toStrictEqual([]);
  });

  test("array of objects with property key", () => {
    const result = compact.apply(filterContext, [
      [
        { title: "foo", name: "a" },
        { title: null, name: "b" },
        { title: "bar", name: "c" },
      ],
      "title",
    ]);
    expect(result).toStrictEqual([
      { title: "foo", name: "a" },
      { title: "bar", name: "c" },
    ]);
  });
});
