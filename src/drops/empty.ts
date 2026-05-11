/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RenderContext } from "../context";
import {
  Drop,
  equals,
  toLiquid,
  toLiquidSync,
  type ContextHint,
} from "../drop";
import { isArray, isObject, isString } from "../type_guards";

export class Empty extends Drop {
  override [equals](obj: unknown, context: RenderContext): boolean {
    if (obj instanceof Empty) return true;
    if (obj === null) return false;
    if (isString(obj) || isArray(obj)) return !obj.length;
    if (obj instanceof Map || obj instanceof Set) return obj.size === 0;
    if (isObject(obj)) {
      for (const i in obj) return false;
      return true;
    }
    return false;
  }

  override async [toLiquid](
    hint: ContextHint,
    context?: RenderContext,
  ): Promise<unknown> {
    return this[toLiquidSync](hint, context);
  }

  override [toLiquidSync](hint: ContextHint, context?: RenderContext): unknown {
    switch (hint) {
      case "string":
      case "data":
        return "";
      default:
        return this;
    }
  }

  override toString(): string {
    return "";
  }
}

export const EMPTY = new Empty();
