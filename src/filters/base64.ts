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
  return bytes.toBase64({ alphabet: "base64", omitPadding: false });
}

export function base64URLSafeEncode(
  this: FilterContext,
  left: unknown,
): string {
  this.assertArgs(arguments.length, 1);
  const encoder = new TextEncoder();
  const bytes = encoder.encode(this.toString(left, ""));
  return bytes.toBase64({ alphabet: "base64url", omitPadding: false });
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

  const bytes = Uint8Array.fromBase64(left_, {
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

  const bytes = Uint8Array.fromBase64(left_, {
    alphabet: "base64url",
    lastChunkHandling: "strict",
  });

  return new TextDecoder().decode(bytes);
}
