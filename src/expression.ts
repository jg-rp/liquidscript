import { Markup } from "./builtin/drops/markup";
import { RenderContext } from "./context";
import { isLiquidPrimitive, LiquidPrimitive, toLiquidPrimitive } from "./drop";
import {
  FilterArgumentError,
  FilterNotFoundError,
  FilterValueError,
  InternalKeyError,
  InternalTypeError,
} from "./errors";
import { Float, Integer, isInteger, parseNumberT } from "./number";
import { range, Range } from "./range";
import {
  isArray,
  isBoolean,
  isIterable,
  isNumber,
  isObject,
  isPrimitiveInteger,
  isPropertyKey,
  isString,
  isUndefined,
} from "./types";
import { Undefined } from "./undefined";

export interface Expression {
  evaluate(context: RenderContext): Promise<unknown>;
  evaluateSync(context: RenderContext): unknown;
  equals(other: unknown): boolean;
  toString(): string;
  children?: () => Expression[];
}

export class Nil implements Expression {
  public async evaluate(): Promise<null> {
    return null;
  }

  public evaluateSync(): null {
    return null;
  }

  public equals(other: unknown): boolean {
    return other === null || other === undefined || other instanceof Nil
      ? true
      : false;
  }

  public toString(): string {
    return "";
  }

  public children(): Expression[] {
    return [];
  }
}

export const NIL = new Nil();

export class Empty implements Expression {
  public async evaluate(): Promise<Empty> {
    return this;
  }

  public evaluateSync(): Empty {
    return this;
  }

  public equals(other: unknown): boolean {
    if (other instanceof Empty) return true;
    if (other === null) return false;
    if (isString(other) || isArray(other)) return !other.length;
    if (other instanceof Map || other instanceof Set) return other.size === 0;
    if (isObject(other)) {
      for (const i in other) return false;
      return true;
    }
    return false;
  }

  public toString(): string {
    return "empty";
  }

  public children(): Expression[] {
    return [];
  }
}

export const EMPTY = new Empty();

export class Blank implements Expression {
  public async evaluate(): Promise<Blank> {
    return this;
  }

  public evaluateSync(): Blank {
    return this;
  }

  public equals(other: unknown): boolean {
    if (other instanceof Empty) return false;
    if (other instanceof Blank) return false;
    if (other === null) return true;
    if (isString(other)) return !other.trim().length;
    if (isArray(other)) return !other.length;
    if (isObject(other)) {
      for (const i in other) return false;
      return true;
    }
    return false;
  }

  public toString(): string {
    return "blank";
  }

  public children(): Expression[] {
    return [];
  }
}

export const BLANK = new Blank();

export class Continue implements Expression {
  async evaluate(): Promise<Continue> {
    return this;
  }

  public evaluateSync(): Continue {
    return this;
  }

  public equals(other: unknown): boolean {
    return other instanceof Continue;
  }

  public toString(): string {
    return "continue";
  }

  public children(): Expression[] {
    return [];
  }
}

export const CONTINUE = new Continue();

export abstract class Literal<T> implements Expression {
  constructor(readonly value: T) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async evaluate(context: RenderContext): Promise<T> {
    return this.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public evaluateSync(context: RenderContext): T {
    return this.value;
  }

  public equals(other: unknown): boolean {
    return this.value === other;
  }

  public toString(): string {
    return `${this.value}`;
  }

  public children(): Expression[] {
    return [];
  }
}

export class BooleanLiteral extends Literal<boolean> {
  public equals(other: unknown): boolean {
    return other instanceof BooleanLiteral && this.value === other.value;
  }
}

export const TRUE = new BooleanLiteral(true);
export const FALSE = new BooleanLiteral(false);

export class StringLiteral extends Literal<string | Markup> {
  public async evaluate(context: RenderContext): Promise<string | Markup> {
    return this.evaluateSync(context);
  }

  public evaluateSync(context: RenderContext): string | Markup {
    return context.environment.autoEscape
      ? Markup.from(this.value)
      : this.value;
  }

  public equals(other: unknown): boolean {
    return other instanceof StringLiteral && this.value === other.value;
  }
}

export class IntegerLiteral extends Literal<Integer> {
  public equals(other: unknown): boolean {
    return other instanceof IntegerLiteral && this.value === other.value;
  }

  public toString(): string {
    return this.value.toString();
  }
}

export class FloatLiteral extends Literal<Float> {
  public equals(other: unknown): boolean {
    return other instanceof FloatLiteral && this.value === other.value;
  }

