import { type FilterContext } from "../filter.js";
import { LiquidNumber, ZERO } from "../number.js";

export function plus(this: FilterContext, left: unknown, right: unknown): LiquidNumber {
  this.assertArgs(arguments.length, 2);
  return this.toLiquidNumber(left, ZERO).plus(this.toLiquidNumber(right, ZERO));
}
