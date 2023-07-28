import { RenderContext } from "./context";
import { FilterArgumentError } from "./errors";

export type FilterContext = {
  /**
   * The active render context.
   */
  context: RenderContext;

  /**
   * Keyword/named filter arguments. As used by the `default` filter.
   */
  options: { [index: string]: unknown };
};

export type Filter = {
  (this: FilterContext, left: unknown, ...args: unknown[]): unknown;
};

/**
 * A utility function that checks throws an error if the given number of
 * arguments are not between the expected minimum and maximum.
 */
export function checkArguments(n: number, max: number, min?: number): void {
  n -= 1;
  if (n > max) {
    if (max === 0) {
      throw new FilterArgumentError(
        `too many arguments, expected 0, but got ${n}`,
      );
    }
    throw new FilterArgumentError(
      `too many arguments, expected at most ${max}, but got ${n}`,
    );
  }

  if (min !== undefined && n < min)
    throw new FilterArgumentError(
      `missing argument, expected at least ${min}, but got ${n}`,
    );
}

/**
 * Throw an error if the given filter context contains options.
 */
export function throwIfOptions(context: FilterContext): void {
  for (const _ in context.options) {
    throw new FilterArgumentError("unexpected filter options");
  }
}
