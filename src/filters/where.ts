import { type FilterContext } from "../filter";

export function where(
  this: FilterContext,
  left: unknown,
  prop: unknown,
  value: unknown,
): unknown[] {
  this.assertArgs(arguments.length, 2, 3);

  if (this.isNil(value)) {
    return this.inputArray(left).filter((v) =>
      this.isTruthy(this.getItem(v, prop, undefined)),
    );
  }

  return this.inputArray(left).filter(
    (v) => this.getItem(v, prop, undefined) === value,
  );
}
