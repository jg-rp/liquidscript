import { HTMLSafeString } from "../drops/html_safe";
import { type FilterContext } from "../filter";

export function removeLast(
  this: FilterContext,
  left: unknown,
  right: unknown,
): string | HTMLSafeString {
  this.assertArgs(arguments.length, 2);

  const left_ = this.toStringSafe(left, "");
  const right_ = this.toStringSafe(right, "");

  if (left_ instanceof HTMLSafeString) {
    const s = left_.valueOf();
    const sub = HTMLSafeString.escape(right_).valueOf();
    const index = s.lastIndexOf(sub);

    if (index === -1) return left_;

    return new HTMLSafeString(
      s.substring(0, index) + s.substring(index + sub.length + 1),
    );
  }

  const s = left_.valueOf();
  const sub = right_.valueOf();
  const index = s.lastIndexOf(sub);

  if (index === -1) return left_;
  return s.substring(0, index) + s.substring(index + sub.length + 1);
}
