import { HTMLSafeString } from "../drops/html_safe";
import { type FilterContext } from "../filter";

export function replaceFirst(
  this: FilterContext,
  left: unknown,
  sub: unknown,
  rep?: unknown,
): string | HTMLSafeString {
  this.assertArgs(arguments.length, 2, 3);

  const left_ = this.toStringSafe(left, "");
  const sub_ = this.toStringSafe(sub, "");
  const rep_ = this.toStringSafe(rep, "");

  if (left_ instanceof HTMLSafeString) {
    return new HTMLSafeString(
      left_
        .valueOf()
        .replace(
          new RegExp(HTMLSafeString.escape(sub_).valueOf()),
          HTMLSafeString.escape(rep_).valueOf(),
        ),
    );
  }

  return left_.replace(new RegExp(sub_.valueOf()), rep_.valueOf());
}
