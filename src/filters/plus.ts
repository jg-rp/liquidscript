import { type FilterContext } from "../filter";
import { LiquidNumber, ZERO } from "../number";

export function plus(
  this: FilterContext,
  left: unknown,
  right: unknown,
): LiquidNumber {
  this.assertArgs(arguments.length, 2);
  return this.toLiquidNumber(left, ZERO).plus(this.toLiquidNumber(right, ZERO));
}
