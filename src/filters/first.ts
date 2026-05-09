import { type FilterContext } from "../filter";
import { isIterable, isObject, isString } from "../type_guards";

export function first(this: FilterContext, left: unknown): unknown {
  this.assertArgs(arguments.length, 1);
  if (isString(left)) return null;
  if (isIterable(left)) return left[Symbol.iterator]().next().value;
  if (isObject(left)) {
    return Object.entries(left)[Symbol.iterator]().next().value;
  }
  return null;
}
