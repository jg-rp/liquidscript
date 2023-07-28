import { concat } from "../../src/builtin/filters/array";
import { RenderContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterArgumentError } from "../../src/errors";
import { FilterContext } from "../../src/filter";
import { LaxUndefined } from "../../src/undefined";

describe("concat filter", () => {
  const env = new Environment({});
  const ctx = new RenderContext(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("two arrays", () => {
    const result = concat.apply(filterContext, [
      ["1", "2", "3"],
      ["x", "y", "z"],
    ]);
    expect(result).toStrictEqual(["1", "2", "3", "x", "y", "z"]);
  });

  test("missing argument", () => {
    expect(() =>
      concat.apply(filterContext, [["1", "2", "3"], undefined]),
    ).toThrow(FilterArgumentError);
  });

  test("left value is a string", () => {
    const result = concat.apply(filterContext, ["hello", ["x", "y", "z"]]);
    expect(result).toStrictEqual(["hello", "x", "y", "z"]);
  });

  test("left value with mixed strings and numbers", () => {
    const result = concat.apply(filterContext, [
      ["hello", 7],
      ["x", "y", "z"],
    ]);
    expect(result).toStrictEqual(["hello", 7, "x", "y", "z"]);
  });

  test("left value is undefined", () => {
    const result = concat.apply(filterContext, [
      new LaxUndefined("test"),
      ["x", "y", "z"],
    ]);
    expect(result).toStrictEqual(["x", "y", "z"]);
  });

  test("nested left value gets flattened", () => {
    const result = concat.apply(filterContext, [
      [
        ["a", "x"],
        ["b", ["y", ["z"]]],
      ],
      ["x", "y", "z"],
    ]);
    expect(result).toStrictEqual(["a", "x", "b", "y", "z", "x", "y", "z"]);
  });
});
