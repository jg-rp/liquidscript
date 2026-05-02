/* eslint-disable @typescript-eslint/no-unused-vars */
import { StaticContext, type RenderContext } from "./context";
import { BLANK, EMPTY } from "./drops";
import { UnknownFilterError } from "./errors";
import { Nothing } from "./runtime";
import { range } from "./drops/range";
import { span, T, type Token } from "./token";
import { isString } from "./type_guards";

export type PathSegment = Name | StringLiteral | IntegerLiteral | Variable;

export type Literal =
  | IntegerLiteral
  | FloatLiteral
  | StringLiteral
  | BooleanLiteral
  | NullLiteral
  | RangeLiteral;

export interface Expression {
  evaluate(context: RenderContext): Promise<unknown>;
  evaluateSync(context: RenderContext): unknown;
  children(context: StaticContext): Traversable[];
  span: Token;
  token: Token;
}

export interface Traversable {
  children(context: StaticContext): Traversable[];
}

export class FilteredExpression implements Expression {
  readonly span: Token;

  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly filter: Filter,
  ) {
    this.span = span(token, filter.span);
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.filter];
  }

  async evaluate(context: RenderContext): Promise<unknown> {
    const func = context.env.filters[this.filter.name.value];
    if (!func) {
      if (context.env.strictFilters) {
        throw new UnknownFilterError(
          `unknown filter ${this.filter.name.value}`,
          this.filter.token,
          context.template.source,
        );
      }

      return Nothing;
    }

    const left = await this.left.evaluate(context);

    if (!this.filter.args.length) {
      // TODO: async filter
      return func.call({ context, span: this.span, options: {} }, left);
    }

    const args: unknown[] = [];
    const kwargs: { [key: string]: unknown } = {};

    for (const arg of this.filter.args) {
      if (arg instanceof KeywordArgument) {
        kwargs[arg.name.value] = await arg.expr.evaluate(context);
      } else {
        args.push(await arg.evaluate(context));
      }
    }

    // TODO: async filter

    return func.call(
      { context, span: this.span, options: kwargs },
      left,
      ...args,
    );
  }

  evaluateSync(context: RenderContext): unknown {
    const func = context.env.filters[this.filter.name.value];
    if (!func) {
      if (context.env.strictFilters) {
        throw new UnknownFilterError(
          `unknown filter ${this.filter.name.value}`,
          this.filter.token,
          context.template.source,
        );
      }

      return Nothing;
    }

    const left = this.left.evaluateSync(context);

    if (!this.filter.args.length) {
      return func.call({ context, span: this.span, options: {} }, left);
    }

    const args: unknown[] = [];
    const kwargs: { [key: string]: unknown } = {};

    for (const arg of this.filter.args) {
      if (arg instanceof KeywordArgument) {
        kwargs[arg.name.value] = arg.expr.evaluateSync(context);
      } else {
        args.push(arg.evaluateSync(context));
      }
    }

    return func.call(
      { context, span: this.span, options: kwargs },
      left,
      ...args,
    );
  }

  toString(): string {
    return `${this.left} | ${this.filter}`;
  }
}

export class OrExpression implements Expression {
  readonly span: Token;

  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly right: Expression,
  ) {
    this.span = span(left.token, right.token);
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.right];
  }

  async evaluate(context: RenderContext): Promise<unknown> {
    const left = await this.left.evaluate(context);
    return context.env.isTruthy(left, context)
      ? left
      : await this.right.evaluate(context);
  }

  evaluateSync(context: RenderContext): unknown {
    const left = this.left.evaluateSync(context);
    return context.env.isTruthy(left, context)
      ? left
      : this.right.evaluateSync(context);
  }

  toString(): string {
    return `${this.left} or ${this.right}`;
  }
}

export class AndExpression implements Expression {
  readonly span: Token;

  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly right: Expression,
  ) {
    this.span = span(left.token, right.token);
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.right];
  }

  async evaluate(context: RenderContext): Promise<unknown> {
    const left = await this.left.evaluate(context);
    return context.env.isTruthy(left, context)
      ? await this.right.evaluate(context)
      : left;
  }

  evaluateSync(context: RenderContext): unknown {
    const left = this.left.evaluateSync(context);
    return context.env.isTruthy(left, context)
      ? this.right.evaluateSync(context)
      : left;
  }

  toString(): string {
    return `${this.left} and ${this.right}`;
  }
}

