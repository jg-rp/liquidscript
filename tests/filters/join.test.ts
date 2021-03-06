import { join } from "../../src/builtin/filters/array";
import { RenderContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";
import { Range } from "../../src/range";

describe("join filter", () => {
  const env = new Environment({});
  const ctx = new RenderContext(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("array of strings", () => {
    const result = join.apply(filterContext, [["a", "b", "c"], "#"]);
    expect(result).toBe("a#b#c");
  });

  test("array of numbers", () => {
    const result = join.apply(filterContext, [[1, 2, 3], "#"]);
    expect(result).toBe("1#2#3");
  });

  test("range", () => {
    const result = join.apply(filterContext, [new Range(1, 3), "#"]);
    expect(result).toBe("1#2#3");
  });

  test("joining a string is a no-op", () => {
    const result = join.apply(filterContext, ["a,b", "#"]);
    expect(result).toBe("a,b");
  });

  test("separator defaults to a single space", () => {
    const result = join.apply(filterContext, [["a", "b", "c"]]);
    expect(result).toBe("a b c");
  });
});
