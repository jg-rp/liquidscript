import { Drop, length } from "../drop";
import { Undefined } from "../drops/undefined";
import type { FilterContext } from "../filter";
import { isArray, isObject, isString } from "../type_guards";

export function size(this: FilterContext, left: unknown): number {
  this.assertArgs(arguments.length, 1);
  if (isArray(left) || isString(left)) return left.length;
  if (left instanceof Map) return left.size;
  if (left instanceof Undefined) return 0;
  if (left instanceof Drop) return left[length]();
  if (isObject(left)) return Object.keys(left).length;
  return 0;
}
