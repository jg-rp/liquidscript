import type { RenderContext } from "../context.js";

import { Drop, equals, toLiquid, toLiquidSync, type ContextHint } from "../drop.js";
import { isArray, isObject, isString } from "../type_guards.js";
import { Empty } from "./empty.js";
import { Undefined } from "./undefined.js";

export class Blank extends Drop {
  override [equals](obj: unknown, context: RenderContext): boolean {
    if (obj instanceof Empty || obj instanceof Blank) return false;
    if (obj === null || obj === false || obj === undefined || obj instanceof Undefined) return true;
    if (isString(obj)) return !obj.trim().length;
    if (isArray(obj)) return !obj.length;
    if (isObject(obj)) {
      for (const _ in obj) return false;
      return true;
    }
    return false;
  }

  override async [toLiquid](hint: ContextHint, context?: RenderContext): Promise<unknown> {
    return this[toLiquidSync](hint, context);
  }

  override [toLiquidSync](hint: ContextHint, context?: RenderContext): unknown {
    switch (hint) {
      case "string":
      case "data":
        return "";
      case "numeric":
        return 0;
      default:
        return this;
    }
  }

  override toString(): string {
    return "";
  }
}

export const BLANK = new Blank();
