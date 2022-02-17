import { isLiquidPrimitive, liquidValueOf } from "./drop";
import { FALSE } from "./expression";
import { isNumberT, NumberT } from "./number";

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isSymbol(value: unknown): value is symbol {
  return typeof value === "symbol";
}

export function isArray(value: unknown): value is Array<unknown> {
  return Object.prototype.toString.call(value) === "[object Array]"
    ? true
    : false;
}

export function isObject(value: unknown): value is object {
  const _type = typeof value;
  return (value !== null && _type === "object") || _type === "function"
    ? true
    : false;
}

export function isPropertyKey(value: unknown): value is PropertyKey {
  const _type = typeof value;
  return _type === "string" || _type === "number" || _type === "symbol"
    ? true
    : false;
}

export function isNumber(value: unknown): value is number | NumberT {
  return typeof value === "number" || isNumberT(value);
}

export function isPrimitiveNumber(value: unknown): value is number {
  return typeof value === "number";
}

export function isPrimitiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value);
}

export function isComparable(
  value: unknown
): value is number | NumberT | string {
  return isNumber(value) || isString(value);
}

export function toLiquidString(obj: unknown): string {
  if (obj === null) {
    return "";
  }

  // TODO: Arrays, ranges, auto escape

  return String(obj);
}

export function isIterable(value: unknown): value is Iterable<unknown> {
  return isObject(value) ? Symbol.iterator in value : false;
}

export function isLiquidTruthy(obj: unknown): boolean {
  if (isLiquidPrimitive(obj)) obj = obj[liquidValueOf]();
  return obj === false || FALSE.equals(obj) || obj === undefined || obj === null
    ? false
    : true;
}
