import { Undefined } from "../drops/undefined";
import { ArgumentError } from "../errors";
import type { FilterContext } from "../filter";
import { isArray } from "../type_guards";

export function concat(
  this: FilterContext,
  left: unknown,
  right: unknown,
): unknown[] {
  this.assertArgs(arguments.length, 2);

  if (!isArray(right)) {
    throw new ArgumentError(
      `concat filter requires an array argument`,
      this.span,
      this.context.template.source,
      this.context.template.name,
    );
  }

  if (left instanceof Undefined) {
    return right;
  }

  return this.inputArray(left).concat(right);
}
