import { reverse } from "../../src/builtin/filters/array";
import { DefaultContext } from "../../src/context";
import { DefaultEnvironment } from "../../src/environment";
import { FilterContext } from "../../src/filter";
import { LaxUndefined } from "../../src/undefined";

describe("reverse filter", () => {
  const env = new DefaultEnvironment({});
  const ctx = new DefaultContext(env, new Map<string, unknown>());
  const filterContext: FilterContext = { context: ctx };

  test("array of strings", () => {
    const result = reverse.apply(filterContext, [["b", "a", "B", "A"]]);
    expect(result).toStrictEqual(["A", "B", "a", "b"]);
  });

  test("empty array", () => {
    const result = reverse.apply(filterContext, [[]]);
    expect(result).toStrictEqual([]);
  });

  // test("unexpected argument", () => {
  //   expect(() => reverse.apply(filterContext, [[1, 2, 3], true])).toThrow(
  //     FilterArgumentError
  //   );
  // });

  test("undefined left value", () => {
    const result = reverse.apply(filterContext, [new LaxUndefined("test")]);
    expect(result.valueOf()).toStrictEqual([]);
  });
});
