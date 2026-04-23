/**
 * These test cases are derived from:
 *
 * https://github.com/Shopify/liquid/blob/a9c85622ddd784078c2eed34b19a351fe57362cf/test/unit/tokenizer_unit_test.rb
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

describe("tokenize edge cases", () => {
  test("output, single closing brace", () => {
    expect(tokenize("{{.} ")).toStrictEqual([
      ["OUT_START", "{{"],
      ["DOT", "."],
      ["OUT_END", "}"],
      ["TEXT", " "],
    ]);
  });

  test("output, extra closing brace", () => {
    expect(tokenize("{{}}}")).toStrictEqual([
      ["OUT_START", "{{"],
      ["OUT_END", "}}"],
      ["TEXT", "}"],
    ]);
  });

  test("output, single closing brace followed by closing tag delimiter", () => {
    expect(tokenize("{{}%}")).toStrictEqual([
      ["OUT_START", "{{"],
      ["OUT_END", "}"],
      ["TEXT", "%}"],
    ]);
  });

  test("output, close with tag delimiter", () => {
    expect(tokenize("{{%}")).toStrictEqual([
      ["OUT_START", "{{"],
      ["OUT_END", "%}"],
    ]);
  });

  test("output, percents", () => {
    expect(tokenize("{{%%%}}")).toStrictEqual([
      ["OUT_START", "{{"],
      ["UNKNOWN", "%"],
      ["UNKNOWN", "%"],
      ["UNKNOWN", "%"],
      ["OUT_END", "}}"],
    ]);
  });

  test("open tag, close output", () => {
    expect(tokenize("{%}}")).toStrictEqual([["TEXT", "{%}}"]]);
  });

  test("tag followed by a brace", () => {
    expect(tokenize("{%%}}")).toStrictEqual([
      ["TAG_START", "{%"],
      ["TAG_END", "%}"],
      ["TEXT", "}"],
    ]);
  });
});
