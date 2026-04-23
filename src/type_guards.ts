/**
 * A type predicate for the primitive string.
 * @param value - Any value
 * @returns `true` if the value is a primitive string.
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * A type predicate for the Array object.
 * @param value - Any value
 * @returns `true` if the value is an array.
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
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
 * A type predicate for the primitive number type.
 * @param value - Any value
 * @returns `true` if the value is a number.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

/**
 * A type predicate for the primitive boolean.
 * @param value - Any value
 * @returns `true` if the value is a primitive boolean.
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value == "boolean";
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
 * A type predicate for the Iterable interface.
 * @param value - Any value
 * @returns `true` if the value is iterable.
 */
export function isIterable(value: unknown): value is Iterable<unknown> {
  return isObject(value) ? Symbol.iterator in value : false;
}