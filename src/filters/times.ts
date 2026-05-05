import { assertArgs, type FilterContext } from "../filter";
import { LiquidNumber, toLiquidNumber } from "../number";

/**
 * Return the result of multiplying `left` by `right`. If either `left` or
 * `right` are not numbers, they are converted to a number, falling back to
 * zero if that conversion fails.
 */
export function times(
  this: FilterContext,
  left: unknown,
  right: unknown,
): LiquidNumber {
  assertArgs(this, arguments.length, 2);
  return toLiquidNumber(left, this.context).times(
    toLiquidNumber(right, this.context),
  );
}
