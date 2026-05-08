import { assertArgs, inputArray, type FilterContext } from "../filter";

export function join(
  this: FilterContext,
  left: unknown,
  sep?: unknown,
): string {
  assertArgs(this, arguments.length, 1, 2);
  const _left = inputArray(left);
  const _sep = this.toString(sep, " ");
  return _left.map((obj) => this.toString(obj, "")).join(_sep);
}
