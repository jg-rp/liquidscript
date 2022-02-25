import { FilterArgumentError } from "../../errors";
import { checkArguments, FilterContext } from "../../filter";
import { isN, NumberT, parseNumberT, ZERO } from "../../number";

// TODO: test NaN and Inf and undefined and null

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function abs(this: FilterContext, left: unknown): NumberT {
  checkArguments(arguments.length, 0);
  return parseNumberOrZero(left).abs();
}

/**
 *
 * @param this
 * @param left
 * @param arg
 * @returns
 */
export function atLeast(
  this: FilterContext,
  left: unknown,
  arg: unknown
): NumberT {
  checkArguments(arguments.length, 1, 1);
  return parseNumberOrZero(left).max(parseNumberOrZero(arg));
}

/**
 *
 * @param this
 * @param left
 * @param arg
 * @returns
 */
export function atMost(
  this: FilterContext,
  left: unknown,
  arg: unknown
): NumberT {
  checkArguments(arguments.length, 1, 1);
  return parseNumberOrZero(left).min(parseNumberOrZero(arg));
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function ceil(this: FilterContext, left: unknown): NumberT {
  checkArguments(arguments.length, 0);
  return parseNumberOrZero(left).ceil();
}

/**
 *
 * @param this
 * @param left
 * @param divisor
 * @returns
 */
export function dividedBy(
  this: FilterContext,
  left: unknown,
  divisor: unknown
): NumberT {
  checkArguments(arguments.length, 1, 1);
  const _divisor = parseNumberOrZero(divisor);
  if (_divisor.eq(0)) throw new FilterArgumentError("can't divide by zero");
  return parseNumberOrZero(left).div(_divisor);
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function floor(this: FilterContext, left: unknown): NumberT {
  checkArguments(arguments.length, 0);
  return parseNumberOrZero(left).floor();
}

/**
 *
 * @param this
 * @param left
 * @param right
 * @returns
 */
export function minus(
  this: FilterContext,
  left: unknown,
  right: unknown
): NumberT {
  checkArguments(arguments.length, 1, 1);
  return parseNumberOrZero(left).minus(parseNumberOrZero(right));
}

/**
 *
 * @param this
 * @param left
 * @param right
 * @returns
 */
export function modulo(
  this: FilterContext,
  left: unknown,
  right: unknown
): NumberT {
  checkArguments(arguments.length, 1, 1);
  // undefined or invalid arguments get caught by "divide by zero" check.
  const _right = parseNumberOrZero(right);
  if (_right.eq(0)) throw new FilterArgumentError("can't divide by zero");
  return parseNumberOrZero(left).mod(_right);
}

/**
 *
 * @param this
 * @param left
 * @param right
 * @returns
 */
export function plus(
  this: FilterContext,
  left: unknown,
  right: unknown
): NumberT {
  checkArguments(arguments.length, 1, 1);
  return parseNumberOrZero(left).plus(parseNumberOrZero(right));
}

/**
 *
 * @param this
 * @param left
 * @param decimalPlaces
 * @returns
 */
export function round(
  this: FilterContext,
  left: unknown,
  decimalPlaces?: unknown
): NumberT {
  checkArguments(arguments.length, 1);
  const _decimalPlaces = Number(decimalPlaces);
  if (isFinite(_decimalPlaces)) {
    return parseNumberOrZero(left).round(_decimalPlaces);
  }
  return parseNumberOrZero(left).round();
}

/**
 *
 * @param this
 * @param left
 * @param right
 * @returns
 */
export function times(
  this: FilterContext,
  left: unknown,
  right: unknown
): NumberT {
  checkArguments(arguments.length, 1, 1);
  return parseNumberOrZero(left).times(parseNumberOrZero(right));
}

/**
 *
 * @param value
 * @returns
 */
function parseNumberOrZero(value: unknown): NumberT {
  if (isN(value)) {
    const num = parseNumberT(value);
    return !num.isFinite() ? ZERO : num;
  }
  return ZERO;
}
