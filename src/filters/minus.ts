import { type FilterContext } from "../filter";
import { LiquidNumber, ZERO } from "../number";

export function minus(
  this: FilterContext,
  left: unknown,
  right: unknown,
): LiquidNumber {
  this.assertArgs(arguments.length, 2);
  return this.toLiquidNumber(left, ZERO).minus(
    this.toLiquidNumber(right, ZERO),
  );
}
