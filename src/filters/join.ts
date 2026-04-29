import type { FilterContext } from "../filter";

export function join(
  this: FilterContext,
  left: unknown,
  sep: unknown,
): string {
  const _left = this.context.env.toArray(left, this.context, this.span);
  const _sep = this.context.env.toString(sep, this.context, this.span);
  return _left.join(_sep);
}
