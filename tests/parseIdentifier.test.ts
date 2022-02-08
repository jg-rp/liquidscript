import { tokenize } from "../src/expressions/filtered/lex";
import { ExpressionTokenStream } from "../src/expressions/tokens";
import { parseIdentifier } from "../src/expressions/common";
import {
  Expression,
  Identifier,
  IdentifierPathElement,
} from "../src/expression";

describe("parse identifier", () => {
  function _parse(expr: string): Expression {
    return parseIdentifier(new ExpressionTokenStream(tokenize(expr)));
  }

  test("simple identifier", () => {
    expect(_parse("products")).toStrictEqual(new Identifier("products", []));
  });
  test("chained identifier", () => {
    expect(_parse("product.colors")).toStrictEqual(
      new Identifier("product", [new IdentifierPathElement("colors")])
    );
  });
  test("chained identifier with bracketed quoted key", () => {
    expect(_parse("collection['products']")).toStrictEqual(
      new Identifier("collection", [new IdentifierPathElement("products")])
    );
  });
  test("identifier with integer index", () => {
    expect(_parse("products[0]")).toStrictEqual(
      new Identifier("products", [new IdentifierPathElement(0)])
    );
  });
  test("chained identifier following a bracketed key", () => {
    expect(_parse("collection['products'].first")).toStrictEqual(
      new Identifier("collection", [
        new IdentifierPathElement("products"),
        new IdentifierPathElement("first"),
      ])
    );
  });
  test("identifier bracketed identifier key", () => {
    expect(_parse("collection[name]")).toStrictEqual(
      new Identifier("collection", [new Identifier("name", [])])
    );
  });
  test("chained identifier inside brackets", () => {
    expect(_parse("link_lists[section.settings.menu]")).toStrictEqual(
      new Identifier("link_lists", [
        new Identifier("section", [
          new IdentifierPathElement("settings"),
          new IdentifierPathElement("menu"),
        ]),
      ])
    );
  });
  test("chained bracketed identifier inside brackets", () => {
    expect(_parse("collection.products[some.['object'].count]")).toStrictEqual(
      new Identifier("collection", [
        new IdentifierPathElement("products"),
        new Identifier("some", [
          new IdentifierPathElement("object"),
          new IdentifierPathElement("count"),
        ]),
      ])
    );
  });
});
