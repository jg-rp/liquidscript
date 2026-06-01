import { HTMLSafeString } from "../drops/html_safe";
import { type FilterContext } from "../filter";

export function replaceLast(
  this: FilterContext,
  left: unknown,
  sub: unknown,
  rep: unknown,
): string | HTMLSafeString {
  this.assertArgs(arguments.length, 3);

  const left_ = this.toStringSafe(left, "");
  const sub_ = this.toStringSafe(sub, "");
  const rep_ = this.toStringSafe(rep, "");

  if (left_ instanceof HTMLSafeString) {
    const s = left_.valueOf();
    const escaped = HTMLSafeString.escape(sub_).valueOf();
    const index = s.lastIndexOf(escaped);

    if (index === -1) return left_;

    return new HTMLSafeString(
      s.substring(0, index) +
        HTMLSafeString.escape(rep_).valueOf() +
        s.substring(index + escaped.length),
    );
  }

  const s = left_.valueOf();
  const escaped = sub_.valueOf();
  const index = s.lastIndexOf(escaped);

  if (index === -1) return left_;

  return (
    s.substring(0, index) + rep_.valueOf() + s.substring(index + escaped.length)
  );
}
