import { FilterContext } from "../../filter";
import { toLiquidString } from "../../object";

export function append(
  this: FilterContext,
  left: unknown,
  other: unknown
): string {
  // TODO: Excess and missing argument handling.. Using proxies.
  return toLiquidString(left) + toLiquidString(other);
}
