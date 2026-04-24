import type { RenderContext } from "../context";
import {
  equals,
  toLiquid,
  toLiquidSync,
  type ContextHint,
  type Drop,
  type EqualityDrop,
} from "../drop";
import { isArray, isObject, isString } from "../type_guards";

export class Empty implements Drop, EqualityDrop {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [toLiquidSync](hint: ContextHint, context?: RenderContext): unknown {
    switch (hint) {
      case "string":
      case "data":
        return "empty";
      default:
        return this;
    }
  }

  async [toLiquid](
    hint: ContextHint,
    context?: RenderContext,
  ): Promise<unknown> {
    return this[toLiquidSync](hint, context);
  }

  toString(): string {
    return "empty";
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [equals](obj: unknown, context: RenderContext): boolean {
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
}

export const EMPTY = new Empty();
