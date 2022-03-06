import { map } from "../../src/builtin/filters/array";
import { RenderContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterArgumentError } from "../../src/errors";
import { FilterContext } from "../../src/filter";
import { LaxUndefined } from "../../src/undefined";

describe("map filter", () => {
  const env = new Environment({});
  const ctx = new RenderContext(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("array of objects", () => {
    const result = map.apply(filterContext, [
      [{ title: "foo" }, { title: "bar" }, { title: "baz" }],
      "title",
    ]);
    expect(result).toStrictEqual(["foo", "bar", "baz"]);
  });

  test("missing property", () => {
    const result = map.apply(filterContext, [
      [{ title: "foo" }, { title: "bar" }, { heading: "baz" }],
      "title",
    ]);
    expect(result).toStrictEqual(["foo", "bar", undefined]);
  });

  test("left value is not iterable", () => {
    expect(() => map.apply(filterContext, [123, "title"])).toThrow(
      FilterArgumentError
    );
  });

  test("undefined argument", () => {
    const result = map.apply(filterContext, [
      [{ title: "foo" }, { title: "bar" }, { heading: "baz" }],
      undefined,
    ]);
    expect(result).toStrictEqual([undefined, undefined, undefined]);
  });

  test("Undefined argument", () => {
    const result = map.apply(filterContext, [
      [{ title: "foo" }, { title: "bar" }, { heading: "baz" }],
      new LaxUndefined("test"),
    ]);
    expect(result).toStrictEqual([undefined, undefined, undefined]);
  });
});
