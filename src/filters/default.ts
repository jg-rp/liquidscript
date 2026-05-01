import { assertArgs, type FilterContext } from "../filter";

export function default_(
  this: FilterContext,
  left: unknown,
  _default: unknown = "",
): unknown {
  assertArgs(this, arguments.length, 2);

  if (
    this.context.env.isTruthy(this.options["allow_false"], this.context) &&
    left === false
  ) {
    return left;
  }

  if (!this.context.env.isTruthy(left, this.context)) {
    return _default;
  }

  return left;
}
