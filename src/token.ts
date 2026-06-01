export type Token = {
  kind: (typeof T)[keyof typeof T];
  start: number;
  end: number;
};

export type TokenKind = (typeof T)[keyof typeof T];

/**
 * Token kind enumeration.
 */
export const T = {
  ADD: 1,
  AND: 2,
  ARROW: 3,
  ASSIGN: 4,
  COLON: 5,
  COMMA: 6,
  COMMENT: 7,
  COMMENT_END: 8,
  COMMENT_START: 9,
  CONTAINS: 10,
  DIV: 11,
  DOT: 12,
  DOUBLE_DOT: 13,
  DOUBLE_ESCAPED: 14,
  DOUBLE_QUOTE: 15,
  DOUBLE_QUOTED: 16,
  ELSE: 17,
  EQ: 18,
  FALSE: 19,
  FLOAT: 20,
  GE: 21,
  GT: 22,
  IDENT: 23,
  IF: 24,
  IN: 35,
  INT: 26,
  INTERPOLATION_END: 27,
  INTERPOLATION_START: 28,
  LBRACE: 29,
  LBRACKET: 30,
  LE: 31,
  LPAREN: 32,
  LT: 33,
  MOD: 34,
  MUL: 35,
  NE: 36,
  NIL: 37,
  NOT: 38,
  NULL: 39,
  OR_ELSE: 40,
  OR: 41,
  OUT_END: 42,
  OUT_START: 43,
  PIPE: 44,
  QUESTION: 45,
  RBRACE: 46,
  RBRACKET: 47,
  RPAREN: 48,
  SINGLE_ESCAPED: 49,
  SINGLE_QUOTE: 50,
  SINGLE_QUOTED: 51,
  SUB: 52,
  TAG_END: 53,
  TAG_NAME: 54,
  TAG_START: 55,
  TEXT: 56,
  TRIPLE_DOT: 57,
  TRUE: 58,
  WC: 59,
  EOI: 60,
  UNKNOWN: 61,
  HASH: 62,
  SPAN: 63,
  BLANK: 64,
  EMPTY: 65,
  FOR: 66,
  WITH: 67,
  AS: 67,
} as const;

export const REVERSE_T = Object.fromEntries(
  Object.entries(T).map(([key, value]) => [value, key]),
) as Record<(typeof T)[keyof typeof T], keyof typeof T>;

export function getTokenValue(token: Token, source: string): string {
  return source.slice(token.start, token.end);
}

export function span(start: Token, end: Token): Token {
  return { kind: T.SPAN, start: start.start, end: end.end };
}
