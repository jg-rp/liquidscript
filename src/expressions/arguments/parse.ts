import { LiquidSyntaxError } from "../../errors";
import { Expression, NIL } from "../../expression";
import { parseUnchainedIdentifier } from "../common";
import { parseObject } from "../filtered/parse";
import {
  ExpressionTokenStream,
  TOKEN_ASSIGN,
  TOKEN_COLON,
  TOKEN_COMMA,
  TOKEN_EOF,
  TOKEN_IDENT,
  TOKEN_STRING,
} from "../tokens";
import { tokenize } from "./lex";

/** The value returned from an argument parser function. */
export type Argument = [string, Expression];

export type ArgumentParser = (
  stream: ExpressionTokenStream,
  separator: string,
) => Argument;

/**
 * An object mapping argument names to Liquid expressions.
 */
export type Arguments = {
  [index: string]: Expression;
};

export type ArgumentList = Argument[];

export type ArgumentListParser = (
  stream: ExpressionTokenStream,
) => ArgumentList;

/**
 * Return a function to parse keyword or named arguments from a stream of
 * expression tokens until the end of the stream.
 *
 * @param argumentParser - A function that will parse a single argument.
 * @param separatorTokenKind - The token kind that separates an argument's
 * key from its value.
 * @returns An object with string keys and `Expression` values.
 */
export function makeParseArguments(
  argumentParser: ArgumentParser,
  separatorTokenKind: string = TOKEN_COLON,
): ArgumentListParser {
  function _parseArguments(stream: ExpressionTokenStream): ArgumentList {
    const args: ArgumentList = [];
    // The first keyword argument might follow immediately or after a comma.
    if (stream.current.kind === TOKEN_COMMA) stream.next();

    while (stream.current.kind !== TOKEN_EOF) {
      args.push(argumentParser(stream, separatorTokenKind));
      stream.next();
      // Catch missing comma
      if (stream.current.kind !== TOKEN_EOF) stream.expect(TOKEN_COMMA);
      // Eat comma. Trailing commas are OK
      if (stream.current.kind === TOKEN_COMMA) stream.next();
    }

    return args;
  }

  return _parseArguments;
}

function parseArgument(
  stream: ExpressionTokenStream,
  separatorTokenKind: string,
): Argument {
  const key = parseUnchainedIdentifier(stream).toString();
  stream.next();
  stream.expect(separatorTokenKind);
  stream.next(); // Eat separator
  const val = parseObject(stream);
  stream.next();
  return [key, val];
}

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
  separatorTokenKind: string = TOKEN_COLON,
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

export const parseColonSeparatedArguments = makeParseArguments(
  parseArgument,
  TOKEN_COLON,
);

export const parseEqualsSeparatedArguments = makeParseArguments(
  parseArgument,
  TOKEN_ASSIGN,
);

function parseMacroArgument(
  stream: ExpressionTokenStream,
  separatorTokenKind: string,
): Argument {
  const key = parseUnchainedIdentifier(stream).toString();
  let val: Expression;
  if (stream.peek.kind === separatorTokenKind) {
    stream.next();
    // A keyword argument
    stream.next(); // Eat separator
    val = parseObject(stream);
  } else {
    // A positional argument
    val = NIL;
  }
  return [key, val];
}

function parseCallArgument(
  stream: ExpressionTokenStream,
  separatorTokenKind: string,
): Argument {
  let key: string;
  if (stream.peek.kind === separatorTokenKind) {
    // A keyword argument
    key = parseUnchainedIdentifier(stream).toString();
    stream.next();
    stream.next(); // Eat separator
  } else {
    // A positional argument
    key = "";
  }
  return [key, parseObject(stream)];
}

const _parseMacroArguments = makeParseArguments(
  parseMacroArgument,
  TOKEN_COLON,
);
const _parseCallArguments = makeParseArguments(parseCallArgument, TOKEN_COLON);

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
  startIndex: number = 1,
): Arguments {
  return parseArguments(
    new ExpressionTokenStream(tokenize(expr, startIndex)),
    separatorTokenKind,
  );
}

function parseMacroName(stream: ExpressionTokenStream): string {
  if (
    stream.current.kind === TOKEN_IDENT ||
    stream.current.kind === TOKEN_STRING
  ) {
    return stream.current.value;
  }

  throw new LiquidSyntaxError(
    `invalid macro name '${stream.current.value}'`,
    stream.current,
  );
}

/**
 * Parse a macro tag argument list.
 * @param expr - A macro tag expression.
 * @param startIndex - Location in the template source text where this
 * expression starts.
 * @returns An array of macro name and its argument list.
 */
export function parseMacroArguments(
  expr: string,
  startIndex: number = 1,
): [string, ArgumentList] {
  const stream = new ExpressionTokenStream(tokenize(expr, startIndex));
  const name = parseMacroName(stream);
  stream.next();
  return [name, _parseMacroArguments(stream)];
}

/**
 * Parse a call tag argument list.
 * @param expr - A call tag expression.
 * @param startIndex - Location in the template source text where this
 * expression starts.
 * @returns An array of macro name and the arguments it's being called with.
 */
export function parseCallArguments(
  expr: string,
  startIndex: number = 1,
): [string, ArgumentList] {
  const stream = new ExpressionTokenStream(tokenize(expr, startIndex));
  const name = parseMacroName(stream);
  stream.next();
  return [name, _parseCallArguments(stream)];
}
