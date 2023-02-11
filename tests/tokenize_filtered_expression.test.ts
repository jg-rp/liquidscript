import { Token } from "../src/token";
import { tokenize } from "../src/expressions/filtered/lex";
import {
  tokenize as tokenizeConditional,
  tokenizeWithParens as tokenizeConditionalWithParens,
} from "../src/expressions/conditional/lex";

import {
  TOKEN_AND,
  TOKEN_COLON,
  TOKEN_COMMA,
  TOKEN_DOT,
  TOKEN_DPIPE,
  TOKEN_ELSE,
  TOKEN_FALSE,
  TOKEN_FLOAT,
  TOKEN_IDENT,
  TOKEN_IDENT_INDEX,
  TOKEN_IF,
  TOKEN_INTEGER,
  TOKEN_LBRACKET,
  TOKEN_LPAREN,
  TOKEN_LT,
  TOKEN_NOT,
  TOKEN_PIPE,
  TOKEN_RANGE,
  TOKEN_RBRACKET,
  TOKEN_RPAREN,
  TOKEN_STRING,
  TOKEN_TRUE,
} from "../src/expressions/tokens";

// Table-driven test case object.
type Case = {
  description: string;
  text: string;
  want: PartialToken[];
};

// Minimal token information for each test case. The rest can be inferred from
// the test case.
type PartialToken = {
  kind: string;
  value: string;
  index?: number;
};

