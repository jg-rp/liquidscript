import { join } from "../../src/builtin/filters/array";
import { DefaultContext } from "../../src/context";
import { DefaultEnvironment } from "../../src/environment";
import { FilterContext } from "../../src/filter";

// TODO: finish tests

describe("divide by filter", () => {
  const env = new DefaultEnvironment({});
  const ctx = new DefaultContext(env, new Map<string, unknown>());
  const filterContext: FilterContext = { context: ctx };

  test("two numbers", () => {
    const result = join.apply(filterContext, [[1, 2, 3], "#"]);
    expect(result.valueOf()).toBe("1#2#3");
  });
});
