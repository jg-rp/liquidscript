import { FilterArgumentError } from "../../errors";
import { checkArguments, FilterContext } from "../../filter";
import { isN, isNumberT, NumberT, parseNumberT, ZERO } from "../../number";
import { isUndefined } from "../../types";

/**
 * Return the absolute value of a number. Given a value that can't be cast to
 * an integer or float, `0` will be returned.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. If it can't be converted to a number, zero will be
 * used instead.
 * @returns - The absolute value of the input argument.
 */
export function abs(this: FilterContext, left: unknown): NumberT {
  checkArguments(arguments.length, 0);
  return parseNumberOrZero(left).abs();
}

/**
 * Return the maximum of the filter's input value and its argument. If either
 * input value or argument are string representations of an integer or float,
 * they will be cast to an integer or float prior to comparison.
 *
 * If either input value or argument can not be cast to an integer or float,
 * `0` will be used instead.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. If it can't be converted to a number, zero will be
 * used instead.
 * @param arg - Any value. If it can't be converted to a number, zero will be
 * used instead.
 * @returns The maximum of the input value and the argument value.
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
 * Return the minimum of the filter's input value and its argument. If either
 * input value or argument are string representations of an integer or float,
 * they will be cast to an integer or float prior to comparison.
 *
 * If either input value or argument can not be cast to an integer or float,
 * `0` will be used instead.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. If it can't be converted to a number, zero will be
 * used instead.
 * @param arg - Any value. If it can't be converted to a number, zero will be
 * used instead.
 * @returns The minimum of the input value and the argument value.
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
 * Round the input value up to the nearest whole number. The input value will
 * be converted to a number if it is not an integer or float.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. If it can't be converted to a number, zero will be
 * used instead.
 * @returns The input value rounded up to the nearest whole number.
 */
export function ceil(this: FilterContext, left: unknown): NumberT {
  checkArguments(arguments.length, 0);
  return parseNumberOrZero(left).ceil();
}

/**
 * Divide the input value by the argument value, rounded down to the nearest
 * whole number if the divisor is an integer.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. If it can't be converted to a number, zero will be
 * used instead.
 * @param divisor - Any value. If it can't be converted to a number an
 * exception will be raised.
 * @returns The input value divided by the argument value.
 * @throws {@link FilterArgumentError}
 * Thrown if the divisor is zero or can't be converted to a number.
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
 * Round the input value down to the nearest whole number. The input value will
 * be converted to a number if it is not an integer or float.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. If it can't be converted to a number, zero will be
 * used instead.
 * @returns The input value rounded down to the nearest whole number.
 */
export function floor(this: FilterContext, left: unknown): NumberT {
  checkArguments(arguments.length, 0);
  return parseNumberOrZero(left).floor();
}

/**
 * Subtract the argument value from the input value. If either the input or
 * argument are not a number, they will be convert to a number. If that
 * conversion fails, `0` is used instead.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left -Any value. If it can't be converted to a number, zero will be
 * used instead.
 * @param right - Any value. If it can't be converted to a number, zero will be
 * used instead.
 * @returns The result of subtracting the argument value from the input value.
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
 * Return the remainder from the division of the input value by the argument
 * value.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. If it can't be converted to a number, zero will be
 * used instead.
 * @param right - Any value. If it can't be converted to a number an exception
 * will be raised.
 * @returns the remainder from the division of the input value by the argument
 * value.
 * @throws {@link FilterArgumentError}
 * Thrown if the argument is zero or can't be converted to a number.
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
 * Add one number to another. If either the input or argument are not a number,
 * they will be to convert to a number. If that conversion fails, `0` is used
 * instead.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. If it can't be converted to a number, zero will be
 * used instead.
 * @param right - Any value. If it can't be converted to a number, zero will be
 * used instead.
 * @returns The result of adding the input value to the argument value.
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
 * Return the input number rounded to the given number of decimal places.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. If it can't be converted to a number, zero will be
 * used instead.
 * @param decimalPlaces - Any value. If it can't be converted to a number, zero
 * will be used instead. Defaults to `0`.
 * @returns The input number rounded to the given number of decimal places
 */
export function round(
  this: FilterContext,
  left: unknown,
  decimalPlaces?: unknown
): NumberT {
  checkArguments(arguments.length, 1);

  if (decimalPlaces === undefined || isUndefined(decimalPlaces)) {
    return parseNumberOrZero(left).round();
  }

  const _decimalPlaces = Number(decimalPlaces);
  if (!isFinite(_decimalPlaces)) {
    return parseNumberOrZero(left).round();
  }

  if (_decimalPlaces < 0) {
    return ZERO;
  }

  if (_decimalPlaces === 0) {
    return parseNumberOrZero(left).round();
  }

  return parseNumberOrZero(left).round(Math.round(_decimalPlaces));
}

/**
 * Return the product of the input number and the argument number. If either
 * the input or argument are not a number, they will be convert to a number. If
 * that conversion fails, `0` is used instead.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. If it can't be converted to a number, zero will be
 * used instead.
 * @param right - Any value. If it can't be converted to a number, zero will be
 * used instead.
 * @returns The product of the input number and the argument number
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
 * A utility function that converts a value to a number. Returns `0` if the
 * input value can't be converted to a number.
 */
export function parseNumberOrZero(value: unknown): NumberT {
  // XXX: See https://github.com/jg-rp/liquid/issues/49
  if (isN(value)) {
    const num = parseNumberT(value);
    return !isNumberT(num) || !num.isFinite() ? ZERO : num;
  }
  return ZERO;
}