  public toString(): string {
    return this.value.toString();
  }
}

export class RangeLiteral implements Expression {
  constructor(
    readonly start: Expression,
    readonly stop: Expression,
  ) {}

  public async evaluate(context: RenderContext): Promise<Range> {
    let start = Number(
      this.start instanceof Literal
        ? this.start.evaluateSync(context)
        : await this.start.evaluate(context),
    );
    let stop = Number(
      this.stop instanceof Literal
        ? this.stop.evaluateSync(context)
        : await this.stop.evaluate(context),
    );
    if (isNaN(start.valueOf())) start = 0;
    if (isNaN(stop.valueOf())) stop = 0;
    if (start > stop) return range(-1);
    return range(start.valueOf(), stop.valueOf());
  }

  public evaluateSync(context: RenderContext): Range {
    let start = Number(this.start.evaluateSync(context));
    let stop = Number(this.stop.evaluateSync(context));
    if (isNaN(start.valueOf())) start = 0;
    if (isNaN(stop.valueOf())) stop = 0;
    if (start > stop) return range(-1);
    return range(start.valueOf(), stop.valueOf());
  }

  public equals(other: unknown): boolean {
    return (
      other instanceof RangeLiteral &&
      this.start === other.start &&
      this.stop === other.stop
    );
  }

  public toString(): string {
    return `(${this.start}..${this.stop})`;
  }

  public children(): Expression[] {
    return [this.start, this.stop];
  }
}

export class IdentifierPathElement extends Literal<number | string> {
  public equals(other: unknown): boolean {
    return other instanceof IdentifierPathElement && this.value === other.value;
  }
}

export type IdentifierPath = Array<IdentifierPathElement | Identifier>;

export class Identifier implements Expression {
  constructor(
    readonly root: string | null,
    readonly path: IdentifierPath,
  ) {}

  public equals(other: unknown): boolean {
    return (
      other instanceof Identifier &&
      this.root === other.root &&
      this.path === other.path
    );
  }

  public toString(): string {
    const buf: string[] = [];
    if (this.root !== null) {
      buf.push(this.root);
    }

    let part: string;
    for (const e of this.path) {
      if (e instanceof Identifier) {
        buf.push(`[${e}]`);
      } else {
        part = String(e);
        if (part.includes(".")) {
          buf.push(`["${part}"]`);
        } else {
          buf.push(part);
        }
      }
    }
    return buf.join(".").replace(".[", "[");
  }

  public async evaluate(context: RenderContext): Promise<unknown> {
    const path: Array<string | number | LiquidPrimitive> = [];
    let prop: unknown;
    for (const e of this.path) {
      prop =
        e instanceof Literal
          ? e.evaluateSync(context)
          : await e.evaluate(context);
      if (isInteger(prop)) {
        path.push(prop.valueOf());
      } else if (
        isString(prop) ||
        isLiquidPrimitive(prop) ||
        isPrimitiveInteger(prop)
      ) {
        path.push(prop);
      } else {
        throw new InternalKeyError(`can't access property with '${prop}'`);
      }
    }
    if (this.root === null) {
      return await context.get(path[0].toString(), path.slice(1));
    }
    return await context.get(this.root, path);
  }

  public evaluateSync(context: RenderContext): unknown {
    const path: Array<string | number | LiquidPrimitive> = [];
    let prop: unknown;
    for (const e of this.path) {
      prop = e.evaluateSync(context);
      if (isInteger(prop)) {
        path.push(prop.valueOf());
      } else if (
        isString(prop) ||
        isLiquidPrimitive(prop) ||
        isPrimitiveInteger(prop)
      ) {
        path.push(prop);
      } else {
        throw new InternalKeyError(`can't access property with '${prop}'`);
      }
    }
    if (this.root === null) {
      return context.getSync(path[0].toString(), path.slice(1));
    }
    return context.getSync(this.root, path);
  }

  public children(): Expression[] {
    return this.path.filter(isExpression);
  }
}

export class ExpressionFilter {
  constructor(
    readonly name: string,
    readonly args: Expression[] = [],
    readonly kwargs: Map<string, Expression> = new Map(),
  ) {}

