import { HTMLSafeString } from "../drops/html_safe";
import { type FilterContext } from "../filter";

export function lStrip(
  this: FilterContext,
  left: unknown,
): string | HTMLSafeString {
  this.assertArgs(arguments.length, 1);
  const left_ = this.toStringSafe(left, "");

  if (left_ instanceof HTMLSafeString) {
    return new HTMLSafeString(left_.valueOf().trimStart());
  }

  return left_.trimStart();
}
