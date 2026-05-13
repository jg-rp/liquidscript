import { Range } from "../drops/range";
import { Undefined } from "../drops/undefined";
import { type FilterContext } from "../filter";
import { isArray, isString } from "../type_guards";

export function last(this: FilterContext, left: unknown): unknown {
  this.assertArgs(arguments.length, 1);
  if (isArray(left) || isString(left)) return left[left.length - 1];
  if (left instanceof Range) return left.stop;
  if (left instanceof Undefined) left.poke();
  return null;
}
