import { getItemSync } from "../../context";
import { toLiquidString } from "../../drop";
import {
  FilterArgumentError,
  InternalKeyError,
  InternalTypeError,
} from "../../errors";
import { isLiquidTruthy, NIL } from "../../expression";
import { checkArguments, FilterContext } from "../../filter";
import { Range } from "../../range";
import {
  isArray,
  isComparable,
  isIterable,
  isObject,
  isString,
  isUndefined,
  liquidStringify,
} from "../../types";
import { Undefined } from "../../undefined";
import { Markup } from "../drops/markup";
import { parseNumberOrZero } from "./math";
import { NumberT, ZERO } from "../../number";

/**
 * Concatenate items in an array-like object into a single string, separated by
 * a separator string.
 *
 * If the input value is not array-like, it will be coerced to one. If input
 * array items are not strings, they will be converted to strings before joining.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. If it's not iterable, a new array will be used with
 * the value as its first and only item.
 * @param separator - A string to be used to separate input items in the output
 * string. Defaults to a single space.
 * @returns Items in the input array, concatenated together and separated by
 * the given separator.
 */
export function join(
  this: FilterContext,
  left: unknown,
  separator?: unknown,
): string | Markup {
  checkArguments(arguments.length, 1);
  if (this.context.environment.autoEscape) {
    const _separator = separator === undefined ? new Markup(" ") : separator;
    if (_separator instanceof Markup)
      return new Markup(
        inputArray(left).map(Markup.escape).join(_separator[toLiquidString]()),
      );
  }

  if (separator === undefined) separator = " ";
  return inputArray(left).map(liquidStringify).join(liquidStringify(separator));
}

/**
 * Return the first item of the input sequence. The input could be array-like
 * or a mapping, but not a string.
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value.
 * @returns The first item in the input iterable, or `null` if the input value
 * is not iterable, or `undefined` if the iterable is empty.
 */
export function first(this: FilterContext, left: unknown): unknown {
  checkArguments(arguments.length, 0);
  // First of a string is not supported.
  if (isString(left)) return null;
  // Iterable objects are OK.
  if (isIterable(left)) return left[Symbol.iterator]().next().value;
  if (isObject(left)) {
    return Object.entries(left)[Symbol.iterator]().next().value;
  }
  return null;
}

/**
 * Return the last item of the input sequence. The input could be array-like,
 * but not a string.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value.
 * @returns The last item in the input iterable, or `null` if the input value
 * is not iterable.
 */
export function last(this: FilterContext, left: unknown): unknown {
  checkArguments(arguments.length, 0);
  if (isArray(left)) return left[left.length - 1];
  if (left instanceof Range) return left.stop;
  if (left instanceof Undefined) left.poke();
  return null;
}

/**
 * Remove `null` and `undefined` values from an array-like object. If given, the
 * argument should be the name of a property that exists on each object in the
 * array-like sequence.
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value.
 * @param prop - The name of a property to check for `null` or `undefined`
 * values. Each object in the input iterable should have this property.
 * @returns - A new array with `null` and `undefined` values removed.
 */
export function compact(
  this: FilterContext,
  left: unknown,
  prop?: unknown,
): unknown[] {
  checkArguments(arguments.length, 1);
  if (prop === undefined)
    return inputArray(left).filter((v) => v !== undefined && v !== null);

  return inputArray(left).filter((v) => {
    const _v = getItemOrThrow(v, prop);
    return _v !== undefined && _v !== null;
  });
}

/**
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left -
 * @param arg -
 * @returns
 */
export function concat(
  this: FilterContext,
  left: unknown,
  arg: unknown,
): unknown[] {
  checkArguments(arguments.length, 1, 1);
  if (!isArray(arg))
    throw new FilterArgumentError(`expected an array, found ${typeof arg}`);

  if (left instanceof Undefined) return arg;
  return inputArray(left).concat(arg);
}

/**
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left -
 * @param key -
 * @returns
 */
export function map(
  this: FilterContext,
  left: unknown,
  key: unknown,
): unknown[] {
  checkArguments(arguments.length, 1, 1);
  if (!isIterable(left)) {
    throw new FilterArgumentError("can't map non-iterable");
  }
  return Array.from(left).map((v) => getItem(v, key));
}

/**
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left -
 * @returns
 */
