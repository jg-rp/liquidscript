import { LiquidSyntaxError } from "../../errors";
import {
  Continue,
  CONTINUE,
  LoopArgument,
  LoopExpression,
  Identifier,
  RangeLiteral,
} from "../../expression";
import {
  makeParseRange,
  parseFloatLiteral,
  parseIdentifier,
  parseIntegerLiteral,
} from "../common";
import {
  ExpressionTokenStream,
  TOKEN_COLON,
  TOKEN_COLS,
  TOKEN_CONTINUE,
  TOKEN_EOF,
  TOKEN_FLOAT,
  TOKEN_IDENT,
  TOKEN_IN,
  TOKEN_INTEGER,
  TOKEN_LIMIT,
  TOKEN_LPAREN,
  TOKEN_OFFSET,
  TOKEN_REVERSED,
} from "../tokens";
import { tokenize } from "./lex";
import { parseObject as parseSimpleObject } from "../filtered/parse";

const LOOP_ARGS: ReadonlySet<string> = new Set([
  TOKEN_LIMIT,
  TOKEN_OFFSET,
  TOKEN_COLS,
]);

type parseFunc = (stream: ExpressionTokenStream) => LoopArgument;

const parseRange = makeParseRange(parseSimpleObject);

function parseContinue(): Continue {
  return CONTINUE;
}

export const TOKEN_MAP = new Map<string, parseFunc>([
  [TOKEN_IDENT, parseIdentifier],
  [TOKEN_INTEGER, parseIntegerLiteral],
  [TOKEN_FLOAT, parseFloatLiteral],
  [TOKEN_CONTINUE, parseContinue],
]);

function parseLoopArgument(stream: ExpressionTokenStream): LoopArgument {
  const pFunc = TOKEN_MAP.get(stream.current.kind);
  if (pFunc !== undefined) return pFunc(stream);
  throw new LiquidSyntaxError(
    `unexpected '${stream.current.value}'`,
    stream.current
  );
}

function parseLoopArguments(
  stream: ExpressionTokenStream
): [Map<string, LoopArgument>, boolean] {
  const args = new Map<string, LoopArgument>();
  let reversed = false;

  for (;;) {
    const tok = stream.current;
    if (tok.kind == TOKEN_EOF) break;
    if (LOOP_ARGS.has(tok.kind)) {
      stream.next();
      stream.expect(TOKEN_COLON);
      stream.next();
      args.set(tok.value, parseLoopArgument(stream));
      stream.next();
    } else if (tok.kind == TOKEN_REVERSED) {
      stream.next();
      reversed = true;
    } else {
      throw new LiquidSyntaxError(`unexpected '${tok.value}'`, tok);
    }
  }

  return [args, reversed];
}

export function parse(expr: string, lineNumber = 0): LoopExpression {
  const stream = new ExpressionTokenStream(tokenize(expr, lineNumber));
  stream.expect(TOKEN_IDENT);
  const name = stream.next().value;

  // Eat TOKEN_IN
  stream.expect(TOKEN_IN);
  stream.next();

  let expression: Identifier | RangeLiteral;

  if (stream.current.kind == TOKEN_IDENT) {
    expression = parseIdentifier(stream);
    stream.next();
  } else if (stream.current.kind == TOKEN_LPAREN) {
    expression = parseRange(stream);
    stream.next();
  } else {
    throw new LiquidSyntaxError(`invalid loop expression`, stream.current);
  }

  const [args, reversed] = parseLoopArguments(stream);
  return new LoopExpression(
    name,
    expression,
    args.get("limit"),
    args.get("offset"),
    args.get("cols"),
    reversed
  );
}
