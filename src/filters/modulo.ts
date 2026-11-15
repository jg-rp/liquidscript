import type { FilterContext } from "../filter.js";

import { ArgumentError } from "../errors.js";
import { ZERO, type LiquidNumber } from "../number.js";

export function modulo(this: FilterContext, left: unknown, right: unknown): LiquidNumber {
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

  return this.toLiquidNumber(left, ZERO).mod(divisor);
}
