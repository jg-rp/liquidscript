import { Environment } from "../src/liquidscript";
import {
  Drop,
  toHTMLSafeStringSync,
  toLiquidSync,
  type ContextHint,
} from "../src/drop";

class MockDrop extends Drop {
  override [toLiquidSync](hint: ContextHint): unknown {
    switch (hint) {
      case "string":
        return "not HTML";
      case "boolean":
        return false;
      case "data":
        return null;
      case "numeric":
        return 0;
    }
  }

  override [toHTMLSafeStringSync](): string {
    return "<em>HELLO</em>";
  }
}

describe("HTML auto escape", () => {
  const env = new Environment({ autoEscape: false });
  const escEnv = new Environment({ autoEscape: true });

  test("disable HTML auto escape", () => {
    expect(
      env.parse("{{ name }}").renderSync({
        name: '<script>alert("XSS!");</script>',
      }),
    ).toBe('<script>alert("XSS!");</script>');
  });

  test("ignore toLiquidHtml when auto escaping is disabled", () => {
    expect(
      env.parse("{{ thing }}").renderSync({
        thing: new MockDrop(),
      }),
    ).toBe("not HTML");
  });

  test("escape a script tag", () => {
    expect(
      escEnv.parse("{{ thing }}").renderSync({
        thing: '<script>alert("XSS!");</script>',
      }),
    ).toBe("&lt;script&gt;alert(&#34;XSS!&#34;);&lt;/script&gt;");
  });

  test("don't escape template literals", () => {
    expect(
      escEnv.parse("<br>{{ thing }}").renderSync({
        thing: '<script>alert("XSS!");</script>',
      }),
    ).toBe("<br>&lt;script&gt;alert(&#34;XSS!&#34;);&lt;/script&gt;");
  });

  test("don't escape string literals", () => {
    expect(escEnv.parse("{{ '<em>Hello</em>' }}").renderSync()).toBe(
      "<em>Hello</em>",
    );
  });

  test("capture with HTML literals", () => {
    expect(
      escEnv
        .parse(
          "{% capture foo %}" +
            '<p class="foo">' +
            "{{ thing }}" +
            "</p>" +
            "{% endcapture %}" +
            "{{ foo }}",
        )
        .renderSync({
          thing: '<script>alert("XSS!");</script>',
        }),
    ).toBe(
      '<p class="foo">' +
        "&lt;script&gt;alert(&#34;XSS!&#34;);&lt;/script&gt;" +
        "</p>",
    );
  });

  test("drops implementing toLiquidHtml are safe", () => {
    expect(
      escEnv.parse("{{ thing }}").renderSync({
        thing: new MockDrop(),
      }),
    ).toBe("<em>HELLO</em>");
  });
});
