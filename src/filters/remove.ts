import escapeRegExp from "regexp.escape";
import { HTMLSafeString } from "../drops/html_safe";
import { type FilterContext } from "../filter";

export function remove(
  this: FilterContext,
  left: unknown,
  right: unknown,
): string | HTMLSafeString {
  this.assertArgs(arguments.length, 2);

  const left_ = this.toStringSafe(left, "");
  const right_ = this.toStringSafe(right, "");

  if (left_ instanceof HTMLSafeString) {
    return new HTMLSafeString(
      left_
        .valueOf()
        .replace(
          new RegExp(
            escapeRegExp(HTMLSafeString.escape(right_).valueOf()),
            "g",
          ),
          "",
        ),
    );
  }

  return left_.replace(new RegExp(escapeRegExp(right_.valueOf()), "g"), "");
}
