import { FilterArgumentError } from "../../errors";
import { checkArguments, FilterContext } from "../../filter";
import { liquidStringify } from "../../types";

export function base64Encode(this: FilterContext, left: unknown): string {
  checkArguments(arguments.length, 0);
  return Buffer.from(liquidStringify(left)).toString("base64");
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
  return Buffer.from(_left, "base64").toString();
}

export function base64UrlSafeEncode(
  this: FilterContext,
  left: unknown
): string {
  checkArguments(arguments.length, 0);
  // don't use "base64url" encoding, we want to keep the padding
  return Buffer.from(liquidStringify(left))
    .toString("base64")
    .replace("+", "-")
    .replace("/", "_");
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
  // don't use "base64url" encoding, we want to keep the padding
  return Buffer.from(
    _left.replace("-", "+").replace("_", "/"),
    "base64"
  ).toString();
}
