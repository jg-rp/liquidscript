import type { FilterContext } from "../filter.js";

export function urlDecode(this: FilterContext, left: unknown): string {
  this.assertArgs(arguments.length, 1);
  return decodeURIComponent(this.toString(left, "").replace(/\+/g, " "));
}
