import { isNumberT, NumberT } from "./number";

export function isString(value: unknown): value is string {
  return typeof value === "string";
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

export function toLiquidString(obj: unknown): string {
  if (obj === null) {
    return "";
  }

  // TODO: Arrays, ranges, auto escape

  return String(obj);
}

export function isIterable(obj: object): obj is Iterable<unknown> {
  return Symbol.iterator in obj;
}
