import type { Environment } from "./environment";
import { TemplateSyntaxError } from "./errors";
import type { Expression } from "./expression";
import type { Block, Markup } from "./markup";
import { Parser, TERMINATE_EXPRESSION } from "./parser";
import { OutputStatement } from "./tags";
import {
  getTokenValue,
  REVERSE_T,
  T,
  type Token,
  type TokenKind,
} from "./token";
import * as expr from "./expression";
import { Float, Integer } from "./number";

export const PRECEDENCE_LOWEST = 1;
const PRECEDENCE_LOGICAL_RIGHT = 3;
const PRECEDENCE_RELATIONAL = 4;
const PRECEDENCE_MEMBERSHIP = 5;
const PRECEDENCE_PREFIX = 9;

const PRECEDENCES: Map<TokenKind, number> = new Map([
  [T.AND, PRECEDENCE_LOGICAL_RIGHT],
  [T.OR, PRECEDENCE_LOGICAL_RIGHT],
  [T.NOT, PRECEDENCE_PREFIX],
  [T.RPAREN, PRECEDENCE_LOWEST],
  [T.CONTAINS, PRECEDENCE_MEMBERSHIP],
  [T.EQ, PRECEDENCE_RELATIONAL],
  [T.LT, PRECEDENCE_RELATIONAL],
  [T.GT, PRECEDENCE_RELATIONAL],
  [T.NE, PRECEDENCE_RELATIONAL],
  [T.LE, PRECEDENCE_RELATIONAL],
  [T.GE, PRECEDENCE_RELATIONAL],
]);

type InfixConstructor = {
  new (token: Token, left: Expression, right: Expression): Expression;
};

const INFIX_OPERATORS: Map<TokenKind, InfixConstructor> = new Map([
  [T.OR, expr.OrExpression],
  [T.AND, expr.AndExpression],
  [T.EQ, expr.EqExpression],
  [T.LT, expr.LtExpression],
  [T.GT, expr.GtExpression],
  [T.NE, expr.NeExpression],
  [T.LE, expr.LeExpression],
  [T.GE, expr.GeExpression],
  [T.CONTAINS, expr.ContainsExpression],
]);

const TERMINATE_FILTER: Set<TokenKind> = new Set([
  T.WC,
  T.OUT_END,
  T.TAG_END,
  T.TEXT,
  T.RPAREN,
  T.EOI,
  T.PIPE,
]);

const PATH_PUNCTUATION: Set<TokenKind> = new Set([T.DOT, T.LBRACKET]);

const STRING_LITERAL_KINDS: Set<TokenKind> = new Set([
  T.SINGLE_ESCAPED,
  T.SINGLE_QUOTED,
  T.DOUBLE_ESCAPED,
  T.DOUBLE_QUOTED,
]);

/**
 * A single pass template parser that matches Shopify/liquid v5.12.0 strict
 * mode syntax and semantics.
 */
export class LegacyParser extends Parser {
  protected primaryMap: Map<TokenKind, () => Expression>;

  constructor(
    override readonly env: Environment,
    override readonly source: string,
    override readonly tokens: Token[],
  ) {
    super(env, source, tokens);

    this.primaryMap = new Map([
      [T.SINGLE_QUOTE, this.parseStringLiteral.bind(this)],
      [T.DOUBLE_QUOTE, this.parseStringLiteral.bind(this)],
      [T.IDENT, this.parsePath.bind(this)],
      [T.LBRACKET, this.parsePath.bind(this)],
      [T.LPAREN, this.parseRangeLiteral.bind(this)],
      [T.TRUE, this.parseTrueLiteral.bind(this)],
      [T.FALSE, this.parseFalseLiteral.bind(this)],
      [T.NULL, this.parseNullLiteral.bind(this)],
      [T.NIL, this.parseNullLiteral.bind(this)],
      [T.INT, this.parseIntLiteral.bind(this)],
      [T.FLOAT, this.parseFloatLiteral.bind(this)],
      [T.BLANK, this.parseBlank.bind(this)],
      [T.EMPTY, this.parseEmpty.bind(this)],
    ]);
  }

