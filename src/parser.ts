import type { Environment } from "./environment";
import { TemplateSyntaxError } from "./errors";
import type { Expression, KeywordArgument, Name } from "./expression";
import type { Block } from "./markup";
import "./tags";
import {
  getTokenValue,
  REVERSE_T,
  T,
  type Token,
  type TokenKind,
} from "./token";

export const TERMINATE_EXPRESSION: Set<TokenKind> = new Set([
  T.WC,
  T.OUT_END,
  T.TAG_END,
  T.TEXT,
  T.RPAREN,
  T.EOI,
  T.IF,
  T.ELSE,
  T.INTERPOLATION_END,
]);

export abstract class Parser {
  protected pos: number = 0;
  protected whitespaceControlCarry: "-" | undefined = undefined;
  protected eoi: Token;

  constructor(
    readonly env: Environment,
    readonly source: string,
    readonly tokens: Token[],
  ) {
    this.eoi = { kind: T.EOI, start: source.length, end: source.length };
  }

  static parse<P extends Parser>(
    this: new (env: Environment, source: string, tokens: Token[]) => P,
    env: Environment,
    source: string,
    startIndex: number = 0,
  ): Block {
    return new this(
      env,
      source,
      env.lexer.tokenize(env, source, startIndex),
    ).parseBlock();
  }

  /**
   * Return the current token, or EOI if there are no tokens left.
   * Does not increment the token pointer
   */
  public current(): Token {
    return this.tokens[this.pos] || this.eoi;
  }

  /**
   * Return the kind of the current token.
   */
  public kind(): (typeof T)[keyof typeof T] {
    return (this.tokens[this.pos] || this.eoi).kind;
  }

  /**
   * Return the current token and increment the token pointer.
   * Returns EOI if there are no tokens left.
   */
  public next(): Token {
    const token = this.tokens[this.pos] || this.eoi;
    if (token) {
      this.pos += 1;
    }
    return token;
  }

  /**
   * Return the token at self.pos + offset, or EOI if there are no tokens left.
   * Does not advance the token pointer.
   */
  public peek(offset: number = 1): Token {
    return this.tokens[this.pos + offset] || this.eoi;
  }

  /**
   * Assert and consume a token of kind `kind`.
   * Raises a syntax error if the current token's kind is not `kind`.
   */
  public eat(kind: TokenKind, message: string | undefined = undefined): Token {
    const token = this.tokens[this.pos] || this.eoi;
    if (token.kind !== kind) {
      // console.log(
      //   "!!",
      //   this.tokens.slice(this.pos).map((token) => {
      //     return {
      //       kind: REVERSE_T[token.kind],
      //       value: getTokenValue(token, this.source),
      //     };
      //   }),
      // );
      throw new TemplateSyntaxError(
        message || `unexpected ${REVERSE_T[token.kind]}`,
        token,
      );
    }
    this.pos += 1;
    return token;
  }

  /**
   * Consume the next token if its kind is in `kinds`.
   * Raises a syntax error if the current token kind is not in `kinds`.
   */
  public eatOneOf(kinds: Set<TokenKind>): Token {
    const token = this.next();
    if (!kinds.has(token.kind)) {
      throw new TemplateSyntaxError(`unexpected ${token.kind}`, token);
    }
    return token;
  }

  public eatEmptyTag(name: string): Token {
    this.eat(T.TAG_START, `expected tag ${name}`);
    if (this.kind() === T.WC) this.pos += 1;
    const token = this.eat(T.TAG_NAME, `expected tag ${name}`);

    if (getTokenValue(token, this.source) !== name) {
      throw new TemplateSyntaxError(
        `unexpected tag ${REVERSE_T[token.kind]}`,
        token,
      );
    }

    this.carryWhitespaceControl();
    this.eat(T.TAG_END, `expected tag ${name}`);
    return token;
  }

  public peekTagName(): string {
    let token = this.current();
    if (token.kind === T.WC) token = this.peek();

    if (token.kind !== T.TAG_NAME) {
      throw new TemplateSyntaxError("missing tag name", token);
    }

    return getTokenValue(token, this.source);
  }

  public skipWhitespaceControl(): void {
    if (this.current().kind === T.WC) {
      this.pos += 1;
    }
  }

  public carryWhitespaceControl(): void {
    if (this.current().kind === T.WC) {
      this.pos += 1;
      this.whitespaceControlCarry = "-";
    } else {
      this.whitespaceControlCarry = undefined;
    }
  }

  public peekWhitespaceControl(): string | undefined {
    const token = this.peek();
    if (token.kind === T.WC) {
      return getTokenValue(token, this.source);
    }
  }

  public tag(name: string): boolean {
    let token = this.peek();
    if (token.kind === T.WC) {
      token = this.peek(2);
    }

    return (
      token.kind === T.TAG_NAME && getTokenValue(token, this.source) == name
    );
  }

  public expectExpression(): void {
    if (TERMINATE_EXPRESSION.has(this.kind())) {
      throw new TemplateSyntaxError("missing expression", this.current());
    }
  }

  /**
   * Parse template text and markup until reaching a named tag.
   *
   * @param end Possible tag names that terminate the block.
   */
  public abstract parseBlock(end?: Set<string>): Block;

  /**
   * Parse a literal, variable or compound expression.
   *
   * @param precedence The binding power of this sub expression.
   */
  public abstract parseExpression(precedence?: number): Expression;

  /**
   * Parse an expression with optional filters.
   *
   * @param precedence The binding power of this sub expression.
   */
  public abstract parseFilteredExpression(precedence?: number): Expression;

  /**
   * Parse an identifier. Raises a syntax error if the identifier is followed
   * by path segments.
   */
  public abstract parseIdent(): Name;

  /**
   * Parse an identifier, possibly surrounded by quotes.
   *
   * Raises a syntax error if the identifier is followed by path segments.
   */
  public abstract parseName(): Name;

  /**
   * Parse positional and/or keyword arguments.
   *
   * Assumes any leading commas have been consumed by the caller, if they are
   * allowed.
   *
   * @param requireCommas When true, throw a syntax error if there is no comma
   *   between each argument.
   */
  public abstract parseArguments(
    requireCommas?: boolean,
  ): Array<Expression | KeywordArgument>;
}
