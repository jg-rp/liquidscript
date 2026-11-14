import type { FilterContext } from "../filter.js";

export function map(this: FilterContext, left: unknown, prop: unknown): unknown[] {
  this.assertArgs(arguments.length, 2);
  return this.inputArray(left).map((v) => this.getItem(v, prop, undefined));
}
