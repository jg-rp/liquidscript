import type { RenderContext } from "./context";
import { toLiquid, toLiquidSync, type ContextHint, type DropI } from "./drop";
import { Nothing } from "./runtime";
import { escape } from "./escape";

export class HTMLSafeString implements DropI {
  #s: string;

  constructor(s: string) {
    this.#s = s;
  }

  static from(s: string | HTMLSafeString): HTMLSafeString {
    return s instanceof HTMLSafeString ? s : new HTMLSafeString(s);
  }

  static escape(value: string | HTMLSafeString): HTMLSafeString {
    if (value instanceof HTMLSafeString) return value;
    return new HTMLSafeString(escape(value));
  }

  get [Symbol.toStringTag]() {
    return "HTMLSageString";
  }

  public async [toLiquid](
    hint: ContextHint,
    context: RenderContext,
  ): Promise<unknown> {
    return this[toLiquidSync](hint, context);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public [toLiquidSync](hint: ContextHint, context: RenderContext): unknown {
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
