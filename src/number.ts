import Decimal from "decimal.js";

Decimal.set({ precision: 16 });

// eslint-disable-next-line @typescript-eslint/ban-types
export type N = string | number | Number | LiquidNumber;

export abstract class LiquidNumber {
  public abstract float: boolean;
  public readonly n: Decimal;

  public constructor(val: string | number | Decimal) {
    this.n = new Decimal(val);
  }

  public valueOf(): number {
    return this.n.toNumber();
  }

  public abs(): NumberT {
    const result = this.n.abs();
    return isFloat(this) ? new Float(result) : new Integer(result);
  }

  public ceil(): NumberT {
    return new Integer(this.n.ceil());
  }

  public div(n: N): NumberT {
    const _n = parseNumberT(n);
    return isInteger(this) && isInteger(_n)
      ? new Integer(this.n.dividedToIntegerBy(_n.n))
      : new Float(this.n.dividedBy(_n.n));
  }

  public eq(n: N): boolean {
    return this.n.eq(parseNumberT(n).n);
  }

  public floor(): NumberT {
    return new Integer(this.n.floor());
  }

  public gt(n: N): boolean {
    return this.n.gt(parseNumberT(n).n);
  }

  public gte(n: N): boolean {
    return this.n.gte(parseNumberT(n).n);
  }

  public lt(n: N): boolean {
    return this.n.lt(parseNumberT(n).n);
  }

  public lte(n: N): boolean {
    return this.n.lte(parseNumberT(n).n);
  }

  public max(n: N): NumberT {
    const _n = parseNumberT(n);
    return _n.gt(this) ? _n : this;
  }

  public min(n: N): NumberT {
    const _n = parseNumberT(n);
    return _n.lt(this) ? _n : this;
  }

  public minus(n: N): NumberT {
    const _n = parseNumberT(n);
    const result = this.n.minus(_n.n);
    return isFloat(this) || isFloat(_n)
      ? new Float(result)
      : new Integer(result);
  }

  public mod(n: N): NumberT {
    const _n = parseNumberT(n);
    const result = this.n.mod(_n.n);
    return isFloat(this) || isFloat(_n)
      ? new Float(result)
      : new Integer(result);
  }

  public plus(n: N): NumberT {
    const _n = parseNumberT(n);
    const result = this.n.plus(_n.n);
    return isFloat(this) || isFloat(_n)
      ? new Float(result)
      : new Integer(result);
  }

  public round(decimalPlaces?: number): NumberT {
    return decimalPlaces === undefined || this.n.eq(0)
      ? new Integer(this.n.toDecimalPlaces(0, Decimal.ROUND_HALF_CEIL))
      : new Float(
          this.n.toDecimalPlaces(decimalPlaces, Decimal.ROUND_HALF_CEIL),
        );
  }

  public times(n: N): NumberT {
    const _n = parseNumberT(n);
    const result = this.n.times(_n.n);
    return isFloat(this) || isFloat(_n)
      ? new Float(result)
      : new Integer(result);
  }

  public trunc(): NumberT {
    return new Integer(this.n.trunc());
  }

  public isFinite(): boolean {
    return this.n.isFinite();
  }
}

export class Float extends LiquidNumber {
  public readonly float = true as const;

  public toString(): string {
    const s = this.n.toString();
    return s.toString().indexOf(".") === -1 ? `${s}.0` : s;
  }
}

export class Integer extends LiquidNumber {
  public readonly float = false as const;

  public toString(): string {
    return this.n.toString();
  }
}

export type NumberT = Integer | Float;

/**
 * A type predicate for Liquid's number wrapper types.
 */
export function isNumberT(val: unknown): val is NumberT {
  return val instanceof Integer || val instanceof Float;
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

function isPrimitiveNumber(value: unknown): value is number {
  return typeof value === "number";
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

export const ZERO = new Integer(0);
export const NAN = new Integer(NaN);

function _stringToNumberT(s: string): NumberT {
  return s.indexOf(".") === -1 ? new Integer(Number(s)) : new Float(Number(s));
}

/**
 * A type predicate for valid inputs to the `parseNumberT` function.
 *
 * @param val - Any value.
 * @returns `true` if the input value can be passed to `parseNumberT`.
 */
export function isN(val: unknown): val is N {
  return isNumberT(val) || isString(val) || isFinite(val as number);
}

/**
 * Parse a string, primitive number or Number object to a Liquid
 * integer or float.
 *
 * @param n - A number or string representation of a number.
 * @returns A wrapped number representing a Liquid integer or float.
 */
export function parseNumberT(n: N): NumberT {
  if (n instanceof LiquidNumber) return n;
  if (n instanceof Number)
    return Number.isInteger(n)
      ? new Integer(n.valueOf())
      : new Float(n.valueOf());
  if (isPrimitiveNumber(n))
    return Number.isInteger(n) ? new Integer(n) : new Float(n);
  if (isString(n)) return _stringToNumberT(n);
  return n;
}