  public toString() {
    const buf = [this.name];
    const argsString = this.args.map(String).join(", ");
    if (argsString.length) buf.push(`: ${argsString}`);
    const kwargsString = Array.from(this.kwargs)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");
    if (kwargsString.length) buf.push(`, ${kwargsString}`);
    return buf.join("");
  }

  public async evalArgs(context: RenderContext): Promise<unknown[]> {
    return Promise.all(
      this.args.map(async (arg) =>
        arg instanceof Literal
          ? arg.evaluateSync(context)
          : await arg.evaluate(context),
      ),
    );
  }

  public async evalKeywordArgs(
    context: RenderContext,
  ): Promise<{ [index: string]: unknown }> {
    const kwargs: { [index: string]: unknown } = {};
    for (const [key, value] of this.kwargs.entries()) {
      kwargs[key] =
        value instanceof Literal
          ? value.evaluateSync(context)
          : await value.evaluate(context);
    }
    return kwargs;
  }

  public evalArgsSync(context: RenderContext): unknown[] {
    return this.args.map((arg) => arg.evaluateSync(context));
  }

  public evalKeywordArgsSync(context: RenderContext): {
    [index: string]: unknown;
  } {
    const kwargs: { [index: string]: unknown } = {};
    for (const [key, value] of this.kwargs.entries()) {
      kwargs[key] = value.evaluateSync(context);
    }
    return kwargs;
  }
}

export class FilteredExpression implements Expression {
  constructor(
    readonly expression: Expression,
    readonly filters: ExpressionFilter[] = [],
  ) {}

  public equals(other: unknown): boolean {
    return (
      other instanceof FilteredExpression &&
      this.expression.equals(other.expression) &&
      this.filters === other.filters
    );
  }

  public toString(): string {
    const filterStr = this.filters.map(String).join("|");
    if (filterStr.length) return `${this.expression} | ${filterStr}`;
    return this.expression.toString();
  }

  protected async applyFilters(
    left: unknown,
    filters: ExpressionFilter[],
    context: RenderContext,
  ): Promise<unknown> {
    let result = left;
    for (const filter of filters) {
      const _filter = context.environment.filters[filter.name];
      if (_filter === undefined) {
        if (context.environment.strictFilters)
          throw new FilterNotFoundError(`unknown filter ${filter.name}`);
        continue;
      }
      try {
        result = _filter.apply(
          { context, options: await filter.evalKeywordArgs(context) },
          [result, ...(await filter.evalArgs(context))],
        );
      } catch (error) {
        if (error instanceof FilterValueError) continue;
        if (error instanceof FilterArgumentError) {
          error.message = `${filter.name}: ${error.message}`;
        }
        throw error;
      }
    }
    return result;
  }

  protected applyFiltersSync(
    left: unknown,
    filters: ExpressionFilter[],
    context: RenderContext,
  ): unknown {
    let result = left;
    for (const filter of filters) {
      const _filter = context.environment.filters[filter.name];
      if (_filter === undefined) {
        if (context.environment.strictFilters)
          throw new FilterNotFoundError(`unknown filter ${filter.name}`);
        continue;
      }
      try {
        result = _filter.apply(
          { context, options: filter.evalKeywordArgsSync(context) },
          [result, ...filter.evalArgsSync(context)],
        );
      } catch (error) {
        if (error instanceof FilterValueError) continue;
        if (error instanceof FilterArgumentError) {
          error.message = `${filter.name}: ${error.message}`;
        }
        throw error;
      }
    }
    return result;
  }

  public async evaluate(context: RenderContext): Promise<unknown> {
    const left =
      this.expression instanceof Literal
        ? this.expression.evaluateSync(context)
        : await this.expression.evaluate(context);
    return await this.applyFilters(left, this.filters, context);
  }

  public evaluateSync(context: RenderContext): unknown {
    const left = this.expression.evaluateSync(context);
    return this.applyFiltersSync(left, this.filters, context);
  }

  public children(): Expression[] {
    const _children = [this.expression];
    for (const filter of this.filters) {
      for (const arg of filter.args) {
        _children.push(arg);
      }
      for (const arg of filter.kwargs.values()) {
        _children.push(arg);
      }
    }
    return _children;
  }
}

export class ConditionalExpression extends FilteredExpression {
  constructor(
    readonly expression: Expression,
    readonly filters: ExpressionFilter[] = [],
    readonly condition: Expression = NIL,
    readonly alternative: Expression = NIL,
  ) {
    super(expression, filters);
  }

