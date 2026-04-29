import type { FilterContext } from "../filter";

export function upcase(this: FilterContext, left: unknown): string {
  const _left = this.context.env.toString(left, this.context, this.span);
  return _left.toUpperCase();
}
