import { base64Decode } from "../../src/builtin/filters";
import { RenderContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterArgumentError } from "../../src/errors";
import { FilterContext } from "../../src/filter";

describe("base64 encode filter", () => {
  const env = new Environment({});
  const ctx = new RenderContext(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("characters that fit in one byte", () => {
    const result = base64Decode.apply(filterContext, ["b25lIHR3byB0aHJlZQ=="]);
    expect(result).toBe("one two three");
  });

  test("characters that take more than one byte", () => {
    const result = base64Decode.apply(filterContext, [
      "4pi44pi54pi64pi74pi84pi+4pi/",
    ]);
    expect(result).toBe("☸☹☺☻☼☾☿");
  });

  test("with URL unsafe characters", () => {
    const result = base64Decode.apply(filterContext, [
      "YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXogQUJDREVGR0hJSktMTU5PUFFSU1RVV" +
        "ldYWVogMTIzNDU2Nzg5MCAhQCMkJV4mKigpLT1fKy8/Ljo7W117fVx8",
    ]);
    expect(result).toBe(
      "abcdefghijklmnopqrstuvwxyz " +
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ " +
        "1234567890 !@#$%^&*()-=_+/?.:;[]{}\\|",
    );
  });

  test("not a string", () => {
    expect(() => base64Decode.apply(filterContext, [5])).toThrow(
      FilterArgumentError,
    );
  });

  test("not base64", () => {
    expect(() => base64Decode.apply(filterContext, ["invalidbase64"])).toThrow(
      FilterArgumentError,
    );
  });
});
