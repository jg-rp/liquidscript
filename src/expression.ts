/* eslint-disable @typescript-eslint/no-unused-vars */
import { StaticContext, type RenderContext } from "./context";
import { UnknownFilterError } from "./errors";
import { Nothing, range } from "./runtime";
import { T, type Token } from "./token";

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
  token: Token;
}

export interface Traversable {
  children(context: StaticContext): Traversable[];
}

export class FilteredExpression implements Expression {
  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly filter: Filter,
  ) {}

  async evaluate(context: RenderContext): Promise<unknown> {
    const func = context.env.filters[this.filter.name.value];
    if (!func) {
      if (context.env.strictFilters) {
        throw new UnknownFilterError(
          `unknown filter ${this.filter.name.value}`,
          this.filter.token,
        );
      }

      return Nothing;
    }

    const left = await this.left.evaluate(context);

    if (!this.filter.args.length) {
      // TODO: async filter
      return func.call({ context, options: {} }, left);
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

    return func.call({ context, options: kwargs }, left, ...args);
  }

  evaluateSync(context: RenderContext): unknown {
    const func = context.env.filters[this.filter.name.value];
    if (!func) {
      if (context.env.strictFilters) {
        throw new UnknownFilterError(
          `unknown filter ${this.filter.name.value}`,
          this.filter.token,
        );
      }

      return Nothing;
    }

    const left = this.left.evaluateSync(context);

    if (!this.filter.args.length) {
      return func.call({ context, options: {} }, left);
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

    return func.call({ context, options: kwargs }, left, ...args);
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.filter];
  }

  toString(): string {
    return `${this.left} | ${this.filter}`;
  }
}

export class OrExpression implements Expression {
  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly right: Expression,
  ) {}

  async evaluate(context: RenderContext): Promise<unknown> {
    const left = await this.left.evaluate(context);
    return context.env.isTruthy(left)
      ? left
      : await this.right.evaluate(context);
  }

  evaluateSync(context: RenderContext): unknown {
    const left = this.left.evaluateSync(context);
    return context.env.isTruthy(left) ? left : this.right.evaluateSync(context);
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.right];
  }

  toString(): string {
    return `${this.left} or ${this.right}`;
  }
}

export class AndExpression implements Expression {
  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly right: Expression,
  ) {}

  async evaluate(context: RenderContext): Promise<unknown> {
    const left = await this.left.evaluate(context);
    return context.env.isTruthy(left)
      ? await this.right.evaluate(context)
      : left;
  }

  evaluateSync(context: RenderContext): unknown {
    const left = this.left.evaluateSync(context);
    return context.env.isTruthy(left) ? this.right.evaluateSync(context) : left;
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.right];
  }

  toString(): string {
    return `${this.left} and ${this.right}`;
  }
}

export class EqExpression implements Expression {
  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly right: Expression,
  ) {}

  async evaluate(context: RenderContext): Promise<unknown> {
    return context.env.isEqual(
      await this.left.evaluate(context),
      await this.right.evaluate(context),
    );
  }

  evaluateSync(context: RenderContext): unknown {
    return context.env.isEqual(
      this.left.evaluateSync(context),
      this.right.evaluateSync(context),
    );
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.right];
  }

  toString(): string {
    return `${this.left} == ${this.right}`;
  }
}

export class NeExpression implements Expression {
  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly right: Expression,
  ) {}

  async evaluate(context: RenderContext): Promise<unknown> {
    return !context.env.isEqual(
      await this.left.evaluate(context),
      await this.right.evaluate(context),
    );
  }

  evaluateSync(context: RenderContext): unknown {
    return !context.env.isEqual(
      this.left.evaluateSync(context),
      this.right.evaluateSync(context),
    );
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.right];
  }

  toString(): string {
    return `${this.left} != ${this.right}`;
  }
}

export class LtExpression implements Expression {
  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly right: Expression,
  ) {}

  async evaluate(context: RenderContext): Promise<unknown> {
    return context.env.isLessThan(
      await this.left.evaluate(context),
      await this.right.evaluate(context),
    );
  }

  evaluateSync(context: RenderContext): unknown {
    return context.env.isLessThan(
      this.left.evaluateSync(context),
      this.right.evaluateSync(context),
    );
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.right];
  }

  toString(): string {
    return `${this.left} < ${this.right}`;
  }
}

export class LeExpression implements Expression {
  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly right: Expression,
  ) {}

  async evaluate(context: RenderContext): Promise<unknown> {
    const left = await this.left.evaluate(context);
    const right = await this.right.evaluate(context);
    return (
      context.env.isLessThan(left, right) || context.env.isEqual(left, right)
    );
  }

  evaluateSync(context: RenderContext): unknown {
    const left = this.left.evaluateSync(context);
    const right = this.right.evaluateSync(context);
    return (
      context.env.isLessThan(left, right) || context.env.isEqual(left, right)
    );
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.right];
  }

  toString(): string {
    return `${this.left} <= ${this.right}`;
  }
}

export class GtExpression implements Expression {
  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly right: Expression,
  ) {}

  async evaluate(context: RenderContext): Promise<unknown> {
    return context.env.isLessThan(
      await this.right.evaluate(context),
      await this.left.evaluate(context),
    );
  }

  evaluateSync(context: RenderContext): unknown {
    return context.env.isLessThan(
      this.right.evaluateSync(context),
      this.left.evaluateSync(context),
    );
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.right];
  }

  toString(): string {
    return `${this.left} > ${this.right}`;
  }
}

