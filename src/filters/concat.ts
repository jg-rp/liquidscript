import type { FilterContext } from "../filter.js";

import { Undefined } from "../drops/undefined.js";
import { ArgumentError } from "../errors.js";
import { isArray } from "../type_guards.js";

export function concat(this: FilterContext, left: unknown, right: unknown): unknown[] {
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
