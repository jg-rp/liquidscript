import type { FilterContext } from "../filter.js";

import { HTMLSafeString } from "../drops/html_safe.js";

export function upcase(this: FilterContext, left: unknown): string | HTMLSafeString {
  this.assertArgs(arguments.length, 1);

  if (left instanceof HTMLSafeString) {
    return new HTMLSafeString(left.valueOf().toLocaleUpperCase());
  }

  return this.toString(left, "").toLocaleUpperCase();
}
