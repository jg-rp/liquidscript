import { DateTime } from "luxon";
import { DefaultMap } from "../../collections";
import { isLiquidPrimitive, toLiquidPrimitive } from "../../drop";
import { FilterArgumentError } from "../../errors";
import { EMPTY, isLiquidTruthy } from "../../expression";
import { checkArguments, FilterContext } from "../../filter";
import { isNumberT } from "../../number";
import {
  isArray,
  isObject,
  isPrimitiveNumber,
  isString,
  isUndefined,
  liquidStringify,
} from "../../types";
import { Markup } from "../drops/markup";

/**
 * Return the length of an array or string. If the input is an object or map,
 * returns the number of keys.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value.
 * @returns The size of an object or `0` if a size can not be determined.
 */
export function size(this: FilterContext, left: unknown): number {
  checkArguments(arguments.length, 0);
  if (isArray(left) || isString(left)) return left.length;
  if (left instanceof Map) return left.size;
  if (isUndefined(left)) return 0;
  if (isObject(left)) return Object.keys(left).length;
  return 0;
}

/**
 * Return a default value if the input is nil, false or empty.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value.
 * @param _default - Optional default value. Defaults to an empty string.
 * @returns The default value if the input is nil, false or empty.
 */
export function default_(
  this: FilterContext,
  left: unknown,
  _default: unknown = ""
): unknown {
  checkArguments(arguments.length, 1);
  const _left = isLiquidPrimitive(left) ? left[toLiquidPrimitive]() : left;
  if (isLiquidTruthy(this.options["allow_false"]) && _left === false)
    return left;
  if (!isLiquidTruthy(_left) || EMPTY.equals(_left)) return _default;
  return left;
}

const FORMAT_TOKENS = new DefaultMap<string, string>("", [
  ["%%", "%"],
  ["%a", "ccc"],
  ["%A", "cccc"],
  ["%b", "LLL"],
  ["%B", "LLLL"],
  ["%c", "DDD tt"],
  ["%d", "dd"],
  ["%H", "HH"],
  ["%I", "hh"],
  ["%j", "ooo"],
  ["%m", "LL"],
  ["%M", "mm"],
  ["%p", "a"],
  ["%s", "X"],
  ["%S", "ss"],
  ["%W", "WW"],
  ["%w", "c"],
  ["%x", "DDD"],
  ["%X", "tt"],
  ["%y", "yy"],
  ["%Y", "yyyy"],
  ["%Z", "ZZZZ"],
]);

const RE_DATE_FORMAT = new RegExp(
  ["%%", ...FORMAT_TOKENS.keys()].join("|"),
  "g"
);

function replaceDateFormat(format: string): string {
  return format.replace(RE_DATE_FORMAT, (match) => FORMAT_TOKENS.get(match));
}

/**
 * Parse a string as DateTime by trying each of the common date formats
 * in turn. This does not do fuzzy or natural language parsing.
 */
function parseDateString(s: string): DateTime {
  let _date = DateTime.fromSQL(s);
  if (_date.isValid) return _date;

  _date = DateTime.fromISO(s);
  if (_date.isValid) return _date;

  _date = DateTime.fromHTTP(s);
  if (_date.isValid) return _date;

  if (s.match(/\d+/)) {
    _date = DateTime.fromSeconds(Number(s));
    if (_date.isValid) return _date;
  }

  return _date;
}

/**
 * Format a date according to the given format string. If the input is not a
 * date it will be converted to a string and parsed using one of the common
 * date representation standards.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - The date to be formatted.
 * @param format - A format string.
 * @returns A string representation of the input date according to the given
 * format string.
 */
export function date(
  this: FilterContext,
  left: unknown,
  format: unknown
): string {
  checkArguments(arguments.length, 1, 1);
  if (isUndefined(left)) return "";
  if (isUndefined(format)) return liquidStringify(left);

  let _date: DateTime;

  // Numbers could be a unix timestamp or an ISO date/time without separators.
  if (isPrimitiveNumber(left) || isNumberT(left)) left = left.toString();

  if (isString(left)) {
    if (left === "now" || left === "today") {
      _date = DateTime.now();
    } else {
      _date = parseDateString(left);
    }
  } else if (left instanceof Date) {
    _date = DateTime.fromJSDate(left);
  } else if (left instanceof DateTime) {
    _date = left;
  } else {
    throw new FilterArgumentError(`expected a date, found ${left}`);
  }

  return _date.toFormat(replaceDateFormat(liquidStringify(format)));
}

/**
 * Return a substring or subsequence of the input value.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. If its not an array or string, it will be
 * converted to a string.
 * @param offset - Start of the subsequence in number of items or characters.
 * @param length - The maximum number of items or characters in the resulting
 * sequence.
 * @returns A substring for subsequence.
 */
export function slice(
  this: FilterContext,
  left: unknown,
  offset: unknown,
  length?: unknown
): string | unknown[] | Markup {
  checkArguments(arguments.length, 2, 1);
  const _offset = Number(offset);
  if (isUndefined(offset) || !Number.isInteger(_offset))
    throw new FilterArgumentError(
      `expected an integer offset, found ${offset}`
    );

  const _length = isUndefined(length) ? 1 : Number(length);
  if (!Number.isInteger(_length))
    throw new FilterArgumentError(
      `expected an integer length, found ${length}`
    );

  // Arrays and strings only.
  const _left = isArray(left) ? left : liquidStringify(left);
  const start = _offset < 0 ? _left.length + _offset : _offset;
  return _left.slice(start, start + _length);
}
