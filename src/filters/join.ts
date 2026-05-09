import { type FilterContext } from "../filter";

export function join(
  this: FilterContext,
  left: unknown,
  sep?: unknown,
): string {
  this.assertArgs(arguments.length, 1, 2);
  const _left = this.inputArray(left);
  const _sep = this.toString(sep, " ");
  return _left.map((obj) => this.toString(obj, "")).join(_sep);
}
