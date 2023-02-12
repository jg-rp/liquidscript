import {
  ConditionalExpression,
  Expression,
  ExpressionFilter,
  FALSE,
  FilteredExpression,
  NIL,
} from "../../expression";
import { Token } from "../../token";
import {
  ExpressionTokenStream,
  TOKEN_DPIPE,
  TOKEN_ELSE,
  TOKEN_IF,
  TOKEN_PIPE,
} from "../tokens";
import { tokenize, tokenizeWithParens } from "./lex";
import {
  parseFilter,
  parseFromTokens as parseStandardFiltered,
} from "../filtered/parse";
import { parseObject as parseBooleanObject } from "../boolean";
import { parseObject as parseBooleanObjectWithParens } from "../boolean_not";

type TokenSplit = [Token[], Token[] | undefined];

function makeSplitAtFirst(tokenKind: string): (tokens: Token[]) => TokenSplit {
  function _splitAtFirst(tokens: Token[]): TokenSplit {
    const index = tokens.findIndex((t) => t.kind === tokenKind);
    if (index === -1) {
      return [tokens, undefined];
    }
    return [tokens.slice(0, index), tokens.slice(index + 1)];
  }
  return _splitAtFirst;
}

function* splitAtPipe(tokens: Iterable<Token>): Generator<Token[]> {
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

const splitAtFirstDoublePipe = makeSplitAtFirst(TOKEN_DPIPE);
const splitAtFirstIf = makeSplitAtFirst(TOKEN_IF);
const splitAtFirstElse = makeSplitAtFirst(TOKEN_ELSE);

export function parse(
  expr: string,
  startIndex: number = 0
): FilteredExpression {
  const [standardTokens, extendedTokens] = splitAtFirstIf(
    Array.from(tokenize(expr, startIndex))
  );
  const _expr = parseStandardFiltered(standardTokens[Symbol.iterator]());

  if (extendedTokens === undefined) {
    return _expr;
  }

  const [_conditionalTokens, tailFilterTokens] =
    splitAtFirstDoublePipe(extendedTokens);

  const [conditionalTokens, alternativeTokens] =
    splitAtFirstElse(_conditionalTokens);

  let condition: Expression;
  if (conditionalTokens.length === 0) {
    // An `if` with nothing after it.
    condition = FALSE;
  } else {
    condition = parseBooleanObject(
      new ExpressionTokenStream(conditionalTokens[Symbol.iterator]())
    );
  }

  let alternative: Expression;
  if (alternativeTokens === undefined || alternativeTokens.length === 0) {
    alternative = NIL;
  } else {
    alternative = parseStandardFiltered(alternativeTokens[Symbol.iterator]());
  }

  let tailFilters: ExpressionFilter[];
  if (tailFilterTokens === undefined) {
    tailFilters = [];
  } else {
    tailFilters = Array.from(splitAtPipe(tailFilterTokens)).map(parseFilter);
  }

  return new ConditionalExpression(_expr, tailFilters, condition, alternative);
}

export function parseWithParens(
  expr: string,
  startIndex: number = 0
): FilteredExpression {
  const [standardTokens, extendedTokens] = splitAtFirstIf(
    Array.from(tokenizeWithParens(expr, startIndex))
  );
  const _expr = parseStandardFiltered(standardTokens[Symbol.iterator]());

  if (extendedTokens === undefined) {
    return _expr;
  }

  const [_conditionalTokens, tailFilterTokens] =
    splitAtFirstDoublePipe(extendedTokens);

  const [conditionalTokens, alternativeTokens] =
    splitAtFirstElse(_conditionalTokens);

  let condition: Expression;
  if (conditionalTokens.length === 0) {
    // An `if` with nothing after it.
    condition = FALSE;
  } else {
    condition = parseBooleanObjectWithParens(
      new ExpressionTokenStream(conditionalTokens[Symbol.iterator]())
    );
  }

  let alternative: Expression;
  if (alternativeTokens === undefined || alternativeTokens.length === 0) {
    alternative = NIL;
  } else {
    alternative = parseStandardFiltered(alternativeTokens[Symbol.iterator]());
  }

  let tailFilters: ExpressionFilter[];
  if (tailFilterTokens === undefined) {
    tailFilters = [];
  } else {
    tailFilters = Array.from(splitAtPipe(tailFilterTokens)).map(parseFilter);
  }

  return new ConditionalExpression(_expr, tailFilters, condition, alternative);
}
