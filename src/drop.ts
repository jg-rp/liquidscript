import { isObject } from "./types";

export type Drop = LiquidPrimitive &
  LiquidCallable &
  LiquidDispatchable &
  LiquidDispatchableSync &
  LiquidStringable;

/**
 * A symbol that specifies a function valued property that is called to
 * convert an object to its corresponding Liquid primitive value.
 */
export const toLiquidPrimitive = Symbol.for("liquid.drop.primitive");

export interface LiquidPrimitive {
  [toLiquidPrimitive](hint?: string): unknown;
}

/**
 * A type predicate for the `LiquidPrimitive` interface.
 * @param value - A value that may or may not implement the `LiquidPrimitive` interface.
 * @returns `true` if the argument value implements the `LiquidPrimitive`
 * interface, `false` otherwise.
 */
export function isLiquidPrimitive(value: unknown): value is LiquidPrimitive {
  return (
    isObject(value) &&
    toLiquidPrimitive in value &&
    typeof Reflect.get(value, toLiquidPrimitive) === "function"
  );
}

/**
 * A symbol that specifies a function valued property that is called to
 * convert an object to its Liquid specific string representation.
 */
export const toLiquidString = Symbol.for("liquid.drop.string");

export interface LiquidStringable {
  [toLiquidString](): string;
}

/**
 * A type predicate for the `LiquidStringable` interface.
 * @param value - A value that may or may not implement the `LiquidStringable` interface.
 * @returns `true` if the argument value implements the `LiquidStringable`
 * interface, `false` otherwise.
 */
export function isLiquidStringable(value: unknown): value is LiquidStringable {
  return (
    isObject(value) &&
    toLiquidString in value &&
    typeof Reflect.get(value, toLiquidString) === "function"
  );
}

/**
 * A symbol that specifies a function valued property that is called to
 * convert an object to an HTML-safe string representation.
 */
export const toLiquidHtml = Symbol.for("liquid.drop.html");

export interface LiquidHTMLable {
  [toLiquidHtml](): string;
}

/**
 * A type predicate for the `LiquidHTMLable` interface.
 * @param value - A value that may or may not implement the `LiquidHTMLable` interface.
 * @returns `true` if the argument value implements the `LiquidHTMLable`
 * interface, `false` otherwise.
 */
export function isLiquidHTMLable(value: unknown): value is LiquidHTMLable {
  return (
    isObject(value) &&
    toLiquidHtml in value &&
    typeof Reflect.get(value, toLiquidHtml) === "function"
  );
}

/**
 * A symbol that specifies a function valued property that is called to
 * test a method name against a set of whitelisted methods that Liquid
 * can call.
 */
export const isLiquidCallable = Symbol.for("liquid.drop.callable");

export interface LiquidCallable {
  [isLiquidCallable](name: PropertyKey): boolean;
}

/**
 * A type predicate for the `LiquidCallable` interface.
 * @param value - A value that may or may not implement the `LiquidCallable` interface.
 * @returns `true` if the argument value implements the `LiquidCallable` interface,
 * `false` otherwise.
 */
export function hasLiquidCallable(value: unknown): value is LiquidCallable {
  return isObject(value) && isLiquidCallable in value;
}

/**
 * A symbol that specifies a function valued property that is called in
 * the event that a property is missing from an object.
 */
export const liquidDispatch = Symbol.for("liquid.drop.dispatch");

export interface LiquidDispatchable {
  [liquidDispatch](name: PropertyKey): Promise<unknown>;
}

/**
 * A type predicate for the `LiquidDispatchable` interface.
 * @param value - A value that may or may not implement the `LiquidDispatchable` interface.
 * @returns `true` if the argument value implements the `LiquidDispatchable` interface,
 * `false` otherwise.
 */
export function isLiquidDispatchable(
  value: unknown
): value is LiquidDispatchable {
  return isObject(value) && liquidDispatch in value;
}

export const liquidDispatchSync = Symbol.for("liquid.drop.dispatchSync");

export interface LiquidDispatchableSync {
  [liquidDispatchSync](name: PropertyKey): unknown;
}

export function isLiquidDispatchableSync(
  value: unknown
): value is LiquidDispatchableSync {
  return isObject(value) && liquidDispatchSync in value;
}
