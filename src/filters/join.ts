import { assertArgs, inputArray, type FilterContext } from "../filter";

export function join(
  this: FilterContext,
  left: unknown,
  sep?: unknown,
): string {
  assertArgs(this, arguments.length, 1, 2);

  const _left = inputArray(left);

  const _sep =
    sep === undefined
      ? " "
      : this.context.env.toString(sep, this.context, this.span);

  return _left
    .map((obj) => this.context.env.toString(obj, this.context, this.span))
    .join(_sep);
}
