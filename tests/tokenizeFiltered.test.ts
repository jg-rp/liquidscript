import { Token } from "../src/token";
import { tokenize } from "../src/expressions/filtered/lex";

import {
  TOKEN_COLON,
  TOKEN_COMMA,
  TOKEN_DOT,
  TOKEN_FLOAT,
  TOKEN_IDENT,
  TOKEN_IDENT_INDEX,
  TOKEN_INTEGER,
  TOKEN_LBRACKET,
  TOKEN_LPAREN,
  TOKEN_PIPE,
  TOKEN_RANGE,
  TOKEN_RBRACKET,
  TOKEN_RPAREN,
  TOKEN_STRING,
} from "../src/expressions/tokens";

describe("tokenize filtered expressions", () => {
  test("double quoted string literal", () => {
    const tokens = Array.from(tokenize('"hello"'));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_STRING, "hello", 1, '"hello"'),
    ]);
  });
  test("single quoted string literal", () => {
    const tokens = Array.from(tokenize("'hello'"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_STRING, "hello", 1, "'hello'"),
    ]);
  });
  test("integer literal", () => {
    const tokens = Array.from(tokenize("42"));
    expect(tokens).toStrictEqual([new Token(TOKEN_INTEGER, "42", 1, "42")]);
  });
  test("negative integer literal", () => {
    const tokens = Array.from(tokenize("-42"));
    expect(tokens).toStrictEqual([new Token(TOKEN_INTEGER, "-42", 1, "-42")]);
  });
  test("float literal", () => {
    const tokens = Array.from(tokenize("1.34"));
    expect(tokens).toStrictEqual([new Token(TOKEN_FLOAT, "1.34", 1, "1.34")]);
  });
  test("negative float literal", () => {
    const tokens = Array.from(tokenize("-1.34"));
    expect(tokens).toStrictEqual([new Token(TOKEN_FLOAT, "-1.34", 1, "-1.34")]);
  });
  test("float literal without a digit after the decimal point", () => {
    const tokens = Array.from(tokenize("2."));
    expect(tokens).toStrictEqual([new Token(TOKEN_FLOAT, "2.", 1, "2.")]);
  });
  test("negative float literal without a digit after the decimal point", () => {
    const tokens = Array.from(tokenize("-2."));
    expect(tokens).toStrictEqual([new Token(TOKEN_FLOAT, "-2.", 1, "-2.")]);
  });
  test("simple identifier", () => {
    const tokens = Array.from(tokenize("products"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "products", 1, "products"),
    ]);
  });
  test("simple identifier with a hyphen", () => {
    const tokens = Array.from(tokenize("some-products"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "some-products", 1, "some-products"),
    ]);
  });
  test("simple identifier with a trailing question mark", () => {
    const tokens = Array.from(tokenize("products?"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "products?", 1, "products?"),
    ]);
  });
  test("simple identifier with a leading underscore", () => {
    const tokens = Array.from(tokenize("_products"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "_products", 1, "_products"),
    ]);
  });
  test("simple identifier with a leading digit", () => {
    expect(() => Array.from(tokenize("1products"))).toThrow(
      "unexpected token '1'"
    );
  });
  test("simple chained identifier", () => {
    const tokens = Array.from(tokenize("collection.products"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "collection", 1, "collection.products"),
      new Token(TOKEN_DOT, ".", 11, "collection.products"),
      new Token(TOKEN_IDENT, "products", 12, "collection.products"),
    ]);
  });
  test("simple indexed identifier", () => {
    const tokens = Array.from(tokenize("products[1]"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "products", 1, "products[1]"),
      new Token(TOKEN_IDENT_INDEX, "1", 9, "products[1]"),
    ]);
  });
  test("bracketed single quoted identifier", () => {
    const tokens = Array.from(tokenize("collection['products']"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "collection", 1, "collection['products']"),
      new Token(TOKEN_IDENT, "products", 11, "collection['products']"),
    ]);
  });
  test("bracketed double quoted identifier", () => {
    const tokens = Array.from(tokenize('collection["products"]'));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "collection", 1, 'collection["products"]'),
      new Token(TOKEN_IDENT, "products", 11, 'collection["products"]'),
    ]);
  });
  test("bracketed nested identifier", () => {
    const tokens = Array.from(tokenize("collection[tags.current_collection]"));
    expect(tokens).toStrictEqual([
      new Token(
        TOKEN_IDENT,
        "collection",
        1,
        "collection[tags.current_collection]"
      ),
      new Token(TOKEN_LBRACKET, "[", 11, "collection[tags.current_collection]"),
      new Token(TOKEN_IDENT, "tags", 12, "collection[tags.current_collection]"),
      new Token(TOKEN_DOT, ".", 16, "collection[tags.current_collection]"),
      new Token(
        TOKEN_IDENT,
        "current_collection",
        17,
        "collection[tags.current_collection]"
      ),
      new Token(TOKEN_RBRACKET, "]", 35, "collection[tags.current_collection]"),
    ]);
  });
  test("filtered string literal", () => {
    const tokens = Array.from(tokenize('"hello" | upcase'));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_STRING, "hello", 1, '"hello" | upcase'),
      new Token(TOKEN_PIPE, "|", 9, '"hello" | upcase'),
      new Token(TOKEN_IDENT, "upcase", 11, '"hello" | upcase'),
    ]);
  });
  test("filtered identifier", () => {
    const tokens = Array.from(tokenize("name | upcase"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "name", 1, "name | upcase"),
      new Token(TOKEN_PIPE, "|", 6, "name | upcase"),
      new Token(TOKEN_IDENT, "upcase", 8, "name | upcase"),
    ]);
  });
  test("filtered integer literal with integer argument", () => {
    const tokens = Array.from(tokenize("4 | at_least: 5"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_INTEGER, "4", 1, "4 | at_least: 5"),
      new Token(TOKEN_PIPE, "|", 3, "4 | at_least: 5"),
      new Token(TOKEN_IDENT, "at_least", 5, "4 | at_least: 5"),
      new Token(TOKEN_COLON, ":", 13, "4 | at_least: 5"),
      new Token(TOKEN_INTEGER, "5", 15, "4 | at_least: 5"),
    ]);
  });
  test("filtered string with two argument", () => {
    const tokens = Array.from(tokenize("'Liquid' | slice: 2, 5"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_STRING, "Liquid", 1, "'Liquid' | slice: 2, 5"),
      new Token(TOKEN_PIPE, "|", 10, "'Liquid' | slice: 2, 5"),
      new Token(TOKEN_IDENT, "slice", 12, "'Liquid' | slice: 2, 5"),
      new Token(TOKEN_COLON, ":", 17, "'Liquid' | slice: 2, 5"),
      new Token(TOKEN_INTEGER, "2", 19, "'Liquid' | slice: 2, 5"),
      new Token(TOKEN_COMMA, ",", 20, "'Liquid' | slice: 2, 5"),
      new Token(TOKEN_INTEGER, "5", 22, "'Liquid' | slice: 2, 5"),
    ]);
  });
  test("handle whitespace", () => {
    const tokens = Array.from(tokenize("\n'Liquid'\n |slice: 2,5"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_STRING, "Liquid", 2, "\n'Liquid'\n |slice: 2,5"),
      new Token(TOKEN_PIPE, "|", 12, "\n'Liquid'\n |slice: 2,5"),
      new Token(TOKEN_IDENT, "slice", 13, "\n'Liquid'\n |slice: 2,5"),
      new Token(TOKEN_COLON, ":", 18, "\n'Liquid'\n |slice: 2,5"),
      new Token(TOKEN_INTEGER, "2", 20, "\n'Liquid'\n |slice: 2,5"),
      new Token(TOKEN_COMMA, ",", 21, "\n'Liquid'\n |slice: 2,5"),
      new Token(TOKEN_INTEGER, "5", 22, "\n'Liquid'\n |slice: 2,5"),
    ]);
  });
  test("range literal", () => {
    const tokens = Array.from(tokenize("(1..5)"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_LPAREN, "(", 1, "(1..5)"),
      new Token(TOKEN_INTEGER, "1", 2, "(1..5)"),
      new Token(TOKEN_RANGE, "..", 3, "(1..5)"),
      new Token(TOKEN_INTEGER, "5", 5, "(1..5)"),
      new Token(TOKEN_RPAREN, ")", 6, "(1..5)"),
    ]);
  });
  test("range literal with float start", () => {
    const tokens = Array.from(tokenize("(2.4..5)"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_LPAREN, "(", 1, "(2.4..5)"),
      new Token(TOKEN_FLOAT, "2.4", 2, "(2.4..5)"),
      new Token(TOKEN_RANGE, "..", 5, "(2.4..5)"),
      new Token(TOKEN_INTEGER, "5", 7, "(2.4..5)"),
      new Token(TOKEN_RPAREN, ")", 8, "(2.4..5)"),
    ]);
  });
  test("range literal with identifiers for start and stop", () => {
    const tokens = Array.from(tokenize("(a..b)"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_LPAREN, "(", 1, "(a..b)"),
      new Token(TOKEN_IDENT, "a", 2, "(a..b)"),
      new Token(TOKEN_RANGE, "..", 3, "(a..b)"),
      new Token(TOKEN_IDENT, "b", 5, "(a..b)"),
      new Token(TOKEN_RPAREN, ")", 6, "(a..b)"),
    ]);
  });
});
