import { Undefined } from "../drops/undefined";
import { TemplateTypeError } from "../errors";
import { type FilterContext } from "../filter";
import { isComparable } from "../type_guards";

export function sort(
  this: FilterContext,
  left: unknown,
  key?: unknown,
): unknown[] {
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

    // eslint-disable-next-line sonarjs/no-nested-conditional
    if (isComparable(a) && isComparable(b)) return a < b ? -1 : a > b ? 1 : 0;

    throw new TemplateTypeError(
      `comparison with ${typeof a} and ${typeof b} failed`,
      this.span,
      this.context.template.source,
      this.context.template.name,
    );
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
