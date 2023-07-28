import {
  Expression,
  FALSE,
  ExpressionFilter,
  FilteredExpression,
  FloatLiteral,
  IntegerLiteral,
  RangeLiteral,
  StringLiteral,
  TRUE,
  ConditionalExpression,
  NIL,
  PrefixExpression,
} from "../src/expression";
import { parse } from "../src/expressions/filtered/parse";
import {
  parse as parseConditionalExpression,
  parseWithParens as parseConditionalExpressionWithParens,
} from "../src/expressions/conditional/parse";
import { Float, Integer } from "../src/number";

describe("parse filtered expression", () => {
  test("string literal", () => {
    const expr = parse("'hello'");
    expect(expr).toStrictEqual(
      new FilteredExpression(new StringLiteral("hello")),
    );
  });
  test("integer literal", () => {
    const expr = parse("1");
    expect(expr).toStrictEqual(
      new FilteredExpression(new IntegerLiteral(new Integer(1))),
    );
  });
  test("float literal", () => {
    const expr = parse("1.1");
    expect(expr).toStrictEqual(
      new FilteredExpression(new FloatLiteral(new Float(1.1))),
    );
  });
  test("true literal", () => {
    const expr = parse("true");
    expect(expr).toStrictEqual(new FilteredExpression(TRUE));
  });
  test("false literal", () => {
    const expr = parse("false");
    expect(expr).toStrictEqual(new FilteredExpression(FALSE));
  });
  test("range literal", () => {
    const expr = parse("(1..3)");
    expect(expr).toStrictEqual(
      new FilteredExpression(
        new RangeLiteral(
          new IntegerLiteral(new Integer(1)),
          new IntegerLiteral(new Integer(3)),
        ),
      ),
    );
  });
  test("one filter with no args", () => {
    const expr = parse("'hello' | upcase");
    expect(expr).toStrictEqual(
      new FilteredExpression(new StringLiteral("hello"), [
        new ExpressionFilter("upcase"),
      ]),
    );
  });
  test("two filters with no args", () => {
    const expr = parse("'hello' | upcase | downcase");
    expect(expr).toStrictEqual(
      new FilteredExpression(new StringLiteral("hello"), [
        new ExpressionFilter("upcase"),
        new ExpressionFilter("downcase"),
      ]),
    );
  });
  test("one filter with positional args", () => {
    const expr = parse("'hello' | slice: 2, 4");
    expect(expr).toStrictEqual(
      new FilteredExpression(new StringLiteral("hello"), [
        new ExpressionFilter("slice", [
          new IntegerLiteral(new Integer(2)),
          new IntegerLiteral(new Integer(4)),
        ]),
      ]),
    );
  });
  test("one filter with positional and keyword args", () => {
    const expr = parse("'hello' | default: 2, allow_false:true");
    expect(expr).toStrictEqual(
      new FilteredExpression(new StringLiteral("hello"), [
        new ExpressionFilter(
          "default",
          [new IntegerLiteral(new Integer(2))],
          new Map<string, Expression>([["allow_false", TRUE]]),
        ),
      ]),
    );
  });
});

describe("parse conditional expression", () => {
  test("true condition", () => {
    const expr = parseConditionalExpression("'foo' if true");
    expect(expr).toStrictEqual(
      new ConditionalExpression(
        new FilteredExpression(new StringLiteral("foo"), []),
        [],
        TRUE,
        NIL,
      ),
    );
  });
  test("missing condition", () => {
    const expr = parseConditionalExpression("'foo' if");
    expect(expr).toStrictEqual(
      new ConditionalExpression(
        new FilteredExpression(new StringLiteral("foo"), []),
        [],
        FALSE,
        NIL,
      ),
    );
  });
});

describe("parse conditional expression with not", () => {
  test("simple negation", () => {
    const expr = parseConditionalExpressionWithParens("'foo' if not true");
    expect(expr).toStrictEqual(
      new ConditionalExpression(
        new FilteredExpression(new StringLiteral("foo"), []),
        [],
        new PrefixExpression("not", TRUE),
        NIL,
      ),
    );
  });
});
