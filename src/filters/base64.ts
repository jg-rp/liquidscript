import { ArgumentError } from "../errors";
import type { FilterContext } from "../filter";

const RE_BASE64 =
  /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

const RE_BASE64_URL_SAFE =
  /^([0-9a-zA-Z\\-_]{4})*(([0-9a-zA-Z\\-_]{2}==)|([0-9a-zA-Z\\-_]{3}=))?$/;

export function base64Encode(this: FilterContext, left: unknown): string {
  this.assertArgs(arguments.length, 1);
  const encoder = new TextEncoder();
  const bytes = encoder.encode(this.toString(left, ""));
  return toBase64(bytes, { alphabet: "base64", omitPadding: false });
}

export function base64URLSafeEncode(
  this: FilterContext,
  left: unknown,
): string {
  this.assertArgs(arguments.length, 1);
  const encoder = new TextEncoder();
  const bytes = encoder.encode(this.toString(left, ""));
  return toBase64(bytes, { alphabet: "base64url", omitPadding: false });
}

export function base64Decode(this: FilterContext, left: unknown): string {
  this.assertArgs(arguments.length, 1);
  const left_ = this.toString(left, "");

  if (!left_.match(RE_BASE64)) {
    throw new ArgumentError(
      "invalid base64",
      this.span,
      this.context.template.source,
      this.context.template.name,
    );
  }

  const bytes = fromBase64(left_, {
    alphabet: "base64",
    lastChunkHandling: "strict",
  });

  return new TextDecoder().decode(bytes);
}

export function base64URLSafeDecode(
  this: FilterContext,
  left: unknown,
): string {
  this.assertArgs(arguments.length, 1);
  const left_ = this.toString(left, "");

  if (!left_.match(RE_BASE64_URL_SAFE)) {
    throw new ArgumentError(
      "invalid base64",
      this.span,
      this.context.template.source,
      this.context.template.name,
    );
  }

  const bytes = fromBase64(left_, {
    alphabet: "base64url",
    lastChunkHandling: "strict",
  });

  return new TextDecoder().decode(bytes);
}

export type Base64Alphabet = "base64" | "base64url";

export interface ToBase64Options {
  alphabet?: Base64Alphabet;
  omitPadding?: boolean;
}

export function toBase64(
  bytes: Uint8Array,
  options: ToBase64Options = {},
): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i] as number);
  }

  let base64 = btoa(binary);

  if (options.alphabet === "base64url") {
    base64 = base64.replace(/\+/g, "-").replace(/\//g, "_");
  }

  if (options.omitPadding) {
    base64 = base64.replace(/=+$/, "");
  }

  return base64;
}

export interface FromBase64Options {
  alphabet?: Base64Alphabet;
  lastChunkHandling?: "strict" | "loose";
}

export function fromBase64(
  input: string,
  options: FromBase64Options = {},
): Uint8Array {
  let str = input;

  if (options.alphabet === "base64url") {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
  }

  const missingPadding = str.length % 4;

  if (missingPadding && options.lastChunkHandling === "strict") {
    throw new Error("Invalid base64 length (strict mode)");
  }

  if (missingPadding) {
    str += "=".repeat(4 - missingPadding);
  }

  const binary = atob(str);

  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}
