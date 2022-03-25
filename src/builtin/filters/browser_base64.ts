import { FilterArgumentError } from "../../errors";
import { checkArguments, FilterContext } from "../../filter";
import { liquidStringify } from "../../types";

export function base64Encode(this: FilterContext, left: unknown): string {
  checkArguments(arguments.length, 0);
  return window.btoa(liquidStringify(left));
}

export function base64Decode(this: FilterContext, left: unknown): string {
  checkArguments(arguments.length, 0);
  const _left = liquidStringify(left);
  // Check for valid characters, valid groups size and valid padding.
  if (
    !_left.match(
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
    )
  )
    throw new FilterArgumentError("invalid base64");
  return window.atob(_left);
}

export function base64UrlSafeEncode(
  this: FilterContext,
  left: unknown
): string {
  checkArguments(arguments.length, 0);
  return window.btoa(liquidStringify(left)).replace("+", "-").replace("/", "_");
}

export function base64UrlSafeDecode(
  this: FilterContext,
  left: unknown
): string {
  checkArguments(arguments.length, 0);
  const _left = liquidStringify(left);
  // Check for valid characters, valid groups size and valid padding.
  if (
    !_left.match(
      /^([0-9a-zA-Z\\-_]{4})*(([0-9a-zA-Z\\-_]{2}==)|([0-9a-zA-Z\\-_]{3}=))?$/
    )
  )
    throw new FilterArgumentError("invalid base64");
  return window.atob(_left.replace("-", "+").replace("_", "/"));
}
