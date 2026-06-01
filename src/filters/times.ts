import { type FilterContext } from "../filter";
import { LiquidNumber, ZERO } from "../number";

export function times(
  this: FilterContext,
  left: unknown,
  right: unknown,
): LiquidNumber {
  this.assertArgs(arguments.length, 2);
  return this.toLiquidNumber(left, ZERO).times(
    this.toLiquidNumber(right, ZERO),
  );
}
