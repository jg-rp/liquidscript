import { Context } from "./context";
import { isLiquidPrimitive, LiquidPrimitive, liquidValueOf } from "./drop";
import {
  FilterValueError,
  InternalKeyError,
  LiquidTypeError,
  NoSuchFilterError,
} from "./errors";
import { Float, Integer, isInteger, parseNumberT } from "./number";
import {
  isArray,
  isIterable,
  isLiquidTruthy,
  isNumber,
  isObject,
  isPrimitiveInteger,
  isString,
} from "./object";
import { range, Range } from "./range";

// TODO: Explicit public modifier

export interface Expression {
  evaluate(context: Context): Promise<unknown>;
  equals(other: unknown): boolean;
  toString(): string;
}

export function isExpression(obj: unknown): obj is Expression {
  return (
    !!obj && typeof obj === "object" && "equals" in obj && "evaluate" in obj
  );
}

export class Nil implements Expression {
  async evaluate(): Promise<null> {
    return null;
  }

  equals(other: unknown): boolean {
    return other === null || other === undefined || other instanceof Nil
      ? true
      : false;
  }

  toString(): string {
    return "";
  }
}

export const NIL = new Nil();

export class Empty implements Expression {
  async evaluate(): Promise<Empty> {
    return this;
  }

  equals(other: unknown): boolean {
    if (other instanceof Empty) return false;
    if (other === null) return false;
    if (isString(other) || isArray(other)) return !other.length;
    if (isObject(other)) {
      for (const i in other) return false;
      return true;
    }
    return false;
  }

  toString(): string {
    return "empty";
  }
}

export const EMPTY = new Empty();

export class Blank implements Expression {
  async evaluate(): Promise<Blank> {
    return this;
  }

  equals(other: unknown): boolean {
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

  toString(): string {
    return "blank";
  }
}

export const BLANK = new Blank();

/**
 *
 */
export class Continue implements Expression {
  async evaluate(): Promise<number> {
    return 0;
  }

  equals(other: unknown): boolean {
    return other instanceof Continue;
  }

  toString(): string {
    return "continue";
  }
}

export const CONTINUE = new Continue();

export abstract class Literal<T> implements Expression {
  constructor(readonly value: T) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async evaluate(context: Context): Promise<T> {
    return this.value;
  }

  equals(other: unknown): boolean {
    return this.value === other;
  }

  toString(): string {
    return `${this.value}`;
  }
}

export class BooleanLiteral extends Literal<boolean> {
  equals(other: unknown): boolean {
    return other instanceof BooleanLiteral && this.value == other.value;
  }
}

export const TRUE = new BooleanLiteral(true);
export const FALSE = new BooleanLiteral(false);

export class StringLiteral extends Literal<string> {
  async evaluate(context: Context): Promise<string> {
    if (context.autoEscape) return safe(this.value);
    return this.value;
  }

  equals(other: unknown): boolean {
    return other instanceof StringLiteral && this.value == other.value;
  }
}

export class IntegerLiteral extends Literal<Integer> {
  equals(other: unknown): boolean {
    return other instanceof IntegerLiteral && this.value == other.value;
  }

  toString(): string {
    return this.value.toString();
  }
}

export class FloatLiteral extends Literal<Float> {
  equals(other: unknown): boolean {
    return other instanceof FloatLiteral && this.value == other.value;
  }

  toString(): string {
    return this.value.toString();
  }
}

/**
 *
 */
export class RangeLiteral implements Expression {
  constructor(readonly start: Expression, readonly stop: Expression) {}

  async evaluate(context: Context): Promise<Range> {
    let start = new Number(await this.start.evaluate(context));
    let stop = new Number(await this.stop.evaluate(context));

    if (isNaN(start.valueOf())) start = Number(0);
    if (isNaN(stop.valueOf())) stop = Number(0);

    if (start > stop) return range(0);
    return range(start.valueOf(), stop.valueOf());
  }

