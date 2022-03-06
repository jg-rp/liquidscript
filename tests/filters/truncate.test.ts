import { truncate } from "../../src/builtin/filters/string";
import { RenderContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";

describe("truncate filter", () => {
  const env = new Environment({});
  const ctx = new RenderContext(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("default length is 50", () => {
    const result = truncate.apply(filterContext, [
      "Ground control to Major Tom. Ground control to Major Tom.",
    ]);
    expect(result).toBe("Ground control to Major Tom. Ground control to ...");
  });
  test("default end", () => {
    const result = truncate.apply(filterContext, [
      "Ground control to Major Tom.",
      20,
    ]);
    expect(result).toBe("Ground control to...");
  });
  test("custom end", () => {
    const result = truncate.apply(filterContext, [
      "Ground control to Major Tom.",
      25,
      ", and so on",
    ]);
    expect(result).toBe("Ground control, and so on");
  });
  test("input is shorter than length", () => {
    const result = truncate.apply(filterContext, ["Ground control", 20]);
    expect(result).toBe("Ground control");
  });
  test("reference test", () => {
    const result = truncate.apply(filterContext, ["测试测试测试测试", 5]);
    expect(result).toBe("测试...");
  });
  test("zero length", () => {
    const result = truncate.apply(filterContext, ["1234567890", 0]);
    expect(result).toBe("...");
  });
});
