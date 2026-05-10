import type { FilterContext } from "../filter";

export function truncate(
  this: FilterContext,
  left: unknown,
  length: unknown = 50,
  end: unknown = "...",
): string {
  this.assertArgs(arguments.length, 1, 3);
  const left_ = this.toString(left, "");
  const length_ = this.context.env.toInteger(length, this.context, this.span);

  if (left_.length <= length_) return left_;

  const end_ = this.toString(end, "");
  const stop = length_ - end_.length < 0 ? 0 : length_ - end_.length;
  return `${left_.slice(0, stop)}${end_}`;
}
