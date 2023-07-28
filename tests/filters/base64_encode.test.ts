import { base64Encode } from "../../src/builtin/filters";
import { RenderContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";

describe("base64 encode filter", () => {
  const env = new Environment({});
  const ctx = new RenderContext(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("characters that fit in one byte", () => {
    const result = base64Encode.apply(filterContext, ["one two three"]);
    expect(result).toBe("b25lIHR3byB0aHJlZQ==");
  });

  test("characters that take more than one byte", () => {
    const result = base64Encode.apply(filterContext, ["☸☹☺☻☼☾☿"]);
    expect(result).toBe("4pi44pi54pi64pi74pi84pi+4pi/");
  });

  test("with URL unsafe characters", () => {
    const result = base64Encode.apply(filterContext, [
      "abcdefghijklmnopqrstuvwxyz " +
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ " +
        "1234567890 !@#$%^&*()-=_+/?.:;[]{}\\|",
    ]);
    expect(result).toBe(
      "YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXogQUJDREVGR0hJSktMTU5PUFFSU1RVV" +
        "ldYWVogMTIzNDU2Nzg5MCAhQCMkJV4mKigpLT1fKy8/Ljo7W117fVx8",
    );
  });

  test("not a string", () => {
    const result = base64Encode.apply(filterContext, [5]);
    expect(result).toBe("NQ==");
  });
});
