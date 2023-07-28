import { LiquidSyntaxError } from "../../errors";
import {
  Expression,
  BooleanExpression,
  InfixExpression,
  PrefixExpression,
} from "../../expression";
import {
  makeParseRange,
  parseBlank,
  parseBoolean,
  parseEmpty,
  parseFloatLiteral,
  parseIdentifier,
  parseIntegerLiteral,
  parseNil,
  parseStringLiteral,
} from "../common";
import {
  ExpressionTokenStream,
  TOKEN_AND,
  TOKEN_BLANK,
  TOKEN_CONTAINS,
  TOKEN_EMPTY,
  TOKEN_EOF,
  TOKEN_EQ,
  TOKEN_FALSE,
  TOKEN_FLOAT,
  TOKEN_GE,
  TOKEN_GT,
  TOKEN_IDENT,
  TOKEN_INTEGER,
  TOKEN_LBRACKET,
  TOKEN_LE,
  TOKEN_LG,
  TOKEN_LPAREN,
  TOKEN_LT,
  TOKEN_NE,
  TOKEN_NIL,
  TOKEN_NOT,
  TOKEN_NULL,
  TOKEN_OR,
  TOKEN_RANGE_LPAREN,
  TOKEN_RPAREN,
  TOKEN_STRING,
  TOKEN_TRUE,
} from "../tokens";
import { tokenize } from "./lex";

const PRECEDENCE_LOWEST = 1;
const PRECEDENCE_LOGICAL_RIGHT = 3;
const PRECEDENCE_LOGICAL = 4;
const PRECEDENCE_RELATIONAL = 5;
const PRECEDENCE_MEMBERSHIP = 6;
const PRECEDENCE_PREFIX = 7;

const PRECEDENCES = new Map([
  [TOKEN_RPAREN, PRECEDENCE_LOWEST],
  [TOKEN_IDENT, PRECEDENCE_LOWEST],
  [TOKEN_EQ, PRECEDENCE_RELATIONAL],
  [TOKEN_LT, PRECEDENCE_RELATIONAL],
  [TOKEN_GT, PRECEDENCE_RELATIONAL],
  [TOKEN_NE, PRECEDENCE_RELATIONAL],
  [TOKEN_LG, PRECEDENCE_RELATIONAL],
  [TOKEN_LE, PRECEDENCE_RELATIONAL],
  [TOKEN_GE, PRECEDENCE_RELATIONAL],
  [TOKEN_CONTAINS, PRECEDENCE_MEMBERSHIP],
  [TOKEN_AND, PRECEDENCE_LOGICAL_RIGHT],
  [TOKEN_OR, PRECEDENCE_LOGICAL_RIGHT],
]);

type parseFunc = (stream: ExpressionTokenStream) => Expression;

export const TOKEN_MAP = new Map<string, parseFunc>([
  [TOKEN_FALSE, parseBoolean],
  [TOKEN_TRUE, parseBoolean],
  [TOKEN_NIL, parseNil],
  [TOKEN_NULL, parseNil],
  [TOKEN_EMPTY, parseEmpty],
  [TOKEN_BLANK, parseBlank],
  [TOKEN_STRING, parseStringLiteral],
  [TOKEN_INTEGER, parseIntegerLiteral],
  [TOKEN_FLOAT, parseFloatLiteral],
  [TOKEN_IDENT, parseIdentifier],
  [TOKEN_LBRACKET, parseIdentifier],
  [TOKEN_RANGE_LPAREN, makeParseRange(parseObject, TOKEN_RANGE_LPAREN)],
]);

const BINARY_OPERATORS = new Set([
  TOKEN_EQ,
  TOKEN_OR,
  TOKEN_AND,
  TOKEN_LT,
  TOKEN_GT,
  TOKEN_NE,
  TOKEN_LG,
  TOKEN_LE,
  TOKEN_GE,
  TOKEN_CONTAINS,
]);

export function parsePrefixExpression(
  stream: ExpressionTokenStream,
): PrefixExpression {
  const token = stream.next();
  return new PrefixExpression(
    token.value,
    parseObject(stream, PRECEDENCE_LOGICAL_RIGHT),
  );
}

TOKEN_MAP.set(TOKEN_NOT, parsePrefixExpression);

export function parseInfixExpression(
  stream: ExpressionTokenStream,
  left: Expression,
): InfixExpression {
  const token = stream.current;
  const precedence = PRECEDENCES.has(token.kind)
    ? PRECEDENCES.get(token.kind)
    : PRECEDENCE_LOWEST;
  stream.next();
  return new InfixExpression(
    left,
    token.value,
    parseObject(stream, precedence),
  );
}

export function parseObject(
  stream: ExpressionTokenStream,
  precedence: number = PRECEDENCE_LOWEST,
): Expression {
  const func = TOKEN_MAP.get(stream.current.kind);
  if (!func)
    throw new LiquidSyntaxError(
      `unexpected '${stream.current.value}'`,
      stream.current,
    );

  let left = func(stream);

  for (;;) {
    const pKind = stream.peek.kind;
    const pPrec = PRECEDENCES.has(pKind)
      ? PRECEDENCES.get(pKind)
      : PRECEDENCE_LOWEST;
    if (pKind === TOKEN_EOF || (pPrec as number) < precedence) break;
    if (!BINARY_OPERATORS.has(pKind)) return left;
    stream.next();
    left = parseInfixExpression(stream, left);
  }
  return left;
}

function parse_grouped_expression(stream: ExpressionTokenStream): Expression {
  stream.next();
  let expr = parseObject(stream);
  stream.next();

  while (stream.current.kind !== TOKEN_RPAREN) {
    if (stream.current.kind === TOKEN_EOF) {
      throw new LiquidSyntaxError("unbalanced parentheses", stream.current);
    }
    expr = parseInfixExpression(stream, expr);
  }

  stream.expect(TOKEN_RPAREN);
  return expr;
}

TOKEN_MAP.set(TOKEN_LPAREN, parse_grouped_expression);

/**
 * Parse an expression that follows Liquid `if` tag semantics plus a
 * logical `not` operator and grouping with parentheses.
 */
export function parse(expr: string, startIndex: number = 0): BooleanExpression {
  const stream = new ExpressionTokenStream(tokenize(expr, startIndex));
  const booleanExpression = new BooleanExpression(parseObject(stream));
  if (stream.peek.kind === TOKEN_RPAREN) {
    throw new LiquidSyntaxError("unmatched ')'", stream.peek);
  }
  if (stream.peek.kind !== TOKEN_EOF) {
    throw new LiquidSyntaxError(
      `unexpected '${stream.peek.value}'`,
      stream.peek,
    );
  }
  return booleanExpression;
}
