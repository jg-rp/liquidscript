import {
  makeParseRange,
  parseBlank,
  parseBoolean,
  parseEmpty,
  parseFloatLiteral,
  parseIntegerLiteral,
  parseNil,
  parseStringLiteral,
  IDENT_TOKENS,
} from "../common";

import { LiquidSyntaxError } from "../../errors";
import {
  Expression,
  Identifier,
  IdentifierPath,
  IdentifierPathElement,
} from "../../expression";

import {
  ExpressionTokenStream,
  TOKEN_FLOAT,
  TOKEN_IDENT,
  TOKEN_INTEGER,
  TOKEN_LPAREN,
  TOKEN_STRING,
  TOKEN_TRUE,
  TOKEN_FALSE,
  TOKEN_NIL,
  TOKEN_EMPTY,
  TOKEN_BLANK,
  TOKEN_IDENT_INDEX,
  TOKEN_LBRACKET,
  TOKEN_RBRACKET,
  TOKEN_DOT,
} from "../tokens";

type parseFunc = (stream: ExpressionTokenStream) => Expression;

function parseIdentifier(stream: ExpressionTokenStream): Identifier {
  stream.expect(TOKEN_IDENT);

  if (!IDENT_TOKENS.has(stream.peek.kind)) {
    return new Identifier(stream.current.value, []);
  }

  const root = stream.next().value;
  const path: IdentifierPath = [];

  for (;;) {
    switch (stream.current.kind) {
      case TOKEN_IDENT:
        path.push(new IdentifierPathElement(stream.current.value));
        break;
      case TOKEN_IDENT_INDEX:
        path.push(new IdentifierPathElement(Number(stream.current.value)));
        break;
      case TOKEN_LBRACKET:
        stream.next();
        path.push(parseIdentifier(stream));
        stream.next();
        stream.expect(TOKEN_RBRACKET);
        break;
      case TOKEN_DOT:
        break;
    }

    if (IDENT_TOKENS.has(stream.peek.kind)) {
      stream.next();
    } else {
      break;
    }
  }

  return new Identifier(root, path);
}

const LITERAL_OR_IDENT_MAP = new Map<string, parseFunc>([
  [TOKEN_IDENT, parseIdentifier],
  [TOKEN_STRING, parseStringLiteral],
  [TOKEN_INTEGER, parseIntegerLiteral],
  [TOKEN_FLOAT, parseFloatLiteral],
  [TOKEN_NIL, parseNil],
  [TOKEN_TRUE, parseBoolean],
  [TOKEN_FALSE, parseBoolean],
  [TOKEN_BLANK, parseBlank],
  [TOKEN_EMPTY, parseEmpty],
  [TOKEN_LPAREN, makeParseRange(parse)],
]);

export function parse(stream: ExpressionTokenStream): Expression {
  const func = LITERAL_OR_IDENT_MAP.get(stream.current.kind);
  if (!func)
    throw new LiquidSyntaxError(
      `unexpected '${stream.current.value}'`,
      stream.current
    );

  return func(stream);
}
