import { Lexer, type StateFn } from "./lexer";
import { T } from "./token";

const reCommentSegment = /\{%-?\s*(comment|raw|endcomment|endraw).*?-?%\}/gs;
const reFloat = /-?\d+\.\d+/y;
const reIdent = /[a-zA-Z_][a-zA-Z0-9_]*\??/y;
const reInt = /-?\d+/y;
const reLineCommentSegment = /\n\s*(comment|endcomment).*/g;
const reLineTrivia = /[ \t\f]+/y;
const reMarkup = /\{[%{]/y;
const reMarkupStart = /\{[%{]/g;
const reOutEnd = /-?(\}\}?|%\}(?!\}))/g;
const rePunctuation = /[.!=<>]{1,2}|[?[\]|:,()]/y;
const reTagEnd = /-?%\}/y;
const reTagEndIndex = /-?%\}/g;
const reTagName = /#|[a-zA-Z0-9_]+/y;
const reTrivia = /[ \n\r\t\f]+/y;

// Symbols and words that get their own token kind.
const tokenMap: { [key: string]: (typeof T)[keyof typeof T] } = {
  true: T.TRUE,
  false: T.FALSE,
  nil: T.NIL,
  null: T.NIL,
  and: T.AND,
  or: T.OR,
  contains: T.CONTAINS,
  in: T.IN,
  "[": T.LBRACKET,
  "]": T.RBRACKET,
  "|": T.PIPE,
  ".": T.DOT,
  "..": T.DOUBLE_DOT,
  ",": T.COMMA,
  ":": T.COLON,
  "(": T.LPAREN,
  ")": T.RPAREN,
  "=": T.ASSIGN,
  "<": T.LT,
  "<=": T.LE,
  "<>": T.NE,
  ">": T.GT,
  ">=": T.GE,
  "==": T.EQ,
  "!=": T.NE,
  "#": T.HASH,
};

/**
 * A single pass template tokenizer that matches Shopify/liquid v5.12.0 strict
 * mode syntax and semantics.
 */
export class LegacyLexer extends Lexer {
  override scanMarkup(): StateFn | null {
    let limit: number | undefined;

    for (;;) {
      switch (this.scan(reMarkup)) {
        case "{{":
          // Output statements can be closed by `}}`, `}` or `%}`.
          // Markup delimiters are greedy and not string literal aware.
          // This greediness will be an issue if we ever try to support
          // JSON-style object literals.
          limit = this.index(reOutEnd);

          if (limit === undefined) {
            // Not markup and no more '}'. Emit text to end of string.
            this.pos = this.source.length;
            this.emit(T.TEXT);
            return null;
          }

          this.emit(T.OUT_START);
          this.acceptWhitespaceControl();
          this.acceptExpression(limit);
          this.skip(reTrivia);
          this.acceptWhitespaceControl();
          this.scan(reOutEnd);
          this.emit(T.OUT_END);
          break;
        case "{%":
          // Tags must be closed by `%}`.
          // Markup delimiters are greedy and not string literal aware.
          limit = this.index(reTagEndIndex);

          if (limit !== undefined) {
            this.emit(T.TAG_START);
            this.acceptWhitespaceControl();
            this.skip(reTrivia);
            this.acceptTag(limit);
            break;
          }

        // No more `%}`, but there could be `{{` and `}}`. Fall through.
        // eslint-disable-next-line no-fallthrough
        default:
          if (this.scanUntil(reMarkupStart)) {
            this.emit(T.TEXT);
          } else {
            // No more markup. Emit text to end of string.
            this.pos = this.source.length;
            if (this.start < this.pos) {
              this.emit(T.TEXT);
            }
            return null;
          }
      }
    }
  }