export class GeExpression implements Expression {
  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly right: Expression,
  ) {}

  async evaluate(context: RenderContext): Promise<unknown> {
    const left = await this.left.evaluate(context);
    const right = await this.right.evaluate(context);
    return (
      context.env.isLessThan(right, left) || context.env.isEqual(left, right)
    );
  }

  evaluateSync(context: RenderContext): unknown {
    const left = this.left.evaluateSync(context);
    const right = this.right.evaluateSync(context);
    return (
      context.env.isLessThan(right, left) || context.env.isEqual(left, right)
    );
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.right];
  }

  toString(): string {
    return `${this.left} >= ${this.right}`;
  }
}

export class ContainsExpression implements Expression {
  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly right: Expression,
  ) {}

  async evaluate(context: RenderContext): Promise<unknown> {
    return context.env.contains(
      await this.left.evaluate(context),
      await this.right.evaluate(context),
    );
  }

  evaluateSync(context: RenderContext): unknown {
    return context.env.contains(
      this.left.evaluateSync(context),
      this.right.evaluateSync(context),
    );
  }

  children(context: StaticContext): Traversable[] {
    return [this.left, this.right];
  }

  toString(): string {
    return `${this.left} contains ${this.right}`;
  }
}

export class Variable implements Expression {
  constructor(
    readonly token: Token,
    readonly root: Name | StringLiteral,
    readonly segments: PathSegment[],
  ) {}

  async evaluate(context: RenderContext): Promise<unknown> {
    const root = context.resolve(this.root.value);
    const [obj, index] = await context.resolvePath(
      root,
      this.segments.map(async (s) => await s.evaluate(context)),
    );

    // TODO: Nothing with index
    return obj;
  }

  evaluateSync(context: RenderContext): unknown {
    const root = context.resolve(this.root.value);
    const [obj, index] = context.resolvePathSync(
      root,
      this.segments.map((s) => s.evaluateSync(context)),
    );

    // TODO: Nothing with index
    return obj;
  }

  children(context: StaticContext): Traversable[] {
    return this.segments.filter((s) => s instanceof Variable);
  }

  toString(): string {
    const root = this.root instanceof Name ? `${this.root}` : `[${this.root}]`;

    if (this.segments.length) {
      const segments = this.segments
        .map((s) => {
          return s instanceof Name ? `.${s}` : `[${s}]`;
        })
        .join("");
      return `${root}${segments}`;
    }

    return `${root}`;
  }
}

export class StringLiteral implements Expression {
  constructor(
    readonly token: Token,
    readonly value: string,
  ) {}

  async evaluate(context: RenderContext): Promise<unknown> {
    return this.value;
  }

  evaluateSync(context: RenderContext): unknown {
    return this.value;
  }

  children(context: StaticContext): Traversable[] {
    return [];
  }

  toString(): string {
    return this.token.kind === T.DOUBLE_QUOTED
      ? `"${this.value}"`
      : `'${this.value}'`;
  }
}

export class IntegerLiteral implements Expression {
  constructor(
    readonly token: Token,
    readonly value: number,
  ) {}

  async evaluate(context: RenderContext): Promise<unknown> {
    return this.value;
  }

  evaluateSync(context: RenderContext): unknown {
    return this.value;
  }

  children(context: StaticContext): Traversable[] {
    return [];
  }

  toString(): string {
    return `${this.value}`;
  }
}

export class FloatLiteral implements Expression {
  constructor(
    readonly token: Token,
    readonly value: number,
  ) {}

  async evaluate(context: RenderContext): Promise<unknown> {
    return this.value;
  }

  evaluateSync(context: RenderContext): unknown {
    return this.value;
  }

  children(context: StaticContext): Traversable[] {
    return [];
  }

  toString(): string {
    return `${this.value}`;
  }
}

export class BooleanLiteral implements Expression {
  constructor(
    readonly token: Token,
    readonly value: boolean,
  ) {}

  async evaluate(context: RenderContext): Promise<unknown> {
    return this.value;
  }

  evaluateSync(context: RenderContext): unknown {
    return this.value;
  }

  children(context: StaticContext): Traversable[] {
    return [];
  }

  toString(): string {
    return `${this.value}`;
  }
}

export class NullLiteral implements Expression {
  constructor(readonly token: Token) {}

  async evaluate(context: RenderContext): Promise<unknown> {
    return null;
  }

  evaluateSync(context: RenderContext): unknown {
    return null;
  }

  children(context: StaticContext): Traversable[] {
    return [];
  }

  toString(): string {
    return `null`;
  }
}

export class RangeLiteral implements Expression {
  constructor(
    readonly token: Token,
    readonly start: Expression,
    readonly stop: Expression,
  ) {}

  async evaluate(context: RenderContext): Promise<unknown> {
    const start = context.env.toNumber(await this.start.evaluate(context));
    const stop = context.env.toNumber(await this.stop.evaluate(context));
    return range(start, stop);
  }

  evaluateSync(context: RenderContext): unknown {
    const start = context.env.toNumber(this.start.evaluateSync(context));
    const stop = context.env.toNumber(this.stop.evaluateSync(context));
    return range(start, stop);
  }

  children(context: StaticContext): Traversable[] {
    return [this.start, this.stop];
  }

  toString(): string {
    return `(${this.start}..${this.stop})`;
  }
}

export class Filter implements Traversable {
  constructor(
    readonly token: Token,
    readonly name: Name,
    readonly args: Array<Expression | KeywordArgument>,
  ) {}

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
  constructor(
    readonly token: Token,
    readonly value: string,
  ) {}

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
