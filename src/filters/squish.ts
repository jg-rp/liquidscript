import { HTMLSafeString } from "../drops/html_safe";
import type { FilterContext } from "../filter";

const RE_WHITESPACE = /\s+/g;

export function squish(
  this: FilterContext,
  left: unknown,
): string | HTMLSafeString {
  this.assertArgs(arguments.length, 1);
  const left_ = this.toStringSafe(left, "");

  if (left_ instanceof HTMLSafeString) {
    return new HTMLSafeString(
      left_.valueOf().trim().replace(RE_WHITESPACE, " "),
    );
  }
  return left_.trim().replace(RE_WHITESPACE, " ");
}
