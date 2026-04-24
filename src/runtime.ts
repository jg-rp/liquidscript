/**
 * The special value `Nothing` indicates the absence of a value. It is
 * deliberately distinct from `null` or `undefined` (a property can exist
 * and be given the value `undefined`).
 */
export const Nothing = Symbol.for("liquid.context.nothing");

export function isNothing(obj: unknown): boolean {
  // TODO: Nothing type
  // TODO: type guard
  return obj === Nothing;
}
