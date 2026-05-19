import type { HTMLSafeString } from "../drops/html_safe";
import { ArgumentError } from "../errors";
import type { FilterContext } from "../filter";
import { Integer } from "../number";
import { isArray } from "../type_guards";

// This range is smaller than the reference implementation.
const MAX_SLICE_ARG = Number.MAX_SAFE_INTEGER;
const MIN_SLICE_ARG = Number.MIN_SAFE_INTEGER;

function clamp(arg: number): number {
  const rv = arg > MAX_SLICE_ARG ? MAX_SLICE_ARG : arg;
  return rv < MIN_SLICE_ARG ? MIN_SLICE_ARG : rv;
}

export function slice(
  this: FilterContext,
  left: unknown,
  offset: unknown,
  length?: unknown,
): string | HTMLSafeString | unknown[] {
  this.assertArgs(arguments.length, 2, 3);

  const left_ = isArray(left) ? left : this.toString(left, "");
  const offset_ = clamp(integerOrThrow.call(this, offset));
  const length_ = clamp(
    this.isNil(length) ? 1 : integerOrThrow.call(this, length),
  );
  const start = offset_ < 0 ? left_.length + offset_ : offset_;
  return left_.slice(start, start + length_);
}

function integerOrThrow(this: FilterContext, obj: unknown): number {
  if (this.isNil(obj)) {
    throw new ArgumentError(
      "invalid integer",
      this.span,
      this.context.template.source,
      this.context.template.name,
    );
  }

  const n = this.toLiquidNumber(obj, undefined);
  if (n instanceof Integer) {
    return n.valueOf();
  }

  throw new ArgumentError(
    "invalid integer",
    this.span,
    this.context.template.source,
    this.context.template.name,
  );
}
