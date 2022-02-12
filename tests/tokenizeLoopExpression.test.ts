import { Token } from "../src/token";
import { tokenize } from "../src/expressions/loop/lex";
import {
  TOKEN_COLON,
  TOKEN_CONTINUE,
  TOKEN_FLOAT,
  TOKEN_IDENT,
  TOKEN_IN,
  TOKEN_INTEGER,
  TOKEN_LIMIT,
  TOKEN_LPAREN,
  TOKEN_OFFSET,
  TOKEN_RANGE,
  TOKEN_REVERSED,
  TOKEN_RPAREN,
} from "../src/expressions/tokens";

describe("tokenize loop expressions", () => {
  test("loop over identifier", () => {
    const s = "product in collection";
    const tokens = Array.from(tokenize(s));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "product", 0, s),
      new Token(TOKEN_IN, "in", 8, s),
      new Token(TOKEN_IDENT, "collection", 11, s),
    ]);
  });
  test("loop over identifier with limit and offset", () => {
    const s = "product in collection limit:4 offset:2";
    const tokens = Array.from(tokenize(s));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "product", 0, s),
      new Token(TOKEN_IN, "in", 8, s),
      new Token(TOKEN_IDENT, "collection", 11, s),
      new Token(TOKEN_LIMIT, "limit", 22, s),
      new Token(TOKEN_COLON, ":", 27, s),
      new Token(TOKEN_INTEGER, "4", 28, s),
      new Token(TOKEN_OFFSET, "offset", 30, s),
      new Token(TOKEN_COLON, ":", 36, s),
      new Token(TOKEN_INTEGER, "2", 37, s),
    ]);
  });
  test("loop over reversed range", () => {
    const s = "n in (1..10) reversed";
    const tokens = Array.from(tokenize(s));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "n", 0, s),
      new Token(TOKEN_IN, "in", 2, s),
      new Token(TOKEN_LPAREN, "(", 5, s),
      new Token(TOKEN_INTEGER, "1", 6, s),
      new Token(TOKEN_RANGE, "..", 7, s),
      new Token(TOKEN_INTEGER, "10", 9, s),
      new Token(TOKEN_RPAREN, ")", 11, s),
      new Token(TOKEN_REVERSED, "reversed", 13, s),
    ]);
  });
  test("loop over range with identifier", () => {
    const s = "n in (1..x)";
    const tokens = Array.from(tokenize(s));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "n", 0, s),
      new Token(TOKEN_IN, "in", 2, s),
      new Token(TOKEN_LPAREN, "(", 5, s),
      new Token(TOKEN_INTEGER, "1", 6, s),
      new Token(TOKEN_RANGE, "..", 7, s),
      new Token(TOKEN_IDENT, "x", 9, s),
      new Token(TOKEN_RPAREN, ")", 10, s),
    ]);
  });
  test("loop over range with float start", () => {
    const s = "n in (1.2..x)";
    const tokens = Array.from(tokenize(s));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "n", 0, s),
      new Token(TOKEN_IN, "in", 2, s),
      new Token(TOKEN_LPAREN, "(", 5, s),
      new Token(TOKEN_FLOAT, "1.2", 6, s),
      new Token(TOKEN_RANGE, "..", 9, s),
      new Token(TOKEN_IDENT, "x", 11, s),
      new Token(TOKEN_RPAREN, ")", 12, s),
    ]);
  });
  test("loop over identifier with offset continue", () => {
    const s = "product in collection limit:4 offset:continue";
    const tokens = Array.from(tokenize(s));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "product", 0, s),
      new Token(TOKEN_IN, "in", 8, s),
      new Token(TOKEN_IDENT, "collection", 11, s),
      new Token(TOKEN_LIMIT, "limit", 22, s),
      new Token(TOKEN_COLON, ":", 27, s),
      new Token(TOKEN_INTEGER, "4", 28, s),
      new Token(TOKEN_OFFSET, "offset", 30, s),
      new Token(TOKEN_COLON, ":", 36, s),
      new Token(TOKEN_CONTINUE, "continue", 37, s),
    ]);
  });
});
