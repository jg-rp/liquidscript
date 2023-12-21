import { LiquidSyntaxError } from "./errors";
import {
  Token,
  TOKEN_EXPRESSION,
  TOKEN_LITERAL,
  TOKEN_STATEMENT,
  TOKEN_TAG,
} from "./token";

enum MatchGroup {
  RAW = "raw",
  STA = "statement",
  RSS = "rightStripStatement",
  RST = "rightStripTag",
  RSL = "rightStripLiteral",
  RSR = "rightStripRaw",
  RSE = "rightStripEndRaw",
  TAG = "tagName",
  EXP = "tagExpression",
  PRE = "tagPreamble",
  LIT = "literal",
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function compileRules(
  statementStart = "{{",
  statementEnd = "}}",
  tagStart = "{%",
  tagEnd = "%}",
): RegExp {
  const ts = escapeRegExp(tagStart);
  const te = escapeRegExp(tagEnd);
  const ss = escapeRegExp(statementStart);
  const se = escapeRegExp(statementEnd);

  const rules = [
    `${ts}-?\\s*raw\\s*(?<${MatchGroup.RSR}>-?)${te}(?<${MatchGroup.RAW}>.*?)` +
      `${ts}-?\\s*endraw\\s*(?<${MatchGroup.RSE}>-?)${te}`,
    `${ss}-?\\s*(?<${MatchGroup.STA}>.*?)\\s*(?<${MatchGroup.RSS}>-?)${se}`,
    `(?<${MatchGroup.PRE}>${ts}-?\\s*(?<${MatchGroup.TAG}>#|\\w*)\\s*)` +
      `(?<${MatchGroup.EXP}>.*?)\\s*(?<${MatchGroup.RST}>-?)${te}`,
    `(?<${MatchGroup.LIT}>.+?(?=(?:(?:${ts}|${ss})(?<${MatchGroup.RSL}>-?))|$))`,
  ];

  return new RegExp(rules.join("|"), "gs");
}

interface StatementMatch {
  statement: string;
  rightStripStatement?: string;
}

interface TagMatch {
  tagName: string;
  tagPreamble: string;
  tagExpression: string;
  rightStripTag: string;
}

interface LiteralMatch {
  literal: string;
  rightStripLiteral: string;
}

interface RawMatch {
  raw: string;
  rightStripEndRaw: string;
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

/**
 * Return a generator function for tokenizing liquid templates.
 */
export function tokenizerFor(
  rules: RegExp,
  statementStart = "{{",
  statementEnd = "}}",
  tagStart = "{%",
  tagEnd = "%}",
): (source: string) => Generator<Token> {
  // eslint-disable-next-line sonarjs/cognitive-complexity
  function* _tokenize(source: string): Generator<Token> {
    let leftStrip = false;
    for (const match of source.matchAll(rules)) {
      const groups = match.groups as MatchGroups;
      if (isStatement(groups)) {
        leftStrip = !!groups.rightStripStatement;
        yield new Token(
          TOKEN_STATEMENT,
          groups.statement,
          <number>match.index,
          source,
        );
      } else if (isTag(groups)) {
        leftStrip = !!groups.rightStripTag;
        yield new Token(TOKEN_TAG, groups.tagName, <number>match.index, source);
        if (groups.tagExpression.length)
          yield new Token(
            TOKEN_EXPRESSION,
            groups.tagExpression,
            <number>match.index + groups.tagPreamble.length,
            source,
          );
      } else if (isLiteral(groups)) {
        let value = groups.literal;
        // Whitespace control
        const rightStrip = !!groups.rightStripLiteral;
        if (leftStrip && rightStrip) value = value.trim();
        else if (leftStrip) value = value.trimStart();
        else if (rightStrip) value = value.trimEnd();
        // Reset for next literal
        leftStrip = false;

        // Assume a template literal that starts with "{{" or "{%" is an error.
        // As per the reference implementation.
        if (value.startsWith(statementStart))
          throw new LiquidSyntaxError(
            `expected '${statementEnd}', found 'eof'`,
            new Token(TOKEN_LITERAL, value, <number>match.index, source),
          );
        if (value.startsWith(tagStart))
          throw new LiquidSyntaxError(
            `expected '${tagEnd}', found 'eof'`,
            new Token(TOKEN_LITERAL, value, <number>match.index, source),
          );

        yield new Token(TOKEN_LITERAL, value, <number>match.index, source);
      } else if (isRaw(groups)) {
        leftStrip = !!groups.rightStripEndRaw;
        yield new Token(TOKEN_LITERAL, groups.raw, <number>match.index, source);
      } else {
        throw Error(`unexpected token kind: ${match}`);
      }
    }
  }
  return _tokenize;
}
