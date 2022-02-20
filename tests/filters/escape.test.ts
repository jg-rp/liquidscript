import { escape } from "../../src/builtin/filters/string";
import { DefaultContext } from "../../src/context";
import { DefaultEnvironment } from "../../src/environment";
import { FilterContext } from "../../src/filter";

describe("escape filter", () => {
  const env = new DefaultEnvironment({});
  const ctx = new DefaultContext(env, new Map<string, unknown>());
  const filterContext: FilterContext = { context: ctx };

  test("paragraph", () => {
    const result = escape.apply(filterContext, [["<p>test</p>"]]);
    expect(result).toBe("&lt;p&gt;test&lt;/p&gt;");
  });
  test("strong", () => {
    const result = escape.apply(filterContext, [["<strong>"]]);
    expect(result).toBe("&lt;strong&gt;");
  });
});
