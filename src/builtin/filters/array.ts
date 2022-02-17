import { FilterArgumentError, FilterValueError } from "../../errors";
import { FilterContext } from "../../filter";
import {
  isArray,
  isComparable,
  isIterable,
  isLiquidTruthy,
  isObject,
  isString,
  isSymbol,
  toLiquidString,
} from "../../object";
import { Undefined } from "../../undefined";

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
  if (arguments.length > 2)
    throw new FilterArgumentError(
      `join: too many arguments, expected 0 or 1, found ${arguments.length - 1}`
    );

  if (separator === undefined) separator = " ";
  return Array.from(inputIterable(left)).join(toLiquidString(separator));
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function first(this: FilterContext, left: unknown): unknown {
  // First of a string is not supported.
  if (isString(left)) return null;
  // Iterable objects are OK.
  if (isObject(left) && isIterable(left))
    return left[Symbol.iterator]().next().value;
  return null;
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function last(this: FilterContext, left: unknown): unknown {
  if (isArray(left)) return left[left.length - 1];
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
  if (arguments.length > 2)
    throw new FilterArgumentError(
      `compact: too many arguments, expected 0 or 1, found ${
        arguments.length - 1
      }`
    );

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
  // XXX: Support concat-ing iterables?
  if (!isArray(arg))
    throw new FilterArgumentError(
      `concat expected an array, found ${typeof arg}`
    );

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
  if (!isIterable(left)) {
    throw new FilterValueError("can't map non-iterable");
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
  if (arguments.length > 1)
    throw new FilterArgumentError(
      `reverse: too many arguments, expected 0, found ${arguments.length - 1}`
    );
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
  if (arguments.length > 2)
    throw new FilterArgumentError(
      `sort: too many arguments, expected 0 or 1, found ${arguments.length - 1}`
    );

  if (key === undefined) {
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
  if (arguments.length > 2)
    throw new FilterArgumentError(
      `sort_natural: too many arguments, expected 0 or 1, found ${
        arguments.length - 1
      }`
    );

  if (key === undefined) {
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
      key = JSON.stringify(getItemOrThrow(obj, prop));
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
  if (arguments.length < 2)
    throw new FilterArgumentError(
      `where: not enough arguments, expected 1 or 2, found ${
        arguments.length - 1
      }`
    );

  if (arguments.length > 3)
    throw new FilterArgumentError(
      `where: too many arguments, expected 1 or 2, found ${
        arguments.length - 1
      }`
    );

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
 */
function inputIterable(value: unknown): Iterable<unknown> {
  if (isArray(value)) {
    return flatten(value);
  }
  // XXX: Not flattening iterables.
  if (isIterable(value)) {
    return value;
  }
  return [value];
}

/**
 *
 * @param it
 * @param level
 * @returns
 */
function flatten(it: Iterable<unknown>, level: number = 5): unknown[] {
  function* _flatten(
    it: Iterable<unknown>,
    level: number = 5
  ): Generator<unknown> {
    for (const obj of it) {
      if (!level || !isIterable(obj)) {
        yield obj;
      } else {
        yield* _flatten(obj, level - 1);
      }
    }
  }
  return Array.from(_flatten(it, level));
}

/**
 *
 * @param obj
 * @param key
 * @returns
 */
function getItem(obj: unknown, key: unknown): unknown {
  // XXX: nill, undefined or Undefined?
  if (!isObject(obj)) return undefined;

  if (obj instanceof Map) {
    return obj.get(key);
  }

  // TODO: Drop protocol?
  if (isString(key) || isSymbol(key)) return obj[key as keyof typeof obj];
  return undefined;
}

function getItemOrThrow(obj: unknown, key: unknown): unknown {
  if (obj instanceof Map && obj.has(key)) {
    return obj.get(key);
  }
  if (isObject(obj) && (key as keyof typeof obj) in obj) {
    return obj[key as keyof typeof obj];
  }
  throw new FilterArgumentError(`can't read property '${key}' of ${obj}`);
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

  // XXX: Hack?
  const _a = `${a}`.toLowerCase();
  const _b = `${b}`.toLowerCase();
  return _a < _b ? -1 : _a > _b ? 1 : 0;
}
