import type { RenderContext } from "./context";
import { ArgumentError } from "./errors";
import type { Token } from "./token";
import { isArray, isIterable } from "./type_guards";

export type Filter = {
  (this: FilterContext, left: unknown, ...args: unknown[]): unknown;
};

export type FilterContext = {
  /**
   * The active render context.
   */
  context: RenderContext;

  /**
   * A span into the source string covering the filter.
   */
  span: Token;

  /**
   * Keyword/named filter arguments. As used by the `default` filter.
   */
  options: { [index: string]: unknown };
};

/**
 * Assert that `len` is between `min` and `max`. Raise an `ArgumentError` if it is not.
 *
 * `len` should include the `left` in its count.
 */
export function assertArgs(
  filter: FilterContext,
  len: number,
  min: number,
  max: number = min,
): void {
  if (len < min || len > max) {
    throw new ArgumentError(
      `Expected ${min}-${max} arguments, got ${len}`,
      filter.span,
      filter.context.template.source,
    );
  }
}

/**
 * Coerce `obj` to an array suitable for input to an array filter.
 */
export function inputArray(obj: unknown): unknown[] {
  if (isArray(obj)) {
    return obj.flat(5);
  }
  // Not flattening iterables.
  if (isIterable(obj)) {
    return Array.from(obj);
  }
  return [obj];
}
