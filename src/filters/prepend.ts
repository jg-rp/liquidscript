import { HTMLSafeString } from "../drops/html_safe";
import { type FilterContext } from "../filter";

export function prepend(
  this: FilterContext,
  left: unknown,
  right: unknown,
): string | HTMLSafeString {
  this.assertArgs(arguments.length, 2);

  const left_ = this.toStringSafe(left, "");
  const right_ = this.toStringSafe(right, "");

  if (left_ instanceof HTMLSafeString || right_ instanceof HTMLSafeString) {
    return new HTMLSafeString(
      HTMLSafeString.escape(right_).valueOf() +
        HTMLSafeString.escape(left_).valueOf(),
    );
  }

  return right_ + left_;
}
