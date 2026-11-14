import { Undefined } from "../drops/undefined.js";
import { TemplateTypeError } from "../errors.js";
import { type FilterContext } from "../filter.js";
import { isComparable } from "../type_guards.js";

export function sort(this: FilterContext, left: unknown, key?: unknown): unknown[] {
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

  if (typeof a !== typeof b)
    throw new TemplateTypeError(
      `comparison with ${typeof a} and ${typeof b} failed`,
      this.span,
      this.context.template.source,
      this.context.template.name,
    );

  if (isComparable(a) && isComparable(b)) return a < b ? -1 : a > b ? 1 : 0;

  throw new TemplateTypeError(
    `comparison with ${typeof a} and ${typeof b} failed`,
    this.span,
    this.context.template.source,
    this.context.template.name,
  );
}
