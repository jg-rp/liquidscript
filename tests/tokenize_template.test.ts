import { compileRules, tokenizerFor } from "../src/lex";
import {
  Token,
  TOKEN_EXPRESSION,
  TOKEN_LITERAL,
  TOKEN_STATEMENT,
  TOKEN_TAG,
} from "../src/token";

// TODO: Finish tests

describe("tokenize templates", () => {
  const rules = compileRules();
  const tokenize = tokenizerFor(rules);

  test("only literal", () => {
    const tokens = Array.from(tokenize("<HTML>some</HTML>"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_LITERAL, "<HTML>some</HTML>", 0, "<HTML>some</HTML>"),
    ]);
  });
  test("output surrounded by literals", () => {
    const tokens = Array.from(tokenize("<HTML>{{ other }}</HTML>"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_LITERAL, "<HTML>", 0, "<HTML>{{ other }}</HTML>"),
      new Token(TOKEN_STATEMENT, "other", 6, "<HTML>{{ other }}</HTML>"),
      new Token(TOKEN_LITERAL, "</HTML>", 17, "<HTML>{{ other }}</HTML>"),
    ]);
  });
  test("output with whitespace control", () => {
    const tokens = Array.from(tokenize("<HTML>{{- other -}}</HTML>"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_LITERAL, "<HTML>", 0, "<HTML>{{- other -}}</HTML>"),
      new Token(TOKEN_STATEMENT, "other", 6, "<HTML>{{- other -}}</HTML>"),
      new Token(TOKEN_LITERAL, "</HTML>", 19, "<HTML>{{- other -}}</HTML>"),
    ]);
  });
  test("block tag", () => {
    const tokens = Array.from(tokenize("{% if true %}hello{% endif %}"));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_TAG, "if", 0, "{% if true %}hello{% endif %}"),
      new Token(TOKEN_EXPRESSION, "true", 6, "{% if true %}hello{% endif %}"),
      new Token(TOKEN_LITERAL, "hello", 13, "{% if true %}hello{% endif %}"),
      new Token(TOKEN_TAG, "endif", 18, "{% if true %}hello{% endif %}"),
    ]);
  });
  test("multi block tag", () => {
    const t =
      "{% if false %}hello{% elsif true %}g'day{% else %}goodbye{% endif %}";
    const tokens = Array.from(tokenize(t));
    expect(tokens).toStrictEqual([
      new Token(TOKEN_TAG, "if", 0, t),
      new Token(TOKEN_EXPRESSION, "false", 6, t),
      new Token(TOKEN_LITERAL, "hello", 14, t),
      new Token(TOKEN_TAG, "elsif", 19, t),
      new Token(TOKEN_EXPRESSION, "true", 28, t),
      new Token(TOKEN_LITERAL, "g'day", 35, t),
      new Token(TOKEN_TAG, "else", 40, t),
      new Token(TOKEN_LITERAL, "goodbye", 50, t),
      new Token(TOKEN_TAG, "endif", 57, t),
    ]);
  });
});
