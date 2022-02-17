import { map } from "../../src/builtin/filters/array";
import { DefaultContext } from "../../src/context";
import { DefaultEnvironment } from "../../src/environment";
import { FilterValueError } from "../../src/errors";
import { FilterContext } from "../../src/filter";
import { LaxUndefined } from "../../src/undefined";

describe("map filter", () => {
  const env = new DefaultEnvironment({});
  const ctx = new DefaultContext(env, new Map<string, unknown>());
  const filterContext: FilterContext = { context: ctx };

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
      FilterValueError
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
