/**
 * These test cases are derived from:
 *
 * https://github.com/Shopify/liquid/blob/a9c85622ddd784078c2eed34b19a351fe57362cf/test/unit/tags/comment_tag_unit_test.rb
 *
 * See https://github.com/Shopify/liquid/blob/main/LICENSE
 */
import { Environment } from "../src/environment";
import { LegacyLexer } from "../src/legacy_lexer";
import { getTokenValue, REVERSE_T } from "../src/token";

function tokenize(source: string): Array<[string, string]> {
  const env = new Environment();
  return LegacyLexer.tokenize(env, source).map((token) => {
    return [REVERSE_T[token.kind], getTokenValue(token, source)];
  });
}

describe("tokenize block comment", () => {
  test("line statements", () => {
    const source = `{% liquid
        if 1 != 1
        comment
        else
          echo 123
        endcomment
        endif
      %}`;

    expect(tokenize(source)).toStrictEqual([
      ["TAG_START", "{%"],
      ["TAG_NAME", "liquid"],
      ["TAG_START", ""],
      ["TAG_NAME", "if"],
      ["INT", "1"],
      ["NE", "!="],
      ["INT", "1"],
      ["TAG_END", ""],
      ["TAG_START", ""],
      ["TAG_NAME", "comment"],
      ["TAG_END", ""],
      ["COMMENT", "\n        else\n          echo 123"],
      ["TAG_START", ""],
      ["TAG_NAME", "endcomment"],
      ["TAG_END", ""],
      ["TAG_START", ""],
      ["TAG_NAME", "endif"],
      ["TAG_END", ""],
      ["TAG_END", "%}"],
    ]);
  });

  test("line statements, nested", () => {
    const source = `{% liquid
        if 1 != 1
        comment
        comment
        else
          echo 123
        endcomment
        endcomment
        endif
      %}`;

    expect(tokenize(source)).toStrictEqual([
      ["TAG_START", "{%"],
      ["TAG_NAME", "liquid"],
      ["TAG_START", ""],
      ["TAG_NAME", "if"],
      ["INT", "1"],
      ["NE", "!="],
      ["INT", "1"],
      ["TAG_END", ""],
      ["TAG_START", ""],
      ["TAG_NAME", "comment"],
      ["TAG_END", ""],
      [
        "COMMENT",
        "\n        comment\n        else\n          echo 123\n        endcomment",
      ],
      ["TAG_START", ""],
      ["TAG_NAME", "endcomment"],
      ["TAG_END", ""],
      ["TAG_START", ""],
      ["TAG_NAME", "endif"],
      ["TAG_END", ""],
      ["TAG_END", "%}"],
    ]);
  });

  test("complete markup", () => {
    const source = `{% comment %}
        {% if true %}
        {% if ... %}
        {%- for ? -%}
        {% while true %}
        {%
          unless if
        %}
        {% endcase %}
      {% endcomment %}`;

    expect(tokenize(source)).toStrictEqual([
      ["TAG_START", "{%"],
      ["TAG_NAME", "comment"],
      ["TAG_END", "%}"],
      [
        "COMMENT",
        "\n        {% if true %}\n        {% if ... %}\n        {%- for ? -%}\n        {% while true %}\n        {%\n          unless if\n        %}\n        {% endcase %}\n      ",
      ],
      ["TAG_START", "{%"],
      ["TAG_NAME", "endcomment"],
      ["TAG_END", "%}"],
    ]);
  });

  test("incomplete markup", () => {
    // NOTE: Shopify/liquid throws a SyntaxError here.
    const source = `{% comment %}
          {% assign foo = "1"
        {% endcomment %}`;

    expect(tokenize(source)).toStrictEqual([
      ["TAG_START", "{%"],
      ["TAG_NAME", "comment"],
      ["TAG_END", "%}"],
      ["COMMENT", '\n          {% assign foo = "1"\n        '],
      ["TAG_START", "{%"],
      ["TAG_NAME", "endcomment"],
      ["TAG_END", "%}"],
    ]);
  });

  test("start delimiters", () => {
    // NOTE: Shopify/liquid throws a SyntaxError here.
    const source = `{% comment %}
        {% {{ {%- endcomment %}`;

    expect(tokenize(source)).toStrictEqual([
      ["TAG_START", "{%"],
      ["TAG_NAME", "comment"],
      ["TAG_END", "%}"],
      ["COMMENT", "\n        {% {{ "],
      ["TAG_START", "{%"],
      ["WC", "-"],
      ["TAG_NAME", "endcomment"],
      ["TAG_END", "%}"],
    ]);
  });

  test("nested comment blocks, balanced", () => {
    const source = `{% comment %}
        {% comment %}
          {% comment %}{%    endcomment     %}
        {% endcomment %}
      {% endcomment %}`;

    expect(tokenize(source)).toStrictEqual([
      ["TAG_START", "{%"],
      ["TAG_NAME", "comment"],
      ["TAG_END", "%}"],
      [
        "COMMENT",
        "\n        {% comment %}\n          {% comment %}{%    endcomment     %}\n        {% endcomment %}\n      ",
      ],
      ["TAG_START", "{%"],
      ["TAG_NAME", "endcomment"],
      ["TAG_END", "%}"],
    ]);
  });

  test("nested comment blocks, unbalanced", () => {
    // NOTE: Shopify/liquid throws a SyntaxError here.
    const source = `{% comment %}
          {% comment %}
            {% comment %}
          {% endcomment %}
        {% endcomment %}`;

    expect(tokenize(source)).toStrictEqual([
      ["TAG_START", "{%"],
      ["TAG_NAME", "comment"],
      ["TAG_END", "%}"],
      [
        "UNKNOWN",
        "\n          {% comment %}\n            {% comment %}\n          {% endcomment %}\n        {% endcomment %}",
      ],
    ]);
  });

  test("raw block, balanced", () => {
    const source = `{% comment %}
        {% raw %}
          {% endcomment %}
        {% endraw %}
      {% endcomment %}`;

    expect(tokenize(source)).toStrictEqual([
      ["TAG_START", "{%"],
      ["TAG_NAME", "comment"],
      ["TAG_END", "%}"],
      [
        "COMMENT",
        "\n        {% raw %}\n          {% endcomment %}\n        {% endraw %}\n      ",
      ],
      ["TAG_START", "{%"],
      ["TAG_NAME", "endcomment"],
      ["TAG_END", "%}"],
    ]);
  });

  test("raw block, unbalanced", () => {
    // NOTE: Shopify/liquid throws a SyntaxError here.
    const source = `{% comment %}
          {% raw %}
          {% endcomment %}
        {% endcomment %}`;

    expect(tokenize(source)).toStrictEqual([
      ["TAG_START", "{%"],
      ["TAG_NAME", "comment"],
      ["TAG_END", "%}"],
      [
        "UNKNOWN",
        "\n          {% raw %}\n          {% endcomment %}\n        {% endcomment %}",
      ],
    ]);
  });

  test("junk between nested 'endcomment' and delimiter", () => {
    const source = `{% comment %}
          {% comment %}
          {% endcomment
          {% if true %}
          {% endif %}
        {% endcomment %}`;

    expect(tokenize(source)).toStrictEqual([
      ["TAG_START", "{%"],
      ["TAG_NAME", "comment"],
      ["TAG_END", "%}"],
      [
        "COMMENT",
        "\n          {% comment %}\n          {% endcomment\n          {% if true %}\n          {% endif %}\n        ",
      ],
      ["TAG_START", "{%"],
      ["TAG_NAME", "endcomment"],
      ["TAG_END", "%}"],
    ]);
  });

  test("junk between nested 'comment' and delimiter", () => {
    const source = `{% comment %}
          {% comment
            {% assign foo = 1 %}
          {% endcomment
          {% assign foo = 1 %}
        {% endcomment %}`;

    expect(tokenize(source)).toStrictEqual([
      ["TAG_START", "{%"],
      ["TAG_NAME", "comment"],
      ["TAG_END", "%}"],
      [
        "COMMENT",
        "\n          {% comment\n            {% assign foo = 1 %}\n          {% endcomment\n          {% assign foo = 1 %}\n        ",
      ],
      ["TAG_START", "{%"],
      ["TAG_NAME", "endcomment"],
      ["TAG_END", "%}"],
    ]);
  });

  test("junk between 'endcomment' and delimiter", () => {
    const source = "{% comment %}123{% endcomment\n   xyz  endcomment %}";

    expect(tokenize(source)).toStrictEqual([
      ["TAG_START", "{%"],
      ["TAG_NAME", "comment"],
      ["TAG_END", "%}"],
      ["COMMENT", "123"],
      ["TAG_START", "{%"],
      ["TAG_NAME", "endcomment"],
      ["IDENT", "xyz"],
      ["IDENT", "endcomment"],
      ["TAG_END", "%}"],
    ]);
  });
});
