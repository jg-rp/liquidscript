import { isLiquidStringable, toLiquidString } from "./drop";
import { isNumberT, NumberT } from "./number";
import { LaxUndefined, Undefined } from "./undefined";

/**
 * A type predicate for the primitive string.
 * @param value - Any value
 * @returns `true` if the value is a primitive string.
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * A type predicate for the primitive Symbol.
 * @param value - Any value
 * @returns `true` if the value is a symbol.
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === "symbol";
}

/**
 * A type predicate for the Array object.
 * @param value - Any value
 * @returns `true` if the value is an array.
 */
export function isArray(value: unknown): value is Array<unknown> {
  return Object.prototype.toString.call(value) === "[object Array]"
    ? true
    : false;
}

/**
 * A type predicate for Object.
 * @param value - Any value
 * @returns `true` if the value is an object.
 */
export function isObject(value: unknown): value is object {
  const _type = typeof value;
  return (value !== null && _type === "object") || _type === "function"
    ? true
    : false;
}

/**
 * A type predicate for Function.
 * @param value - Any value
 * @returns `true` if the value is a function.
 */
export function isFunction(value: unknown): value is CallableFunction {
  return typeof value === "function";
}

/**
 * A type predicate for an object property key.
 * @param value - Any value
 * @returns `true` if the value is a string, number or symbol.
 */
export function isPropertyKey(value: unknown): value is PropertyKey {
  const _type = typeof value;
  return _type === "string" || _type === "number" || _type === "symbol"
    ? true
    : false;
}

/**
 * A type predicate for a primitive number or the wrapped, Liquid number type.
 * @param value - Any value
 * @returns `true` if the value is a number or `NumberT`.
 */
export function isNumber(value: unknown): value is number | NumberT {
  return typeof value === "number" || isNumberT(value);
}

/**
 * A type predicate for the number primitive.
 * @param value - Any value
 * @returns `true` if the value is a primitive number.
 */
export function isPrimitiveNumber(value: unknown): value is number {
  return typeof value === "number";
}

/**
 * A type predicate for a primitive number that is an integer.
 * @param value - Any value
 * @returns `true` if the value is a primitive number and is an integer.
 */
export function isPrimitiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value);
}

export function isComparable(
  value: unknown
): value is number | NumberT | string {
  return isNumber(value) || isString(value);
}

/**
 * Stringify a value following Liquid semantics.
 * @param value - Any value
 * @returns A Liquid string representation of the value.
 */
export function liquidStringify(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (value instanceof Undefined) return value.toString();
  if (isArray(value)) return value.join("");
  if (isLiquidStringable(value)) return value[toLiquidString]();

  const s = String(value);
  // XXX: Not good. Leaks things.
  return s === "[object Object]" ? JSON.stringify(value) : s;
}

/**
 * A type predicate for the Iterable interface.
 * @param value - Any value
 * @returns `true` if the value is iterable.
 */
export function isIterable(value: unknown): value is Iterable<unknown> {
  return isObject(value) ? Symbol.iterator in value : false;
}

/**
 * A type predicate for `undefined` or Liquid's undefined wrapper.
 * @param value - Any value
 * @returns `true` if the value is `undefined` or a subclass of `Undefined`.
 */
export function isUndefined(value: unknown): value is Undefined {
  return value === undefined || value instanceof Undefined;
}

export type LiquidArrayLike = Array<unknown>; // XXX: others?

/**
 * A type predicate for objects that a considered array-like in Liquid.
 * @param value - Any value
 * @returns `true` if the value is considered array-like, `false` otherwise.
 */
export function isLiquidArrayLike(value: unknown): value is LiquidArrayLike {
  return isArray(value);
}
