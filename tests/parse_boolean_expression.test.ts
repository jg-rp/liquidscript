import {
  BooleanExpression,
  FALSE,
  FloatLiteral,
  Identifier,
  IdentifierPathElement,
  InfixExpression,
  IntegerLiteral,
  RangeLiteral,
  StringLiteral,
  TRUE,
} from "../src/expression";
import { parse } from "../src/expressions/boolean/parse";
import { Float, Integer } from "../src/number";

describe("parse boolean expression", () => {
  test("string literal with double quotes", () => {
    const expr = parse('"hello"');
    expect(expr).toStrictEqual(
      new BooleanExpression(new StringLiteral("hello"))
    );
  });
  test("integer literal", () => {
    const expr = parse("7");
    expect(expr).toStrictEqual(
      new BooleanExpression(new IntegerLiteral(new Integer(7)))
    );
  });
  test("negative integer literal", () => {
    const expr = parse("-7");
    expect(expr).toStrictEqual(
      new BooleanExpression(new IntegerLiteral(new Integer(-7)))
    );
  });
  test("float literal", () => {
    const expr = parse("3.14");
    expect(expr).toStrictEqual(
      new BooleanExpression(new FloatLiteral(new Float(3.14)))
    );
  });
  test("negative float literal", () => {
    const expr = parse("-3.14");
    expect(expr).toStrictEqual(
      new BooleanExpression(new FloatLiteral(new Float(-3.14)))
    );
  });
  test("true equals true", () => {
    const expr = parse("true == true");
    expect(expr).toStrictEqual(
      new BooleanExpression(new InfixExpression(TRUE, "==", TRUE))
    );
  });
  test("true not equal to false", () => {
    const expr = parse("true != false");
    expect(expr).toStrictEqual(
      new BooleanExpression(new InfixExpression(TRUE, "!=", FALSE))
    );
  });
  test("alternate true not equal to false", () => {
    const expr = parse("true <> false");
    expect(expr).toStrictEqual(
      new BooleanExpression(new InfixExpression(TRUE, "<>", FALSE))
    );
  });
  test("identifier greater than integer", () => {
    const expr = parse("user.age > 21");
    expect(expr).toStrictEqual(
      new BooleanExpression(
        new InfixExpression(
          new Identifier("user", [new IdentifierPathElement("age")]),
          ">",
          new IntegerLiteral(new Integer(21))
        )
      )
    );
  });
  test("logical or", () => {
    const expr = parse("true or false");
    expect(expr).toStrictEqual(
      new BooleanExpression(new InfixExpression(TRUE, "or", FALSE))
    );
  });
  test("logical and", () => {
    const expr = parse("true and false");
    expect(expr).toStrictEqual(
      new BooleanExpression(new InfixExpression(TRUE, "and", FALSE))
    );
  });
  test("contains", () => {
    const expr = parse("product.tags contains 'sale'");
    expect(expr).toStrictEqual(
      new BooleanExpression(
        new InfixExpression(
          new Identifier("product", [new IdentifierPathElement("tags")]),
          "contains",
          new StringLiteral("sale")
        )
      )
    );
  });
  test("identifier equal to a range literal", () => {
    const expr = parse("x == (1..3)");
    expect(expr).toStrictEqual(
      new BooleanExpression(
        new InfixExpression(
          new Identifier("x", []),
          "==",
          new RangeLiteral(
            new IntegerLiteral(new Integer(1)),
            new IntegerLiteral(new Integer(3))
          )
        )
      )
    );
  });
  test("chained identifier with brackets", () => {
    const expr = parse("users[0]['age']");
    expect(expr).toStrictEqual(
      new BooleanExpression(
        new Identifier("users", [
          new IdentifierPathElement(0),
          new IdentifierPathElement("age"),
        ])
      )
    );
  });
});
