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
import { Undefined } from "./undefined";

export class Blank extends Drop {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override [equals](obj: unknown, context: RenderContext): boolean {
    if (obj instanceof Empty || obj instanceof Blank) return false;
    if (
      obj === null ||
      obj === false ||
      obj === undefined ||
      obj instanceof Undefined
    )
      return true;
    if (isString(obj)) return !obj.trim().length;
    if (isArray(obj)) return !obj.length;
    if (isObject(obj)) {
      // eslint-disable-next-line sonarjs/no-unused-vars
      for (const _ in obj) return false;
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
