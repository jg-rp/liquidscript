import type { Environment } from "./environment";
import { T, type Token } from "./token";

export type StateFn = () => StateFn | null;

export abstract class Lexer {
  readonly tokens: Token[] = [];
  protected start: number;
  protected pos: number;

  constructor(
    protected env: Environment,
    protected source: string,
    startIndex: number = 0,
  ) {
    this.start = startIndex;
    this.pos = startIndex;
  }

  static tokenize<L extends Lexer>(
    this: new (env: Environment, source: string, startIndex?: number) => L,
    env: Environment,
    source: string,
    startIndex: number = 0,
  ): Token[] {
    const lexer = new this(env, source, startIndex);
    lexer.run();
    return lexer.tokens;
  }

  public run(): void {
    let state: StateFn | null = this.scanMarkup;
    while (state) {
      state = state.apply(this);
    }
  }

  abstract scanMarkup(): StateFn | null;

  /**
   * Try to match `pattern` at the current position. Advance the character pointer by the
   * length of the matched substring if the match is successful.
   * @param pattern A regular expression with the `y` flag (sticky) set.
   * @returns The matched substring if the match was successful, or `undefined` otherwise.
   */
  protected scan(pattern: RegExp): string | undefined {
    pattern.lastIndex = this.pos;
    const match = pattern.exec(this.source);
    if (match) {
      this.pos += match[0].length;
      return match[0];
    }
  }

  /**
   * Consume text up to but not including the substring matched by `pattern`. Update `this.pos`
   * on success.
   * @param pattern A regular expression with the `g` flag (global) set.
   * @returns `true` if `pattern` matched and `this.pos` was updated, `false` otherwise.
   */
  protected scanUntil(pattern: RegExp): boolean {
    pattern.lastIndex = this.pos;
    const match = pattern.exec(this.source);
    if (match) {
      this.pos = match.index;
      return true;
    }
    return false;
  }

  /**
   * Find the index of `pattern` starting from `this.pos`.
   * @param pattern A regular expression with the `g` flag (global) set.
   * @returns The index of the substring matched by `pattern`, or null if there was no match.
   */
  protected index(pattern: RegExp): number | undefined {
    pattern.lastIndex = this.pos;
    const match = pattern.exec(this.source);
    return match?.index;
  }

  /**
   * Consume text matching `pattern` at the current position.
   * @param pattern A regular expression with the `y` flag (sticky) set.
   * @returns `true` if the match was successful, or `false` otherwise.
   */
  protected skip(pattern: RegExp): boolean {
    pattern.lastIndex = this.pos;
    const match = pattern.exec(this.source);
    if (match) {
      this.pos += match[0].length;
      this.start = this.pos;
      return true;
    }
    return false;
  }

  /**
   * Consume text up to but not including the next substring matching `pattern`.
   * @param pattern A regular expression with the `g` flag (global) set.
   * @returns The match array on success, or `undefined` otherwise.
   */
  protected skipUntil(pattern: RegExp): RegExpExecArray | undefined {
    pattern.lastIndex = this.pos;
    const match = pattern.exec(this.source);
    if (match) {
      this.pos = match.index;
      return match;
    }
  }

  protected emit(kind: (typeof T)[keyof typeof T]) {
    this.tokens.push({ kind, start: this.start, end: this.pos });
    this.start = this.pos;
  }

  protected acceptWhitespaceControl(): boolean {
    if (this.source[this.pos] === "-") {
      this.pos += 1;
      this.emit(T.WC);
      return true;
    }
    return false;
  }
}
