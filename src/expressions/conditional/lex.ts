import { LiquidSyntaxError } from "../../errors";
import { Token } from "../../token";

import {
  IDENT_INDEX_PATTERN,
  IDENT_STRING_PATTERN,
  IDENTIFIER_PATTERN,
  STRING_PATTERN,
  Tokenizer,
} from "../common";

import {
  OPERATORS,
  TOKEN_AND,
  TOKEN_BLANK,
  TOKEN_COLON,
  TOKEN_COMMA,
  TOKEN_CONTAINS,
  TOKEN_DOT,
  TOKEN_DPIPE,
  TOKEN_ELSE,
  TOKEN_EMPTY,
  TOKEN_FALSE,
  TOKEN_FLOAT,
  TOKEN_IDENT_INDEX,
  TOKEN_IDENT_STRING,
  TOKEN_IDENT,
  TOKEN_IF,
  TOKEN_ILLEGAL,
  TOKEN_INTEGER,
  TOKEN_LBRACKET,
  TOKEN_LPAREN,
  TOKEN_NEWLINE,
  TOKEN_NIL,
  TOKEN_NOT,
  TOKEN_NULL,
  TOKEN_OP,
  TOKEN_OR,
  TOKEN_PIPE,
  TOKEN_RANGE_LPAREN,
  TOKEN_RANGE,
  TOKEN_RBRACKET,
  TOKEN_RPAREN,
  TOKEN_SKIP,
  TOKEN_STRING,
  TOKEN_TRUE,
} from "../tokens";

const RULES = [
  [TOKEN_IDENT_INDEX, IDENT_INDEX_PATTERN],
  [TOKEN_IDENT_STRING, IDENT_STRING_PATTERN],
  [TOKEN_STRING, STRING_PATTERN],
  [TOKEN_RANGE, "\\.\\."],
  [TOKEN_FLOAT, "-?\\d+\\.(?!\\.)\\d*"],
  [TOKEN_INTEGER, "-?\\d+\\b"],
  [TOKEN_DOT, "\\."],
  [TOKEN_IDENT, IDENTIFIER_PATTERN],
  [TOKEN_LPAREN, "\\("],
  [TOKEN_RPAREN, "\\)"],
  [TOKEN_LBRACKET, "\\["],
  [TOKEN_RBRACKET, "]"],
  [TOKEN_COMMA, ","],
  [TOKEN_COLON, ":"],
  [TOKEN_DPIPE, "\\|\\|"],
  [TOKEN_PIPE, "\\|"],
  [TOKEN_NEWLINE, "\\n"],
  [TOKEN_OP, "[!=<>]{1,2}"],
  [TOKEN_SKIP, "[ \\t\\r]+"],
  [TOKEN_ILLEGAL, "."],
];

const KEYWORDS = new Set<string>([
  TOKEN_AND,
  TOKEN_BLANK,
  TOKEN_CONTAINS,
  TOKEN_ELSE,
  TOKEN_EMPTY,
  TOKEN_FALSE,
  TOKEN_IF,
  TOKEN_NIL,
  TOKEN_NULL,
  TOKEN_OR,
  TOKEN_TRUE,
]);

const EXTENDED_RULES = [[TOKEN_RANGE_LPAREN, "\\((?=.+?\\.\\.)"], ...RULES];
const EXTENDED_KEYWORDS = new Set<string>([...KEYWORDS, TOKEN_NOT]);

const RE = new RegExp(RULES.map(([n, p]) => `(?<${n}>${p})`).join("|"), "gs");
const EXTENDED_RE = new RegExp(
  EXTENDED_RULES.map(([n, p]) => `(?<${n}>${p})`).join("|"),
  "gs",
);

interface IdentIndexMatch {
  TOKEN_IDENT_INDEX: string;
  identIndex: string;
}

interface IdentStringMatch {
  TOKEN_IDENT_STRING: string;
  identQuoted: string;
}

interface StringMatch {
  TOKEN_STRING: string;
  quoted: string;
}

interface RangeLParenMatch {
  TOKEN_RANGE_LPAREN: string;
}

interface RangeMatch {
  TOKEN_RANGE: string;
}

interface FloatMatch {
  TOKEN_FLOAT: string;
}

interface IntegerMatch {
  TOKEN_INTEGER: string;
}

interface DotMatch {
  TOKEN_DOT: string;
}

interface IdentifierMatch {
  TOKEN_IDENT: string;
}

interface LParenMatch {
  TOKEN_LPAREN: string;
}

interface RParenMatch {
  TOKEN_RPAREN: string;
}