  public equals(other: unknown): boolean {
    return (
      other instanceof ConditionalExpression &&
      this.expression.equals(other.expression) &&
      this.condition.equals(other.condition) &&
      this.alternative.equals(other.alternative) &&
      this.filters === other.filters
    );
  }

  public toString(): string {
    const buf: string[] = [this.expression.toString()];

    if (!this.condition.equals(NIL)) {
      buf.push("if", this.condition.toString());
    }

    if (!this.alternative.equals(NIL)) {
      buf.push("else", this.condition.toString());
    }

    if (this.filters.length > 0) {
      buf.push("|");
      buf.push(this.filters.map(String).join(" | "));
    }

    return buf.join(" | ");
  }

  public async evaluate(context: RenderContext): Promise<unknown> {
    let left: unknown;
    if (this.condition.equals(NIL)) {
      left = await this.expression.evaluate(context);
    } else {
      if (isLiquidTruthy(await this.condition.evaluate(context))) {
        left = await this.expression.evaluate(context);
      } else if (this.alternative.equals(NIL)) {
        left = context.environment.undefinedFactory("");
      } else {
        left = await this.alternative.evaluate(context);
      }
    }
    return await this.applyFilters(left, this.filters, context);
  }

  public evaluateSync(context: RenderContext): unknown {
    let left: unknown;
    if (this.condition.equals(NIL)) {
      left = this.expression.evaluateSync(context);
    } else {
      if (isLiquidTruthy(this.condition.evaluateSync(context))) {
        left = this.expression.evaluateSync(context);
      } else if (this.alternative.equals(NIL)) {
        left = context.environment.undefinedFactory("");
      } else {
        left = this.alternative.evaluateSync(context);
      }
    }
    return this.applyFiltersSync(left, this.filters, context);
  }

  public children(): Expression[] {
    const _children = [this.expression];

    if (!this.condition.equals(NIL)) {
      _children.push(this.condition);
    }

    if (!this.alternative.equals(NIL)) {
      _children.push(this.alternative);
    }

    for (const filter of this.filters) {
      for (const arg of filter.args) {
        _children.push(arg);
      }
      for (const arg of filter.kwargs.values()) {
        _children.push(arg);
      }
    }
    return _children;
  }
}

export class PrefixExpression implements Expression {
  constructor(
    readonly operator: string,
    readonly right: Expression,
  ) {}

  public equals(other: unknown): boolean {
    return (
      other instanceof PrefixExpression &&
      this.operator === other.operator &&
      this.right === other.right
    );
  }

  public toString(): string {
    return `${this.operator}${this.right}`;
  }

  public async evaluate(context: RenderContext): Promise<boolean> {
    if (this.operator === "not") {
      const right = await this.right.evaluate(context);
      return !isLiquidTruthy(right);
    }
    throw new InternalTypeError(`unknown prefix operator '${this.operator}'`);
  }

  public evaluateSync(context: RenderContext): boolean {
    if (this.operator === "not") {
      const right = this.right.evaluateSync(context);
      return !isLiquidTruthy(right);
    }
    throw new InternalTypeError(`unknown prefix operator '${this.operator}'`);
  }

  public children(): Expression[] {
    return [this.right];
  }
}

export class InfixExpression implements Expression {
  constructor(
    readonly left: Expression,
    readonly operator: string,
    readonly right: Expression,
  ) {}

  public equals(other: unknown): boolean {
    return (
      other instanceof InfixExpression &&
      this.left.equals(other.left) &&
      this.operator === other.operator &&
      this.right.equals(other.right)
    );
  }

  public toString(): string {
    return `(${this.left} ${this.operator} ${this.right})`;
  }

  public async evaluate(context: RenderContext): Promise<boolean> {
    return compare(
      this.left instanceof Literal
        ? this.left.evaluateSync(context)
        : await this.left.evaluate(context),
      this.operator,
      this.right instanceof Literal
        ? this.right.evaluateSync(context)
        : await this.right.evaluate(context),
    );
  }

  public evaluateSync(context: RenderContext): boolean {
    return compare(
      this.left.evaluateSync(context),
      this.operator,
      this.right.evaluateSync(context),
    );
  }

  public children(): Expression[] {
    return [this.left, this.right];
  }
}

export class BooleanExpression implements Expression {
  constructor(readonly expression: Expression) {}

  public equals(other: unknown): boolean {
    return (
      other instanceof BooleanExpression &&
      this.expression.equals(other.expression)
    );
  }

