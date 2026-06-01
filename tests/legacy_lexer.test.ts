import { Environment } from "../src/environment";
import { LegacyLexer } from "../src/legacy_lexer";
import { getTokenValue, REVERSE_T } from "../src/token";

function tokenize(source: string): Array<[string, string]> {
  const env = new Environment();
  return LegacyLexer.tokenize(env, source).map((token) => {
    return [REVERSE_T[token.kind], getTokenValue(token, source)];
  });
}

describe("tokenize", () => {
  test("empty", () => {
    expect(tokenize("")).toStrictEqual([]);
  });

  test("just text", () => {
    expect(tokenize("Hello, World!")).toStrictEqual([
      ["TEXT", "Hello, World!"],
    ]);
  });

  test("just output", () => {
    expect(tokenize("{{ hello }}")).toStrictEqual([
      ["OUT_START", "{{"],
      ["IDENT", "hello"],
      ["OUT_END", "}}"],
    ]);
  });

  test("hello liquid", () => {
    expect(tokenize("Hello, {{ you }}!")).toStrictEqual([
      ["TEXT", "Hello, "],
      ["OUT_START", "{{"],
      ["IDENT", "you"],
      ["OUT_END", "}}"],
      ["TEXT", "!"],
    ]);
  });

  test("output, whitespace control", () => {
    expect(tokenize("Hello, {{- you -}}!")).toStrictEqual([
      ["TEXT", "Hello, "],
      ["OUT_START", "{{"],
      ["WC", "-"],
      ["IDENT", "you"],
      ["WC", "-"],
      ["OUT_END", "}}"],
      ["TEXT", "!"],
    ]);
  });

  test("output, single quoted string literal", () => {
    expect(tokenize("{{ 'Hello, World!' }}")).toStrictEqual([
      ["OUT_START", "{{"],
      ["SINGLE_QUOTE", "'"],
      ["SINGLE_QUOTED", "Hello, World!"],
      ["SINGLE_QUOTE", "'"],
      ["OUT_END", "}}"],
    ]);
  });

  test("output, double quoted string literal", () => {
    expect(tokenize('{{ "Hello, World!" }}')).toStrictEqual([
      ["OUT_START", "{{"],
      ["DOUBLE_QUOTE", '"'],
      ["DOUBLE_QUOTED", "Hello, World!"],
      ["DOUBLE_QUOTE", '"'],
      ["OUT_END", "}}"],
    ]);
  });

  test("output, filter", () => {
    expect(tokenize("{{ 42 | plus: 3 }}")).toStrictEqual([
      ["OUT_START", "{{"],
      ["INT", "42"],
      ["PIPE", "|"],
      ["IDENT", "plus"],
      ["COLON", ":"],
      ["INT", "3"],
      ["OUT_END", "}}"],
    ]);
  });

  test("output, float literal", () => {
    expect(tokenize("{{ 42.2 | plus: 3.0 }}")).toStrictEqual([
      ["OUT_START", "{{"],
      ["FLOAT", "42.2"],
      ["PIPE", "|"],
      ["IDENT", "plus"],
      ["COLON", ":"],
      ["FLOAT", "3.0"],
      ["OUT_END", "}}"],
    ]);
  });

  test("output, range literal", () => {
    expect(tokenize("{{ (1..5) | join: ', ' }}")).toStrictEqual([
      ["OUT_START", "{{"],
      ["LPAREN", "("],
      ["INT", "1"],
      ["DOUBLE_DOT", ".."],
      ["INT", "5"],
      ["RPAREN", ")"],
      ["PIPE", "|"],
      ["IDENT", "join"],
      ["COLON", ":"],
      ["SINGLE_QUOTE", "'"],
      ["SINGLE_QUOTED", ", "],
      ["SINGLE_QUOTE", "'"],
      ["OUT_END", "}}"],
    ]);
  });

  test("output, variable with trailing question mark", () => {
    expect(tokenize("{{ eh? }}")).toStrictEqual([
      ["OUT_START", "{{"],
      ["IDENT", "eh?"],
      ["OUT_END", "}}"],
    ]);
  });

  test("raw", () => {
    expect(tokenize("Hello, {% raw %}{{ you }}{% endraw %}!")).toStrictEqual([
      ["TEXT", "Hello, "],
      ["TAG_START", "{%"],
      ["TAG_NAME", "raw"],
      ["TAG_END", "%}"],
      ["TEXT", "{{ you }}"],
      ["TAG_START", "{%"],
      ["TAG_NAME", "endraw"],
      ["TAG_END", "%}"],
      ["TEXT", "!"],
    ]);
  });

  test("raw at eos", () => {
    expect(tokenize("Hello, {% raw %}{{ you }}{% endraw %}")).toStrictEqual([
      ["TEXT", "Hello, "],
      ["TAG_START", "{%"],
      ["TAG_NAME", "raw"],
      ["TAG_END", "%}"],
      ["TEXT", "{{ you }}"],
      ["TAG_START", "{%"],
      ["TAG_NAME", "endraw"],
      ["TAG_END", "%}"],
    ]);
  });

  test("raw, whitespace control", () => {
    expect(
      tokenize("Hello, {%- raw -%}{{ you }}{%- endraw -%}!"),
    ).toStrictEqual([
      ["TEXT", "Hello, "],
      ["TAG_START", "{%"],
      ["WC", "-"],
      ["TAG_NAME", "raw"],
      ["WC", "-"],
      ["TAG_END", "%}"],
      ["TEXT", "{{ you }}"],
      ["TAG_START", "{%"],
      ["WC", "-"],
      ["TAG_NAME", "endraw"],
      ["WC", "-"],
      ["TAG_END", "%}"],
      ["TEXT", "!"],
    ]);
  });

  test("tag, inline", () => {
    expect(tokenize("{% assign x = true %}")).toStrictEqual([
      ["TAG_START", "{%"],
      ["TAG_NAME", "assign"],
      ["IDENT", "x"],
      ["ASSIGN", "="],
      ["TRUE", "true"],
      ["TAG_END", "%}"],
    ]);
  });
});
