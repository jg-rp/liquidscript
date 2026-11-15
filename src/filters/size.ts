import type { FilterContext } from "../filter.js";

import { Drop, length } from "../drop.js";
import { Undefined } from "../drops/undefined.js";
import { isArray, isNumeric, isObject, isString } from "../type_guards.js";

export function size(this: FilterContext, left: unknown): number {
  this.assertArgs(arguments.length, 1);
  if (isArray(left) || isString(left)) return left.length;
  if (left instanceof Map) return left.size;
  if (left instanceof Undefined) return 0;
  if (left instanceof Drop) return left[length]();
  if (isNumeric(left)) return 8; // Close enough, most of the time.
  if (isObject(left)) return Object.keys(left).length;
  return 0;
}