  public toString(): string {
    return `(${this.expression})`;
  }

  public async evaluate(context: RenderContext): Promise<boolean> {
    return isLiquidTruthy(await this.expression.evaluate(context));
  }

  public evaluateSync(context: RenderContext): boolean {
    return isLiquidTruthy(this.expression.evaluateSync(context));
  }

  public children(): Expression[] {
    return [this.expression];
  }
}

export type LoopArgument =
  | IntegerLiteral
  | FloatLiteral
  | Identifier
  | Continue;
export const For = Symbol.for("liquid.tags.for");

export class LoopExpression implements Expression {
  constructor(
    readonly name: string,
    readonly iterable: RangeLiteral | Identifier | StringLiteral,
    readonly limit?: LoopArgument,
    readonly offset?: LoopArgument | Continue,
    readonly cols?: LoopArgument,
    readonly reversed: boolean = false,
  ) {}

  public equals(other: unknown): boolean {
    return (
      other instanceof LoopExpression &&
      this.name === other.name &&
      this.iterable === other.iterable &&
      this.limit === other.limit &&
      this.offset === other.offset &&
      this.cols === other.cols &&
      this.reversed === other.reversed
    );
  }

  public toString(): string {
    const buf = [`${this.name} in ${this.iterable}`];
    if (this.limit !== undefined) buf.push(`limit:${this.limit}`);
    if (this.offset !== undefined) buf.push(`offset:${this.offset}`);
    if (this.cols !== undefined) buf.push(`cols:${this.cols}`);
    if (this.reversed) buf.push("reversed");
    return buf.join(" ");
  }

  protected toIter(obj: unknown): [Iterable<unknown>, number] {
    if (isArray(obj)) return [obj.values(), obj.length];
    if (obj instanceof Range) return [obj, obj.length];
    if (obj instanceof Set) return [obj.values(), obj.size];
    if (obj instanceof Map) return [obj.entries(), obj.size];
    if (isString(obj)) return [[obj], obj.length];
    if (isObject(obj)) {
      const it = isIterable(obj) ? obj : Object.entries(obj);
      return [it, Object.keys(obj).length];
    }
    throw new InternalTypeError(
      `expected an iterable object, at ${this.iterable}, ` +
        `found ${typeof this.iterable}`,
    );
  }

  protected *drop(it: Iterator<unknown>, n: number): Generator<unknown> {
    for (let i = 0; i < n; i++) it.next();
    let next = it.next();
    while (!next.done) {
      yield next.value;
      next = it.next();
    }
  }

  protected *take(it: Iterator<unknown>, n: number): Generator<unknown> {
    for (let i = 0; i < n; i++) yield it.next().value;
  }

  protected limitAndOffset(
    context: RenderContext,
    it: Iterable<unknown>,
    length: number,
    limit: unknown,
    offset: unknown,
  ): [Iterator<unknown>, number] {
    const offsets = context.getRegister(For);
    const _name = `${this.name}-${this.iterable}`;
    let _it = it[Symbol.iterator]();
    let _length = length;

    if (offset === CONTINUE) {
      offset = offsets.get(_name);
    }

    if (isPrimitiveInteger(offset)) {
      _it = this.drop(_it, offset);
      _length -= offset;
    } else if (isInteger(offset)) {
      _it = this.drop(_it, offset.valueOf());
      _length -= offset.valueOf();
    } else if (offset !== undefined) {
      throw new InternalTypeError(
        `loop offset must be an integer, found '${offset}'`,
      );
    }

    if (isPrimitiveInteger(limit)) {
      _length = Math.min(_length, limit);
      _it = this.take(_it, _length);
    } else if (isInteger(limit)) {
      _length = Math.min(_length, limit.valueOf());
      _it = this.take(_it, _length);
    } else if (limit !== undefined) {
      throw new InternalTypeError(
        `loop limit must be an integer, found '${limit}'`,
      );
    }

    if (offset) {
      offsets.set(_name, _length + (offset as unknown as number));
    } else {
      offsets.set(_name, _length);
    }

    return [_it, _length];
  }

  public async evaluate(
    context: RenderContext,
  ): Promise<[Iterator<unknown>, number]> {
    const [it, length] = this.toIter(await this.iterable.evaluate(context));
    return this.limitAndOffset(
      context,
      this.reversed ? Array.from(it).reverse() : it,
      length,
      await this.limit?.evaluate(context),
      await this.offset?.evaluate(context),
    );
  }

