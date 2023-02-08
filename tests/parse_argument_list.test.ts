import { LiquidSyntaxError } from "../src/errors";
import {
  FALSE,
  FloatLiteral,
  Identifier,
  IdentifierPathElement,
  IntegerLiteral,
  NIL,
  StringLiteral,
  TRUE,
} from "../src/expression";
import {
  parse,
  parseCallArguments,
  parseMacroArguments,
} from "../src/expressions/arguments/parse";
import { TOKEN_ASSIGN } from "../src/expressions/tokens";
import { Float, Integer } from "../src/number";

describe("parse argument list", () => {
  test("empty expression", () => {
    const args = parse("");
    expect(args).toStrictEqual({});
  });

  test("string literal", () => {
    const args = parse("val: 'hello'");
    expect(args).toStrictEqual({ val: new StringLiteral("hello") });
  });

  test("string literal with no whitespace", () => {
    const args = parse("val:'hello'");
    expect(args).toStrictEqual({ val: new StringLiteral("hello") });
  });

  test("string literal with extra whitespace", () => {
    const args = parse("val :    'hello'");
    expect(args).toStrictEqual({ val: new StringLiteral("hello") });
  });

  test("multiple string arguments", () => {
    const args = parse("a: 'hello', b: 'goodbye', c: 'you'");
    expect(args).toStrictEqual({
      a: new StringLiteral("hello"),
      b: new StringLiteral("goodbye"),
      c: new StringLiteral("you"),
    });
  });

  test("multiple literal arguments", () => {
    const args = parse("a: 'hello', b: false, c: true, d: nil, e: 1, f: 1.1");
    expect(args).toStrictEqual({
      a: new StringLiteral("hello"),
      b: FALSE,
      c: TRUE,
      d: NIL,
      e: new IntegerLiteral(new Integer(1)),
      f: new FloatLiteral(new Float(1.1)),
    });
  });

  test("change argument separator", () => {
    const args = parse(
      "a='hello', b=false, c=true, d=nil, e=1, f=1.1",
      TOKEN_ASSIGN
    );
    expect(args).toStrictEqual({
      a: new StringLiteral("hello"),
      b: FALSE,
      c: TRUE,
      d: NIL,
      e: new IntegerLiteral(new Integer(1)),
      f: new FloatLiteral(new Float(1.1)),
    });
  });

  test("identifiers", () => {
    const args = parse(
      "a: title, b: product.title, c: products[0], d: products[0].title"
    );
    expect(args).toStrictEqual({
      a: new Identifier("title", []),
      b: new Identifier("product", [new IdentifierPathElement("title")]),
      c: new Identifier("products", [new IdentifierPathElement(0)]),
      d: new Identifier("products", [
        new IdentifierPathElement(0),
        new IdentifierPathElement("title"),
      ]),
    });
  });

  test("missing comma", () => {
    expect(() => parse("a: 'hello' b: 'goodbye'")).toThrow(LiquidSyntaxError);
    expect(() => parse("a: 'hello' b: 'goodbye'")).toThrow(
      "expected ',', found 'TOKEN_IDENT' (<string>:1)"
    );
  });

  test("too many commas", () => {
    expect(() => parse("a: 'hello',, b: 'goodbye'")).toThrow(LiquidSyntaxError);
    expect(() => parse("a: 'hello',, b: 'goodbye'")).toThrow(
      "expected 'TOKEN_IDENT', found ',' (<string>:1)"
    );
  });

  test("missing colon", () => {
    expect(() => parse("val 'hello'")).toThrow(LiquidSyntaxError);
    expect(() => parse("val 'hello'")).toThrow(
      "expected ':', found 'TOKEN_STRING' (<string>:1)"
    );
  });

  test("too many colons", () => {
    expect(() => parse("val:: 'hello'")).toThrow(LiquidSyntaxError);
    expect(() => parse("val:: 'hello'")).toThrow("unexpected ':' (<string>:1)");
  });
});

describe("parse macro argument list", () => {
  test("no default values", () => {
    expect(parseMacroArguments("'foo' x, y, z")).toStrictEqual([
      "foo",
      [
        ["x", NIL],
        ["y", NIL],
        ["z", NIL],
      ],
    ]);
  });
  test("with default values", () => {
    expect(parseMacroArguments("'foo' x:1, y:2, z:3")).toStrictEqual([
      "foo",
      [
        ["x", new IntegerLiteral(new Integer(1))],
        ["y", new IntegerLiteral(new Integer(2))],
        ["z", new IntegerLiteral(new Integer(3))],
      ],
    ]);
  });
  test("mix positional and keyword arguments", () => {
    expect(parseMacroArguments("'foo' x, y:2, z")).toStrictEqual([
      "foo",
      [
        ["x", NIL],
        ["y", new IntegerLiteral(new Integer(2))],
        ["z", NIL],
      ],
    ]);
  });
  test("leading comma", () => {
    expect(parseMacroArguments("'foo', x, y, z")).toStrictEqual([
      "foo",
      [
        ["x", NIL],
        ["y", NIL],
        ["z", NIL],
      ],
    ]);
  });
});

describe("parse call argument list", () => {
  test("positional values only", () => {
    expect(parseCallArguments("'foo' 1, 2, 3")).toStrictEqual([
      "foo",
      [
        ["", new IntegerLiteral(new Integer(1))],
        ["", new IntegerLiteral(new Integer(2))],
        ["", new IntegerLiteral(new Integer(3))],
      ],
    ]);
  });
  test("keyword arguments", () => {
    expect(parseCallArguments("'foo' x:1, y:2, z:3")).toStrictEqual([
      "foo",
      [
        ["x", new IntegerLiteral(new Integer(1))],
        ["y", new IntegerLiteral(new Integer(2))],
        ["z", new IntegerLiteral(new Integer(3))],
      ],
    ]);
  });
  test("mix positional and keyword arguments", () => {
    expect(parseCallArguments("'foo' 1, y:2, 3")).toStrictEqual([
      "foo",
      [
        ["", new IntegerLiteral(new Integer(1))],
        ["y", new IntegerLiteral(new Integer(2))],
        ["", new IntegerLiteral(new Integer(3))],
      ],
    ]);
  });
});