  protected acceptTag(limit: number): void {
    const tagName = this.scan(reTagName);

    if (tagName) {
      this.emit(T.TAG_NAME);
    }

    switch (tagName) {
      case "#":
        this.acceptInlineComment(limit);
        break;
      case "comment":
        this.acceptBlockComment(limit);
        break;
      case "doc":
        this.acceptDocComment(limit);
        break;
      case "raw":
        this.acceptRawTag(limit);
        break;
      case "liquid":
        this.acceptLineStatements(limit);
        break;
      default:
        this.acceptExpression(limit);
        this.skip(reTrivia);
        this.acceptWhitespaceControl();
        this.scan(reTagEnd);
        this.emit(T.TAG_END);
    }
  }

  protected acceptInlineComment(limit: number): void {
    this.pos = limit;
    this.emit(T.COMMENT);
    this.acceptWhitespaceControl();
    this.pos += 2;
    this.emit(T.TAG_END);
  }

  protected acceptBlockComment(limit: number): void {
    this.skip(reTrivia);
    // Ignore any "expression".
    this.pos = limit;
    this.acceptWhitespaceControl();
    this.scan(reTagEnd);
    this.emit(T.TAG_END);

    let commentDepth = 1;
    let rawDepth = 0;
    let match: RegExpExecArray | undefined;

    // Find the matching `{% endcomment %}`, allowing fully-formed nested
    // comment and raw blocks.
    for (;;) {
      match = this.skipUntil(reCommentSegment);

      if (!match) {
        this.emit(T.UNKNOWN);
        break;
      }

      switch (match[1]) {
        case "comment":
          commentDepth += 1;
          this.pos += match[0].length;
          break;
        case "raw":
          rawDepth += 1;
          this.pos += match[0].length;
          break;
        case "endraw":
          if (rawDepth > 0) {
            rawDepth -= 1;
          }
          this.pos += match[0].length;
          break;
        case "endcomment":
          if (rawDepth > 0) {
            this.pos += match[0].length;
            continue;
          }

          commentDepth -= 1;

          if (commentDepth > 0) {
            this.pos += match[0].length;
            continue;
          }

          this.emit(T.COMMENT);
          // Leave the `{% endcomment %}` for scanMarkup.
          return;
        default:
          throw new Error("unreachable");
      }
    }
  }

  protected acceptDocComment(limit: number): void {
    // Let the parser handle unexpected expression tokens.
    this.acceptExpression(limit);
    this.skip(reTrivia);
    this.acceptWhitespaceControl();
    this.scan(reTagEnd);
    this.emit(T.TAG_END);

    if (this.scanUntil(/\{%-?\s*enddoc\s*-?%\}/g)) {
      this.emit(T.COMMENT);
    }

    // Leave `{% enddoc %}` for scanMarkup.
  }

  protected acceptRawTag(limit: number): void {
    // Let the parser handle unexpected expression tokens.
    this.acceptExpression(limit);
    this.skip(reTrivia);
    this.acceptWhitespaceControl();
    this.scan(reTagEnd);
    this.emit(T.TAG_END);

    if (this.scanUntil(/\{%-?\s*endraw\s*-?%\}/g)) {
      this.emit(T.TEXT);
    }

    // Leave `{% endraw %}` for scanMarkup.
  }

  protected acceptLineStatements(limit: number): void {
    let lineLimit: number | undefined;

    while (this.pos < limit) {
      this.skip(reTrivia);
      lineLimit = this.source.indexOf("\n", this.pos) || limit;

      this.emit(T.TAG_START);

      switch (this.scan(reTagName)) {
        case "#":
          this.emit(T.TAG_NAME);
          this.pos = lineLimit;
          this.emit(T.COMMENT);
          this.emit(T.TAG_END);
          break;
        case "comment":
          this.emit(T.TAG_NAME);
          this.emit(T.TAG_END);
          this.acceptLineBlockComment(limit);
          break;
        case "doc":
          this.emit(T.TAG_NAME);
          this.acceptLineDocComment(limit);
          break;
        case "raw":
          this.emit(T.TAG_NAME);
          this.acceptLineRawTag(limit);
          break;
        case undefined:
          // Remove empty TAG_START.
          this.tokens.pop();
          break;
        default:
          this.emit(T.TAG_NAME);
          this.acceptExpression(lineLimit, reLineTrivia);
          this.emit(T.TAG_END);
      }
    }

    this.skip(reTrivia);
    this.acceptWhitespaceControl();
    this.scan(reTagEnd);
    this.emit(T.TAG_END);
  }

