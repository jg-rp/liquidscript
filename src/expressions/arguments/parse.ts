import { Expression } from "../../expression";
import { parseUnchainedIdentifier } from "../common";
import { parseObject } from "../filtered/parse";
import {
  ExpressionTokenStream,
  TOKEN_COLON,
  TOKEN_COMMA,
  TOKEN_EOF,
} from "../tokens";
import { tokenize } from "./lex";

/**
 * An object mapping argument names to Liquid expressions.
 */
export type Arguments = {
  [index: string]: Expression;
};

/**
 * Parse keyword or named arguments from a stream of expression tokens
 * until the end of the stream.
 *
 * Each key/value pair is assumed to be separated by a comma. Leading and
 * trailing commas are OK.
 *
 * If the same key/name appears multiple times, the last occurrence in the
 * argument "list" will take priority.
 *
 * Values can be string, integer, float, true, false or nil literals, an
 * identifier or a range expression. An identifier value could be chained
 * using a mixture of dot and bracket notation.
 *
 * @param stream - A stream of expression tokens.
 * @param separatorTokenKind - The token kind that separates an arguments
 * key from its value.
 * @returns An object with string keys and `Expression` values.
 */
export function parseArguments(
  stream: ExpressionTokenStream,
  separatorTokenKind: string = TOKEN_COLON
): Arguments {
  const args: Arguments = {};
  // The first keyword argument might follow immediately or after a comma.
  if (stream.current.kind === TOKEN_COMMA) stream.next();

  while (stream.current.kind !== TOKEN_EOF) {
    const [key, expr] = parseArgument(stream, separatorTokenKind);
    args[key] = expr;
    // Catch missing comma
    if (stream.peek.kind !== TOKEN_EOF) stream.expect(TOKEN_COMMA);
    // Eat comma. Trailing commas are OK
    if (stream.current.kind === TOKEN_COMMA) stream.next();
  }

  return args;
}

/**
 * Parse keyword or named arguments from a Liquid expression string.
 *
 * Each key/value pair is assumed to be separated by a comma. Leading and
 * trailing commas are OK.
 *
 * If the same key/name appears multiple times, the last occurrence in the
 * argument "list" will take priority.
 *
 * Values can be string, integer, float, true, false or nil literals, an
 * identifier or a range expression. An identifier value could be chained
 * using a mixture of dot and bracket notation.
 *
 * @param expr - A Liquid expression containing zero or more keyword
 * arguments.
 * @param separatorTokenKind - The token kind that separates an arguments
 * key from its value.
 * @returns An object with string keys and `Expression` values.
 */
export function parse(
  expr: string,
  separatorTokenKind: string = TOKEN_COLON,
  startIndex: number = 1
): Arguments {
  return parseArguments(
    new ExpressionTokenStream(tokenize(expr, startIndex)),
    separatorTokenKind
  );
}

function parseArgument(
  stream: ExpressionTokenStream,
  separatorTokenKind: string
): [string, Expression] {
  const key = parseUnchainedIdentifier(stream).toString();
  stream.next();
  stream.expect(separatorTokenKind);
  stream.next(); // Eat separator
  const val = parseObject(stream);
  stream.next();
  return [key, val];
}
