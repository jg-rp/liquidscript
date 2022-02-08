import {
  Token,
  TOKEN_EXPRESSION,
  TOKEN_LITERAL,
  TOKEN_STATEMENT,
  TOKEN_TAG,
} from "./token";

const enum MatchGroup {
  RAW = "raw",
  STA = "statement",
  RSS = "rightStripStatement",
  RST = "rightStripTag",
  RSL = "rightStripLiteral",
  TAG = "tagName",
  EXP = "tagExpression",
  LIT = "literal",
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function compileRegExp(
  tagStart = "{%",
  tagEnd = "%}",
  statementStart = "{{",
  statementEnd = "}}"
): RegExp {
  const ts = escapeRegExp(tagStart);
  const te = escapeRegExp(tagEnd);
  const ss = escapeRegExp(statementStart);
  const se = escapeRegExp(statementEnd);

  const rules = [
    `${ts}\\s*raw\\s*${te}(?<${MatchGroup.RAW}>.*?)${ts}\\s*endraw\\s*${te}`,
    `${ss}-?\\s*(?<${MatchGroup.STA}>.*?)\\s*(?<${MatchGroup.RSS}>-?)${se}`,
    `${ts}-?\\s*(?<${MatchGroup.TAG}>\\w*)\\s*` +
      `(?<${MatchGroup.EXP}>.*?)\\s*(?<${MatchGroup.RST}>-?)${te}`,
    `(?<${MatchGroup.LIT}>.+?(?=(?:(?:${ts}|${ss})(?<${MatchGroup.RSL}>-?))|$))`,
  ];

  return new RegExp(rules.join("|"), "gs");
}

const RE_P = compileRegExp();

interface StatementMatch {
  statement: string;
  rightStripStatement?: string;
}

interface TagMatch {
  tagName: string;
  tagExpression: string;
  rightStripTag: string;
}

interface LiteralMatch {
  literal: string;
  rightStripLiteral: string;
}

interface RawMatch {
  raw: string;
}

type MatchGroups = Readonly<
  Partial<RawMatch & LiteralMatch & TagMatch & StatementMatch>
>;

function isStatement(match: MatchGroups): match is StatementMatch {
  return match.statement === undefined ? false : true;
}

function isTag(match: MatchGroups): match is TagMatch {
  return match.tagName === undefined ? false : true;
}

function isLiteral(match: MatchGroups): match is LiteralMatch {
  return match.literal === undefined ? false : true;
}

function isRaw(match: MatchGroups): match is RawMatch {
  return match.raw === undefined ? false : true;
}

export function* tokenize(source: string): Generator<Token> {
  for (const match of source.matchAll(RE_P)) {
    // console.log(match);
    const groups = match.groups as MatchGroups;
    let leftStrip = false;

    if (isStatement(groups)) {
      leftStrip = !!groups.rightStripStatement;
      yield new Token(
        TOKEN_STATEMENT,
        groups.statement,
        <number>match.index,
        source
      );
    } else if (isTag(groups)) {
      leftStrip = !!groups.rightStripTag;
      yield new Token(TOKEN_TAG, groups.tagName, <number>match.index, source);
      yield new Token(
        TOKEN_EXPRESSION,
        groups.tagExpression,
        <number>match.index,
        source
      );
    } else if (isLiteral(groups)) {
      const rightStrip = !!groups.rightStripLiteral;
      if (leftStrip && rightStrip) {
        yield new Token(
          TOKEN_LITERAL,
          groups.literal.trim(),
          <number>match.index,
          source
        );
      } else if (leftStrip) {
        yield new Token(
          TOKEN_LITERAL,
          groups.literal.trimStart(),
          <number>match.index,
          source
        );
      } else if (rightStrip) {
        yield new Token(
          TOKEN_LITERAL,
          groups.literal.trimEnd(),
          <number>match.index,
          source
        );
      }
      leftStrip = false;
    } else if (isRaw(groups)) {
      yield new Token(TOKEN_LITERAL, groups.raw, <number>match.index, source);
    } else {
      throw Error(`unexpected token kind: ${match}`);
    }
  }
}
