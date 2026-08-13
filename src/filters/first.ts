import { type FilterContext } from "../filter";
import { isLiquidNumber } from "../number";
import {
  isArray,
  isIterable,
  isNumber,
  isObject,
  isString,
} from "../type_guards";

export function first(this: FilterContext, left: unknown): unknown {
  this.assertArgs(arguments.length, 1);
  if (isNumber(left) || isLiquidNumber(left)) return null;
  if (isArray(left) || isString(left)) return left[0];
  if (isIterable(left)) return left[Symbol.iterator]().next().value;
  if (isObject(left)) {
    return Object.entries(left)[Symbol.iterator]().next().value;
  }
  return null;
}
