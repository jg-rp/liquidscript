import type { RenderContext } from "./context";
import { HTMLSafeString } from "./drops/html_safe";
import { Undefined } from "./drops/undefined";
import { ArgumentError } from "./errors";
import { toLiquidNumber, type LiquidNumber } from "./number";
import { Nothing } from "./runtime";
import type { Token } from "./token";
import { isArray, isIterable, isObject } from "./type_guards";

export type Filter = {
  (this: FilterContext, left: unknown, ...args: unknown[]): unknown;
};

export class FilterContext {
  constructor(
    readonly context: RenderContext,
    readonly span: Token,
    readonly options: { [index: string]: unknown },
  ) {}

  /**
   * Assert that `len` is between `min` and `max`. Raise an `ArgumentError` if
   * it is not. `len` should include the `left` in its count.
   */
  assertArgs(len: number, min: number, max: number = min): void {
    if (len < min || len > max) {
      throw new ArgumentError(
        `Expected ${min}-${max} arguments, got ${len}`,
        this.span,
        this.context.template.source,
      );
    }
  }

  getItem(obj: unknown, key: unknown, default_?: unknown): unknown {
    if (!isObject(obj))
      throw new ArgumentError(
        `can't read property ${obj}[${key}]`,
        this.span,
        this.context.template.source,
      );

    if (obj instanceof Map) {
      return obj.get(key);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [val, _] = this.context.resolvePathSync(obj, [key]);
    if (val === Nothing) {
      return default_;
    }

    return val;
  }

  /**
   * Coerce `obj` to an array suitable for filters that expect an array input.
   */
  inputArray(obj: unknown): unknown[] {
    if (isArray(obj)) {
      return obj.flat(5);
    }
    // Not flattening iterables.
    if (isIterable(obj)) {
      return Array.from(obj);
    }
    return [obj];
  }

  isNil(obj: unknown): boolean {
    return (
      obj === undefined ||
      obj == null ||
      obj === Nothing ||
      obj instanceof Undefined
    );
  }

  isTruthy(obj: unknown): boolean {
    return this.context.env.isTruthy(obj, this.context);
  }

  toLiquidNumber<T>(obj: unknown, default_: T): LiquidNumber | T {
    return toLiquidNumber(obj, this.context, default_);
  }

  toString<T>(obj: unknown, default_: T): string | T {
    return obj === undefined
      ? default_
      : this.context.env.toString(obj, this.context, this.span);
  }

  toStringSafe<T>(obj: unknown, default_: T): string | HTMLSafeString | T {
    if (obj instanceof HTMLSafeString) return obj;

    return obj === undefined
      ? default_
      : this.context.env.toString(obj, this.context, this.span);
  }
}