export class EqExpression implements Expression {
  readonly span: Token;

  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly right: Expression,
  ) {
    this.span = span(left.token, right.token);
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.right];
  }

  async evaluate(context: RenderContext): Promise<unknown> {
    return context.env.isEqual(
      await this.left.evaluate(context),
      await this.right.evaluate(context),
      context,
      this.span,
    );
  }

  evaluateSync(context: RenderContext): unknown {
    return context.env.isEqual(
      this.left.evaluateSync(context),
      this.right.evaluateSync(context),
      context,
      this.span,
    );
  }

  toString(): string {
    return `${this.left} == ${this.right}`;
  }
}

export class NeExpression implements Expression {
  readonly span: Token;

  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly right: Expression,
  ) {
    this.span = span(left.token, right.token);
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.right];
  }

  async evaluate(context: RenderContext): Promise<unknown> {
    return !context.env.isEqual(
      await this.left.evaluate(context),
      await this.right.evaluate(context),
      context,
      this.span,
    );
  }

  evaluateSync(context: RenderContext): unknown {
    return !context.env.isEqual(
      this.left.evaluateSync(context),
      this.right.evaluateSync(context),
      context,
      this.span,
    );
  }

  toString(): string {
    return `${this.left} != ${this.right}`;
  }
}

export class LtExpression implements Expression {
  readonly span: Token;

  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly right: Expression,
  ) {
    this.span = span(left.token, right.token);
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.right];
  }

  async evaluate(context: RenderContext): Promise<unknown> {
    return context.env.isLessThan(
      await this.left.evaluate(context),
      await this.right.evaluate(context),
      context,
      this.span,
    );
  }

  evaluateSync(context: RenderContext): unknown {
    return context.env.isLessThan(
      this.left.evaluateSync(context),
      this.right.evaluateSync(context),
      context,
      this.span,
    );
  }

  toString(): string {
    return `${this.left} < ${this.right}`;
  }
}

export class LeExpression implements Expression {
  readonly span: Token;

  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly right: Expression,
  ) {
    this.span = span(left.token, right.token);
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.right];
  }

  async evaluate(context: RenderContext): Promise<unknown> {
    const left = await this.left.evaluate(context);
    const right = await this.right.evaluate(context);
    return (
      context.env.isLessThan(left, right, context, this.span) ||
      context.env.isEqual(left, right, context, this.span)
    );
  }

  evaluateSync(context: RenderContext): unknown {
    const left = this.left.evaluateSync(context);
    const right = this.right.evaluateSync(context);
    return (
      context.env.isLessThan(left, right, context, this.span) ||
      context.env.isEqual(left, right, context, this.span)
    );
  }

  toString(): string {
    return `${this.left} <= ${this.right}`;
  }
}

export class GtExpression implements Expression {
  readonly span: Token;

  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly right: Expression,
  ) {
    this.span = span(left.token, right.token);
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.right];
  }

  async evaluate(context: RenderContext): Promise<unknown> {
    return context.env.isLessThan(
      await this.right.evaluate(context),
      await this.left.evaluate(context),
      context,
      this.span,
    );
  }

  evaluateSync(context: RenderContext): unknown {
    return context.env.isLessThan(
      this.right.evaluateSync(context),
      this.left.evaluateSync(context),
      context,
      this.span,
    );
  }

  toString(): string {
    return `${this.left} > ${this.right}`;
  }
}

export class GeExpression implements Expression {
  readonly span: Token;

  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly right: Expression,
  ) {
    this.span = span(left.token, right.token);
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.right];
  }

  async evaluate(context: RenderContext): Promise<unknown> {
    const left = await this.left.evaluate(context);
    const right = await this.right.evaluate(context);
    return (
      context.env.isLessThan(right, left, context, this.span) ||
      context.env.isEqual(left, right, context, this.span)
    );
  }

  evaluateSync(context: RenderContext): unknown {
    const left = this.left.evaluateSync(context);
    const right = this.right.evaluateSync(context);
    return (
      context.env.isLessThan(right, left, context, this.span) ||
      context.env.isEqual(left, right, context, this.span)
    );
  }

  toString(): string {
    return `${this.left} >= ${this.right}`;
  }
}

export class ContainsExpression implements Expression {
  readonly span: Token;

  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly right: Expression,
  ) {
    this.span = span(left.token, right.token);
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.right];
  }

  async evaluate(context: RenderContext): Promise<unknown> {
    return context.env.contains(
      await this.left.evaluate(context),
      await this.right.evaluate(context),
      context,
      this.span,
    );
  }

  evaluateSync(context: RenderContext): unknown {
    return context.env.contains(
      this.left.evaluateSync(context),
      this.right.evaluateSync(context),
      context,
      this.span,
    );
  }

  toString(): string {
    return `${this.left} contains ${this.right}`;
  }
}

