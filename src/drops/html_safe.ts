import { Drop, toLiquid, toLiquidSync, type ContextHint } from "../drop";
import { Nothing } from "../runtime";
import { escape } from "../escape";

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
}
