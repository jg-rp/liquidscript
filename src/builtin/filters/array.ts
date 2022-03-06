import {
  FilterArgumentError,
  FilterValueError,
  InternalKeyError,
} from "../../errors";
import { checkArguments, FilterContext } from "../../filter";
import {
  isArray,
  isComparable,
  isIterable,
  isLiquidTruthy,
  isObject,
  isString,
  isSymbol,
  isUndefined,
  liquidStringify,
} from "../../types";
import { Undefined } from "../../undefined";
import { Range } from "../../range";
import { getItemSync } from "../../context";

// XXX: Multiple cases of unnecessary array copying if input is already an array?

/**
 *
 * @param this
 * @param left
 * @param separator
 * @returns
 */
export function join(
  this: FilterContext,
  left: unknown,
  separator?: unknown
): string {
  checkArguments(arguments.length, 1);
  if (separator === undefined) separator = " ";
  return Array.from(inputIterable(left))
    .map(liquidStringify)
    .join(liquidStringify(separator));
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function first(this: FilterContext, left: unknown): unknown {
  checkArguments(arguments.length, 0);
  // First of a string is not supported.
  if (isString(left)) return null;
  // Iterable objects are OK.
  if (isObject(left) && isIterable(left))
    return left[Symbol.iterator]().next().value;
  if (isObject(left)) {
    return Object.entries(left)[Symbol.iterator]().next().value;
  }
  return null;
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function last(this: FilterContext, left: unknown): unknown {
  checkArguments(arguments.length, 0);
  if (isArray(left)) return left[left.length - 1];
  if (left instanceof Range) return left.stop;
  return null;
}

/**
 *
 * @param this
 * @param left
 * @param prop
 */
export function compact(
  this: FilterContext,
  left: unknown,
  prop?: unknown
): unknown[] {
  checkArguments(arguments.length, 1);
  if (prop === undefined)
    return Array.from(inputIterable(left)).filter(
      (v) => v !== undefined && v !== null
    );

  return Array.from(inputIterable(left)).filter((v) => {
    const _v = getItemOrThrow(v, prop);
    return _v !== undefined && _v !== null;
  });
}

/**
 *
 * @param this
 * @param left
 * @param arg
 * @returns
 */
export function concat(
  this: FilterContext,
  left: unknown,
  arg: unknown
): unknown[] {
  checkArguments(arguments.length, 1, 1);
  // XXX: Support concat-ing iterables?
  if (!isArray(arg))
    throw new FilterArgumentError(`expected an array, found ${typeof arg}`);

  if (left instanceof Undefined) return arg;
  return Array.from(inputIterable(left)).concat(arg);
}

/**
 *
 * @param this
 * @param left
 * @param key
 * @returns
 */
export function map(
  this: FilterContext,
  left: unknown,
  key: unknown
): unknown[] {
  checkArguments(arguments.length, 1, 1);
  if (!isIterable(left)) {
    throw new FilterArgumentError("can't map non-iterable");
  }
  return Array.from(left).map((v) => getItem(v, key));
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function reverse(this: FilterContext, left: unknown): unknown[] {
  checkArguments(arguments.length, 0);
  return Array.from(inputIterable(left)).reverse();
}

/**
 *
 * @param this
 * @param left
 * @param key
 * @returns
 */
export function sort(
  this: FilterContext,
  left: unknown,
  key?: unknown
): unknown[] {
  checkArguments(arguments.length, 1);
  if (isUndefined(key)) {
    return Array.from(inputIterable(left)).sort(compare);
  }

  return Array.from(inputIterable(left)).sort((a, b) =>
    compare(getItem(a, key), getItem(b, key))
  );
}

/**
 *
 * @param this
 * @param left
 * @param key
 * @returns
 */
export function sortNatural(
  this: FilterContext,
  left: unknown,
  key?: unknown
): unknown[] {
  checkArguments(arguments.length, 1);
  if (isUndefined(key)) {
    return Array.from(inputIterable(left)).sort(naturalCompare);
  }

  return Array.from(inputIterable(left)).sort((a, b) =>
    naturalCompare(getItem(a, key), getItem(b, key))
  );
}

/**
 *
 * @param this
 * @param left
 * @param prop
 * @returns
 */
export function uniq(
  this: FilterContext,
  left: unknown,
  prop?: unknown
): unknown[] {
  checkArguments(arguments.length, 1);
  const map = new Map<unknown, unknown>();
  let key: unknown;

  if (prop === undefined) {
    for (const obj of inputIterable(left)) {
      key = JSON.stringify(obj);
      if (!map.has(key)) {
        map.set(key, obj);
      }
    }
  } else {
    for (const obj of inputIterable(left)) {
      key = JSON.stringify(getItem(obj, prop));
      if (!map.has(key)) {
        map.set(key, obj);
      }
    }
  }

  return Array.from(map.values());
}

/**
 *
 * @param this
 * @param left
 * @param prop
 * @param value
 * @returns
 */
export function where(
  this: FilterContext,
  left: unknown,
  prop: unknown,
  value?: unknown
): unknown[] {
  checkArguments(arguments.length, 2, 1);
  if (value === undefined) {
    return Array.from(inputIterable(left)).filter((v) =>
      isLiquidTruthy(getItem(v, prop))
    );
  }
  return Array.from(inputIterable(left)).filter(
    (v) => getItem(v, prop) === value
  );
}

/**
 * Coerce an unknown array filter input to an iterable.
 * @param value
 * @returns
 */
function inputIterable(value: unknown): Iterable<unknown> {
  if (isArray(value)) {
    return value.flat(5);
  }
  // XXX: Not flattening iterables.
  if (isIterable(value)) {
    return value;
  }
  return [value];
}

/**
 *
 * @param obj
 * @param key
 * @returns
 */
function getItem(obj: unknown, key: unknown): unknown {
  // XXX: nill, undefined or Undefined?
  if (!isObject(obj))
    throw new FilterArgumentError(`can't read property ${obj}[${key}]`);

  if (obj instanceof Map) {
    return obj.get(key);
  }

  try {
    return getItemSync(obj, key);
  } catch (error) {
    if (error instanceof InternalKeyError) {
      return undefined;
    }
    throw error;
  }
}

function getItemOrThrow(obj: unknown, key: unknown): unknown {
  if (obj instanceof Map && obj.has(key)) {
    return obj.get(key);
  }

  try {
    return getItemSync(obj, key);
  } catch (error) {
    if (error instanceof InternalKeyError) {
      throw new FilterArgumentError(`can't read property '${key}' of ${obj}`);
    }
    throw error;
  }
}

/**
 *
 * @param a
 * @param b
 * @returns
 */
function compare(a: unknown, b: unknown): -1 | 0 | 1 {
  if (a === undefined && b === undefined) return 0;
  if (a === undefined && b !== undefined) return 1;
  if (a !== undefined && b === undefined) return -1;

  if (typeof a !== typeof b)
    throw new FilterValueError(
      `comparison with ${typeof a} and ${typeof b} failed`
    );

  if (isComparable(a) && isComparable(b)) return a < b ? -1 : a > b ? 1 : 0;
  throw new FilterValueError(`comparison of '${a}' and '${b}' failed`);
}

/**
 *
 * @param a
 * @param b
 * @returns
 */
function naturalCompare(a: unknown, b: unknown): -1 | 0 | 1 {
  if (a === undefined && b === undefined) return 0;
  if (a === undefined && b !== undefined) return 1;
  if (a !== undefined && b === undefined) return -1;

  const _a = JSON.stringify(a).toLowerCase();
  const _b = JSON.stringify(b).toLowerCase();
  return _a < _b ? -1 : _a > _b ? 1 : 0;
}
