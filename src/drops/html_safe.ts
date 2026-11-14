import type { RenderContext } from "../context.js";

import { Drop, toHTMLSafeStringSync, toLiquid, toLiquidSync, type ContextHint } from "../drop.js";
import { escape } from "../escape.js";
import { Nothing } from "../runtime.js";

/**
 * A string wrapper class used to indicate that the wrapped string is safe for
 * output in an HTML document.
 *
 * By "safe" we mean the wrapped string is trusted or has already been escaped.
 */
export class HTMLSafeString extends Drop {
  #s: string;

  constructor(s: string) {
    super();
    this.#s = s;
  }

  static escape(value: string | HTMLSafeString): HTMLSafeString {
    if (value instanceof HTMLSafeString) return value;
    return new HTMLSafeString(escape(value));
  }

  static from(s: string | HTMLSafeString): HTMLSafeString {
    return s instanceof HTMLSafeString ? s : new HTMLSafeString(s);
  }

  get [Symbol.toStringTag]() {
    return "HTMLSafeString";
  }

  override async [toLiquid](hint: ContextHint): Promise<unknown> {
    return this[toLiquidSync](hint);
  }

  override [toLiquidSync](hint: ContextHint): unknown {
    switch (hint) {
      case "string":
      case "data":
        return this.#s;
      case "boolean":
      case "numeric":
        return Nothing;
      default:
        return Nothing;
    }
  }

  override [toHTMLSafeStringSync](context: RenderContext): string {
    return this.#s;
  }

  override valueOf(): string {
    return this.#s;
  }
}
