import type { FilterContext } from "../filter";
import { ZERO, type LiquidNumber } from "../number";

export function floor(this: FilterContext, left: unknown): LiquidNumber {
  this.assertArgs(arguments.length, 1);
  return this.toLiquidNumber(left, ZERO).floor();
}
