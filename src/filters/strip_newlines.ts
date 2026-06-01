import { HTMLSafeString } from "../drops/html_safe";
import type { FilterContext } from "../filter";

const RE_NEWLINES = /\r?\n/g;

export function stripNewlines(
  this: FilterContext,
  left: unknown,
): string | HTMLSafeString {
  this.assertArgs(arguments.length, 1);
  if (left instanceof HTMLSafeString) {
    return new HTMLSafeString(left.valueOf().replace(RE_NEWLINES, ""));
  }
  return this.toString(left, "").replace(RE_NEWLINES, "");
}
