import {
  Identifier,
  IntegerLiteral,
  LoopExpression,
  RangeLiteral,
} from "../src/expression";
import { parse } from "../src/expressions/loop/parse";
import { Integer } from "../src/number";

describe("parse loop expression", () => {
  test("identifier", () => {
    const expr = parse("product in products");
    expect(expr).toStrictEqual(
      new LoopExpression("product", new Identifier("products", []))
    );
  });
  test("identifier with literal limit", () => {
    const expr = parse("product in products limit:2");
    expect(expr).toStrictEqual(
      new LoopExpression(
        "product",
        new Identifier("products", []),
        new IntegerLiteral(new Integer(2))
      )
    );
  });
  test("identifier with variable limit", () => {
    const expr = parse("product in products limit:max");
    expect(expr).toStrictEqual(
      new LoopExpression(
        "product",
        new Identifier("products", []),
        new Identifier("max", [])
      )
    );
  });
  test("identifier with literal offset", () => {
    const expr = parse("product in products offset:2");
    expect(expr).toStrictEqual(
      new LoopExpression(
        "product",
        new Identifier("products", []),
        undefined,
        new IntegerLiteral(new Integer(2))
      )
    );
  });
  test("identifier with variable offset", () => {
    const expr = parse("product in products offset:skip");
    expect(expr).toStrictEqual(
      new LoopExpression(
        "product",
        new Identifier("products", []),
        undefined,
        new Identifier("skip", [])
      )
    );
  });
  test("identifier with offset and limit", () => {
    const expr = parse("product in products limit: 2 offset:skip");
    expect(expr).toStrictEqual(
      new LoopExpression(
        "product",
        new Identifier("products", []),
        new IntegerLiteral(new Integer(2)),
        new Identifier("skip", [])
      )
    );
  });
  test("reversed", () => {
    const expr = parse("product in products reversed");
    expect(expr).toStrictEqual(
      new LoopExpression(
        "product",
        new Identifier("products", []),
        undefined,
        undefined,
        undefined,
        true
      )
    );
  });
  test("range literal with literal start and stop", () => {
    const expr = parse("i in (1..3)");
    expect(expr).toStrictEqual(
      new LoopExpression(
        "i",
        new RangeLiteral(
          new IntegerLiteral(new Integer(1)),
          new IntegerLiteral(new Integer(3))
        )
      )
    );
  });
});