interface LBracketMatch {
  TOKEN_LBRACKET: string;
}

interface RBracketMatch {
  TOKEN_RBRACKET: string;
}

interface CommaMatch {
  TOKEN_COMMA: string;
}

interface ColonMatch {
  TOKEN_COLON: string;
}

interface PipeMatch {
  TOKEN_PIPE: string;
}

interface DoublePipeMatch {
  TOKEN_DPIPE: string;
}

interface NewlineMatch {
  TOKEN_NEWLINE: string;
}

interface OpMatch {
  TOKEN_OP: string;
}

interface SkipMatch {
  TOKEN_SKIP: string;
}

interface IllegalMatch {
  TOKEN_ILLEGAL: string;
}

type MatchGroups = Readonly<
  Partial<
    IdentIndexMatch &
      IdentStringMatch &
      StringMatch &
      RangeLParenMatch &
      RangeMatch &
      FloatMatch &
      IntegerMatch &
      DotMatch &
      IdentifierMatch &
      LParenMatch &
      RParenMatch &
      LBracketMatch &
      RBracketMatch &
      CommaMatch &
      ColonMatch &
      PipeMatch &
      DoublePipeMatch &
      NewlineMatch &
      OpMatch &
      SkipMatch &
      IllegalMatch
  >
>;

function isIdentIndexMatch(match: MatchGroups): match is IdentIndexMatch {
  return match.TOKEN_IDENT_INDEX === undefined ? false : true;
}

function isIdentStringMatch(match: MatchGroups): match is IdentStringMatch {
  return match.TOKEN_IDENT_STRING === undefined ? false : true;
}

function isStringMatch(match: MatchGroups): match is StringMatch {
  return match.TOKEN_STRING === undefined ? false : true;
}

function isRangeLParenMatch(match: MatchGroups): match is RangeLParenMatch {
  return match.TOKEN_RANGE_LPAREN === undefined ? false : true;
}

function isRangeMatch(match: MatchGroups): match is RangeMatch {
  return match.TOKEN_RANGE === undefined ? false : true;
}

function isFloatMatch(match: MatchGroups): match is FloatMatch {
  return match.TOKEN_FLOAT === undefined ? false : true;
}

function isIntegerMatch(match: MatchGroups): match is IntegerMatch {
  return match.TOKEN_INTEGER === undefined ? false : true;
}

function isDotMatch(match: MatchGroups): match is DotMatch {
  return match.TOKEN_DOT === undefined ? false : true;
}

function isIdentifierMatch(match: MatchGroups): match is IdentifierMatch {
  return match.TOKEN_IDENT === undefined ? false : true;
}

function isLParenMatch(match: MatchGroups): match is LParenMatch {
  return match.TOKEN_LPAREN === undefined ? false : true;
}

function isRParenMatch(match: MatchGroups): match is RParenMatch {
  return match.TOKEN_RPAREN === undefined ? false : true;
}

function isLBracketMatch(match: MatchGroups): match is LBracketMatch {
  return match.TOKEN_LBRACKET === undefined ? false : true;
}

function isRBracketMatch(match: MatchGroups): match is RBracketMatch {
  return match.TOKEN_RBRACKET === undefined ? false : true;
}

function isCommaMatch(match: MatchGroups): match is CommaMatch {
  return match.TOKEN_COMMA === undefined ? false : true;
}

function isColonMatch(match: MatchGroups): match is ColonMatch {
  return match.TOKEN_COLON === undefined ? false : true;
}

function isPipeMatch(match: MatchGroups): match is PipeMatch {
  return match.TOKEN_PIPE === undefined ? false : true;
}

function isDoublePipeMatch(match: MatchGroups): match is DoublePipeMatch {
  return match.TOKEN_DPIPE === undefined ? false : true;
}

function isNewlineMatch(match: MatchGroups): match is NewlineMatch {
  return match.TOKEN_NEWLINE === undefined ? false : true;
}

function isOpMatch(match: MatchGroups): match is OpMatch {
  return match.TOKEN_OP === undefined ? false : true;
}

function isSkipMatch(match: MatchGroups): match is SkipMatch {
  return match.TOKEN_SKIP === undefined ? false : true;
}

function isIllegalMatch(match: MatchGroups): match is IllegalMatch {
  return match.TOKEN_ILLEGAL === undefined ? false : true;
}