// Test cases for tokenizing "standard" filtered expressions.
const filteredExpressionTestCases: Case[] = [
  {
    description: "double quoted string literal",
    text: '"hello"',
    want: [{ kind: TOKEN_STRING, value: "hello" }],
  },
  {
    description: "single quoted string literal",
    text: "'hello'",
    want: [{ kind: TOKEN_STRING, value: "hello" }],
  },
  {
    description: "single quoted string representation of a float",
    text: "'42.2'",
    want: [{ kind: TOKEN_STRING, value: "42.2" }],
  },
  {
    description: "integer literal",
    text: "42",
    want: [{ kind: TOKEN_INTEGER, value: "42" }],
  },
  {
    description: "negative integer literal",
    text: "-42",
    want: [{ kind: TOKEN_INTEGER, value: "-42" }],
  },
  {
    description: "float literal",
    text: "1.34",
    want: [{ kind: TOKEN_FLOAT, value: "1.34" }],
  },
  {
    description: "negative float literal",
    text: "-1.34",
    want: [{ kind: TOKEN_FLOAT, value: "-1.34" }],
  },
  {
    description: "float literal without a digit after the decimal point",
    text: "2.",
    want: [{ kind: TOKEN_FLOAT, value: "2." }],
  },
  {
    description:
      "negative float literal without a digit after the decimal point",
    text: "-2.",
    want: [{ kind: TOKEN_FLOAT, value: "-2." }],
  },
  {
    description: "simple identifier",
    text: "products",
    want: [{ kind: TOKEN_IDENT, value: "products" }],
  },
  {
    description: "simple identifier with a hyphen",
    text: "some-products",
    want: [{ kind: TOKEN_IDENT, value: "some-products" }],
  },
  {
    description: "simple identifier with a trailing question mark",
    text: "products?",
    want: [{ kind: TOKEN_IDENT, value: "products?" }],
  },
  {
    description: "simple identifier with a leading underscore",
    text: "_products",
    want: [{ kind: TOKEN_IDENT, value: "_products" }],
  },
  {
    description: "dotted variable",
    text: "collection.products",
    want: [
      { kind: TOKEN_IDENT, value: "collection" },
      { kind: TOKEN_DOT, value: ".", index: 10 },
      { kind: TOKEN_IDENT, value: "products", index: 11 },
    ],
  },
  {
    description: "bracketed index",
    text: "products[1]",
    want: [
      { kind: TOKEN_IDENT, value: "products" },
      { kind: TOKEN_IDENT_INDEX, value: "1", index: 8 },
    ],
  },
  {
    description: "bracketed single quoted property",
    text: "collection['products']",
    want: [
      { kind: TOKEN_IDENT, value: "collection" },
      { kind: TOKEN_IDENT, value: "products", index: 10 },
    ],
  },
  {
    description: "bracketed double quoted property",
    text: 'collection["products"]',
    want: [
      { kind: TOKEN_IDENT, value: "collection" },
      { kind: TOKEN_IDENT, value: "products", index: 10 },
    ],
  },
  {
    description: "nested dotted variable",
    text: "collection[tags.current_collection]",
    want: [
      { kind: TOKEN_IDENT, value: "collection" },
      { kind: TOKEN_LBRACKET, value: "[", index: 10 },
      { kind: TOKEN_IDENT, value: "tags", index: 11 },
      { kind: TOKEN_DOT, value: ".", index: 15 },
      { kind: TOKEN_IDENT, value: "current_collection", index: 16 },
      { kind: TOKEN_RBRACKET, value: "]", index: 34 },
    ],
  },
  {
    description: "filtered string literal",
    text: '"hello" | upcase',
    want: [
      { kind: TOKEN_STRING, value: "hello" },
      { kind: TOKEN_PIPE, value: "|", index: 8 },
      { kind: TOKEN_IDENT, value: "upcase", index: 10 },
    ],
  },
  {
    description: "filtered variable",
    text: "name | upcase",
    want: [
      { kind: TOKEN_IDENT, value: "name" },
      { kind: TOKEN_PIPE, value: "|", index: 5 },
      { kind: TOKEN_IDENT, value: "upcase", index: 7 },
    ],
  },
  {
    description: "filter with integer argument",
    text: "4 | at_least: 5",
    want: [
      { kind: TOKEN_INTEGER, value: "4" },
      { kind: TOKEN_PIPE, value: "|", index: 2 },
      { kind: TOKEN_IDENT, value: "at_least", index: 4 },
      { kind: TOKEN_COLON, value: ":", index: 12 },
      { kind: TOKEN_INTEGER, value: "5", index: 14 },
    ],
  },
  {
    description: "filter with two arguments",
    text: "'Liquid' | slice: 2, 5",
    want: [
      { kind: TOKEN_STRING, value: "Liquid" },
      { kind: TOKEN_PIPE, value: "|", index: 9 },
      { kind: TOKEN_IDENT, value: "slice", index: 11 },
      { kind: TOKEN_COLON, value: ":", index: 16 },
      { kind: TOKEN_INTEGER, value: "2", index: 18 },
      { kind: TOKEN_COMMA, value: ",", index: 19 },
      { kind: TOKEN_INTEGER, value: "5", index: 21 },
    ],
  },
  {
    description: "inconsistent whitespace",
    text: "\n'Liquid'\n |slice: 2,5",
    want: [
      { kind: TOKEN_STRING, value: "Liquid", index: 1 },
      { kind: TOKEN_PIPE, value: "|", index: 11 },
      { kind: TOKEN_IDENT, value: "slice", index: 12 },
      { kind: TOKEN_COLON, value: ":", index: 17 },
      { kind: TOKEN_INTEGER, value: "2", index: 19 },
      { kind: TOKEN_COMMA, value: ",", index: 20 },
      { kind: TOKEN_INTEGER, value: "5", index: 21 },
    ],
  },
  {
    description: "range literal",
    text: "(1..5)",
    want: [
      { kind: TOKEN_LPAREN, value: "(", index: 0 },
      { kind: TOKEN_INTEGER, value: "1", index: 1 },
      { kind: TOKEN_RANGE, value: "..", index: 2 },
      { kind: TOKEN_INTEGER, value: "5", index: 4 },
      { kind: TOKEN_RPAREN, value: ")", index: 5 },
    ],
  },
  {
    description: "range literal with float start",
    text: "(2.4..5)",
    want: [
      { kind: TOKEN_LPAREN, value: "(", index: 0 },
      { kind: TOKEN_FLOAT, value: "2.4", index: 1 },
      { kind: TOKEN_RANGE, value: "..", index: 4 },
      { kind: TOKEN_INTEGER, value: "5", index: 6 },
      { kind: TOKEN_RPAREN, value: ")", index: 7 },
    ],
  },
  {
    description: "range literal with identifiers for start and stop",
    text: "(a..b)",
    want: [
      { kind: TOKEN_LPAREN, value: "(", index: 0 },
      { kind: TOKEN_IDENT, value: "a", index: 1 },
      { kind: TOKEN_RANGE, value: "..", index: 2 },
      { kind: TOKEN_IDENT, value: "b", index: 4 },
      { kind: TOKEN_RPAREN, value: ")", index: 5 },
    ],
  },
];

