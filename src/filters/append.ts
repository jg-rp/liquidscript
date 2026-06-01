import { HTMLSafeString } from "../drops/html_safe";
import { type FilterContext } from "../filter";

export function append(
  this: FilterContext,
  left: unknown,
  right: unknown,
): string | HTMLSafeString {
  this.assertArgs(arguments.length, 2);

  const left_ = this.toStringSafe(left, "");
  const right_ = this.toStringSafe(right, "");

  if (left_ instanceof HTMLSafeString || right_ instanceof HTMLSafeString) {
    return new HTMLSafeString(
      HTMLSafeString.escape(left_).valueOf() +
        HTMLSafeString.escape(right_).valueOf(),
    );
  }

  return left_ + right_;
}
