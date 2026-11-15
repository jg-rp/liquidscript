import type { FilterContext } from "../filter.js";

import { ZERO, type LiquidNumber } from "../number.js";

export function atMost(this: FilterContext, left: unknown, right: unknown): LiquidNumber {
  this.assertArgs(arguments.length, 2);
  return this.toLiquidNumber(left, ZERO).min(this.toLiquidNumber(right, ZERO));
}
