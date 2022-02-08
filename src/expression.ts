import { Context } from "./context";
import { isLiquidPrimitive, LiquidPrimitive } from "./drop";
import {
  FilterValueError,
  InternalKeyError,
  NoSuchFilterError,
} from "./errors";
import { Float, Integer } from "./number";
import { isArray, isInteger, isObject, isString } from "./object";

export interface Expression {
  evaluate(context: Context): Promise<unknown>;
  equals(other: unknown): boolean;
  toString(): string;
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

  async evaluate(context: Context): Promise<unknown> {
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
    let element: unknown;
    for (const e of this.path) {
      element = await e.evaluate(context);
      if (
        isString(element) ||
        isLiquidPrimitive(element) ||
        isInteger(element)
      ) {
        path.push(element);
      } else {
        throw new InternalKeyError(`can't subscript with ${element}`);
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
      this.expression === other.expression &&
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

function range(stop: number): Range;
function range(start: number, stop: number): Range;
function range(...args: number[]): Range {
  // TODO: Implement range that knows its length and can slice.
  // TODO: and that can stringify itself.
  let start = 0;
  let stop: number;
  if (args.length === 2) {
    [start, stop] = args;
  } else {
    [stop] = args;
  }
  return new Range(start, stop);
}

export class Range implements Iterable<Integer> {
  constructor(readonly start: number, readonly stop: number) {}

  [Symbol.iterator](): Iterator<Integer> {
    throw new Error("Method not implemented.");
    // for (let i = start; i <= stop; i++) yield i
  }

  toString(): string {
    return `${this.start}..${this.stop}`;
  }
}

function safe(value: string): string {
  // TODO: implement html safe string
  return value;
}
