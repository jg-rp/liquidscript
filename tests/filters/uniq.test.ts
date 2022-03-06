import { uniq } from "../../src/builtin/filters/array";
import { RenderContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";

describe("uniq filter", () => {
  const env = new Environment({});
  const ctx = new RenderContext(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

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

  test("array of objects with missing key property", () => {
    const result = uniq.apply(filterContext, [
      [
        { title: "foo", name: "a" },
        { title: "foo", name: "b" },
        { title: "bar", name: "c" },
        { heading: "bar", name: "c" },
        { foo: "bar", name: "c" },
      ],
      "title",
    ]);
    expect(result).toStrictEqual([
      { title: "foo", name: "a" },
      { title: "bar", name: "c" },
      { heading: "bar", name: "c" },
    ]);
  });
});
