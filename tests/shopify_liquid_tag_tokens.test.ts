/**
 * These test cases are derived from:
 *
 * https://github.com/Shopify/liquid/blob/a9c85622ddd784078c2eed34b19a351fe57362cf/test/integration/tags/liquid_tag_test.rb
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

describe("tokenize liquid tags", () => {
  test("echo", () => {
    const source = `{%- liquid
        echo array | join: " "
      -%}`;

    expect(tokenize(source)).toStrictEqual([
      ["TAG_START", "{%"],
      ["WC", "-"],
      ["TAG_NAME", "liquid"],
      ["TAG_START", ""],
      ["TAG_NAME", "echo"],
      ["IDENT", "array"],
      ["PIPE", "|"],
      ["IDENT", "join"],
      ["COLON", ":"],
      ["DOUBLE_QUOTE", '"'],
      ["DOUBLE_QUOTED", " "],
      ["DOUBLE_QUOTE", '"'],
      ["TAG_END", ""],
      ["WC", "-"],
      ["TAG_END", "%}"],
    ]);
  });
});
