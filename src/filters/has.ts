import type { FilterContext } from "../filter";
import { LiquidNumber } from "../number";

export function has(
  this: FilterContext,
  left: unknown,
  prop: unknown,
  value?: unknown,
): boolean {
  this.assertArgs(arguments.length, 2, 3);
  const left_ = this.inputArray(left);

  if (this.isNil(value)) {
    for (const item of left_) {
      const val = this.getItem(item, prop);
      if (!this.isNil(val) && val !== false) {
        return true;
      }
    }

    return false;
  }

  if (value instanceof LiquidNumber) value = value.valueOf();

  for (const item of left_) {
    if (this.getItem(item, prop) === value) return true;
  }

  return false;
}
