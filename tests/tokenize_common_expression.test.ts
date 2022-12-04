import { Token } from "../src/token";
import { tokenize } from "../src/expressions/standard";

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
  test("single quoted string representation of a float", () => {
    const tokens = Array.from(tokenize("'42.2'"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_STRING, "42.2", 0, "'42.2'"),
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
