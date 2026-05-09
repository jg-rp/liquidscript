import type { FilterContext } from "../filter";

export function upcase(this: FilterContext, left: unknown): string {
  this.assertArgs(arguments.length, 1);
  const _left = this.toString(left, "");
  return _left.toUpperCase();
}
