import { base64UrlSafeEncode } from "../../src/builtin/filters";
import { RenderContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";

describe("base64 URL safe encode filter", () => {
  const env = new Environment({});
  const ctx = new RenderContext(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("characters that fit in one byte", () => {
    const result = base64UrlSafeEncode.apply(filterContext, [
      "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890 !@#$%^&*()-=_+/?.:;[]{}\\|",
    ]);
    expect(result).toBe(
      "YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXogQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVogMTIzNDU2Nzg5MCAhQCMkJV4mKigpLT1fKy8_Ljo7W117fVx8",
    );
  });

  test("not a string", () => {
    const result = base64UrlSafeEncode.apply(filterContext, [5]);
    expect(result).toBe("NQ==");
  });
});
