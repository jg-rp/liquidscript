import { isString } from "./object";

// eslint-disable-next-line @typescript-eslint/ban-types
export type N = string | number | Number | LiquidNumber;

export abstract class LiquidNumber {
  abstract float: boolean;
  readonly n: number;

  constructor(val: unknown) {
    this.n = Number(val);
  }

  valueOf(): number {
    return this.n;
  }

  abs(): NumberT {
    const result = Math.abs(this.n);
    return isFloat(this) ? new Float(result) : new Integer(result);
  }

  ceil(): NumberT {
    return new Integer(Math.ceil(this.n));
  }

  div(n: N): NumberT {
    const _n = parseNumberT(n);
    return isInteger(this) && isInteger(_n)
      ? new Integer((this.n - (this.n % _n.n)) / _n.n)
      : new Float(this.n / _n.n);
  }

  eq(n: N): boolean {
    const _n = parseNumberT(n);
    return this.n === _n.n;
  }

  floor(): NumberT {
    return new Integer(Math.floor(this.n));
  }

  gt(n: N): boolean {
    const _n = parseNumberT(n);
    return this.n > _n.n;
  }
  gte(n: N): boolean {
    const _n = parseNumberT(n);
    return this.n >= _n.n;
  }

  lt(n: N): boolean {
    const _n = parseNumberT(n);
    return this.n < _n.n;
  }

  lte(n: N): boolean {
    const _n = parseNumberT(n);
    return this.n <= _n.n;
  }

  minus(n: N): NumberT {
    const _n = parseNumberT(n);
    const result = this.n - _n.n;
    return isFloat(this) || isFloat(_n)
      ? new Float(result)
      : new Integer(result);
  }

  mod(n: N): NumberT {
    const _n = parseNumberT(n);
    const result = this.n % _n.n;
    return isFloat(this) || isFloat(_n)
      ? new Float(result)
      : new Integer(result);
  }

  plus(n: N): NumberT {
    const _n = parseNumberT(n);
    const result = this.n + _n.n;
    return isFloat(this) || isFloat(_n)
      ? new Float(result)
      : new Integer(result);
  }

  round(nDigits: N | undefined): NumberT {
    if (nDigits === undefined) return this.trunc();
    const _nDigits = parseNumberT(nDigits);
    const amp = Math.pow(10, _nDigits.n);
    return new Float(Math.round(this.n * amp) / amp);
  }

  times(n: N): NumberT {
    const _n = parseNumberT(n);
    const result = this.n * _n.n;
    return isFloat(this) || isFloat(_n)
      ? new Float(result)
      : new Integer(result);
  }

  trunc(): NumberT {
    // Equivalent to Math.trunc(this.num), for the benefit of IE.
    return new Integer((this.n > 0 ? Math.floor : Math.ceil)(this.n));
  }
}

export class Float extends LiquidNumber {
  readonly float: true = true;

  toString(): string {
    const s = this.n.toString();
    return s.toString().indexOf(".") === -1 ? s + ".0" : s;
  }
}

export class Integer extends LiquidNumber {
  readonly float: false = false;

  toString(): string {
    // Don't call this.trunc() here. You'll get a recursive call to toString().
    return (this.n > 0 ? Math.floor : Math.ceil)(this.n).toString();
  }
}

export type NumberT = Integer | Float;

export function isNumberT(val: unknown): val is NumberT {
  return val instanceof Integer || val instanceof Float;
}

export function isInteger(val: unknown): val is Integer {
  return val instanceof Integer;
}

export function isFloat(val: unknown): val is Float {
  return val instanceof Float;
}

export const ZERO = new Integer(0);
export const NAN = new Integer(NaN);

function _stringToNumberT(s: string): NumberT {
  return s.indexOf(".") === -1 ? new Integer(Number(s)) : new Float(Number(s));
}

export function parseNumberT(n: N): NumberT {
  if (n instanceof Number) return new Integer(n.valueOf());
  if (typeof n === "number") return new Integer(n);
  if (isString(n)) return _stringToNumberT(n);
  return n;
}