  equals(other: unknown): boolean {
    return (
      other instanceof RangeLiteral &&
      this.start == other.start &&
      this.stop == other.stop
    );
  }

  toString(): string {
    return `(${this.start}..${this.stop})`;
  }
}

export class IdentifierPathElement extends Literal<number | string> {
  equals(other: unknown): boolean {
    return other instanceof IdentifierPathElement && this.value == other.value;
  }
}

export type IdentifierPath = Array<IdentifierPathElement | Identifier>;

/**
 *
 */
export class Identifier implements Expression {
  constructor(readonly root: string, readonly path: IdentifierPath) {}

  equals(other: unknown): boolean {
    return other instanceof Identifier && this.path == other.path;
  }

  toString(): string {
    const buf: string[] = [this.root];
    for (const e of this.path) {
      buf.push(e instanceof Identifier ? `[${e}]` : String(e));
    }
    return buf.join(".");
  }

  async evaluate(context: Context): Promise<unknown> {
    const path: Array<string | number | LiquidPrimitive> = [];
    let prop: unknown;
    for (const e of this.path) {
      prop = await e.evaluate(context);
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
    return await context.get(this.root, path);
  }
}

/**
 *
 */
export class Filter {
  constructor(
    readonly name: string,
    private args: Expression[] = [],
    private kwargs: Map<string, Expression> = new Map()
  ) {}

  toString() {
    const buf = [this.name];
    const argsString = this.args.map(String).join(", ");
    if (argsString.length) buf.push(`: ${argsString}`);
    const kwargsString = Array.from(this.kwargs)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");
    if (kwargsString.length) buf.push(`, ${kwargsString}`);
    return buf.join("");
  }

  async evalArgs(context: Context): Promise<unknown[]> {
    // TODO: kwargs
    return Promise.all(
      this.args.map(async (arg) => await arg.evaluate(context))
    );
  }
}

/**
 *
 */
export class FilteredExpression implements Expression {
  constructor(
    readonly expression: Expression,
    readonly filters: Filter[] = []
  ) {}

  equals(other: unknown): boolean {
    return (
      other instanceof FilteredExpression &&
      this.expression.equals(other.expression) &&
      this.filters === other.filters
    );
  }

  toString(): string {
    const filterStr = this.filters.map(String).join("|");
    if (filterStr.length) return `${this.expression} | ${filterStr}`;
    return this.expression.toString();
  }

  async evaluate(context: Context): Promise<unknown> {
    let result = await this.expression.evaluate(context);
    for (const filter of this.filters) {
      const _filter = context.filter(filter.name);
      if (_filter === undefined) {
        // TODO: Look at strict mode and continue if needed
        throw new NoSuchFilterError(`unknown filter ${filter.name}`);
      }
      try {
        result = _filter.apply(context, [
          result,
          ...(await filter.evalArgs(context)),
        ]);
      } catch (error) {
        if (error instanceof FilterValueError) continue;
        // TODO: Wrap errors in LiquidError
        throw error;
      }
    }
    return result;
  }
}

export class InfixExpression implements Expression {
  constructor(
    readonly left: Expression,
    readonly operator: string,
    readonly right: Expression
  ) {}

  equals(other: unknown): boolean {
    return (
      other instanceof InfixExpression &&
      this.left.equals(other.left) &&
      this.operator === other.operator &&
      this.right.equals(other.right)
    );
  }

  toString(): string {
    return `(${this.left} ${this.operator} ${this.right})`;
  }

  async evaluate(context: Context): Promise<boolean> {
    return compare(
      await this.left.evaluate(context),
      this.operator,
      await this.right.evaluate(context)
    );
  }
}

export class BooleanExpression implements Expression {
  constructor(readonly expression: Expression) {}

  equals(other: unknown): boolean {
    return (
      other instanceof BooleanExpression &&
      this.expression.equals(other.expression)
    );
  }

  toString(): string {
    return `(${this.expression})`;
  }

