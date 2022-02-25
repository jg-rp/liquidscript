import { Context } from "./context";
import { FilterArgumentError } from "./errors";

export type FilterContext = {
  context: Context;
  options: { [index: string]: unknown };
};

export type Filter = {
  (left: unknown, ...args: unknown[]): unknown;
};

/**
 *
 * @param n
 * @param max
 * @param min
 */
export function checkArguments(n: number, max: number, min?: number): void {
  n -= 1;
  if (n > max) {
    if (max === 0) {
      throw new FilterArgumentError(
        `too many arguments, expected 0, but got ${n}`
      );
    }
    throw new FilterArgumentError(
      `too many arguments, expected at most ${max}, but got ${n}`
    );
  }

  if (min !== undefined && n < min)
    throw new FilterArgumentError(
      `missing argument, expected at least ${min}, but got ${n}`
    );
}
