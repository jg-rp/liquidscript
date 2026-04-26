import type { RenderContext } from "../context";
import { Drop, toLiquid, toLiquidSync, type ContextHint } from "../drop";
import { Nothing } from "../runtime";
import { escape } from "../escape";

export class HTMLSafeString extends Drop {
  #s: string;

  constructor(s: string) {
    super();
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

  public override async [toLiquid](
    hint: ContextHint,
    context: RenderContext,
  ): Promise<unknown> {
    return this[toLiquidSync](hint, context);
  }

  public override [toLiquidSync](
    hint: ContextHint,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: RenderContext,
  ): unknown {
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
