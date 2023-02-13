import { LiquidSyntaxError } from "../../errors";
import {
  Expression,
  ExpressionFilter,
  FilteredExpression,
} from "../../expression";
import { Token } from "../../token";
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
  TOKEN_BLANK,
  TOKEN_COLON,
  TOKEN_COMMA,
  TOKEN_EMPTY,
  TOKEN_EOF,
  TOKEN_FALSE,
  TOKEN_FLOAT,
  TOKEN_IDENT,
  TOKEN_INTEGER,
  TOKEN_LBRACKET,
  TOKEN_LPAREN,
  TOKEN_NIL,
  TOKEN_NULL,
  TOKEN_PIPE,
  TOKEN_STRING,
  TOKEN_TRUE,
} from "../tokens";
import { tokenize } from "./lex";

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
]);

export function parseObject(stream: ExpressionTokenStream): Expression {
  const func = TOKEN_MAP.get(stream.current.kind);
  if (func) return func(stream);
  throw new LiquidSyntaxError(
    `unexpected '${stream.current.value}'`,
    stream.current
  );
}

TOKEN_MAP.set(TOKEN_LPAREN, makeParseRange(parseObject));

function* splitAtFirstPipe(
  tokens: IterableIterator<Token>
): Generator<Token[]> {
  const buf: Token[] = [];
  for (const token of tokens) {
    if (token.kind === TOKEN_PIPE) {
      yield buf;
      yield Array.from(tokens);
      return;
    }
    buf.push(token);
  }
  yield buf;
}

function* splitAtPipe(tokens: IterableIterator<Token>): Generator<Token[]> {
  let buf: Token[] = [];
  for (const token of tokens) {
    if (token.kind === TOKEN_PIPE) {
      yield buf;
      buf = [];
    } else {
      buf.push(token);
    }
  }
  yield buf;
}

export function parseFilter(tokens: Token[]): ExpressionFilter {
  const stream = new ExpressionTokenStream(tokens.values());

  stream.expect(TOKEN_IDENT);
  const name = stream.next().value;

  // Shortcut for filters with no arguments.
  if (stream.current.kind === TOKEN_EOF) return new ExpressionFilter(name);

  // Eat colon
  stream.expect(TOKEN_COLON);
  stream.next();

  const args: Expression[] = [];
  const kwargs = new Map<string, Expression>();

  while (stream.current.kind !== TOKEN_EOF) {
    if (stream.peek.kind === TOKEN_COLON) {
      // A keyword argument
      const kw = stream.next().value;
      // Eat colon
      stream.expect(TOKEN_COLON);
      stream.next();
      kwargs.set(kw, parseObject(stream));
    } else {
      // A positional argument
      args.push(parseObject(stream));
    }

    // Eat comma
    stream.next();
    if (stream.current.kind !== TOKEN_EOF) {
      stream.expect(TOKEN_COMMA);
      stream.next();
    }
  }

  return new ExpressionFilter(name, args, kwargs);
}

export function parseFromTokens(
  tokens: IterableIterator<Token>
): FilteredExpression {
  const parts = Array.from(splitAtFirstPipe(tokens));

  if (parts.length === 1) {
    return new FilteredExpression(
      parseObject(new ExpressionTokenStream(parts[0].values()))
    );
  }

  return new FilteredExpression(
    parseObject(new ExpressionTokenStream(parts[0].values())),
    Array.from(splitAtPipe(parts[1].values())).map(parseFilter)
  );
}

export function parse(
  expr: string,
  startIndex: number = 0
): FilteredExpression {
  return parseFromTokens(tokenize(expr, startIndex));
}
