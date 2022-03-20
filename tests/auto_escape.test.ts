import { Markup } from "../src/builtin/drops/markup";
import {
  LiquidHTMLable,
  LiquidStringable,
  toLiquidHtml,
  toLiquidString,
} from "../src/drop";
import { Environment } from "../src/environment";
import { Template } from "../src/template";

class MockDrop implements LiquidStringable, LiquidHTMLable {
  [toLiquidString](): string {
    return "not HTML";
  }
  [toLiquidHtml](): string {
    return "<em>HELLO</em>";
  }
}

describe("HTML auto escape", () => {
  test("disable HTML auto escape", () => {
    expect(
      Template.from("{{ name }}", { autoEscape: false }).renderSync({
        name: '<script>alert("XSS!");</script>',
      })
    ).toBe('<script>alert("XSS!");</script>');
  });

  test("ignore toLiquidHtml when auto escaping is disabled", () => {
    expect(
      Template.from("{{ thing }}", { autoEscape: false }).renderSync({
        thing: new MockDrop(),
      })
    ).toBe("not HTML");
  });

  test("escape a script tag", () => {
    expect(
      Template.from("{{ thing }}", { autoEscape: true }).renderSync({
        thing: '<script>alert("XSS!");</script>',
      })
    ).toBe("&lt;script&gt;alert(&#34;XSS!&#34;);&lt;/script&gt;");
  });

  test("don't escape template literals", () => {
    expect(
      Template.from("<br>{{ thing }}", { autoEscape: true }).renderSync({
        thing: '<script>alert("XSS!");</script>',
      })
    ).toBe("<br>&lt;script&gt;alert(&#34;XSS!&#34;);&lt;/script&gt;");
  });

  test("don't escape string literals", () => {
    expect(
      Template.from("{{ '<em>Hello</em>' }}", { autoEscape: true }).renderSync()
    ).toBe("<em>Hello</em>");
  });

  test("capture with HTML literals", () => {
    expect(
      Template.from(
        "{% capture foo %}" +
          '<p class="foo">' +
          "{{ thing }}" +
          "</p>" +
          "{% endcapture %}" +
          "{{ foo }}",
        { autoEscape: true }
      ).renderSync({
        thing: '<script>alert("XSS!");</script>',
      })
    ).toBe(
      '<p class="foo">' +
        "&lt;script&gt;alert(&#34;XSS!&#34;);&lt;/script&gt;" +
        "</p>"
    );
  });

  test("drops implementing toLiquidHtml are safe", () => {
    expect(
      Template.from("{{ thing }}", { autoEscape: true }).renderSync({
        thing: new MockDrop(),
      })
    ).toBe("<em>HELLO</em>");
  });
});

type Case = {
  description: string;
  source: string;
  globals: { [index: string]: unknown };
  want: string;
};

