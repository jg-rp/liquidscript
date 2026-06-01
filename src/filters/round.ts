import { type FilterContext } from "../filter";
import { LiquidNumber, ZERO } from "../number";

export function round(
  this: FilterContext,
  left: unknown,
  decimalPlaces?: unknown,
): LiquidNumber {
  this.assertArgs(arguments.length, 1, 2);

  if (this.isNil(decimalPlaces)) {
    return this.toLiquidNumber(left, ZERO).round();
  }

  const to = this.toLiquidNumber(decimalPlaces, ZERO);

  if (!to.isFinite() || to.eq(0)) {
    return this.toLiquidNumber(left, ZERO).round();
  }

  if (to.lt(0)) {
    return ZERO;
  }

  return this.toLiquidNumber(left, ZERO).round(to.floor().valueOf());
}
