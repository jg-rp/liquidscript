import { type FilterContext } from "../filter";

export function reverse(this: FilterContext, left: unknown): unknown[] {
  this.assertArgs(arguments.length, 1);
  return Array.from(this.inputArray(left)).reverse();
}
