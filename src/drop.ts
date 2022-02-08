/**
 * XXX: Same as Python's __liquid__ or Ruby's to_liquid_value.
 * XXX: Should we just use Object.prototype.valueOf()?
 */
export const liquidValueOf = Symbol.for("liquid.drop.value");

export interface LiquidPrimitive {
  // TODO: define liquid primitive.
  [liquidValueOf](): unknown;
}

export function isLiquidPrimitive(obj: unknown): obj is LiquidPrimitive {
  // TODO: and is a function
  return (
    (typeof obj === "object" || typeof obj === "function") &&
    obj !== null &&
    liquidValueOf in obj
  );
}

/**
 * XXX: Same as Python's __str__ or Ruby's to_s.
 * XXX: Should we just use tObject.prototype.toString()?
 */
export const toLiquidString = Symbol.for("liquid.drop.string");

export interface LiquidStringable {
  [toLiquidString](): string;
}

export function isLiquidStringable(obj: unknown): obj is LiquidStringable {
  // TODO: and is a function
  return (
    (typeof obj === "object" || typeof obj === "function") &&
    obj !== null &&
    toLiquidString in obj
  );
}

/**
 * XXX: Same as Python's __html__ for use with HTML auto escape.
 */
export const html = Symbol.for("liquid.drop.html");

/**
 * A whitelist of function/method names that can be called from liquid
 * with no arguments.
 *
 * XXX: Same as Ruby's invokable_methods
 */
export const liquidCallable = Symbol.for("liquid.drop.callable");

export interface LiquidCallable {
  [liquidCallable](): unknown;
}

export function isLiquidCallable(obj: unknown): obj is LiquidCallable {
  // TODO: and is an array
  return (
    (typeof obj === "object" || typeof obj === "function") &&
    obj !== null &&
    liquidCallable in obj
  );
}

/**
 * XXX: Same as Ruby's liquid_method_missing. Called with a name argument
 * if the name is not in the whitelist at [liquidCallable].
 */
export const liquidMethodMissing = Symbol.for("liquid.drop.methodMissing");
