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
 * XXX: Same as Python's __html__ for use with HTML auto escape.
 */
export const html = Symbol.for("liquid.drop.html");

/**
 * A whitelist of function/method names that can be called from liquid
 * with no arguments.
 *
 * XXX: Same as Ruby's invokable_methods (sic)
 */
export const liquidCallable = Symbol.for("liquid.drop.callable");

export interface LiquidCallable {
  [liquidCallable](): string[];
}

export function isLiquidCallable(obj: unknown): obj is LiquidCallable {
  // TODO: and is an array of strings
  return (
    obj !== null &&
    (typeof obj === "object" || typeof obj === "function") &&
    liquidCallable in obj
  );
}

/**
 * XXX: Same as Ruby's liquid_method_missing. Called with a name argument
 * if the name is not in the whitelist at [liquidCallable].
 *
 * Also similar to Python Liquid's __getitem__ approach.
 */
export const liquidDispatch = Symbol.for("liquid.drop.dispatch");

// TODO: sync and async version of dispatch method

export interface LiquidDispatchable {
  [liquidDispatch](name: string): unknown;
}

export function isLiquidDispatchable(obj: unknown): obj is LiquidDispatchable {
  // TODO: and is a function/method
  return (
    obj !== null &&
    (typeof obj === "object" || typeof obj === "function") &&
    liquidDispatch in obj
  );
}
