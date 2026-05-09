import { Undefined } from "../drops/undefined";
import { type FilterContext } from "../filter";
import { Nothing } from "../runtime";

export function where(
  this: FilterContext,
  left: unknown,
  prop: unknown,
  value: unknown,
): unknown[] {
  this.assertArgs(arguments.length, 2, 3);

  if (
    value === undefined ||
    value == null ||
    value === Nothing ||
    value instanceof Undefined
  ) {
    return this.inputArray(left).filter((v) =>
      this.isTruthy(this.getItem(v, prop, undefined)),
    );
  }

  return this.inputArray(left).filter(
    (v) => this.getItem(v, prop, undefined) === value,
  );
}