export class Variable implements Expression {
  readonly span: Token;

  constructor(
    readonly token: Token,
    readonly root: Name | StringLiteral | Variable,
    readonly segments: PathSegment[],
  ) {
    this.span =
      segments.length === 0
        ? token
        : span(token, (segments[segments.length - 1] as PathSegment).span);
  }

  children(context: StaticContext): Traversable[] {
    return this.segments.filter((s) => s instanceof Variable);
  }

  async evaluate(context: RenderContext): Promise<unknown> {
    const rootSegment =
      this.root instanceof Variable
        ? await this.root.evaluate(context)
        : this.root.value;

    const root = isString(rootSegment) ? context.resolve(rootSegment) : Nothing;

    const [obj, index] = await context.resolvePath(
      root,
      await Promise.all(
        this.segments.map(async (s) => await s.evaluate(context)),
      ),
    );

    if (obj === Nothing) {
      return new context.env.undefinedFactory(
        this.path(this.segments.slice(0, index + 1)),
        this.span,
        context.template.source,
      );
    }

    return obj;
  }

  evaluateSync(context: RenderContext): unknown {
    const rootSegment =
      this.root instanceof Variable
        ? this.root.evaluateSync(context)
        : this.root.value;

    const root = isString(rootSegment) ? context.resolve(rootSegment) : Nothing;

    const [obj, index] = context.resolvePathSync(
      root,
      this.segments.map((s) => s.evaluateSync(context)),
    );

    if (obj === Nothing) {
      return new context.env.undefinedFactory(
        this.path(this.segments.slice(0, index + 1)),
        this.span,
        context.template.source,
      );
    }

    return obj;
  }

  private path(segments: PathSegment[]): string {
    const root = this.root instanceof Name ? `${this.root}` : `[${this.root}]`;

    if (segments.length) {
      const _segments = segments
        .map((s) => {
          return s instanceof Name ? `.${s}` : `[${s}]`;
        })
        .join("");
      return `${root}${_segments}`;
    }

    return `${root}`;
  }

  toString(): string {
    return this.path(this.segments);
  }
}

export class StringLiteral implements Expression {
  readonly span: Token;

  constructor(
    readonly token: Token,
    readonly value: string,
  ) {
    this.span = token;
  }

  children(context: StaticContext): Traversable[] {
    return [];
  }

  async evaluate(context: RenderContext): Promise<unknown> {
    return this.value;
  }

  evaluateSync(context: RenderContext): unknown {
    return this.value;
  }

  toString(): string {
    return this.token.kind === T.DOUBLE_QUOTED
      ? `"${this.value}"`
      : `'${this.value}'`;
  }
}

export class IntegerLiteral implements Expression {
  readonly span: Token;

  constructor(
    readonly token: Token,
    readonly value: number,
  ) {
    this.span = token;
  }

  children(context: StaticContext): Traversable[] {
    return [];
  }

  async evaluate(context: RenderContext): Promise<unknown> {
    return this.value;
  }

  evaluateSync(context: RenderContext): unknown {
    return this.value;
  }

  toString(): string {
    return `${this.value}`;
  }
}

export class FloatLiteral implements Expression {
  readonly span: Token;

  constructor(
    readonly token: Token,
    readonly value: number,
  ) {
    this.span = token;
  }

  children(context: StaticContext): Traversable[] {
    return [];
  }

  async evaluate(context: RenderContext): Promise<unknown> {
    return this.value;
  }

  evaluateSync(context: RenderContext): unknown {
    return this.value;
  }

  toString(): string {
    return `${this.value}`;
  }
}

export class BooleanLiteral implements Expression {
  readonly span: Token;

  constructor(
    readonly token: Token,
    readonly value: boolean,
  ) {
    this.span = token;
  }

  children(context: StaticContext): Traversable[] {
    return [];
  }

  async evaluate(context: RenderContext): Promise<unknown> {
    return this.value;
  }

  evaluateSync(context: RenderContext): unknown {
    return this.value;
  }

  toString(): string {
    return `${this.value}`;
  }
}

export class NullLiteral implements Expression {
  readonly span: Token;

  constructor(readonly token: Token) {
    this.span = token;
  }

