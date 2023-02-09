import {
  BooleanExpression,
  ConditionalExpression,
  Expression,
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

function splitAtFirst(
  kind: string
): (tokens: IterableIterator<Token>) => Generator<Token[]> {
  function* _splitAtFirst(tokens: IterableIterator<Token>): Generator<Token[]> {
    const buf: Token[] = [];
    for (const token of tokens) {
      if (token.kind === kind) {
        yield buf;
        yield Array.from(tokens);
        return;
      }
      buf.push(token);
    }
    yield buf;
  }
  return _splitAtFirst;
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

const splitAtFirstDoublePipe = splitAtFirst(TOKEN_DPIPE);
const splitAtFirstIf = splitAtFirst(TOKEN_IF);
const splitAtFirstElse = splitAtFirst(TOKEN_ELSE);

export function parse(
  expr: string,
  startIndex: number = 0
): FilteredExpression {
  const tokens = tokenize(expr, startIndex);
  const [standardTokens, extendedTokens] = splitAtFirstIf(tokens);
  const _expr = parseStandardFiltered(standardTokens[Symbol.iterator]());

  if (extendedTokens.length === 0) {
    return _expr;
  }

  const [_conditionalTokens, tailFilterTokens] = splitAtFirstDoublePipe(
    extendedTokens[Symbol.iterator]()
  );

  const [conditionalTokens, alternativeTokens] = splitAtFirstElse(
    _conditionalTokens[Symbol.iterator]()
  );

  let condition: BooleanExpression;
  if (conditionalTokens.length === 0) {
    // An `if` with nothing after it.
    condition = new BooleanExpression(FALSE);
  } else {
    condition = new BooleanExpression(
      parseBooleanObject(
        new ExpressionTokenStream(conditionalTokens[Symbol.iterator]())
      )
    );
  }

  let alternative: Expression;
  if (alternativeTokens.length === 0) {
    alternative = NIL;
  } else {
    alternative = parseStandardFiltered(alternativeTokens[Symbol.iterator]());
  }

  const tailFilters = Array.from(
    splitAtPipe(tailFilterTokens[Symbol.iterator]())
  ).map(parseFilter);

  return new ConditionalExpression(_expr, tailFilters, condition, alternative);
}

export function parseWithParens(
  expr: string,
  startIndex: number = 0
): FilteredExpression {
  const tokens = tokenizeWithParens(expr, startIndex);
  const [standardTokens, extendedTokens] = splitAtFirstIf(tokens);
  const _expr = parseStandardFiltered(standardTokens[Symbol.iterator]());

  if (extendedTokens.length === 0) {
    return _expr;
  }

  const [_conditionalTokens, tailFilterTokens] = splitAtFirstDoublePipe(
    extendedTokens[Symbol.iterator]()
  );

  const [conditionalTokens, alternativeTokens] = splitAtFirstElse(
    _conditionalTokens[Symbol.iterator]()
  );

  let condition: BooleanExpression;
  if (conditionalTokens.length === 0) {
    // An `if` with nothing after it.
    condition = new BooleanExpression(FALSE);
  } else {
    condition = new BooleanExpression(
      parseBooleanObjectWithParens(
        new ExpressionTokenStream(conditionalTokens[Symbol.iterator]())
      )
    );
  }

  let alternative: Expression;
  if (alternativeTokens.length === 0) {
    alternative = NIL;
  } else {
    alternative = parseStandardFiltered(alternativeTokens[Symbol.iterator]());
  }

  const tailFilters = Array.from(
    splitAtPipe(tailFilterTokens[Symbol.iterator]())
  ).map(parseFilter);

  return new ConditionalExpression(_expr, tailFilters, condition, alternative);
}