  public evaluateSync(context: RenderContext): [Iterator<unknown>, number] {
    const [it, length] = this.toIter(this.iterable.evaluateSync(context));
    return this.limitAndOffset(
      context,
      this.reversed ? Array.from(it).reverse() : it,
      length,
      this.limit?.evaluateSync(context),
      this.offset?.evaluateSync(context),
    );
  }

  public children(): Expression[] {
    const _children: Expression[] = [this.iterable];
    if (this.limit) _children.push(this.limit);
    if (this.offset) _children.push(this.offset);
    if (this.cols) _children.push(this.cols);
    return _children;
  }
}

/**
 * A type predicate for the `Expression` interface.
 */
function isExpression(obj: unknown): obj is Expression {
  return (
    !!obj && typeof obj === "object" && "equals" in obj && "evaluate" in obj
  );
}

// eslint-disable-next-line sonarjs/cognitive-complexity
function compare(left: unknown, op: string, right: unknown): boolean {
  if (op === "and") {
    return isLiquidTruthy(left) && isLiquidTruthy(right);
  } else if (op === "or") {
    return isLiquidTruthy(left) || isLiquidTruthy(right);
  }

  if (isLiquidPrimitive(left)) left = left[toLiquidPrimitive]();
  if (isLiquidPrimitive(right)) right = right[toLiquidPrimitive]();

  switch (op) {
    case "==":
      return eq(left, right);
    case "!=":
    case "<>":
      return !eq(left, right);
    case "<":
      try {
        return lt(left, right);
      } catch {
        throw new InternalTypeError(
          `invalid operator '${left} ${op} ${right}'`,
        );
      }
    case ">":
      try {
        return lt(right, left);
      } catch {
        throw new InternalTypeError(
          `invalid operator '${left} ${op} ${right}'`,
        );
      }
    case ">=":
      try {
        return lt(right, left) || eq(left, right);
      } catch {
        throw new InternalTypeError(
          `invalid operator '${left} ${op} ${right}'`,
        );
      }
    case "<=":
      try {
        return lt(left, right) || eq(left, right);
      } catch {
        throw new InternalTypeError(
          `invalid operator '${left} ${op} ${right}'`,
        );
      }
    case "contains":
      if (isString(left)) {
        return left.indexOf(String(right)) !== -1;
      }

      if (isArray(left)) {
        if (isNumber(right)) {
          const n = parseNumberT(right);
          for (const item of left) {
            if (isNumber(item) && n.eq(item)) {
              return true;
            }
          }
          return false;
        }
        return left.indexOf(right) !== -1;
      }

      if (isUndefined(left)) {
        return false;
      }

      if (isObject(left) && isPropertyKey(right)) {
        return Object.propertyIsEnumerable.call(left, right);
      }
  }

  throw new InternalTypeError(
    `invalid comparison operator '${left} ${op} ${right}'`,
  );
}

/**
 * Check a value for Liquid truthiness.
 * @param value - Any value
 * @returns `true` if the value is Liquid truthy, `false` otherwise.
 */
export function isLiquidTruthy(value: unknown): boolean {
  if (isLiquidPrimitive(value)) value = value[toLiquidPrimitive]();
  return !(
    value === false ||
    FALSE.equals(value) ||
    value === undefined ||
    value === null ||
    value instanceof Undefined
  );
}

function eq(left: unknown, right: unknown): boolean {
  if (
    right instanceof Empty ||
    right instanceof Blank ||
    right instanceof Nil ||
    right instanceof Range
  )
    [left, right] = [right, left];

  if (left instanceof Undefined && right instanceof Undefined) {
    return true;
  }

  if (isNumber(left) && isNumber(right)) {
    return parseNumberT(left).eq(right);
  }

  if (isArray(left) && isArray(right)) {
    const _right = right; // for odd typescript bug?
    return (
      left.length === _right.length && left.every((v, i) => v === _right[i])
    );
  }

  return isExpression(left) || left instanceof Range
    ? left.equals(right)
    : left === right;
}

function lt(left: unknown, right: unknown): boolean {
  if (isString(left) && isString(right)) {
    return left < right;
  }

  if (isBoolean(left) || isBoolean(right)) {
    return false;
  }

  if (isNumber(left) && isNumber(right)) {
    return parseNumberT(left) < right;
  }

  throw new InternalTypeError("");
}
