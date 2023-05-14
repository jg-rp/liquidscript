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

  public toString(): string {
    return `(kind=${this.kind}, value=${this.value})`;
  }

  public lineNumber(): number {
    return this.input.slice(0, this.index).split("\n").length;
  }
}

const EOF = new Token(TOKEN_EOF, "EOF", -1, "");

export interface TokenStream {
  current: Token;
  peek: Token;
  next(): Token;
  expect(kind: string): void;
  expectTag(name: string): void;
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
    if (this.current.kind !== kind) {
      if (kind === TOKEN_EXPRESSION) {
        throw new LiquidSyntaxError(`missing tag expression`, this.current);
      } else {
        throw new LiquidSyntaxError(
          `expected '${kind}', found ${this.current.kind}`,
          this.current
        );
      }
    }
  }

  public expectTag(name: string): void {
    if (this.current.kind !== TOKEN_TAG) {
      throw new LiquidSyntaxError(
        `expected tag '${name}', found '${this.current.kind}'`,
        this.current
      );
    }
    if (this.current.value !== name) {
      throw new LiquidSyntaxError(
        `expected '${name}', found '${this.current.value}'`,
        this.current
      );
    }
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