export function makeTokenizer(re: RegExp, keywords: Set<string>): Tokenizer {
  // eslint-disable-next-line sonarjs/cognitive-complexity
  return function* tokenize(
    source: string,
    startIndex: number = 0,
  ): Generator<Token> {
    for (const match of source.matchAll(re)) {
      const groups = match.groups as MatchGroups;
      if (isIdentifierMatch(groups)) {
        if (keywords.has(groups.TOKEN_IDENT))
          yield new Token(
            groups.TOKEN_IDENT,
            match[0],
            <number>match.index + startIndex,
            source,
          );
        else
          yield new Token(
            TOKEN_IDENT,
            groups.TOKEN_IDENT,
            <number>match.index + startIndex,
            source,
          );
      } else if (isIdentIndexMatch(groups))
        yield new Token(
          TOKEN_IDENT_INDEX,
          groups.identIndex,
          <number>match.index + startIndex,
          source,
        );
      else if (isIdentStringMatch(groups))
        yield new Token(
          TOKEN_IDENT,
          groups.identQuoted,
          <number>match.index + startIndex,
          source,
        );
      else if (isStringMatch(groups))
        yield new Token(
          TOKEN_STRING,
          groups.quoted,
          <number>match.index + startIndex,
          source,
        );
      else if (isNewlineMatch(groups) || isSkipMatch(groups)) continue;
      else if (isRangeLParenMatch(groups))
        yield new Token(
          TOKEN_RANGE_LPAREN,
          groups.TOKEN_RANGE_LPAREN,
          <number>match.index + startIndex,
          source,
        );
      else if (isRangeMatch(groups))
        yield new Token(
          TOKEN_RANGE,
          groups.TOKEN_RANGE,
          <number>match.index + startIndex,
          source,
        );
      else if (isFloatMatch(groups))
        yield new Token(
          TOKEN_FLOAT,
          groups.TOKEN_FLOAT,
          <number>match.index + startIndex,
          source,
        );
      else if (isIntegerMatch(groups))
        yield new Token(
          TOKEN_INTEGER,
          groups.TOKEN_INTEGER,
          <number>match.index + startIndex,
          source,
        );
      else if (isDotMatch(groups))
        yield new Token(
          TOKEN_DOT,
          groups.TOKEN_DOT,
          <number>match.index + startIndex,
          source,
        );
      else if (isLParenMatch(groups))
        yield new Token(
          TOKEN_LPAREN,
          groups.TOKEN_LPAREN,
          <number>match.index + startIndex,
          source,
        );
      else if (isRParenMatch(groups))
        yield new Token(
          TOKEN_RPAREN,
          groups.TOKEN_RPAREN,
          <number>match.index + startIndex,
          source,
        );
      else if (isLBracketMatch(groups))
        yield new Token(
          TOKEN_LBRACKET,
          groups.TOKEN_LBRACKET,
          <number>match.index + startIndex,
          source,
        );
      else if (isRBracketMatch(groups))
        yield new Token(
          TOKEN_RBRACKET,
          groups.TOKEN_RBRACKET,
          <number>match.index + startIndex,
          source,
        );
      else if (isCommaMatch(groups))
        yield new Token(
          TOKEN_COMMA,
          groups.TOKEN_COMMA,
          <number>match.index + startIndex,
          source,
        );
      else if (isColonMatch(groups))
        yield new Token(
          TOKEN_COLON,
          groups.TOKEN_COLON,
          <number>match.index + startIndex,
          source,
        );
      else if (isPipeMatch(groups))
        yield new Token(
          TOKEN_PIPE,
          groups.TOKEN_PIPE,
          <number>match.index + startIndex,
          source,
        );
      else if (isDoublePipeMatch(groups))
        yield new Token(
          TOKEN_DPIPE,
          groups.TOKEN_DPIPE,
          <number>match.index + startIndex,
          source,
        );
      else if (isOpMatch(groups)) {
        const op = OPERATORS.get(groups.TOKEN_OP);
        if (op === undefined)
          throw new LiquidSyntaxError(
            `unknown operator '${groups.TOKEN_OP}'`,
            new Token(
              TOKEN_ILLEGAL,
              groups.TOKEN_OP,
              <number>match.index + startIndex,
              source,
            ),
          );
        yield new Token(
          op,
          groups.TOKEN_OP,
          <number>match.index + startIndex,
          source,
        );
      } else if (isIllegalMatch(groups))
        throw new LiquidSyntaxError(
          `unexpected token '${groups.TOKEN_ILLEGAL}'`,
          new Token(
            TOKEN_ILLEGAL,
            groups.TOKEN_ILLEGAL,
            <number>match.index + startIndex,
            source,
          ),
        );
    }
  };
}

export const tokenize = makeTokenizer(RE, KEYWORDS);
export const tokenizeWithParens = makeTokenizer(EXTENDED_RE, EXTENDED_KEYWORDS);
