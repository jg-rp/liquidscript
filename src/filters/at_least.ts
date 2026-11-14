import type { FilterContext } from "../filter.js";

import { ZERO, type LiquidNumber } from "../number.js";

export function atLeast(this: FilterContext, left: unknown, right: unknown): LiquidNumber {
  this.assertArgs(arguments.length, 2);
  return this.toLiquidNumber(left, ZERO).max(this.toLiquidNumber(right, ZERO));
}
