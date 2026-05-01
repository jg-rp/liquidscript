import { assertArgs, inputArray, type FilterContext } from "../filter";

export function reverse(this: FilterContext, left: unknown): unknown[] {
  assertArgs(this, arguments.length, 1);
  return Array.from(inputArray(left)).reverse();
}
