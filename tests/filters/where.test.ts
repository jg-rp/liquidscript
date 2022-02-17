import { where } from "../../src/builtin/filters/array";
import { DefaultContext } from "../../src/context";
import { DefaultEnvironment } from "../../src/environment";
import { FilterContext } from "../../src/filter";

describe("where filter", () => {
  const env = new DefaultEnvironment({});
  const ctx = new DefaultContext(env, new Map<string, unknown>());
  const filterContext: FilterContext = { context: ctx };

  test("array of objects with an undefined", () => {
    const result = where.apply(filterContext, [
      [{ title: "foo" }, { title: "bar" }, { title: undefined }],
      "title",
    ]);
    expect(result).toStrictEqual([{ title: "foo" }, { title: "bar" }]);
  });

  test("array of objects with a null", () => {
    const result = where.apply(filterContext, [
      [{ title: "foo" }, { title: "bar" }, { title: null }],
      "title",
    ]);
    expect(result).toStrictEqual([{ title: "foo" }, { title: "bar" }]);
  });

  test("array of objects with equality test", () => {
    const result = where.apply(filterContext, [
      [{ title: "foo" }, { title: "bar" }, { title: null }],
      "title",
      "bar",
    ]);
    expect(result).toStrictEqual([{ title: "bar" }]);
  });

  test("array of objects with missing key", () => {
    const result = where.apply(filterContext, [
      [{ heading: "foo" }, { title: "bar" }, { title: null }],
      "title",
      "bar",
    ]);
    expect(result).toStrictEqual([{ title: "bar" }]);
  });
});