  protected acceptLineBlockComment(limit: number): void {
    let commentDepth = 1;
    let index: number | undefined;
    let match: RegExpExecArray | undefined;

    while (this.pos < limit) {
      index = this.index(reLineCommentSegment);
      if (!index || index >= limit) {
        this.emit(T.UNKNOWN);
        break;
      }

      match = this.skipUntil(reLineCommentSegment);

      if (!match) {
        this.emit(T.UNKNOWN);
        break;
      }

      switch (match[1]) {
        case "comment":
          commentDepth += 1;
          this.pos += match[0].length;
          break;
        case "endcomment":
          commentDepth -= 1;
          if (commentDepth > 0) {
            this.pos += match[0].length;
            continue;
          }

          this.emit(T.COMMENT);
          return;
        default:
          throw new Error("unreachable");
      }
    }
  }

  protected acceptLineDocComment(limit: number): void {
    // Shopify/liquid always raises a syntax error for `doc` in `{% liquid %}`.
    this.pos = limit;
    this.emit(T.UNKNOWN);
  }

  protected acceptLineRawTag(limit: number): void {
    // Shopify/liquid always raises a syntax error for `raw` in `{% liquid %}`.
    this.pos = limit;
    this.emit(T.UNKNOWN);
  }

  /**
   * Scan and emit expression tokens up to `limit`.
   *
   * Sticking with Shopify/liquid syntax and semantics, as of version 5.12.0,
   * the only tokens that can possibly contain a markup delimiter character -
   * and must pay attention to `limit` - are string literals.
   *
   * @param limit The position in the input string where we must stop accepting
   * expression tokens.
   * @param trivia The pattern used to skip insignificant tokens, like whitespace.
   */
  protected acceptExpression(limit: number, trivia: RegExp = reTrivia): void {
    let match: string | undefined;

    while (this.pos < limit) {
      this.skip(trivia);

      // Trivia can put us past the limit.
      if (this.pos >= limit) {
        break;
      }

      // We assume punctuation does not include markup delimiter characters,
      // and can therefore not exceed `limit`.
      match = this.scan(rePunctuation);
      if (match) {
        this.emit(tokenMap[match] || T.UNKNOWN);
        continue;
      }

      // We assume identifiers do not allow markup delimiter characters,
      // and can therefore not exceed `limit`.
      match = this.scan(reIdent);
      if (match) {
        // Could be a reserved word or a variable.
        this.emit(tokenMap[match] || T.IDENT);
        continue;
      }

      // reFloat must come before reInt.
      match = this.scan(reFloat);
      if (match) {
        this.emit(T.FLOAT);
        continue;
      }

      match = this.scan(reInt);
      if (match) {
        this.emit(T.INT);
        continue;
      }

      switch (this.source[this.pos]) {
        case "'":
        case '"':
          this.acceptStringLiteral(limit);
          break;
        // case '{':
        //   this.acceptObjectLiteral(limit)
        default:
          this.pos += 1;
          this.emit(T.UNKNOWN);
      }
    }
  }

  protected acceptStringLiteral(limit: number): void {
    const quote = this.source[this.pos] || "";
    this.pos += 1;

    const double = quote === '"';
    const kind = double ? T.DOUBLE_QUOTE : T.SINGLE_QUOTE;
    this.emit(kind);

    if (this.source[this.pos] === quote) {
      // Empty string.
      this.pos += 1;
      this.emit(kind);
      return;
    }

    const index = this.source.indexOf(quote, this.pos);
    this.pos = Math.min(index, limit);
    this.emit(double ? T.DOUBLE_QUOTED : T.SINGLE_QUOTED);

    if (this.source[this.pos] === quote) {
      this.pos += 1;
      this.emit(kind);
    }
  }
}
