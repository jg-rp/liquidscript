import type { FilterContext } from "../filter";
import { isLiquidNumber, ZERO, type LiquidNumber } from "../number";
import { isNumber } from "../type_guards";

export function sum(
  this: FilterContext,
  left: unknown,
  prop?: unknown,
): LiquidNumber | number {
  this.assertArgs(arguments.length, 1, 2);
  if (isNumber(left) || isLiquidNumber(left)) return left;

  if (this.isNil(prop)) {
    return this.inputArray(left)
      .map((v) => this.toLiquidNumber(v, ZERO))
      .reduce((a, b) => a.plus(b), ZERO);
  }

  return this.inputArray(left)
    .map((v) => this.toLiquidNumber(this.getItem(v, prop), ZERO))
    .reduce((a, b) => a.plus(b), ZERO);
}