// Test cases for tokenizing conditional filtered expressions. Those that
// support inline if/else expressions.
const conditionalExpressionTestCases: Case[] = [
  {
    description: "simple condition",
    text: "'foo' if true",
    want: [
      { kind: TOKEN_STRING, value: "foo" },
      { kind: TOKEN_IF, value: "if", index: 6 },
      { kind: TOKEN_TRUE, value: "true", index: 9 },
    ],
  },
  {
    description: "comparison operator",
    text: "'foo' if x < y",
    want: [
      { kind: TOKEN_STRING, value: "foo" },
      { kind: TOKEN_IF, value: "if", index: 6 },
      { kind: TOKEN_IDENT, value: "x", index: 9 },
      { kind: TOKEN_LT, value: "<", index: 11 },
      { kind: TOKEN_IDENT, value: "y", index: 13 },
    ],
  },
  {
    description: "condition with alternative",
    text: "'foo' if true else 'bar'",
    want: [
      { kind: TOKEN_STRING, value: "foo" },
      { kind: TOKEN_IF, value: "if", index: 6 },
      { kind: TOKEN_TRUE, value: "true", index: 9 },
      { kind: TOKEN_ELSE, value: "else", index: 14 },
      { kind: TOKEN_STRING, value: "bar", index: 19 },
    ],
  },
  {
    description: "condition with preceding filter",
    text: "'foo' | upcase if true else 'bar'",
    want: [
      { kind: TOKEN_STRING, value: "foo" },
      { kind: TOKEN_PIPE, value: "|", index: 6 },
      { kind: TOKEN_IDENT, value: "upcase", index: 8 },
      { kind: TOKEN_IF, value: "if", index: 15 },
      { kind: TOKEN_TRUE, value: "true", index: 18 },
      { kind: TOKEN_ELSE, value: "else", index: 23 },
      { kind: TOKEN_STRING, value: "bar", index: 28 },
    ],
  },
  {
    description: "condition with alternative filter",
    text: "'foo' if true else 'bar' | upcase",
    want: [
      { kind: TOKEN_STRING, value: "foo" },
      { kind: TOKEN_IF, value: "if", index: 6 },
      { kind: TOKEN_TRUE, value: "true", index: 9 },
      { kind: TOKEN_ELSE, value: "else", index: 14 },
      { kind: TOKEN_STRING, value: "bar", index: 19 },
      { kind: TOKEN_PIPE, value: "|", index: 25 },
      { kind: TOKEN_IDENT, value: "upcase", index: 27 },
    ],
  },
  {
    description: "condition with tail filter",
    text: "'foo' if true else 'bar' || upcase",
    want: [
      { kind: TOKEN_STRING, value: "foo" },
      { kind: TOKEN_IF, value: "if", index: 6 },
      { kind: TOKEN_TRUE, value: "true", index: 9 },
      { kind: TOKEN_ELSE, value: "else", index: 14 },
      { kind: TOKEN_STRING, value: "bar", index: 19 },
      { kind: TOKEN_DPIPE, value: "||", index: 25 },
      { kind: TOKEN_IDENT, value: "upcase", index: 28 },
    ],
  },
  {
    description: "multi-line condition with tail filter",
    text: "'foo'\nif true\nelse 'bar' || upcase",
    want: [
      { kind: TOKEN_STRING, value: "foo" },
      { kind: TOKEN_IF, value: "if", index: 6 },
      { kind: TOKEN_TRUE, value: "true", index: 9 },
      { kind: TOKEN_ELSE, value: "else", index: 14 },
      { kind: TOKEN_STRING, value: "bar", index: 19 },
      { kind: TOKEN_DPIPE, value: "||", index: 25 },
      { kind: TOKEN_IDENT, value: "upcase", index: 28 },
    ],
  },
];