  override parseArguments(
    requireCommas: boolean = true,
  ): Array<Expression | expr.KeywordArgument> {
    const args: Array<Expression | expr.KeywordArgument> = [];
    let kind: TokenKind;

    for (;;) {
      kind = this.kind();

      if (TERMINATE_EXPRESSION.has(kind)) {
        break;
      }

      if (kind === T.IDENT && this.peek().kind === T.COLON) {
        // Named argument.
        const name = this.parseIdent();
        this.eat(T.COLON);
        args.push(
          new expr.KeywordArgument(name.token, name, this.parseExpression()),
        );
      } else {
        args.push(this.parseExpression());
      }

      kind = this.kind();
      if (requireCommas && !TERMINATE_EXPRESSION.has(kind)) {
        this.eat(T.COMMA);
      } else if (kind == T.COMMA) {
        this.pos += 1;
      }
    }

    return args;
  }

  protected parseBlank(): Expression {
    // `blank` is a reserved word when it is not followed by segments.
    switch (this.peek(1).kind) {
      case T.LBRACKET:
      case T.DOT:
        return this.parsePath();
      default:
        return new expr.Blank(this.next());
    }
  }

  override parseBlock(end?: Set<string>): Block {
    const nodes: Block = [];
    let token: Token;

    for (;;) {
      token = this.next();

      switch (token.kind) {
        case T.TEXT:
          nodes.push(
            this.env.trim(
              getTokenValue(token, this.source),
              this.whitespaceControlCarry,
              this.peekWhitespaceControl(),
            ),
          );
          break;
        case T.OUT_START:
          nodes.push(this.parseOutput());
          break;
        case T.TAG_START:
          if (end && end.has(this.peekTagName())) {
            this.pos -= 1;
            return nodes;
          }
          nodes.push(this.parseTag());
          break;
        case T.EOI:
          return nodes;
        default:
          throw new TemplateSyntaxError(
            `unexpected ${REVERSE_T[token.kind]}`,
            token,
            this.source,
          );
      }
    }
  }

  protected parseBracketedSegment(): expr.PathSegment {
    this.eat(T.LBRACKET);
    const token = this.next();
    let segment: expr.PathSegment;

    switch (token.kind) {
      case T.INT:
        segment = new expr.IndexSelector(
          token,
          Number(getTokenValue(token, this.source)),
        );
        break;
      case T.IDENT:
        this.pos -= 1;
        segment = this.parsePath();
        break;
      case T.DOUBLE_QUOTE:
      case T.SINGLE_QUOTE:
        this.pos -= 1;
        segment = this.parseStringLiteral();
        break;
      case T.RBRACKET:
        throw new TemplateSyntaxError(
          "empty bracketed segment",
          token,
          this.source,
        );
      default:
        throw new TemplateSyntaxError(
          "expected an integer, identifier or string",
          token,
          this.source,
        );
    }

    this.eat(T.RBRACKET);
    return segment;
  }

  protected parseEmpty(): Expression {
    // `empty` is a reserved word when it is not followed by segments.
    switch (this.peek(1).kind) {
      case T.LBRACKET:
      case T.DOT:
        return this.parsePath();
      default:
        return new expr.Empty(this.next());
    }
  }

  override parseExpression(
    precedence: number = PRECEDENCE_LOWEST,
    infix: boolean = false,
  ): Expression {
    const parseFunc = this.primaryMap.get(this.kind());

    if (!parseFunc) {
      throw new TemplateSyntaxError(
        `unexpected ${REVERSE_T[this.kind()]}`,
        this.current(),
        this.source,
      );
    }

    let left = parseFunc();

    if (!infix) {
      return left;
    }

    let kind: TokenKind;

    for (;;) {
      kind = this.kind();

      if (
        (PRECEDENCES.get(kind) || PRECEDENCE_LOWEST) < precedence ||
        !INFIX_OPERATORS.has(kind)
      ) {
        break;
      }

      left = this.parseInfix(left);
    }

    return left;
  }

  protected parseFalseLiteral(): Expression {
    // `false` is a reserved word when it is not followed by segments.
    switch (this.peek(1).kind) {
      case T.LBRACKET:
      case T.DOT:
        return this.parsePath();
      default:
        return new expr.BooleanLiteral(this.next(), false);
    }
  }

