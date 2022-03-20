import { stripHtml } from "../../src/builtin/filters/string";
import { RenderContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";

describe("strip_html filter", () => {
  const env = new Environment({});
  const ctx = new RenderContext(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("HTML block", () => {
    const result = stripHtml.apply(filterContext, ["<div>test</div>"]);
    expect(result).toBe("test");
  });
  test("HTML block with id", () => {
    const result = stripHtml.apply(filterContext, [
      "<div id='test'>test</div>",
    ]);
    expect(result).toBe("test");
  });
  test("script block", () => {
    const result = stripHtml.apply(filterContext, [
      "<script type='text/javascript'>document.write('some stuff');</script>",
    ]);
    expect(result).toBe("");
  });
  test("style block", () => {
    const result = stripHtml.apply(filterContext, [
      "<style type='text/css'>foo bar</style>",
    ]);
    expect(result).toBe("");
  });
  test("HTML block with newline", () => {
    const result = stripHtml.apply(filterContext, [
      "<div\nclass='multiline'>test</div>",
    ]);
    expect(result).toBe("test");
  });
  test("HTML comment with newline", () => {
    const result = stripHtml.apply(filterContext, [
      "<!-- foo bar \n test -->test",
    ]);
    expect(result).toBe("test");
  });
});
