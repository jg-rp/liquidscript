import { tokenize } from "../src/expressions/boolean/lex";
import {
  TOKEN_AND,
  TOKEN_BLANK,
  TOKEN_CONTAINS,
  TOKEN_DOT,
  TOKEN_EMPTY,
  TOKEN_EQ,
  TOKEN_FALSE,
  TOKEN_FLOAT,
  TOKEN_GE,
  TOKEN_IDENT,
  TOKEN_INTEGER,
  TOKEN_LE,
  TOKEN_LG,
  TOKEN_LT,
  TOKEN_NE,
  TOKEN_NIL,
  TOKEN_OR,
  TOKEN_TRUE,
} from "../src/expressions/tokens";
import { Token } from "../src/token";

describe("tokenize boolean expressions", () => {
  test("true", () => {
    const tokens = Array.from(tokenize("true"));
    expect(tokens).toStrictEqual([new Token(TOKEN_TRUE, "true", 0, "true")]);
  });
  test("false", () => {
    const tokens = Array.from(tokenize("false"));
    expect(tokens).toStrictEqual([new Token(TOKEN_FALSE, "false", 0, "false")]);
  });
  test("true equals true", () => {
    const tokens = Array.from(tokenize("true == true"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_TRUE, "true", 0, "true == true"),
      new Token(TOKEN_EQ, "==", 5, "true == true"),
      new Token(TOKEN_TRUE, "true", 8, "true == true"),
    ]);
  });
  test("identifier not equals nil", () => {
    const tokens = Array.from(tokenize("user != nil"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "user", 0, "user != nil"),
      new Token(TOKEN_NE, "!=", 5, "user != nil"),
      new Token(TOKEN_NIL, "nil", 8, "user != nil"),
    ]);
  });
  test("alternative not equals nil", () => {
    const tokens = Array.from(tokenize("user <> nil"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "user", 0, "user <> nil"),
      new Token(TOKEN_LG, "<>", 5, "user <> nil"),
      new Token(TOKEN_NIL, "nil", 8, "user <> nil"),
    ]);
  });
  test("chained identifier less than literal", () => {
    const tokens = Array.from(tokenize("user.age < 18"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "user", 0, "user.age < 18"),
      new Token(TOKEN_DOT, ".", 4, "user.age < 18"),
      new Token(TOKEN_IDENT, "age", 5, "user.age < 18"),
      new Token(TOKEN_LT, "<", 9, "user.age < 18"),
      new Token(TOKEN_INTEGER, "18", 11, "user.age < 18"),
    ]);
  });
  test("logical or", () => {
    const tokens = Array.from(tokenize("user.name or user.nickname"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "user", 0, "user.name or user.nickname"),
      new Token(TOKEN_DOT, ".", 4, "user.name or user.nickname"),
      new Token(TOKEN_IDENT, "name", 5, "user.name or user.nickname"),
      new Token(TOKEN_OR, "or", 10, "user.name or user.nickname"),
      new Token(TOKEN_IDENT, "user", 13, "user.name or user.nickname"),
      new Token(TOKEN_DOT, ".", 17, "user.name or user.nickname"),
      new Token(TOKEN_IDENT, "nickname", 18, "user.name or user.nickname"),
    ]);
  });
  test("logical and", () => {
    const tokens = Array.from(tokenize("user and age >= 18"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "user", 0, "user and age >= 18"),
      new Token(TOKEN_AND, "and", 5, "user and age >= 18"),
      new Token(TOKEN_IDENT, "age", 9, "user and age >= 18"),
      new Token(TOKEN_GE, ">=", 13, "user and age >= 18"),
      new Token(TOKEN_INTEGER, "18", 16, "user and age >= 18"),
    ]);
  });
  test("less than or equal to", () => {
    const tokens = Array.from(tokenize("a <= 5.2"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "a", 0, "a <= 5.2"),
      new Token(TOKEN_LE, "<=", 2, "a <= 5.2"),
      new Token(TOKEN_FLOAT, "5.2", 5, "a <= 5.2"),
    ]);
  });
  test("contains", () => {
    const tokens = Array.from(tokenize("a contains b"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_IDENT, "a", 0, "a contains b"),
      new Token(TOKEN_CONTAINS, "contains", 2, "a contains b"),
      new Token(TOKEN_IDENT, "b", 11, "a contains b"),
    ]);
  });
  test("blank", () => {
    const tokens = Array.from(tokenize("blank"));
    expect(tokens).toStrictEqual([new Token(TOKEN_BLANK, "blank", 0, "blank")]);
  });
  test("empty", () => {
    const tokens = Array.from(tokenize("empty"));
    expect(tokens).toStrictEqual([new Token(TOKEN_EMPTY, "empty", 0, "empty")]);
  });
});
