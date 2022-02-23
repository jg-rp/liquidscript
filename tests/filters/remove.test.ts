import { remove } from "../../src/builtin/filters/string";
import { DefaultContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";

describe("remove filter", () => {
  const env = new Environment({});
  const ctx = new DefaultContext(env, new Map<string, unknown>());
  const filterContext: FilterContext = { context: ctx };

  test("paragraph", () => {
    const result = remove.apply(filterContext, [
      "I strained to see the train through the rain",
      "rain",
    ]);
    expect(result).toBe("I sted to see the t through the ");
  });
});
