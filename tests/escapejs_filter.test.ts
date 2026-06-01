import { renderSync } from "../src/liquidscript";

describe("escapejs filter", () => {
  test("script tag", () => {
    const source = `{{ "<script>alert('x')</script>" | escapejs }}`;
    expect(renderSync(source)).toStrictEqual(
      "\\u003Cscript\\u003Ealert(\\u0027x\\u0027)\\u003C/script\\u003E",
    );
  });

  test("quotes and backslash", () => {
    const source = `{{ '"foo\\bar"' | escapejs }}`;
    expect(renderSync(source)).toStrictEqual("\\u0022foo\\u005Cbar\\u0022");
  });
});