  protected parseFilter(left: Expression): expr.FilteredExpression {
    const token = this.eat(T.PIPE);
    const nameToken = this.eat(T.IDENT, "missing or malformed filter name");

    if (TERMINATE_FILTER.has(this.kind())) {
      // No arguments
      return new expr.FilteredExpression(
        token,
        left,
        new expr.Filter(
          nameToken,
          new expr.Name(nameToken, getTokenValue(nameToken, this.source)),
          [],
        ),
      );
    }

    this.eat(T.COLON, "missing colon or pipe");

    const args: Array<Expression | expr.KeywordArgument> = [];
    let kind: TokenKind;

    for (;;) {
      kind = this.kind();

      if (TERMINATE_FILTER.has(kind)) {
        break;
      }

      if (kind === T.IDENT && this.peek().kind === T.COLON) {
        // A keyword argument.
        const param = this.parseIdent();
        this.eat(T.COLON);
        args.push(
          new expr.KeywordArgument(param.token, param, this.parseExpression()),
        );
      } else {
        args.push(this.parseExpression());
      }

      if (TERMINATE_FILTER.has(this.kind())) {
        break;
      }

      this.eat(T.COMMA, "missing comma or pipe");
    }

    return new expr.FilteredExpression(
      token,
      left,
      new expr.Filter(
        nameToken,
        new expr.Name(nameToken, getTokenValue(nameToken, this.source)),
        args,
      ),
    );
  }

  override parseFilteredExpression(
    precedence: number = PRECEDENCE_LOWEST,
  ): Expression {
    let expr = this.parseExpression(precedence);

    if (this.kind() === T.PIPE) {
      expr = this.parseFilters(expr);
    }

    return expr;
  }

  protected parseFilters(left: Expression): expr.FilteredExpression {
    let filterExpr = this.parseFilter(left);
    while (this.kind() == T.PIPE) {
      filterExpr = this.parseFilter(filterExpr);
    }
    return filterExpr;
  }

  protected parseFloatLiteral(): Expression {
    const token = this.next();
    return new expr.FloatLiteral(
      token,
      new Float(getTokenValue(token, this.source)),
    );
  }

  override parseIdent(): expr.Name {
    const token = this.eat(T.IDENT);
    if (PATH_PUNCTUATION.has(this.kind())) {
      throw new TemplateSyntaxError(
        "expected an identifier, found a path",
        token,
        this.source,
      );
    }
    return new expr.Name(token, getTokenValue(token, this.source));
  }

  protected parseInfix(left: Expression): Expression {
    const opToken = this.next();
    const kind = opToken.kind;
    const right = this.parseFilteredExpression(
      PRECEDENCES.get(kind) || PRECEDENCE_LOWEST,
    );

    const infixCtor = INFIX_OPERATORS.get(kind) as InfixConstructor;
    return new infixCtor(opToken, left, right);
  }

  protected parseIntLiteral(): Expression {
    const token = this.next();
    return new expr.IntegerLiteral(
      token,
      new Integer(getTokenValue(token, this.source)),
    );
  }

  override parseKeywordArguments(
    requireCommas?: boolean,
  ): Array<expr.KeywordArgument> {
    const args: Array<expr.KeywordArgument> = [];
    let kind: TokenKind;

    for (;;) {
      kind = this.kind();

      if (TERMINATE_EXPRESSION.has(kind)) {
        break;
      }

      const name = this.parseIdent();
      this.eat(T.COLON);
      args.push(
        new expr.KeywordArgument(name.token, name, this.parseExpression()),
      );

      kind = this.kind();
      if (requireCommas && !TERMINATE_EXPRESSION.has(kind)) {
        this.eat(T.COMMA);
      } else if (kind == T.COMMA) {
        this.pos += 1;
      }
    }

    return args;
  }

  override parseLineStatements(): Block {
    const nodes: Block = [];
    let token: Token;
    let kind: TokenKind;

    for (;;) {
      token = this.current();
      kind = token.kind;

      if (kind === T.TAG_START) {
        this.pos += 1;
        nodes.push(this.parseTag());
      } else if (kind === T.WC || kind === T.TAG_END) {
        break;
      } else {
        throw new TemplateSyntaxError(
          `unexpected ${REVERSE_T[kind]} (${JSON.stringify(getTokenValue(token, this.source))})`,
          token,
          this.source,
        );
      }
    }

    return nodes;
  }