describe("auto escape with string filters", () => {
  const env = new Environment({ autoEscape: true });
  const cases: Case[] = [
    {
      description: "upcase",
      source: "{{ name | upcase }}",
      globals: { name: '<script>alert("XSS!");</script>' },
      want: "&lt;SCRIPT&gt;ALERT(&#34;XSS!&#34;);&lt;/SCRIPT&gt;",
    },
    {
      description: "upcase safe",
      source: "{{ name | upcase }}",
      globals: { name: new Markup('<script>alert("XSS!");</script>') },
      want: '<SCRIPT>ALERT("XSS!");</SCRIPT>',
    },
    {
      description: "downcase",
      source: "{{ name | downcase }}",
      globals: { name: '<script>alert("XSS!");</script>' },
      want: "&lt;script&gt;alert(&#34;xss!&#34;);&lt;/script&gt;",
    },
    {
      description: "downcase safe",
      source: "{{ name | downcase }}",
      globals: { name: new Markup('<script>alert("XSS!");</script>') },
      want: '<script>alert("xss!");</script>',
    },
    {
      description: "capitalize",
      source: "{{ name | capitalize }}",
      globals: { name: '<script>alert("XSS!");</script>' },
      want: "&lt;script&gt;alert(&#34;xss!&#34;);&lt;/script&gt;",
    },
    {
      description: "capitalize safe",
      source: "{{ name | capitalize }}",
      globals: { name: new Markup('<script>alert("XSS!");</script>') },
      want: '<script>alert("xss!");</script>',
    },
    {
      description: "append unsafe left value and unsafe argument",
      source: "{{ some | append: other }}",
      globals: { some: "<br>", other: "<hr>" },
      want: "&lt;br&gt;&lt;hr&gt;",
    },
    {
      description: "append safe left value and unsafe argument",
      source: "{{ some | append: other }}",
      globals: { some: new Markup("<br>"), other: "<hr>" },
      want: "<br>&lt;hr&gt;",
    },
    {
      description: "append safe left value and safe argument",
      source: "{{ some | append: other }}",
      globals: { some: new Markup("<br>"), other: new Markup("<hr>") },
      want: "<br><hr>",
    },
    {
      description: "lstrip",
      source: "{{ some | lstrip }}",
      globals: { some: "   <br>" },
      want: "&lt;br&gt;",
    },
    {
      description: "lstrip safe",
      source: "{{ some | lstrip }}",
      globals: { some: new Markup("   <br>") },
      want: "<br>",
    },
    {
      description: "newline to BR",
      source: "{{ some | newline_to_br }}",
      globals: { some: "<em>hello</em>\n<b>goodbye</b>" },
      want: "&lt;em&gt;hello&lt;/em&gt;<br />\n&lt;b&gt;goodbye&lt;/b&gt;",
    },
    {
      description: "newline to BR safe",
      source: "{{ some | newline_to_br }}",
      globals: { some: new Markup("<em>hello</em>\n<b>goodbye</b>") },
      want: "<em>hello</em><br />\n<b>goodbye</b>",
    },
    {
      description: "newline to BR chained filter",
      source: "{{ some | newline_to_br | upcase }}",
      globals: { some: "<em>hello</em>\n<b>goodbye</b>" },
      want: "&LT;EM&GT;HELLO&LT;/EM&GT;<BR />\n&LT;B&GT;GOODBYE&LT;/B&GT;",
    },
    {
      description: "newline to BR safe chained filter",
      source: "{{ some | newline_to_br | upcase }}",
      globals: { some: new Markup("<em>hello</em>\n<b>goodbye</b>") },
      want: "<EM>HELLO</EM><BR />\n<B>GOODBYE</B>",
    },
    {
      description: "prepend unsafe left value and unsafe argument",
      source: "{{ some | prepend: other }}",
      globals: { some: "<br>", other: "<hr>" },
      want: "&lt;hr&gt;&lt;br&gt;",
    },
    {
      description: "prepend safe left value and unsafe argument",
      source: "{{ some | prepend: other }}",
      globals: { some: new Markup("<br>"), other: "<hr>" },
      want: "&lt;hr&gt;<br>",
    },
    {
      description: "prepend safe left value and safe argument",
      source: "{{ some | prepend: other }}",
      globals: { some: new Markup("<br>"), other: new Markup("<hr>") },
      want: "<hr><br>",
    },
    {
      description: "remove unsafe left value and unsafe argument",
      source: "{{ some | remove: other }}",
      globals: { some: "<br><p>hello</p><br>", other: "<br>" },
      want: "&lt;p&gt;hello&lt;/p&gt;",
    },
    {
      description: "remove safe left value and unsafe argument",
      source: "{{ some | remove: other }}",
      globals: { some: new Markup("<br><p>hello</p><br>"), other: "<br>" },
      want: "<br><p>hello</p><br>",
    },
    {
      description: "remove safe left value and safe argument",
      source: "{{ some | remove: other }}",
      globals: {
        some: new Markup("<br><p>hello</p><br>"),
        other: new Markup("<br>"),
      },
      want: "<p>hello</p>",
    },
    {
      description: "remove first unsafe left value and unsafe argument",
      source: "{{ some | remove_first: other }}",
      globals: { some: "<br><p>hello</p><br>", other: "<br>" },
      want: "&lt;p&gt;hello&lt;/p&gt;&lt;br&gt;",
    },
    {
      description: "remove first safe left value and unsafe argument",
      source: "{{ some | remove_first: other }}",
      globals: { some: new Markup("<br><p>hello</p><br>"), other: "<br>" },
      want: "<br><p>hello</p><br>",
    },
    {
      description: "remove first safe left value and safe argument",
      source: "{{ some | remove_first: other }}",
      globals: {
        some: new Markup("<br><p>hello</p><br>"),
        other: new Markup("<br>"),
      },
      want: "<p>hello</p><br>",
    },
    {
      description: "remove last unsafe left value and unsafe argument",
      source: "{{ some | remove_last: other }}",
      globals: { some: "<br><p>hello</p><br>", other: "<br>" },
      want: "&lt;br&gt;&lt;p&gt;hello&lt;/p&gt;",
    },
    {
      description: "remove last safe left value and unsafe argument",
      source: "{{ some | remove_last: other }}",
      globals: { some: new Markup("<br><p>hello</p><br>"), other: "<br>" },
      want: "<br><p>hello</p><br>",
    },
    {
      description: "remove last safe left value and safe argument",
      source: "{{ some | remove_last: other }}",
      globals: {
        some: new Markup("<br><p>hello</p><br>"),
        other: new Markup("<br>"),
      },
      want: "<br><p>hello</p>",
    },
    {
      description: "replace unsafe left value and unsafe arguments",
      source: "{{ some | replace: seq, sub }}",
      globals: {
        some: "<br><p>hello</p><br>",
        seq: "<br>",
        sub: "<hr>",
      },
      want: "&lt;hr&gt;&lt;p&gt;hello&lt;/p&gt;&lt;hr&gt;",
    },
    {
      description: "replace safe left value and unsafe arguments",
      source: "{{ some | replace: seq, sub }}",
      globals: {
        some: new Markup("<br><p>hello</p><br>"),
        seq: "<br>",
        sub: "<hr>",
      },
      want: "<br><p>hello</p><br>",
    },
    {
      description: "replace safe left value and safe arguments",
      source: "{{ some | replace: seq, sub }}",
      globals: {
        some: new Markup("<br><p>hello</p><br>"),
        seq: new Markup("<br>"),
        sub: new Markup("<hr>"),
      },
      want: "<hr><p>hello</p><hr>",
    },
    {
      description: "replace first - unsafe left value and unsafe arguments",
      source: "{{ some | replace_first: seq, sub }}",
      globals: {
        some: "<br><p>hello</p><br>",
        seq: "<br>",
        sub: "<hr>",
      },
      want: "&lt;hr&gt;&lt;p&gt;hello&lt;/p&gt;&lt;br&gt;",
    },
    {
      description: "replace first - safe left value and unsafe arguments",
      source: "{{ some | replace_first: seq, sub }}",
      globals: {
        some: new Markup("<br><p>hello</p><br>"),
        seq: "<br>",
        sub: "<hr>",
      },
      want: "<br><p>hello</p><br>",
    },
    {
      description: "replace first - safe left value and safe arguments",
      source: "{{ some | replace_first: seq, sub }}",
      globals: {
        some: new Markup("<br><p>hello</p><br>"),
        seq: new Markup("<br>"),
        sub: new Markup("<hr>"),
      },
      want: "<hr><p>hello</p><br>",
    },
    {
      description: "replace last - unsafe left value and unsafe arguments",
      source: "{{ some | replace_last: seq, sub }}",
      globals: {
        some: "<br><p>hello</p><br>",
        seq: "<br>",
        sub: "<hr>",
      },
      want: "&lt;br&gt;&lt;p&gt;hello&lt;/p&gt;&lt;hr&gt;",
    },
    {
      description: "replace last - safe left value and unsafe arguments",
      source: "{{ some | replace_last: seq, sub }}",
      globals: {
        some: new Markup("<br><p>hello</p><br>"),
        seq: "<br>",
        sub: "<hr>",
      },
      want: "<br><p>hello</p><br>",
    },
    {
      description: "replace last - safe left value and safe arguments",
      source: "{{ some | replace_last: seq, sub }}",
      globals: {
        some: new Markup("<br><p>hello</p><br>"),
        seq: new Markup("<br>"),
        sub: new Markup("<hr>"),
      },
      want: "<br><p>hello</p><hr>",
    },
    {
      description: "strip",
      source: "{{ some | strip }}",
      globals: { some: "\n<p>hello</p>  \n" },
      want: "&lt;p&gt;hello&lt;/p&gt;",
    },
    {
      description: "strip safe",
      source: "{{ some | strip }}",
      globals: { some: new Markup("\n<p>hello</p>  \n") },
      want: "<p>hello</p>",
    },
    {
      description: "right strip",
      source: "{{ some | rstrip }}",
      globals: { some: "\n<p>hello</p>  \n" },
      want: "\n&lt;p&gt;hello&lt;/p&gt;",
    },
    {
      description: "right strip safe",
      source: "{{ some | rstrip }}",
      globals: { some: new Markup("\n<p>hello</p>  \n") },
      want: "\n<p>hello</p>",
    },
    {
      description: "strip html",
      source: "{{ some | strip_html }}",
      globals: { some: "<p>hello</p>" },
      want: "hello",
    },
    {
      description: "strip html safe",
      source: "{{ some | strip_html }}",
      globals: { some: new Markup("<p>hello</p>") },
      want: "hello",
    },
    {
      description: "strip newlines",
      source: "{{ some | strip_newlines }}",
      globals: { some: "\n<p>hello</p>  \n" },
      want: "&lt;p&gt;hello&lt;/p&gt;  ",
    },
    {
      description: "strip newlines safe",
      source: "{{ some | strip_newlines }}",
      globals: { some: new Markup("\n<p>hello</p>  \n") },
      want: "<p>hello</p>  ",
    },
    {
      description: "URL encode",
      source: "{{ some | url_encode }}",
      globals: { some: "<p>hello</p>" },
      want: "%3Cp%3Ehello%3C%2Fp%3E",
    },
    {
      description: "URL encode safe",
      source: "{{ some | url_encode }}",
      globals: { some: new Markup("<p>hello</p>") },
      want: "%3Cp%3Ehello%3C%2Fp%3E",
    },
    {
      description: "URL decode",
      source: "{{ some | url_decode }}",
      globals: { some: "%3Cp%3Ehello%3C%2Fp%3E" },
      want: "&lt;p&gt;hello&lt;/p&gt;",
    },
    {
      description: "URL decode safe",
      source: "{{ some | url_decode }}",
      globals: { some: new Markup("%3Cp%3Ehello%3C%2Fp%3E") },
      want: "&lt;p&gt;hello&lt;/p&gt;",
    },
    {
      description: "liquid escape",
      source: "{{ some | escape }}",
      globals: { some: "<p>hello</p>" },
      want: "&lt;p&gt;hello&lt;/p&gt;",
    },
    {
      description: "liquid escape markup",
      source: "{{ some | escape }}",
      globals: { some: new Markup("<p>hello</p>") },
      want: "&lt;p&gt;hello&lt;/p&gt;",
    },
    {
      description: "escape once",
      source: "{{ some | escape_once }}",
      globals: { some: "&lt;p&gt;test&lt;/p&gt;<p>test</p>" },
      want: "&lt;p&gt;test&lt;/p&gt;&lt;p&gt;test&lt;/p&gt;",
    },
    {
      description: "escape once markup",
      source: "{{ some | escape_once }}",
      globals: { some: new Markup("&lt;p&gt;test&lt;/p&gt;<p>test</p>") },
      want: "&lt;p&gt;test&lt;/p&gt;&lt;p&gt;test&lt;/p&gt;",
    },
    {
      description: "escape toLiquidHtml",
      source: "{{ some | escape }}",
      globals: { some: new MockDrop() },
      want: "not HTML",
    },
  ];

  describe("async", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want }: Case) => {
        const template = env.fromString(source);
        const result = await template.render(globals);
        expect(result).toBe(want);
      }
    );
  });

  describe("sync", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want }: Case) => {
        const template = env.fromString(source);
        expect(template.renderSync(globals)).toBe(want);
      }
    );
  });
});

