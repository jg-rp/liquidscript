import { LiquidSyntaxError, PushedTooFarError } from "../errors";
import { Token, TokenStream } from "../token";

export const TOKEN_SKIP = "TOKEN_SKIP";
export const TOKEN_ILLEGAL = "TOKEN_ILLEGAL";

export const TOKEN_TRUE = "true";
export const TOKEN_FALSE = "false";
export const TOKEN_IDENT = "TOKEN_IDENT";
export const TOKEN_IDENT_INDEX = "TOKEN_IDENT_INDEX";
export const TOKEN_IDENT_STRING = "TOKEN_IDENT_STRING";
export const TOKEN_DOT = "TOKEN_DOT";
export const TOKEN_LBRACKET = "TOKEN_LBRACKET";
export const TOKEN_RBRACKET = "TOKEN_RBRACKET";
export const TOKEN_INTEGER = "TOKEN_INTEGER";
export const TOKEN_FLOAT = "TOKEN_FLOAT";
export const TOKEN_LPAREN = "TOKEN_LPAREN";
export const TOKEN_RPAREN = "TOKEN_RPAREN";
export const TOKEN_RANGE = "TOKEN_RANGE";
export const TOKEN_STRING = "TOKEN_STRING";
export const TOKEN_EOF = "TOKEN_EOF";
export const TOKEN_NEWLINE = "TOKEN_NEWLINE";
export const TOKEN_EMPTY = "empty";
export const TOKEN_NIL = "nil";
export const TOKEN_NULL = "null";
export const TOKEN_BLANK = "blank";
export const TOKEN_WITH = "with";
export const TOKEN_FOR = "for";
export const TOKEN_AS = "as";
export const TOKEN_BY = "by";
export const TOKEN_CONTAINS = "contains";
export const TOKEN_IN = "in";
export const TOKEN_LIMIT = "limit";
export const TOKEN_OFFSET = "offset";
export const TOKEN_REVERSED = "reversed";
export const TOKEN_CONTINUE = "continue";
export const TOKEN_COLS = "cols";

export const TOKEN_PIPE = "TOKEN_PIPE";
export const TOKEN_COLON = "TOKEN_COLON";
export const TOKEN_COMMA = "TOKEN_COMMA";

// Assignment as used by `assign` and `capture` tags.
export const TOKEN_ASSIGN = "TOKEN_ASSIGN";

// Logical operators
export const TOKEN_AND = "and";
export const TOKEN_OR = "or";

// Comparison operators
export const TOKEN_EQ = "TOKEN_EQ";
export const TOKEN_NE = "TOKEN_NE";
export const TOKEN_LG = "TOKEN_LG";
export const TOKEN_LT = "TOKEN_LT";
export const TOKEN_GT = "TOKEN_GT";
export const TOKEN_LE = "TOKEN_LE";
export const TOKEN_GE = "TOKEN_GE";

export const TOKEN_OP = "TOKEN_OP";
export const OPERATORS = new Map([
  ["==", TOKEN_EQ],
  ["!=", TOKEN_NE],
  ["<>", TOKEN_LG],
  ["<", TOKEN_LT],
  [">", TOKEN_GT],
  ["<=", TOKEN_LE],
  [">=", TOKEN_GE],
  ["|", TOKEN_PIPE],
  [":", TOKEN_COLON],
  [",", TOKEN_COMMA],
  [".", TOKEN_DOT],
  ["(", TOKEN_LPAREN],
  [")", TOKEN_RPAREN],
  ["..", TOKEN_RANGE],
  ["[", TOKEN_LBRACKET],
  ["]", TOKEN_RBRACKET],
  ["=", TOKEN_ASSIGN],
]);

export const REVERSE_OPERATORS = new Map(
  Array.from(OPERATORS.entries()).map(([k, v]) => [v, k])
);

const EOF = new Token(TOKEN_EOF, "EOF", -1, "");

export class ExpressionTokenStream implements TokenStream {
  private _current: Token;
  private _peek: Token;
  private _buf: Token | undefined = undefined;

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

  public next(): Token {
    const current = this.current;
    this._current = this._peek;
    if (this._buf) {
      this._peek = this._buf;
      this._buf = undefined;
    } else {
      this._peek = this._next();
    }
    return current;
  }

  public push(token: Token): void {
    if (this._buf !== undefined)
      throw new PushedTooFarError("can't push more than one token");
    this._buf = this._peek;
    this._peek = this._current;
    this._current = token;
  }

  public expect(kind: string): void {
    // TODO: reverse operators
    if (this.current.kind !== kind)
      throw new LiquidSyntaxError(
        `expected ${kind}, found ${this.current.kind}`,
        this.current
      );
  }

  public expectPeek(kind: string): void {
    // TODO: reverse operators
    if (this.peek.kind !== kind)
      throw new LiquidSyntaxError(
        `expected ${kind}, found ${this.peek.kind}`,
        this.peek
      );
  }

  protected _next(): Token {
    const it = this.tokens.next();
    if (it.done) return EOF;
    return it.value;
  }
}
