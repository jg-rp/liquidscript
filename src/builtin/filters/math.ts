import { FilterContext } from "../../filter";
import { N, NumberT, parseNumberT, ZERO } from "../../number";

function parseNumberTOrZero(val: N): NumberT {
  const num = parseNumberT(val);
  return isNaN(num.valueOf()) || !isFinite(num.valueOf()) ? ZERO : num;
}

export function divideBy(this: FilterContext, left: N, other: N): NumberT {
  // Left value defaults to zero.
  const n = parseNumberTOrZero(left);
  // XXX: Divisor should throw an error if it's not a number.
  // XXX: Divide by zero should throw an error.
  return n.div(other);
}