// Test cases for tokenizing conditional filtered expression that allow
// the logical `not` operator and grouping terms with parentheses.
const notConditionalExpressionTestCases: Case[] = [
  {
    description: "negated condition",
    text: "'foo' if not true",
    want: [
      { kind: TOKEN_STRING, value: "foo" },
      { kind: TOKEN_IF, value: "if", index: 6 },
      { kind: TOKEN_NOT, value: "not", index: 9 },
      { kind: TOKEN_TRUE, value: "true", index: 13 },
    ],
  },
  {
    description: "negated condition with alternative",
    text: "'foo' if not true else 'bar'",
    want: [
      { kind: TOKEN_STRING, value: "foo" },
      { kind: TOKEN_IF, value: "if", index: 6 },
      { kind: TOKEN_NOT, value: "not", index: 9 },
      { kind: TOKEN_TRUE, value: "true", index: 13 },
      { kind: TOKEN_ELSE, value: "else", index: 18 },
      { kind: TOKEN_STRING, value: "bar", index: 23 },
    ],
  },
  {
    description: "grouped condition with alternative",
    text: "'foo' if not (false and false) else 'bar'",
    want: [
      { kind: TOKEN_STRING, value: "foo" },
      { kind: TOKEN_IF, value: "if", index: 6 },
      { kind: TOKEN_NOT, value: "not", index: 9 },
      { kind: TOKEN_LPAREN, value: "(", index: 13 },
      { kind: TOKEN_FALSE, value: "false", index: 14 },
      { kind: TOKEN_AND, value: "and", index: 20 },
      { kind: TOKEN_FALSE, value: "false", index: 24 },
      { kind: TOKEN_RPAREN, value: ")", index: 29 },
      { kind: TOKEN_ELSE, value: "else", index: 31 },
      { kind: TOKEN_STRING, value: "bar", index: 36 },
    ],
  },
  {
    description: "negated condition with preceding filter",
    text: "'foo' | upcase if not true else 'bar'",
    want: [
      { kind: TOKEN_STRING, value: "foo", index: 0 },
      { kind: TOKEN_PIPE, value: "|", index: 6 },
      { kind: TOKEN_IDENT, value: "upcase", index: 8 },
      { kind: TOKEN_IF, value: "if", index: 15 },
      { kind: TOKEN_NOT, value: "not", index: 18 },
      { kind: TOKEN_TRUE, value: "true", index: 22 },
      { kind: TOKEN_ELSE, value: "else", index: 27 },
      { kind: TOKEN_STRING, value: "bar", index: 32 },
    ],
  },
];

describe("standard filtered expression lexer", () => {
  test.each<Case>(filteredExpressionTestCases)(
    "$description",
    ({ text, want }: Case) => {
      const _want = want.map(
        (t) => new Token(t.kind, t.value, t.index || 0, text)
      );
      const tokens = Array.from(tokenize(text));
      expect(tokens).toStrictEqual(_want);
    }
  );
});

describe("conditional filtered expression lexer", () => {
  // Combine standard test cases with conditional test cases.
  const testCases = [
    ...filteredExpressionTestCases,
    ...conditionalExpressionTestCases,
  ];
  test.each<Case>(testCases)("$description", ({ text, want }: Case) => {
    const _want = want.map(
      (t) => new Token(t.kind, t.value, t.index || 0, text)
    );
    const tokens = Array.from(tokenizeConditional(text));
    expect(tokens).toStrictEqual(_want);
  });
});

describe("extended conditional filtered expression lexer", () => {
  // Combine standard test cases with conditional test cases, including
  // `not` and parens.
  const testCases = [
    ...filteredExpressionTestCases,
    ...conditionalExpressionTestCases,
    ...notConditionalExpressionTestCases,
  ];
  test.each<Case>(testCases)("$description", ({ text, want }: Case) => {
    const _want = want.map(
      (t) => new Token(t.kind, t.value, t.index || 0, text)
    );
    const tokens = Array.from(tokenizeConditionalWithParens(text));
    const tokenKinds = new Set(want.map((t) => t.kind));
    if (tokenKinds.has(TOKEN_RANGE)) {
      expect(tokens).not.toStrictEqual(_want);
    } else {
      expect(tokens).toStrictEqual(_want);
    }
  });
});
