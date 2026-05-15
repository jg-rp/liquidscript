import { type FilterContext } from "../filter";

export function split(
  this: FilterContext,
  left: unknown,
  sep: unknown,
): string[] {
  this.assertArgs(arguments.length, 2);
  const left_ = this.toString(left, "");
  if (left_.length === 0) return [];
  let sep_: string | RegExp = this.toString(sep, "");
  if (sep_ === " ") sep_ = /\s/; // This is what Ruby does.
  const result = left_.split(sep_);
  if (result[result.length - 1] === "") result.pop();
  return result;
}
