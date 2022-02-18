import { FilterArgumentError } from "../../errors";
import { FilterContext } from "../../filter";
import { isN, NumberT, parseNumberT, ZERO } from "../../number";

// TODO: test NaN and Inf

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function abs(this: FilterContext, left: unknown): NumberT {
  if (arguments.length > 1)
    throw new FilterArgumentError(
      `abs: too many arguments, expected 0, found ${arguments.length - 1}`
    );
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
  if (arguments.length < 2)
    throw new FilterArgumentError("at_least: missing argument");
  if (arguments.length > 2)
    throw new FilterArgumentError(
      `at_least: too many arguments, expected 1, found ${arguments.length - 1}`
    );

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
  if (arguments.length < 2)
    throw new FilterArgumentError("at_most: missing argument");
  if (arguments.length > 2)
    throw new FilterArgumentError(
      `at_most: too many arguments, expected 1, found ${arguments.length - 1}`
    );

  return parseNumberOrZero(left).min(parseNumberOrZero(arg));
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function ceil(this: FilterContext, left: unknown): NumberT {
  if (arguments.length > 1)
    throw new FilterArgumentError(
      `ceil: too many arguments, expected 0, found ${arguments.length - 1}`
    );
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
  if (arguments.length < 2)
    throw new FilterArgumentError("divided_by: missing argument");
  if (arguments.length > 2)
    throw new FilterArgumentError(
      `divided_by: too many arguments, expected 1, found ${
        arguments.length - 1
      }`
    );

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
  if (arguments.length > 1)
    throw new FilterArgumentError(
      `floor: too many arguments, expected 0, found ${arguments.length - 1}`
    );
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
  if (arguments.length < 2)
    throw new FilterArgumentError("minus: missing argument");
  if (arguments.length > 2)
    throw new FilterArgumentError(
      `minus: too many arguments, expected 1, found ${arguments.length - 1}`
    );

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
  if (arguments.length < 2)
    throw new FilterArgumentError("modulo: missing argument");
  if (arguments.length > 2)
    throw new FilterArgumentError(
      `modulo: too many arguments, expected 1, found ${arguments.length - 1}`
    );

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
  if (arguments.length < 2)
    throw new FilterArgumentError("plus: missing argument");
  if (arguments.length > 2)
    throw new FilterArgumentError(
      `plus: too many arguments, expected 1, found ${arguments.length - 1}`
    );

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
  if (arguments.length < 2)
    throw new FilterArgumentError("times: missing argument");
  if (arguments.length > 2)
    throw new FilterArgumentError(
      `times: too many arguments, expected 1, found ${arguments.length - 1}`
    );
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

/**
 *
 * @param value
 * @returns
 */
function parseNumberOrThrow(value: unknown): NumberT {
  if (isN(value)) {
    const num = parseNumberT(value);
    if (num.isFinite()) return num;
  }
  throw new FilterArgumentError(`could not coerce '${value}' to a number`);
}
