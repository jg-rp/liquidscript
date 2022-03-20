import { replaceLast } from "../../src/builtin/filters/string";
import { RenderContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";

describe("replace_last filter", () => {
  const env = new Environment({});
  const ctx = new RenderContext(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("paragraph", () => {
    const result = replaceLast.apply(filterContext, [
      "Take my protein pills and put my helmet on",
      "my",
      "your",
    ]);
    expect(result).toBe("Take my protein pills and put your helmet on");
  });
});
