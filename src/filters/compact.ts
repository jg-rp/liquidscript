import { ArgumentError } from "../errors";
import { type FilterContext } from "../filter";
import { Nothing } from "../runtime";

export function compact(
  this: FilterContext,
  left: unknown,
  prop?: unknown,
): unknown[] {
  this.assertArgs(arguments.length, 1, 2);

  if (prop === undefined) {
    return this.inputArray(left).filter((v) => v !== undefined && v !== null);
  }

  return this.inputArray(left).filter((v) => {
    const _v = this.getItem(v, prop, Nothing);
    if (_v === Nothing) {
      throw new ArgumentError(
        `can't read property '${prop}' of ${this.toString(v, "")}`,
        this.span,
        this.context.template.source,
        this.context.template.name,
      );
    }
    return _v !== undefined && _v !== null;
  });
}