  children(context: StaticContext): Traversable[] {
    return [];
  }

  async evaluate(context: RenderContext): Promise<unknown> {
    return null;
  }

  evaluateSync(context: RenderContext): unknown {
    return null;
  }

  toString(): string {
    return `null`;
  }
}

export class Blank implements Expression {
  readonly span: Token;

  constructor(readonly token: Token) {
    this.span = token;
  }

  children(context: StaticContext): Traversable[] {
    return [];
  }

  async evaluate(context: RenderContext): Promise<unknown> {
    return BLANK;
  }

  evaluateSync(context: RenderContext): unknown {
    return BLANK;
  }

  toString(): string {
    return "";
  }
}

export class Empty implements Expression {
  readonly span: Token;

  constructor(readonly token: Token) {
    this.span = token;
  }

  children(context: StaticContext): Traversable[] {
    return [];
  }

  async evaluate(context: RenderContext): Promise<unknown> {
    return EMPTY;
  }

  evaluateSync(context: RenderContext): unknown {
    return EMPTY;
  }

  toString(): string {
    return "";
  }
}

export class RangeLiteral implements Expression {
  readonly span: Token;

  constructor(
    readonly token: Token,
    readonly start: Expression,
    readonly stop: Expression,
  ) {
    this.span = span(start.token, stop.token);
  }

  children(context: StaticContext): Traversable[] {
    return [this.start, this.stop];
  }

  async evaluate(context: RenderContext): Promise<unknown> {
    const start = context.env.toNumber(
      await this.start.evaluate(context),
      context,
      this.span,
    );

    const stop = context.env.toNumber(
      await this.stop.evaluate(context),
      context,
      this.span,
    );

    return range(start, stop);
  }

  evaluateSync(context: RenderContext): unknown {
    const start = context.env.toNumber(
      this.start.evaluateSync(context),
      context,
      this.span,
    );

    const stop = context.env.toNumber(
      this.stop.evaluateSync(context),
      context,
      this.span,
    );

    return range(start, stop);
  }

  toString(): string {
    return `(${this.start}..${this.stop})`;
  }
}

export class Filter implements Traversable {
  readonly span: Token;

  constructor(
    readonly token: Token,
    readonly name: Name,
    readonly args: Array<Expression | KeywordArgument>,
  ) {
    this.span =
      args.length === 0
        ? token
        : span(
            token,
            (args[args.length - 1] as Expression | KeywordArgument).token,
          );
  }

  children(context: StaticContext): Traversable[] {
    return this.args;
  }

  toString(): string {
    if (this.args.length) {
      return `${this.name}: ${this.args.map((a) => a.toString()).join(",")}`;
    }

    return this.name.value;
  }
}

export class Name {
  readonly span: Token;

  constructor(
    readonly token: Token,
    readonly value: string,
  ) {
    this.span = token;
  }

  async evaluate(context: RenderContext): Promise<string> {
    return this.value;
  }

  evaluateSync(context: RenderContext): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }
}

export class KeywordArgument implements Traversable {
  constructor(
    readonly token: Token,
    readonly name: Name,
    readonly expr: Expression,
  ) {}

  children(context: StaticContext): Traversable[] {
    return [this.expr];
  }

  toString(): string {
    return `${this.name}: ${this.expr}`;
  }
}

export function treeView(expr: Traversable): string {
  const nodes: Array<[string, string, string, string]> = [];
  const staticContext = new StaticContext();

  const visit = (node: Traversable, prefix: string, isLast: boolean) => {
    let connector: string;
    if (!prefix.length) {
      connector = "";
    } else if (isLast) {
      connector = "└── ";
    } else {
      connector = "├── ";
    }

    nodes.push([prefix, connector, node.constructor.name, node.toString()]);

    const childPrefix = `${prefix}${isLast ? "    " : "│   "}`;
    node.children(staticContext).forEach((child, i) => {
      visit(child, childPrefix, i === node.children(staticContext).length - 1);
    });
  };

  visit(expr, "", true);

  const widths = nodes.map(([prefix, connector, name, _]) => {
    return prefix.length + connector.length + name.length;
  });

  const maxWidth = widths.length ? Math.max(...widths) : 0;
  const lines: string[] = [];

  nodes.forEach(([prefix, connector, name, value], i) => {
    lines.push(
      `${prefix}${connector}${name}${" ".repeat(maxWidth - (widths[i] as number) + 4)}${value}`,
    );
  });

  return lines.join("\n");
}
