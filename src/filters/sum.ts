import type { FilterContext } from "../filter";
import { ZERO, type LiquidNumber } from "../number";

export function sum(
  this: FilterContext,
  left: unknown,
  prop?: unknown,
): LiquidNumber {
  this.assertArgs(arguments.length, 1, 2);
  if (this.isNil(prop)) {
    return this.inputArray(left)
      .map((v) => this.toLiquidNumber(v, ZERO))
      .reduce((a, b) => a.plus(b), ZERO);
  }

  return this.inputArray(left)
    .map((v) => this.toLiquidNumber(this.getItem(v, prop), ZERO))
    .reduce((a, b) => a.plus(b), ZERO);
}