describe("auto escape with array filters", () => {
  const env = new Environment({ autoEscape: true });
  const cases: Case[] = [
    {
      description: "join unsafe iterable and default separator",
      source: "{{ foo | join }}",
      globals: { foo: ["<p>hello</p>", "<p>goodbye</p>"] },
      want: "&lt;p&gt;hello&lt;/p&gt; &lt;p&gt;goodbye&lt;/p&gt;",
    },
    {
      description: "join unsafe iterable and unsafe separator",
      source: "{{ foo | join: bar }}",
      globals: { foo: ["<p>hello</p>", "<p>goodbye</p>"], bar: "<hr>" },
      want: "&lt;p&gt;hello&lt;/p&gt;&lt;hr&gt;&lt;p&gt;goodbye&lt;/p&gt;",
    },
    {
      description: "join safe iterable and default separator",
      source: "{{ foo | join }}",
      globals: {
        foo: [new Markup("<p>hello</p>"), new Markup("<p>goodbye</p>")],
      },
      want: "<p>hello</p> <p>goodbye</p>",
    },
    {
      description: "join safe iterable and unsafe separator",
      source: "{{ foo | join: bar }}",
      globals: {
        foo: [new Markup("<p>hello</p>"), new Markup("<p>goodbye</p>")],
        bar: "<hr>",
      },
      want: "&lt;p&gt;hello&lt;/p&gt;&lt;hr&gt;&lt;p&gt;goodbye&lt;/p&gt;",
    },
    {
      description: "join safe iterable and safe separator",
      source: "{{ foo | join: bar }}",
      globals: {
        foo: [new Markup("<p>hello</p>"), new Markup("<p>goodbye</p>")],
        bar: new Markup("<hr>"),
      },
      want: "<p>hello</p><hr><p>goodbye</p>",
    },
    {
      description: "join mixed iterable and safe separator",
      source: "{{ foo | join: bar }}",
      globals: {
        foo: [new Markup("<p>hello</p>"), "<p>goodbye</p>"],
        bar: new Markup("<hr>"),
      },
      want: "<p>hello</p><hr>&lt;p&gt;goodbye&lt;/p&gt;",
    },
  ];

  describe("async", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want }: Case) => {
        const template = env.fromString(source);
        const result = await template.render(globals);
        expect(result).toBe(want);
      }
    );
  });

  describe("sync", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want }: Case) => {
        const template = env.fromString(source);
        expect(template.renderSync(globals)).toBe(want);
      }
    );
  });
});