  override parseName(): expr.Name {
    let strExpr: expr.StringLiteral;

    switch (this.kind()) {
      case T.IDENT:
        return this.parseIdent();
      case T.SINGLE_QUOTE:
      case T.DOUBLE_QUOTE:
        strExpr = this.parseStringLiteral();
        return new expr.Name(strExpr.token, strExpr.value);
      default:
        throw new TemplateSyntaxError(
          "expected a string or identifier",
          this.current(),
          this.source,
        );
    }
  }

  protected parseNullLiteral(): Expression {
    // `nil` and `null` are not reserved words when they are followed by segments.
    switch (this.peek(1).kind) {
      case T.LBRACKET:
      case T.DOT:
        return this.parsePath();
      default:
        return new expr.NullLiteral(this.next());
    }
  }

  protected parseOutput(): OutputStatement {
    const token = this.tokens[this.pos - 1] as Token;
    this.skipWhitespaceControl();
    const expr = this.parseFilteredExpression();
    this.carryWhitespaceControl();
    this.eat(T.OUT_END);
    return new OutputStatement(token, expr);
  }

  protected parsePath(): expr.Variable {
    const token = this.current();
    let root: expr.Name | expr.StringLiteral | expr.Variable;

    switch (token.kind) {
      case T.IDENT:
      case T.BLANK:
      case T.EMPTY:
      case T.FALSE:
      case T.TRUE:
      case T.NULL:
      case T.NIL:
        this.pos += 1;
        root = new expr.Name(token, getTokenValue(token, this.source));
        break;
      default:
        this.eat(T.LBRACKET);
        if (this.kind() == T.IDENT) {
          root = this.parsePath();
        } else {
          root = this.parseStringLiteral();
        }

        this.eat(T.RBRACKET);
    }

    return new expr.Variable(token, root, this.parsePathSegments());
  }

  protected parsePathSegments(): expr.PathSegment[] {
    const segments: expr.PathSegment[] = [];
    let kind: TokenKind;
    let token: Token;

    for (;;) {
      kind = this.kind();

      if (kind === T.LBRACKET) {
        segments.push(this.parseBracketedSegment());
      } else if (kind === T.DOT) {
        this.pos += 1;
        token = this.eat(T.IDENT);
        segments.push(new expr.Name(token, getTokenValue(token, this.source)));
      } else {
        break;
      }
    }

    return segments;
  }

  override parsePositionalArguments(requireCommas?: boolean): Expression[] {
    const args: Expression[] = [];
    let kind: TokenKind;

    for (;;) {
      if (TERMINATE_EXPRESSION.has(this.kind())) {
        break;
      }

      args.push(this.parseExpression());

      kind = this.kind();
      if (requireCommas && !TERMINATE_EXPRESSION.has(kind)) {
        this.eat(T.COMMA);
      } else if (kind == T.COMMA) {
        this.pos += 1;
      }
    }

    return args;
  }

  protected parseRangeLiteral(): Expression {
    const token = this.eat(T.LPAREN);
    const start = this.parseFilteredExpression();
    this.eat(T.DOUBLE_DOT);
    const stop = this.parseFilteredExpression();
    this.eat(T.RPAREN);
    return new expr.RangeLiteral(token, start, stop);
  }

  parseStringLiteral(): expr.StringLiteral {
    const token = this.next();

    if (this.kind() === token.kind) {
      // Empty string
      this.eat(token.kind);
      return new expr.StringLiteral(token, "");
    }

    const result = new expr.StringLiteral(
      token,
      getTokenValue(this.eatOneOf(STRING_LITERAL_KINDS), this.source),
    );

    this.eat(token.kind);
    return result;
  }

  protected parseTag(): Markup {
    this.skipWhitespaceControl();
    const token = this.eat(T.TAG_NAME, "missing tag name");
    const tag = this.env.tags[getTokenValue(token, this.source)];

    if (tag) {
      return tag.parse(token, this);
    }

    throw new TemplateSyntaxError(
      `unexpected tag ${getTokenValue(token, this.source)}`,
      token,
      this.source,
    );
  }

  protected parseTrueLiteral(): Expression {
    // `true` is a reserved word when it is not followed by segments.
    switch (this.peek(1).kind) {
      case T.LBRACKET:
      case T.DOT:
        return this.parsePath();
      default:
        return new expr.BooleanLiteral(this.next(), true);
    }
  }
}
