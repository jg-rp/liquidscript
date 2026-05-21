import { Drop, equals, toLiquidSync } from "../drop";
import { EMPTY } from "../drops";
import { FalsyStrictUndefined } from "../drops/undefined";
import type { FilterContext } from "../filter";

export function default_(
  this: FilterContext,
  left: unknown,
  right: unknown = "",
): unknown {
  this.assertArgs(arguments.length, 1, 2);

  if (left instanceof FalsyStrictUndefined) {
    return right;
  }

  const left_ =
    left instanceof Drop ? left[toLiquidSync]("boolean", this.context) : left;

  if (this.options["allow_false"] && left === false) {
    return left;
  }

  if (!this.isTruthy(left_) || EMPTY[equals](left_, this.context)) {
    return right;
  }

  return left;
}
