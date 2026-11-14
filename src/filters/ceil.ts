import type { FilterContext } from "../filter.js";

import { ZERO, type LiquidNumber } from "../number.js";

export function ceil(this: FilterContext, left: unknown): LiquidNumber {
  this.assertArgs(arguments.length, 1);
  return this.toLiquidNumber(left, ZERO).ceil();
}
