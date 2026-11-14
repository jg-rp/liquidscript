import { HTMLSafeString } from "../drops/html_safe.js";
import { type FilterContext } from "../filter.js";

export function newlineToBr(this: FilterContext, left: unknown): string | HTMLSafeString {
  this.assertArgs(arguments.length, 1);
  const left_ = this.toStringSafe(left, "");

  if (left_ instanceof HTMLSafeString) {
    return new HTMLSafeString(left_.valueOf().replace(/\r?\n/g, "<br />\n"));
  }

  return left_.replace(/\r?\n/g, "<br />\n");
}
