import Decimal from "decimal.js";
import { isString } from "./type_guards";
import { Drop, toLiquidSync } from "./drop";
import type { RenderContext } from "./context";

Decimal.set({ precision: 16 });

// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
export type N = string | number | Number | LiquidNumber;

export abstract class LiquidNumber {
  abstract float: boolean;

  readonly n: Decimal;

  constructor(val: string | number | Decimal) {
    this.n = new Decimal(val);
  }

  abs(): LiquidNumber {
    const result = this.n.abs();
    return isFloat(this) ? new Float(result) : new Integer(result);
  }

  ceil(): LiquidNumber {
    return new Integer(this.n.ceil());
  }

  div(n: N): LiquidNumber {
    const _n = _toLiquidNumber(n);
    return isInteger(this) && isInteger(_n)
      ? new Integer(this.n.dividedToIntegerBy(_n.n))
      : new Float(this.n.dividedBy(_n.n));
  }

  eq(n: N): boolean {
    return this.n.eq(_toLiquidNumber(n).n);
  }

  floor(): LiquidNumber {
    return new Integer(this.n.floor());
  }

  gt(n: N): boolean {
    return this.n.gt(_toLiquidNumber(n).n);
  }

  gte(n: N): boolean {
    return this.n.gte(_toLiquidNumber(n).n);
  }

  isFinite(): boolean {
    return this.n.isFinite();
  }

  lt(n: N): boolean {
    return this.n.lt(_toLiquidNumber(n).n);
  }

  lte(n: N): boolean {
    return this.n.lte(_toLiquidNumber(n).n);
  }

  max(n: N): LiquidNumber {
    const _n = _toLiquidNumber(n);
    return _n.gt(this) ? _n : this;
  }

  min(n: N): LiquidNumber {
    const _n = _toLiquidNumber(n);
    return _n.lt(this) ? _n : this;
  }

  minus(n: N): LiquidNumber {
    const _n = _toLiquidNumber(n);
    const result = this.n.minus(_n.n);
    return isFloat(this) || isFloat(_n)
      ? new Float(result)
      : new Integer(result);
  }

  mod(n: N): LiquidNumber {
    const _n = _toLiquidNumber(n);
    const result = this.n.mod(_n.n);
    return isFloat(this) || isFloat(_n)
      ? new Float(result)
      : new Integer(result);
  }

  plus(n: N): LiquidNumber {
    const _n = _toLiquidNumber(n);
    const result = this.n.plus(_n.n);
    return isFloat(this) || isFloat(_n)
      ? new Float(result)
      : new Integer(result);
  }

  round(decimalPlaces?: number): LiquidNumber {
    return decimalPlaces === undefined || this.n.eq(0)
      ? new Integer(this.n.toDecimalPlaces(0, Decimal.ROUND_HALF_CEIL))
      : new Float(
          this.n.toDecimalPlaces(decimalPlaces, Decimal.ROUND_HALF_CEIL),
        );
  }

  times(n: N): LiquidNumber {
    const _n = _toLiquidNumber(n);
    const result = this.n.times(_n.n);
    return isFloat(this) || isFloat(_n)
      ? new Float(result)
      : new Integer(result);
  }

  trunc(): LiquidNumber {
    return new Integer(this.n.trunc());
  }

  valueOf(): number {
    return this.n.toNumber();
  }
}

export class Float extends LiquidNumber {
  readonly float = true as const;

  override toString(): string {
    const s = this.n.toString();
    return s.indexOf(".") === -1 ? `${s}.0` : s;
  }
}

export class Integer extends LiquidNumber {
  readonly float = false as const;

  override toString(): string {
    return this.n.toString();
  }
}

/**
 * A type predicate for Liquid's number wrapper types.
 */
export function isLiquidNumber(val: unknown): val is LiquidNumber {
  return val instanceof LiquidNumber;
}

/**
 * A type predicate for Liquid's `Integer` type.
 */
export function isInteger(val: unknown): val is Integer {
  return val instanceof Integer && !isNaN(val.valueOf());
}

/**
 * A type predicate for Liquid's `Float` type.
 */
export function isFloat(val: unknown): val is Float {
  return val instanceof Float;
}

export function isPrimitiveNumber(value: unknown): value is number {
  return typeof value === "number";
}

export const ZERO = new Integer(0);
export const NAN = new Integer(NaN);

function _stringToLiquidNumber(s: string): LiquidNumber {
  return s.indexOf(".") === -1 ? new Integer(Number(s)) : new Float(Number(s));
}

/**
 * A type predicate for valid inputs to the `_toLiquidNumber` function.
 *
 * @param val - Any value.
 * @returns `true` if the input value can be passed to `_toLiquidNumber`.
 */
export function isN(val: unknown): val is N {
  return isLiquidNumber(val) || isString(val) || isFinite(val as number);
}

/**
 * Coerce a string, primitive number or Number object to a Liquid
 * integer or float.
 *
 * @param n - A number or string representation of a number.
 * @returns A wrapped number representing a Liquid integer or float.
 */
function _toLiquidNumber(n: N): LiquidNumber {
  if (n instanceof LiquidNumber) {
    return n;
  }

  if (n instanceof Number) {
    return Number.isInteger(n)
      ? new Integer(n.valueOf())
      : new Float(n.valueOf());
  }

  if (isPrimitiveNumber(n)) {
    return Number.isInteger(n) ? new Integer(n) : new Float(n);
  }

  return _stringToLiquidNumber(n);
}

/**
 * Coerce obj to a liquid number.
 */
export function toLiquidNumber(
  obj: unknown,
  context: RenderContext,
): LiquidNumber {
  if (obj instanceof Drop) {
    obj = obj[toLiquidSync]("numeric", context);
  }

  if (isN(obj)) {
    const num = _toLiquidNumber(obj);
    return num.isFinite() ? num : ZERO;
  }

  return ZERO;
}