describe("auto escape with the tablerow tag", () => {
  const env = new Environment({ autoEscape: true });
  const cases: Case[] = [
    {
      description: "no markup",
      source:
        "{% tablerow i in (1..4) cols:2 %}" +
        "{{ i }} {{ tablerowloop.col_first }}" +
        "{% endtablerow %}",
      globals: {},
      want:
        '<tr class="row1">\n' +
        '<td class="col1">1 true</td>' +
        '<td class="col2">2 false</td>' +
        "</tr>\n" +
        '<tr class="row2">' +
        '<td class="col1">3 true</td>' +
        '<td class="col2">4 false</td>' +
        "</tr>\n",
    },
    {
      description: "markup in loop block",
      source:
        "{% tablerow i in (1..4) cols:2 %}" +
        "<b>{{ i }}</b> {{ tablerowloop.col_first }}" +
        "{% endtablerow %}",
      globals: {},
      want:
        '<tr class="row1">\n' +
        '<td class="col1"><b>1</b> true</td>' +
        '<td class="col2"><b>2</b> false</td>' +
        "</tr>\n" +
        '<tr class="row2">' +
        '<td class="col1"><b>3</b> true</td>' +
        '<td class="col2"><b>4</b> false</td>' +
        "</tr>\n",
    },
    {
      description: "unsafe markup from iterable",
      source:
        "{% tablerow tag in collection.tags %}" +
        "{{ tag }}" +
        "{% endtablerow %}",
      want:
        '<tr class="row1">\n' +
        '<td class="col1">&lt;b&gt;tag1&lt;/b&gt;</td>' +
        '<td class="col2">tag2</td>' +
        '<td class="col3">tag3</td>' +
        '<td class="col4">tag4</td>' +
        "</tr>\n",
      globals: {
        collection: {
          tags: ["<b>tag1</b>", "tag2", "tag3", "tag4"],
        },
      },
    },
    {
      description: "safe markup from iterable",
      source:
        "{% tablerow tag in collection.tags %}" +
        "{{ tag }}" +
        "{% endtablerow %}",
      want:
        '<tr class="row1">\n' +
        '<td class="col1"><b>tag1</b></td>' +
        '<td class="col2">tag2</td>' +
        '<td class="col3">tag3</td>' +
        '<td class="col4">tag4</td>' +
        "</tr>\n",
      globals: {
        collection: {
          tags: [new Markup("<b>tag1</b>"), "tag2", "tag3", "tag4"],
        },
      },
    },
  ];

  describe("async", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want }: Case) => {
        const template = env.fromString(source);
        const result = await template.render(globals);
        expect(result).toBe(want);
      }
    );
  });

  describe("sync", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want }: Case) => {
        const template = env.fromString(source);
        expect(template.renderSync(globals)).toBe(want);
      }
    );
  });
});

describe("auto escape with the liquid tag", () => {
  const env = new Environment({ autoEscape: true });
  const cases: Case[] = [
    {
      description: "echo markup from context",
      source: "{% liquid \necho foo\n %}",
      globals: { foo: "<em>hello</em>" },
      want: "&lt;em&gt;hello&lt;/em&gt;",
    },
    {
      description: "echo unsafe markup from string literal",
      source: "{% liquid \necho '<em>hello</em>'\n %}",
      globals: {},
      want: "<em>hello</em>",
    },
    {
      description: "echo safe markup from context",
      source: "{% liquid \necho foo\n %}",
      globals: { foo: new Markup("<em>hello</em>") },
      want: "<em>hello</em>",
    },
  ];

  describe("async", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want }: Case) => {
        const template = env.fromString(source);
        const result = await template.render(globals);
        expect(result).toBe(want);
      }
    );
  });

  describe("sync", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want }: Case) => {
        const template = env.fromString(source);
        expect(template.renderSync(globals)).toBe(want);
      }
    );
  });
});
