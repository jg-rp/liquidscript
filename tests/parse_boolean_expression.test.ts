import {
  BooleanExpression,
  FALSE,
  FloatLiteral,
  Identifier,
  IdentifierPathElement,
  InfixExpression,
  IntegerLiteral,
  PrefixExpression,
  RangeLiteral,
  StringLiteral,
  TRUE,
} from "../src/expression";
import { parse as parseBoolean } from "../src/expressions/boolean/parse";
import { parse as parseBooleanNot } from "../src/expressions/boolean_not/parse";
import { Float, Integer } from "../src/number";

describe("parse standard boolean expressions", () => {
  test("string literal with double quotes", () => {
    const expr = '"hello"';
    const want = new BooleanExpression(new StringLiteral("hello"));
    expect(parseBoolean(expr)).toStrictEqual(want);
    expect(parseBooleanNot(expr)).toStrictEqual(want);
  });

  test("integer literal", () => {
    const expr = "7";
    const want = new BooleanExpression(new IntegerLiteral(new Integer(7)));
    expect(parseBoolean(expr)).toStrictEqual(want);
    expect(parseBooleanNot(expr)).toStrictEqual(want);
  });

  test("negative integer literal", () => {
    const expr = "-7";
    const want = new BooleanExpression(new IntegerLiteral(new Integer(-7)));
    expect(parseBoolean(expr)).toStrictEqual(want);
    expect(parseBooleanNot(expr)).toStrictEqual(want);
  });

  test("float literal", () => {
    const expr = "3.14";
    const want = new BooleanExpression(new FloatLiteral(new Float(3.14)));
    expect(parseBoolean(expr)).toStrictEqual(want);
    expect(parseBooleanNot(expr)).toStrictEqual(want);
  });

  test("negative float literal", () => {
    const expr = "-3.14";
    const want = new BooleanExpression(new FloatLiteral(new Float(-3.14)));
    expect(parseBoolean(expr)).toStrictEqual(want);
    expect(parseBooleanNot(expr)).toStrictEqual(want);
  });

  test("true equals true", () => {
    const expr = "true == true";
    const want = new BooleanExpression(new InfixExpression(TRUE, "==", TRUE));
    expect(parseBoolean(expr)).toStrictEqual(want);
    expect(parseBooleanNot(expr)).toStrictEqual(want);
  });

  test("true not equal to false", () => {
    const expr = "true != false";
    const want = new BooleanExpression(new InfixExpression(TRUE, "!=", FALSE));
    expect(parseBoolean(expr)).toStrictEqual(want);
    expect(parseBooleanNot(expr)).toStrictEqual(want);
  });

  test("alternate true not equal to false", () => {
    const expr = "true <> false";
    const want = new BooleanExpression(new InfixExpression(TRUE, "<>", FALSE));
    expect(parseBoolean(expr)).toStrictEqual(want);
    expect(parseBooleanNot(expr)).toStrictEqual(want);
  });

  test("identifier greater than integer", () => {
    const expr = "user.age > 21";
    const want = new BooleanExpression(
      new InfixExpression(
        new Identifier("user", [new IdentifierPathElement("age")]),
        ">",
        new IntegerLiteral(new Integer(21))
      )
    );
    expect(parseBoolean(expr)).toStrictEqual(want);
    expect(parseBooleanNot(expr)).toStrictEqual(want);
  });

  test("logical or", () => {
    const expr = "true or false";
    const want = new BooleanExpression(new InfixExpression(TRUE, "or", FALSE));
    expect(parseBoolean(expr)).toStrictEqual(want);
    expect(parseBooleanNot(expr)).toStrictEqual(want);
  });

  test("logical and", () => {
    const expr = "true and false";
    const want = new BooleanExpression(new InfixExpression(TRUE, "and", FALSE));
    expect(parseBoolean(expr)).toStrictEqual(want);
    expect(parseBooleanNot(expr)).toStrictEqual(want);
  });

  test("contains", () => {
    const expr = "product.tags contains 'sale'";
    const want = new BooleanExpression(
      new InfixExpression(
        new Identifier("product", [new IdentifierPathElement("tags")]),
        "contains",
        new StringLiteral("sale")
      )
    );
    expect(parseBoolean(expr)).toStrictEqual(want);
    expect(parseBooleanNot(expr)).toStrictEqual(want);
  });

  test("identifier equal to a range literal", () => {
    const expr = "x == (1..3)";
    const want = new BooleanExpression(
      new InfixExpression(
        new Identifier("x", []),
        "==",
        new RangeLiteral(
          new IntegerLiteral(new Integer(1)),
          new IntegerLiteral(new Integer(3))
        )
      )
    );
    expect(parseBoolean(expr)).toStrictEqual(want);
    expect(parseBooleanNot(expr)).toStrictEqual(want);
  });

  test("chained identifier with brackets", () => {
    const expr = "users[0]['age']";
    const want = new BooleanExpression(
      new Identifier("users", [
        new IdentifierPathElement(0),
        new IdentifierPathElement("age"),
      ])
    );
    expect(parseBoolean(expr)).toStrictEqual(want);
    expect(parseBooleanNot(expr)).toStrictEqual(want);
  });

  test("right associative", () => {
    const expr = "true and false and false or true";
    const want = new BooleanExpression(
      new InfixExpression(
        TRUE,
        "and",
        new InfixExpression(
          FALSE,
          "and",
          new InfixExpression(FALSE, "or", TRUE)
        )
      )
    );
    expect(parseBoolean(expr)).toStrictEqual(want);
    expect(parseBooleanNot(expr)).toStrictEqual(want);
  });
});

describe("parse boolean expressions including 'not' and parentheses", () => {
  test("not true", () => {
    const expr = "not true";
    const want = new BooleanExpression(new PrefixExpression("not", TRUE));
    expect(parseBooleanNot(expr)).toStrictEqual(want);
  });

  test("grouped", () => {
    const expr = "(true and false and false) or true";
    const want = new BooleanExpression(
      new InfixExpression(
        new InfixExpression(
          TRUE,
          "and",
          new InfixExpression(FALSE, "and", FALSE)
        ),
        "or",
        TRUE
      )
    );
    expect(parseBooleanNot(expr)).toStrictEqual(want);
  });
});
