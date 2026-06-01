import { escape as escapeHTML } from "../escape";
import { HTMLSafeString } from "../drops/html_safe";
import { type FilterContext } from "../filter";

export function escape(
  this: FilterContext,
  left: unknown,
): string | HTMLSafeString {
  this.assertArgs(arguments.length, 1);
  const left_ = this.toStringSafe(left, "");

  if (this.context.env.autoEscape) {
    return HTMLSafeString.escape(left_);
  }
  return escapeHTML(left_.valueOf());
}
