import { escape as escapeHTML, unescape } from "../escape";
import { HTMLSafeString } from "../drops/html_safe";
import { type FilterContext } from "../filter";

export function escapeOnce(
  this: FilterContext,
  left: unknown,
): string | HTMLSafeString {
  this.assertArgs(arguments.length, 1);
  const left_ = this.toStringSafe(left, "");

  if (this.context.env.autoEscape) {
    return HTMLSafeString.escape(unescape(left_.valueOf()));
  }
  return escapeHTML(unescape(left_.valueOf()));
}
