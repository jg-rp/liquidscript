import { FilterContext } from "../../filter";
import { toLiquidString } from "../../object";

export function join(
  this: FilterContext,
  left: unknown,
  separator: unknown
): string {
  // TODO: Proxy for coercing left to a flat array.
  // TODO: Excess and missing argument handling.. Using proxies.
  // XXX: Asserting left for now
  const _left = Array.from(left as Iterable<unknown>);
  return _left.join(toLiquidString(separator));
}
