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
import { Empty } from "./empty";

export class Blank implements Drop, EqualityDrop {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [toLiquidSync](hint: ContextHint, context?: RenderContext): unknown {
    switch (hint) {
      case "string":
      case "data":
        return "blank";
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
    return "blank";
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [equals](obj: unknown, context: RenderContext): boolean {
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
