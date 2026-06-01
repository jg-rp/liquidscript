import type { FilterContext } from "../filter";
import { LiquidNumber } from "../number";

export function findIndex(
  this: FilterContext,
  left: unknown,
  prop: unknown,
  value?: unknown,
): number | null {
  this.assertArgs(arguments.length, 2, 3);
  const left_ = this.inputArray(left);

  if (this.isNil(value)) {
    for (const [index, item] of left_.entries()) {
      const val = this.getItem(item, prop);
      if (!this.isNil(val) && val !== false) {
        return index;
      }
    }

    return null;
  }

  if (value instanceof LiquidNumber) value = value.valueOf();

  for (const [index, item] of left_.entries()) {
    if (this.getItem(item, prop) === value) return index;
  }

  return null;
}
