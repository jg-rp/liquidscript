import type { FilterContext } from "../filter";

export function urlEncode(this: FilterContext, left: unknown): string {
  this.assertArgs(arguments.length, 1);
  return fixedEncodeURIComponent(this.toString(left, "")).replace(
    /%20| /g,
    "+",
  );
}

function fixedEncodeURIComponent(s: string): string {
  return encodeURIComponent(s).replace(/[!'()*]/g, function (c) {
    return `%${c.charCodeAt(0).toString(16).toUpperCase()}`;
  });
}