export function reverse(this: FilterContext, left: unknown): unknown[] {
  checkArguments(arguments.length, 0);
  return Array.from(inputArray(left)).reverse();
}

/**
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left -
 * @param key -
 * @returns
 */
export function sort(
  this: FilterContext,
  left: unknown,
  key?: unknown,
): unknown[] {
  checkArguments(arguments.length, 1);
  if (isUndefined(key)) {
    return Array.from(inputArray(left)).sort(compare);
  }

  return Array.from(inputArray(left)).sort((a, b) =>
    compare(getItem(a, key), getItem(b, key)),
  );
}

/**
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left -
 * @param key -
 * @returns
 */
export function sortNatural(
  this: FilterContext,
  left: unknown,
  key?: unknown,
): unknown[] {
  checkArguments(arguments.length, 1);
  if (isUndefined(key)) {
    return Array.from(inputArray(left)).sort(naturalCompare);
  }

  return Array.from(inputArray(left)).sort((a, b) =>
    naturalCompare(getItem(a, key), getItem(b, key)),
  );
}

/**
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left -
 * @param prop -
 * @returns
 */
export function uniq(
  this: FilterContext,
  left: unknown,
  prop?: unknown,
): unknown[] {
  checkArguments(arguments.length, 1);
  const _map = new Map<unknown, unknown>();
  let key: unknown;

  if (prop === undefined) {
    for (const obj of inputArray(left)) {
      key = JSON.stringify(obj);
      if (!_map.has(key)) {
        _map.set(key, obj);
      }
    }
  } else {
    for (const obj of inputArray(left)) {
      key = JSON.stringify(getItem(obj, prop));
      if (!_map.has(key)) {
        _map.set(key, obj);
      }
    }
  }

  return Array.from(_map.values());
}

/**
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left -
 * @param prop -
 * @param value -
 * @returns
 */
export function where(
  this: FilterContext,
  left: unknown,
  prop: unknown,
  value?: unknown,
): unknown[] {
  checkArguments(arguments.length, 2, 1);
  if (value === null || NIL.equals(value) || isUndefined(value)) {
    return inputArray(left).filter((v) => isLiquidTruthy(getItem(v, prop)));
  }
  return inputArray(left).filter((v) => getItem(v, prop) === value);
}

/**
 * Return the sum of all numeric items in _left_.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left -
 * @param prop -
 * @returns
 */
export function sum(
  this: FilterContext,
  left: unknown,
  prop?: unknown,
): NumberT {
  if (prop === null || NIL.equals(prop) || isUndefined(prop)) {
    return inputArray(left)
      .map(parseNumberOrZero)
      .reduce((a, b) => a.plus(b), ZERO);
  }
  return inputArray(left)
    .map((e) => parseNumberOrZero(getItem(e, prop)))
    .reduce((a, b) => a.plus(b), ZERO);
}

/**
 * Coerce an unknown array filter input to an iterable.
 * @param value -
 * @returns
 */
function inputArray(value: unknown): unknown[] {
  if (isArray(value)) {
    return value.flat(5);
  }
  // Not flattening iterables.
  if (isIterable(value)) {
    return Array.from(value);
  }
  return [value];
}

/**
 *
 * @param obj -
 * @param key -
 * @returns
 */
function getItem(obj: unknown, key: unknown): unknown {
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

function compare(a: unknown, b: unknown): -1 | 0 | 1 {
  if (a === undefined && b === undefined) return 0;
  if (a === undefined && b !== undefined) return 1;
  if (a !== undefined && b === undefined) return -1;

  if (typeof a !== typeof b)
    throw new InternalTypeError(
      `comparison with ${typeof a} and ${typeof b} failed`,
    );

  if (isComparable(a) && isComparable(b)) return a < b ? -1 : a > b ? 1 : 0;
  throw new InternalTypeError(`comparison of '${a}' and '${b}' failed`);
}

function naturalCompare(a: unknown, b: unknown): -1 | 0 | 1 {
  if (a === undefined && b === undefined) return 0;
  if (a === undefined && b !== undefined) return 1;
  if (a !== undefined && b === undefined) return -1;

  const _a = JSON.stringify(a).toLowerCase();
  const _b = JSON.stringify(b).toLowerCase();
  return _a < _b ? -1 : _a > _b ? 1 : 0;
}
