import type { FilterContext } from "../filter";

const MAX_TRUNC_WORDS = 2147483647;

export function truncateWords(
  this: FilterContext,
  left: unknown,
  wordCount: unknown = 15,
  end: unknown = "...",
): string {
  this.assertArgs(arguments.length, 1, 3);
  const left_ = this.toString(left, "");

  let wordCount_ = this.context.env.toInteger(
    wordCount,
    this.context,
    this.span,
  );

  if (wordCount_ <= 0) wordCount_ = 1;
  if (wordCount_ >= MAX_TRUNC_WORDS) return left_;

  const end_ = this.toString(end, "");
  const words = left_.trim().split(/\s+/g);

  if (words.length <= wordCount_) return left_;
  return words.slice(0, wordCount_).join(" ") + end_;
}
