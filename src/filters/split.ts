import type { FilterContext } from "../filter";

export function split(
  this: FilterContext,
  left: unknown,
  sep: unknown,
): string[] {
  const _left = this.context.env.toString(left, this.context);
  const _sep = this.context.env.toString(sep, this.context);
  if (!_left || _left === _sep) return [];
  return _left.split(_sep);
}
