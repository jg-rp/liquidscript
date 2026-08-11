import { HTMLSafeString } from "../drops/html_safe";
import { type FilterContext } from "../filter";

export function capitalize(
  this: FilterContext,
  left: unknown,
): string | HTMLSafeString {
  this.assertArgs(arguments.length, 1);
  const left_ = this.toStringSafe(left, "");

  if (left_ instanceof HTMLSafeString) {
    const s = left_.valueOf();
    return new HTMLSafeString(
      s.charAt(0).toLocaleUpperCase() + s.slice(1).toLocaleLowerCase(),
    );
  }

  return (
    left_.charAt(0).toLocaleUpperCase() + left_.slice(1).toLocaleLowerCase()
  );
}
