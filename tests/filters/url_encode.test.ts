import { urlEncode } from "../../src/builtin/filters/string";
import { RenderContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";

describe("url_encode filter", () => {
  const env = new Environment({});
  const ctx = new RenderContext(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("reference test", () => {
    const result = urlEncode.apply(filterContext, ["foo+1@example.com"]);
    expect(result).toBe("foo%2B1%40example.com");
  });
  test("some special characters", () => {
    const result = urlEncode.apply(filterContext, [
      "email address is bob@example.com!",
    ]);
    expect(result).toBe("email+address+is+bob%40example.com%21");
  });
});
