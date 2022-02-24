import { escape } from "../../src/builtin/filters/string";
import { Context } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";

describe("escape filter", () => {
  const env = new Environment({});
  const ctx = new Context(env);
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
