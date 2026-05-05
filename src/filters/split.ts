import { assertArgs, type FilterContext } from "../filter";

export function split(
  this: FilterContext,
  left: unknown,
  sep: unknown,
): string[] {
  assertArgs(this, arguments.length, 2);
  const _left = this.context.env.toString(left, this.context, this.span);
  const _sep = this.context.env.toString(sep, this.context, this.span);
  if (!_left || _left === _sep) return [];
  return _left.split(_sep);
}
