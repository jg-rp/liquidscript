import type { FilterContext } from "../filter";

export function reject(
  this: FilterContext,
  left: unknown,
  prop: unknown,
  value?: unknown,
): unknown[] {
  this.assertArgs(arguments.length, 2, 3);
  const left_ = this.inputArray(left);

  if (this.isNil(prop)) {
    return [];
  }

  if (this.isNil(value)) {
    return left_.filter((item) => {
      const val = this.getItem(item, prop, undefined);
      return this.isNil(val) || val === false;
    });
  }

  // NOTE: Deliberate loose equality
  return left_.filter((v) => this.getItem(v, prop, undefined) != value);
}
