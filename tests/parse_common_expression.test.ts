import { tokenize } from "../src/expressions/standard";
import { parse } from "../src/expressions/standard";

import {
  ExpressionTokenStream,
  TOKEN_IN,
  TOKEN_LPAREN,
} from "../src/expressions/tokens";

import {
  FloatLiteral,
  Identifier,
  IdentifierPathElement,
  IntegerLiteral,
  RangeLiteral,
  StringLiteral,
  BLANK,
  EMPTY,
  TRUE,
  FALSE,
  NIL,
} from "../src/expression";

import {
  TOKEN_BLANK,
  TOKEN_EMPTY,
  TOKEN_FALSE,
  TOKEN_TRUE,
  TOKEN_FLOAT,
  TOKEN_INTEGER,
  TOKEN_NIL,
  TOKEN_RPAREN,
  TOKEN_STRING,
  TOKEN_IDENT,
  TOKEN_IDENT_INDEX,
  TOKEN_RBRACKET,
} from "../src/expressions/tokens";

import { Float, Integer } from "../src/number";
import { Token } from "../src/token";

describe("parse common liquid expressions", () => {
  test("parse literal integer", () => {
    const expr = "42";
    const stream = new ExpressionTokenStream(tokenize(expr));
    const result = parse(stream);
    expect(result).toStrictEqual(new IntegerLiteral(new Integer(42)));
    expect(stream.current).toStrictEqual(
      new Token(TOKEN_INTEGER, "42", 0, expr)
    );
  });
  test("parse literal float", () => {
    const expr = "42.2";
    const stream = new ExpressionTokenStream(tokenize(expr));
    const result = parse(stream);
    expect(result).toStrictEqual(new FloatLiteral(new Float(42.2)));
    expect(stream.current).toStrictEqual(
      new Token(TOKEN_FLOAT, "42.2", 0, expr)
    );
  });
  test("parse literal string", () => {
    const expr = '"42.2"';
    const stream = new ExpressionTokenStream(tokenize(expr));
    const result = parse(stream);
    expect(result).toStrictEqual(new StringLiteral("42.2"));
    expect(stream.current).toStrictEqual(
      new Token(TOKEN_STRING, "42.2", 0, expr)
    );
  });
  test("parse literal range", () => {
    const expr = "(1..5)";
    const stream = new ExpressionTokenStream(tokenize(expr));
    const result = parse(stream);
    expect(result).toStrictEqual(
      new RangeLiteral(
        new IntegerLiteral(new Integer(1)),
        new IntegerLiteral(new Integer(5))
      )
    );
    expect(stream.current).toStrictEqual(new Token(TOKEN_RPAREN, ")", 5, expr));
  });
  test("parse blank", () => {
    const expr = "blank";
    const stream = new ExpressionTokenStream(tokenize(expr));
    const result = parse(stream);
    expect(result).toStrictEqual(BLANK);
    expect(stream.current).toStrictEqual(
      new Token(TOKEN_BLANK, "blank", 0, expr)
    );
  });
  test("parse empty", () => {
    const expr = "empty";
    const stream = new ExpressionTokenStream(tokenize(expr));
    const result = parse(stream);
    expect(result).toStrictEqual(EMPTY);
    expect(stream.current).toStrictEqual(
      new Token(TOKEN_EMPTY, "empty", 0, expr)
    );
  });
  test("parse nil", () => {
    const expr = "nil";
    const stream = new ExpressionTokenStream(tokenize(expr));
    const result = parse(stream);
    expect(result).toStrictEqual(NIL);
    expect(stream.current).toStrictEqual(new Token(TOKEN_NIL, "nil", 0, expr));
  });
  test("parse true", () => {
    const expr = "true";
    const stream = new ExpressionTokenStream(tokenize(expr));
    const result = parse(stream);
    expect(result).toStrictEqual(TRUE);
    expect(stream.current).toStrictEqual(
      new Token(TOKEN_TRUE, "true", 0, expr)
    );
  });
  test("parse false", () => {
    const expr = "false";
    const stream = new ExpressionTokenStream(tokenize(expr));
    const result = parse(stream);
    expect(result).toStrictEqual(FALSE);
    expect(stream.current).toStrictEqual(
      new Token(TOKEN_FALSE, "false", 0, expr)
    );
  });
  test("parse identifier", () => {
    const expr = "a.b[1].c['foo']";
    const stream = new ExpressionTokenStream(tokenize(expr));
    const result = parse(stream);
    expect(result).toStrictEqual(
      new Identifier("a", [
        new IdentifierPathElement("b"),
        new IdentifierPathElement(1),
        new IdentifierPathElement("c"),
        new IdentifierPathElement("foo"),
      ])
    );
    expect(stream.current).toStrictEqual(
      new Token(TOKEN_IDENT, "foo", 8, expr)
    );
  });
  test("parse nested identifiers", () => {
    const expr = "a.b[c.d[1]]";
    const stream = new ExpressionTokenStream(tokenize(expr));
    const result = parse(stream);
    expect(result).toStrictEqual(
      new Identifier("a", [
        new IdentifierPathElement("b"),
        new Identifier("c", [
          new IdentifierPathElement("d"),
          new IdentifierPathElement(1),
        ]),
      ])
    );
    expect(stream.current).toStrictEqual(
      new Token(TOKEN_RBRACKET, "]", 10, expr)
    );
  });
  test("parse identifier followed by a comma", () => {
    const expr = "a.b[1],";
    const stream = new ExpressionTokenStream(tokenize(expr));
    const result = parse(stream);
    expect(result).toStrictEqual(
      new Identifier("a", [
        new IdentifierPathElement("b"),
        new IdentifierPathElement(1),
      ])
    );
    expect(stream.current).toStrictEqual(
      new Token(TOKEN_IDENT_INDEX, "1", 3, expr)
    );
  });
  test("parse up to comma", () => {
    const expr = "a, 'Hello'";
    const stream = new ExpressionTokenStream(tokenize(expr));
    const result = parse(stream);
    expect(result).toStrictEqual(new Identifier("a", []));
    expect(stream.current).toStrictEqual(new Token(TOKEN_IDENT, "a", 0, expr));
  });
});
