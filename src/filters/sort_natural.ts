import { Undefined } from "../drops/undefined.js";
import { type FilterContext } from "../filter.js";

export function sortNatural(this: FilterContext, left: unknown, key?: unknown): unknown[] {
  this.assertArgs(arguments.length, 1, 2);
  const comp = compare.bind(this);

  if (key === undefined || key instanceof Undefined) {
    return this.inputArray(left).toSorted(comp);
  }

  return this.inputArray(left).toSorted((a, b) =>
    comp(this.getItem(a, key, undefined), this.getItem(b, key, undefined)),
  );
}

function compare(this: FilterContext, a: unknown, b: unknown): -1 | 0 | 1 {
  if (this.isNil(a) && this.isNil(b)) return 0;
  if (this.isNil(a) && !this.isNil(b)) return 1;
  if (!this.isNil(a) && this.isNil(b)) return -1;

  const _a = this.toString(a, "").toLowerCase();
  const _b = this.toString(b, "").toLowerCase();
  return _a < _b ? -1 : _a > _b ? 1 : 0;
}
