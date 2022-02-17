import { uniq } from "../../src/builtin/filters/array";
import { DefaultContext } from "../../src/context";
import { DefaultEnvironment } from "../../src/environment";
import { FilterArgumentError } from "../../src/errors";
import { FilterContext } from "../../src/filter";

describe("uniq filter", () => {
  const env = new DefaultEnvironment({});
  const ctx = new DefaultContext(env, new Map<string, unknown>());
  const filterContext: FilterContext = { context: ctx };

  test("array of strings", () => {
    const result = uniq.apply(filterContext, [["a", "b", "b", "a"]]);
    expect(result).toStrictEqual(["a", "b"]);
  });

  test("empty array", () => {
    const result = uniq.apply(filterContext, [[]]);
    expect(result).toStrictEqual([]);
  });

  test("unhashable items", () => {
    const result = uniq.apply(filterContext, [["a", "b", [], {}, {}]]);
    expect(result).toStrictEqual(["a", "b", {}]);
  });

  test("array of objects with key property", () => {
    const result = uniq.apply(filterContext, [
      [
        { title: "foo", name: "a" },
        { title: "foo", name: "b" },
        { title: "bar", name: "c" },
      ],
      "title",
    ]);
    expect(result).toStrictEqual([
      { title: "foo", name: "a" },
      { title: "bar", name: "c" },
    ]);
  });
  test("array of objects with key property", () => {
    expect(() =>
      uniq.apply(filterContext, [
        [
          { title: "foo", name: "a" },
          { title: "foo", name: "b" },
          { title: "bar", name: "c" },
          { heading: "bar", name: "c" },
        ],
        "title",
      ])
    ).toThrow(FilterArgumentError);
  });
});