  async evaluate(context: Context): Promise<boolean> {
    return isLiquidTruthy(await this.expression.evaluate(context));
  }
}

export type LoopArgument = IntegerLiteral | FloatLiteral | Identifier;

export class LoopExpression implements Expression {
  constructor(
    readonly name: string,
    readonly iterable: RangeLiteral | Identifier,
    readonly limit?: LoopArgument,
    readonly offset?: LoopArgument,
    readonly cols?: LoopArgument,
    readonly reversed: boolean = false
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

  /**
   *
   * @param obj
   * @returns
   */
  protected toIter(obj: unknown): [Iterable<unknown>, number] {
    if (isArray(obj)) return [obj.values(), obj.length];
    if (obj instanceof Range) return [obj, obj.length];
    if (obj instanceof Set) return [obj.values(), obj.size];
    if (obj instanceof Map) return [obj.entries(), obj.size];
    if (isObject(obj)) {
      const it = isIterable(obj) ? obj : Object.entries(obj);
      return [it, Object.keys(obj).length];
    }
    throw new LiquidTypeError(
      `expected an iterable object, at ${this.iterable}, ` +
        `found ${typeof this.iterable}`
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

  public async evaluate(
    context: Context
  ): Promise<[Iterator<unknown>, number]> {
    const [it, length] = this.toIter(await this.iterable.evaluate(context));
    const limit = await this.limit?.evaluate(context);
    const offset = await this.offset?.evaluate(context);
    let _it = it[Symbol.iterator]();
    let _length = length;

    // TODO: Implement offset: continue
    if (isPrimitiveInteger(offset)) {
      _it = this.drop(_it, offset);
      _length -= offset;
    } else if (isInteger(offset)) {
      _it = this.drop(_it, offset.valueOf());
      _length -= offset.valueOf();
    } else if (offset !== undefined) {
      throw new LiquidTypeError(
        `loop offset must be an integer, found '${offset}'`
      );
    }

    if (isPrimitiveInteger(limit)) {
      _it = this.drop(_it, limit);
      _length = Math.min(_length, limit);
    } else if (isInteger(limit)) {
      _it = this.take(_it, limit.valueOf());
      _length = Math.min(_length, limit.valueOf());
    } else if (limit !== undefined) {
      throw new LiquidTypeError(
        `loop limit must be an integer, found '${limit}'`
      );
    }

    // TODO: this.reversed
    return [_it, _length];
  }
}

function safe(value: string): string {
  // TODO: implement html safe string
  return value;
}

function compare(left: unknown, operator: string, right: unknown): boolean {
  switch (operator) {
    case "and":
      return isLiquidTruthy(left) && isLiquidTruthy(right);
    case "or":
      return isLiquidTruthy(left) || isLiquidTruthy(right);
  }

  if (isLiquidPrimitive(left)) left = left[liquidValueOf]();
  if (isLiquidPrimitive(right)) right = right[liquidValueOf]();

  if (isNumber(left) && isNumber(right)) {
    const _left = parseNumberT(left);
    switch (operator) {
      case "==":
        return _left.eq(right);
      case "!=":
      case "<>":
        return !_left.eq(right);
      case "<":
        return _left.lt(right);
      case "<=":
        return _left.lte(right);
      case ">":
        return _left.gt(right);
      case ">=":
        return _left.gte(right);
    }
    throw new LiquidTypeError(
      `invalid operator '${left} ${operator} ${right}'`
    );
  }

  if (right instanceof Empty || right instanceof Blank || right instanceof Nil)
    [left, right] = [right, left];

  switch (operator) {
    case "==":
      return isExpression(left) ? left.equals(right) : left === right;
    case "!=":
    case "<>":
      return isExpression(left) ? !left.equals(right) : left !== right;
    case "contains":
      if (isString(left)) return left.indexOf(String(right)) !== -1;
      // XXX: Unwrap numbers?
      if (isArray(left)) return left.indexOf(right) !== -1;
  }

  throw new LiquidTypeError(
    `invalid comparison operator '${left} ${operator} ${right}'`
  );
}
