import type { RenderContext } from "../context";
import {
  Drop,
  equals,
  toLiquid,
  toLiquidSync,
  type ContextHint,
} from "../drop";
import { isArray, isObject, isString } from "../type_guards";
import { Empty } from "./empty";

export class Blank extends Drop {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override [toLiquidSync](hint: ContextHint, context?: RenderContext): unknown {
    switch (hint) {
      case "string":
      case "data":
        return "";
      default:
        return this;
    }
  }

  override async [toLiquid](
    hint: ContextHint,
    context?: RenderContext,
  ): Promise<unknown> {
    return this[toLiquidSync](hint, context);
  }

  override toString(): string {
    return "";
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override [equals](obj: unknown, context: RenderContext): boolean {
    if (obj instanceof Empty || obj instanceof Blank) return false;
    if (obj === null) return true;
    if (isString(obj)) return !obj.trim().length;
    if (isArray(obj)) return !obj.length;
    if (isObject(obj)) {
      for (const i in obj) return false;
      return true;
    }
    return false;
  }
}

export const BLANK = new Blank();
