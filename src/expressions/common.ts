import { LiquidSyntaxError } from "../errors";
import {
  BLANK,
  Blank,
  BooleanLiteral,
  EMPTY,
  Empty,
  Expression,
  FALSE,
  Identifier,
  IdentifierPath,
  IdentifierPathElement,
  NIL,
  Nil,
  IntegerLiteral,
  FloatLiteral,
  RangeLiteral,
  StringLiteral,
  TRUE,
} from "../expression";
import { Float, Integer } from "../number";

import {
  ExpressionTokenStream,
  TOKEN_DOT,
  TOKEN_FLOAT,
  TOKEN_IDENT,
  TOKEN_IDENT_INDEX,
  TOKEN_INTEGER,
  TOKEN_LBRACKET,
  TOKEN_LPAREN,
  TOKEN_RANGE,
  TOKEN_RBRACKET,
  TOKEN_RPAREN,
  TOKEN_STRING,
  TOKEN_TRUE,
} from "./tokens";

const enum MatchGroup {
  QUOTE = "quote",
  QUOTED = "quoted",
  IDENT_INDEX = "identIndex",
  IDENT_QUOTE = "identQuote",
  IDENT_QUOTED = "identQuoted",
}

// Optional trailing question mark.
export const IDENTIFIER_PATTERN = "[a-zA-Z_][\\w\\-]*\\??";

// Trailing question mark is not allowed in assignment names.
export const ASSIGN_IDENTIFIER_PATTERN = "[a-zA-Z_][\\w\\-]*";

// ["ident"] or ['ident']
export const IDENT_STRING_PATTERN =
  `\\[\\s*(?<${MatchGroup.IDENT_QUOTE}>["'])` +
  `(?<${MatchGroup.IDENT_QUOTED}>.*?)` +
  `\\k<${MatchGroup.IDENT_QUOTE}>\\s*]`;

// [0] or [-1]
export const IDENT_INDEX_PATTERN = `\\[\\s*(?<${MatchGroup.IDENT_INDEX}>\\-?\\d+)\\s*]`;

// 'something' or "something"
export const STRING_PATTERN =
  `(?<${MatchGroup.QUOTE}>['"])` +
  `(?<${MatchGroup.QUOTED}>.*?)` +
  `\\k<${MatchGroup.QUOTE}>`;

export function parseBoolean(stream: ExpressionTokenStream): BooleanLiteral {
  return stream.current.kind === TOKEN_TRUE ? TRUE : FALSE;
}

export function parseNil(): Nil {
  return NIL;
}

export function parseEmpty(): Empty {
  return EMPTY;
}

export function parseBlank(): Blank {
  return BLANK;
}

export function parseStringLiteral(
  stream: ExpressionTokenStream
): StringLiteral {
  return new StringLiteral(stream.current.value);
}

export function parseIntegerLiteral(
  stream: ExpressionTokenStream
): IntegerLiteral {
  return new IntegerLiteral(new Integer(Number(stream.current.value)));
}

export function parseFloatLiteral(stream: ExpressionTokenStream): FloatLiteral {
  return new FloatLiteral(new Float(Number(stream.current.value)));
}

export const IDENT_TOKENS = new Set<string>([
  TOKEN_IDENT,
  TOKEN_IDENT_INDEX,
  TOKEN_LBRACKET,
  TOKEN_DOT,
]);

export function parseIdentifier(stream: ExpressionTokenStream): Identifier {
  stream.expect(TOKEN_IDENT);
  const root = stream.current.value;
  stream.next();
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
        // Eat close bracket
        stream.next();
        stream.expect(TOKEN_RBRACKET);
        break;
      case TOKEN_FLOAT:
        throw new LiquidSyntaxError(
          `expected an identifier, found ${stream.current.value}`,
          stream.current
        );
      case TOKEN_DOT:
        break;
      default:
        stream.push(stream.current);
        return new Identifier(root, path);
    }
    stream.next();
  }
}

/**
 *
 * @param stream
 * @returns
 */
export function parseStringOrIdentifier(
  stream: ExpressionTokenStream
): StringLiteral | Identifier {
  let expression: StringLiteral | Identifier;
  switch (stream.current.kind) {
    case TOKEN_IDENT:
      expression = parseIdentifier(stream);
      break;
    case TOKEN_STRING:
      expression = parseStringLiteral(stream);
      break;
    default:
      throw new LiquidSyntaxError(
        `expected identifier or string, found '${String(stream.current.kind)}'`,
        stream.current
      );
  }
  return expression;
}

const RANGE_OBJ_TOKENS = new Set<string>([
  TOKEN_IDENT,
  TOKEN_INTEGER,
  TOKEN_FLOAT,
]);

/**
 *
 * @param stream
 * @returns
 */
export function parseUnchainedIdentifier(
  stream: ExpressionTokenStream
): Identifier {
  const token = stream.current;
  const identifier = parseIdentifier(stream);
  if (identifier.path.length)
    throw new LiquidSyntaxError(`invalid identifier '${identifier}'`, token);
  return identifier;
}

/**
 *
 * @param parseObj
 * @returns
 */
export function makeParseRange(
  parseObj: (stream: ExpressionTokenStream) => Expression
): (stream: ExpressionTokenStream) => RangeLiteral {
  function _parseRangeLiteral(stream: ExpressionTokenStream): RangeLiteral {
    // Eat open parenthesis
    stream.expect(TOKEN_LPAREN);
    stream.next();

    // Parse start
    if (!RANGE_OBJ_TOKENS.has(stream.current.kind))
      throw new LiquidSyntaxError(
        `unexpected ${stream.current.value} in range expression`,
        stream.current
      );

    const start = parseObj(stream);
    stream.next();

    // Eat range token
    stream.expect(TOKEN_RANGE);
    stream.next();

    // Parse start
    if (!RANGE_OBJ_TOKENS.has(stream.current.kind))
      throw new LiquidSyntaxError(
        `unexpected ${stream.current.value} in range expression`,
        stream.current
      );

    const stop = parseObj(stream);

    // Eat close parenthesis
    stream.next();
    stream.expect(TOKEN_RPAREN);

    return new RangeLiteral(start, stop);
  }
  return _parseRangeLiteral;
}
