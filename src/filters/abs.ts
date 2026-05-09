import { type FilterContext } from "../filter";
import { LiquidNumber, toLiquidNumber } from "../number";

/**
 * Return the absolute value of a number. Given a value that can't be cast to
 * an integer or float, `0` will be returned.
 */
export function abs(this: FilterContext, left: unknown): LiquidNumber {
  this.assertArgs(arguments.length, 1);
  return toLiquidNumber(left, this.context).abs();
}
