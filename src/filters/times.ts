import { type FilterContext } from "../filter";
import { LiquidNumber, toLiquidNumber } from "../number";

export function times(
  this: FilterContext,
  left: unknown,
  right: unknown,
): LiquidNumber {
  this.assertArgs(arguments.length, 2);
  return toLiquidNumber(left, this.context).times(
    toLiquidNumber(right, this.context),
  );
}
