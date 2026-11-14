import { type FilterContext } from "../filter.js";

export function reverse(this: FilterContext, left: unknown): unknown[] {
  this.assertArgs(arguments.length, 1);
  return this.inputArray(left).toReversed();
}
