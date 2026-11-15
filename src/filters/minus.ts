import { type FilterContext } from "../filter.js";
import { LiquidNumber, ZERO } from "../number.js";

export function minus(this: FilterContext, left: unknown, right: unknown): LiquidNumber {
  this.assertArgs(arguments.length, 2);
  return this.toLiquidNumber(left, ZERO).minus(this.toLiquidNumber(right, ZERO));
}
