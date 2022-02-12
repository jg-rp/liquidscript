import { LiquidSyntaxError } from "./errors";

export const TOKEN_LITERAL = "literal";
export const TOKEN_STATEMENT = "TOKEN_STATEMENT";
export const TOKEN_TAG = "TOKEN_TAG";
export const TOKEN_RAW = "TOKEN_RAW";
export const TOKEN_EOF = "TOKEN_EOF";
export const TOKEN_EXPRESSION = "TOKEN_EXPRESSION";

export class Token {
  constructor(
    readonly kind: string,
    readonly value: string,
    readonly index: number,
    readonly input: string
  ) {}

  toString(): string {
    return `(kind=${this.kind}, value=${this.value})`;
  }
}

const EOF = new Token(TOKEN_EOF, "EOF", -1, "");

export interface TokenStream {
  current: Token;
  peek: Token;
  next(): Token;
  expect(kind: string): void;
}

export class TemplateTokenStream implements TokenStream {
  private _current: Token;
  private _peek: Token;

  constructor(private tokens: IterableIterator<Token>) {
    this._current = this._next();
    this._peek = this._next();
  }

  public get current(): Token {
    return this._current;
  }

  public get peek(): Token {
    return this._peek;
  }

  public expect(kind: string): void {
    if (this.current.kind !== kind)
      throw new LiquidSyntaxError(
        `expected ${String(kind)}, found ${String(this.current.kind)}`,
        this.current
      );
  }

  public next(): Token {
    const current = this.current;
    this._current = this._peek;
    this._peek = this._next();
    return current;
  }

  protected _next(): Token {
    const it = this.tokens.next();
    if (it.done) return EOF;
    return it.value;
  }
}
