import { Undefined } from "../drops/undefined";
import { type FilterContext } from "../filter";

export function sortNatural(
  this: FilterContext,
  left: unknown,
  key?: unknown,
): unknown[] {
  function compare(this: FilterContext, a: unknown, b: unknown): -1 | 0 | 1 {
    if (this.isNil(a) && this.isNil(b)) return 0;
    if (this.isNil(a) && !this.isNil(b)) return 1;
    if (!this.isNil(a) && this.isNil(b)) return -1;

    const _a = this.toString(a, "").toLowerCase();
    const _b = this.toString(b, "").toLowerCase();
    // eslint-disable-next-line sonarjs/no-nested-conditional
    return _a < _b ? -1 : _a > _b ? 1 : 0;
  }

  this.assertArgs(arguments.length, 1, 2);
  const comp = compare.bind(this);

  if (key === undefined || key instanceof Undefined) {
    return Array.from(this.inputArray(left)).sort(comp);
  }

  return Array.from(this.inputArray(left)).sort((a, b) =>
    comp(this.getItem(a, key, undefined), this.getItem(b, key, undefined)),
  );
}
