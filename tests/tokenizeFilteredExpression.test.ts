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
      new Token(TOKEN_STRING, "hello", 0, '"hello"'),
    ]);
  });
  test("single quoted string literal", () => {
    const tokens = Array.from(tokenize("'hello'"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_STRING, "hello", 0, "'hello'"),
    ]);
  });
  test("integer literal", () => {
    const tokens = Array.from(tokenize("42"));
    expect(tokens).toStrictEqual([new Token(TOKEN_INTEGER, "42", 0, "42")]);
  });
  test("negative integer literal", () => {
    const tokens = Array.from(tokenize("-42"));
    expect(tokens).toStrictEqual([new Token(TOKEN_INTEGER, "-42", 0, "-42")]);
  });
  test("float literal", () => {
    const tokens = Array.from(tokenize("1.34"));
    expect(tokens).toStrictEqual([new Token(TOKEN_FLOAT, "1.34", 0, "1.34")]);
  });
  test("negative float literal", () => {
    const tokens = Array.from(tokenize("-1.34"));
    expect(tokens).toStrictEqual([new Token(TOKEN_FLOAT, "-1.34", 0, "-1.34")]);
  });
  test("float literal without a digit after the decimal point", () => {
    const tokens = Array.from(tokenize("2."));
    expect(tokens).toStrictEqual([new Token(TOKEN_FLOAT, "2.", 0, "2.")]);
  });
  test("negative float literal without a digit after the decimal point", () => {
    const tokens = Array.from(tokenize("-2."));
    expect(tokens).toStrictEqual([new Token(TOKEN_FLOAT, "-2.", 0, "-2.")]);
  });
  test("simple identifier", () => {
    const tokens = Array.from(tokenize("products"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "products", 0, "products"),
    ]);
  });
  test("simple identifier with a hyphen", () => {
    const tokens = Array.from(tokenize("some-products"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "some-products", 0, "some-products"),
    ]);
  });
  test("simple identifier with a trailing question mark", () => {
    const tokens = Array.from(tokenize("products?"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "products?", 0, "products?"),
    ]);
  });
  test("simple identifier with a leading underscore", () => {
    const tokens = Array.from(tokenize("_products"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "_products", 0, "_products"),
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
      new Token(TOKEN_IDENT, "collection", 0, "collection.products"),
      new Token(TOKEN_DOT, ".", 10, "collection.products"),
      new Token(TOKEN_IDENT, "products", 11, "collection.products"),
    ]);
  });
  test("simple indexed identifier", () => {
    const tokens = Array.from(tokenize("products[1]"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "products", 0, "products[1]"),
      new Token(TOKEN_IDENT_INDEX, "1", 8, "products[1]"),
    ]);
  });
  test("bracketed single quoted identifier", () => {
    const tokens = Array.from(tokenize("collection['products']"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "collection", 0, "collection['products']"),
      new Token(TOKEN_IDENT, "products", 10, "collection['products']"),
    ]);
  });
  test("bracketed double quoted identifier", () => {
    const tokens = Array.from(tokenize('collection["products"]'));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "collection", 0, 'collection["products"]'),
      new Token(TOKEN_IDENT, "products", 10, 'collection["products"]'),
    ]);
  });
  test("bracketed nested identifier", () => {
    const tokens = Array.from(tokenize("collection[tags.current_collection]"));
    expect(tokens).toStrictEqual([
      new Token(
        TOKEN_IDENT,
        "collection",
        0,
        "collection[tags.current_collection]"
      ),
      new Token(TOKEN_LBRACKET, "[", 10, "collection[tags.current_collection]"),
      new Token(TOKEN_IDENT, "tags", 11, "collection[tags.current_collection]"),
      new Token(TOKEN_DOT, ".", 15, "collection[tags.current_collection]"),
      new Token(
        TOKEN_IDENT,
        "current_collection",
        16,
        "collection[tags.current_collection]"
      ),
      new Token(TOKEN_RBRACKET, "]", 34, "collection[tags.current_collection]"),
    ]);
  });
  test("filtered string literal", () => {
    const tokens = Array.from(tokenize('"hello" | upcase'));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_STRING, "hello", 0, '"hello" | upcase'),
      new Token(TOKEN_PIPE, "|", 8, '"hello" | upcase'),
      new Token(TOKEN_IDENT, "upcase", 10, '"hello" | upcase'),
    ]);
  });
  test("filtered identifier", () => {
    const tokens = Array.from(tokenize("name | upcase"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "name", 0, "name | upcase"),
      new Token(TOKEN_PIPE, "|", 5, "name | upcase"),
      new Token(TOKEN_IDENT, "upcase", 7, "name | upcase"),
    ]);
  });
  test("filtered integer literal with integer argument", () => {
    const tokens = Array.from(tokenize("4 | at_least: 5"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_INTEGER, "4", 0, "4 | at_least: 5"),
      new Token(TOKEN_PIPE, "|", 2, "4 | at_least: 5"),
      new Token(TOKEN_IDENT, "at_least", 4, "4 | at_least: 5"),
      new Token(TOKEN_COLON, ":", 12, "4 | at_least: 5"),
      new Token(TOKEN_INTEGER, "5", 14, "4 | at_least: 5"),
    ]);
  });
  test("filtered string with two argument", () => {
    const tokens = Array.from(tokenize("'Liquid' | slice: 2, 5"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_STRING, "Liquid", 0, "'Liquid' | slice: 2, 5"),
      new Token(TOKEN_PIPE, "|", 9, "'Liquid' | slice: 2, 5"),
      new Token(TOKEN_IDENT, "slice", 11, "'Liquid' | slice: 2, 5"),
      new Token(TOKEN_COLON, ":", 16, "'Liquid' | slice: 2, 5"),
      new Token(TOKEN_INTEGER, "2", 18, "'Liquid' | slice: 2, 5"),
      new Token(TOKEN_COMMA, ",", 19, "'Liquid' | slice: 2, 5"),
      new Token(TOKEN_INTEGER, "5", 21, "'Liquid' | slice: 2, 5"),
    ]);
  });
  test("handle whitespace", () => {
    const tokens = Array.from(tokenize("\n'Liquid'\n |slice: 2,5"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_STRING, "Liquid", 1, "\n'Liquid'\n |slice: 2,5"),
      new Token(TOKEN_PIPE, "|", 11, "\n'Liquid'\n |slice: 2,5"),
      new Token(TOKEN_IDENT, "slice", 12, "\n'Liquid'\n |slice: 2,5"),
      new Token(TOKEN_COLON, ":", 17, "\n'Liquid'\n |slice: 2,5"),
      new Token(TOKEN_INTEGER, "2", 19, "\n'Liquid'\n |slice: 2,5"),
      new Token(TOKEN_COMMA, ",", 20, "\n'Liquid'\n |slice: 2,5"),
      new Token(TOKEN_INTEGER, "5", 21, "\n'Liquid'\n |slice: 2,5"),
    ]);
  });
  test("range literal", () => {
    const tokens = Array.from(tokenize("(1..5)"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_LPAREN, "(", 0, "(1..5)"),
      new Token(TOKEN_INTEGER, "1", 1, "(1..5)"),
      new Token(TOKEN_RANGE, "..", 2, "(1..5)"),
      new Token(TOKEN_INTEGER, "5", 4, "(1..5)"),
      new Token(TOKEN_RPAREN, ")", 5, "(1..5)"),
    ]);
  });
  test("range literal with float start", () => {
    const tokens = Array.from(tokenize("(2.4..5)"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_LPAREN, "(", 0, "(2.4..5)"),
      new Token(TOKEN_FLOAT, "2.4", 1, "(2.4..5)"),
      new Token(TOKEN_RANGE, "..", 4, "(2.4..5)"),
      new Token(TOKEN_INTEGER, "5", 6, "(2.4..5)"),
      new Token(TOKEN_RPAREN, ")", 7, "(2.4..5)"),
    ]);
  });
  test("range literal with identifiers for start and stop", () => {
    const tokens = Array.from(tokenize("(a..b)"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_LPAREN, "(", 0, "(a..b)"),
      new Token(TOKEN_IDENT, "a", 1, "(a..b)"),
      new Token(TOKEN_RANGE, "..", 2, "(a..b)"),
      new Token(TOKEN_IDENT, "b", 4, "(a..b)"),
      new Token(TOKEN_RPAREN, ")", 5, "(a..b)"),
    ]);
  });
});
