import { assertArgs, type FilterContext } from "../filter";

export function split(
  this: FilterContext,
  left: unknown,
  sep: unknown,
): string[] {
  assertArgs(this, arguments.length, 2);
  const _left = this.toString(left, "");
  let _sep: string | RegExp = this.toString(sep, "");
  if (_sep === " ") _sep = /\s/; // This is what Ruby does.
  return _left.split(_sep);
}
