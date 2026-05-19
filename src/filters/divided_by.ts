import { ArgumentError } from "../errors";
import type { FilterContext } from "../filter";
import { ZERO, type LiquidNumber } from "../number";

export function dividedBy(
  this: FilterContext,
  left: unknown,
  right: unknown,
): LiquidNumber {
  this.assertArgs(arguments.length, 2);
  const divisor = this.toLiquidNumber(right, ZERO);

  if (divisor.eq(0)) {
    throw new ArgumentError(
      "can't divide by zero",
      this.span,
      this.context.template.source,
      this.context.template.name,
    );
  }

  return this.toLiquidNumber(left, ZERO).div(divisor);
}
