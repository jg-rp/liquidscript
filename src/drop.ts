/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RenderContext } from "./context";
import { Nothing } from "./runtime";

/**
 * Drop type coercion hints.
 */
export type ContextHint = "data" | "numeric" | "string" | "boolean";

export const toLiquid = Symbol.for("liquid.drop");
export const toLiquidSync = Symbol.for("liquid.drop.sync");

export const isInvocable = Symbol.for("liquid.drop.invocable");

export const dispatch = Symbol.for("liquid.drop.dispatch");
export const dispatchSync = Symbol.for("liquid.drop.dispatch.sync");

export const equals = Symbol.for("liquid.drop.equals");

export const length = Symbol.for("liquid.drop.length");
export const lengthSync = Symbol.for("liquid.drop.length.sync");
export const slice = Symbol.for("liquid.drop.slice");
export const sliceSync = Symbol.for("liquid.drop.slice.sync");

export const contains = Symbol.for("liquid.drop.contains");
export const containsSync = Symbol.for("liquid.drop.contains.sync");

export const lessThan = Symbol.for("liquid.drop.lessThan");
export const lessThanSync = Symbol.for("liquid.drop.lessThan.sync");

export abstract class Drop {
  async [toLiquid](
    hint: ContextHint,
    context: RenderContext,
  ): Promise<unknown> {
    return this[toLiquidSync](hint, context);
  }

  [toLiquidSync](hint: ContextHint, context: RenderContext): unknown {
    switch (hint) {
      case "string":
        return "";
      case "boolean":
        return false;
      case "data":
        return null;
      case "numeric":
        return 0;
    }
  }

  [isInvocable](name: string): boolean {
    return false;
  }

  async [dispatch](name: string, context: RenderContext): Promise<unknown> {
    return this[dispatchSync](name, context);
  }

  [dispatchSync](name: string, context: RenderContext): unknown {
    return Nothing;
  }

  [equals](obj: unknown, context: RenderContext): boolean {
    return false;
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<unknown, void, void> {}

  *[Symbol.iterator](): Iterator<unknown> {}

  [length](): number {
    return 0;
  }

  async [slice](
    offset?: number,
    limit?: number,
    reversed?: boolean,
  ): Promise<Drop> {
    return this;
  }

  [sliceSync](offset?: number, limit?: number, reversed?: boolean): Drop {
    return this;
  }

  async [contains](obj: unknown, context: RenderContext): Promise<boolean> {
    return this[containsSync](obj, context);
  }

  [containsSync](obj: unknown, context: RenderContext): boolean {
    return false;
  }

  async [lessThan](obj: unknown, context: RenderContext): Promise<boolean> {
    return this[lessThanSync](obj, context);
  }

  [lessThanSync](obj: unknown, context: RenderContext): boolean {
    return false;
  }

  toString(): string {
    return "";
  }
}
