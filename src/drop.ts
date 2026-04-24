import type { RenderContext } from "./context";
import { isObject } from "./type_guards";

/**
 * Symbols that specify function valued properties defining a "Drop" - a
 * user-defined extension type.
 */
export const toLiquid = Symbol.for("liquid.drop");
export const toLiquidSync = Symbol.for("liquid.drop.sync");

/**
 * Drop type coercion hints.
 */
export type ContextHint = "data" | "numeric" | "string" | "boolean";

/**
 * An object with `[toLiquid]` and `[toLiquidSync]` properties is a "Drop".
 */
export interface Drop {
  [toLiquid](hint: ContextHint, context: RenderContext): Promise<unknown>;
  [toLiquidSync](hint: ContextHint, context: RenderContext): unknown;
}

/**
 * A type guard for the basic Drop interface. Drops may implement additional
 * protocols for interaction with equality operators, ordering operators and
 * variable/path resolution.
 */
export function isDrop(obj: unknown): obj is Drop {
  return isObject(obj) && toLiquid in obj && toLiquidSync in obj;
}

/**
 * A symbol specifying a function valued property. Liquid calls `[isInvocable]`
 * to test method names against a set of whitelist. Only when `[isInvocable]`
 * returns `true` can a drop method be called.
 */
export const isInvocable = Symbol.for("liquid.drop.invocable");

/**
 * A Drop interface for whitelisting methods.
 */
export interface InvocableDrop {
  [isInvocable](name: string): boolean;
}

/**
 * A type predicate for the `InvocableDrop` interface.
 */
export function isInvocableDrop(obj: unknown): obj is InvocableDrop {
  return isObject(obj) && isInvocable in obj;
}

/**
 * Symbols that specify function valued properties used as a catch-all for
 * missing drop methods.
 */
export const dispatch = Symbol.for("liquid.drop.dispatch");
export const dispatchSync = Symbol.for("liquid.drop.dispatch.sync");

/**
 * A Drop interface for catching and handling unknown property names.
 */
export interface DispatchingDrop {
  [dispatch](name: string, context: RenderContext): Promise<unknown>;
  [dispatchSync](name: string, context: RenderContext): unknown;
}

/**
 * A type predicate for the `DispatchingDrop` interface.
 */
export function isDispatchingDrop(obj: unknown): obj is DispatchingDrop {
  return isObject(obj) && dispatch in obj && dispatchSync in obj;
}

/**
 * A symbol specifying a function valued property. Liquid calls `[equals]`
 * on object that implement the equality Drop protocol when comparing
 * objects for equality.
 */
export const equals = Symbol.for("liquid.drop.equals");

export interface EqualityDrop {
  [equals](obj: unknown, context: RenderContext): boolean;
}

/**
 * A type guard for the `isEqualityDrop` interface.
 */
export function isEqualityDrop(obj: unknown): obj is EqualityDrop {
  return isObject(obj) && equals in obj;
}

// TODO: async and sync?
export const iterate = Symbol.for("liquid.drop.iterate");
export const length = Symbol.for("liquid.drop.length");
export const slice = Symbol.for("liquid.drop.slice");

export interface SequenceDrop {
  [iterate](): Iterable<unknown>;
  [length](): number;
  [slice](offset?: number, limit?: number, reversed?: boolean): SequenceDrop;
}

export function isSequenceDrop(obj: unknown): obj is SequenceDrop {
  return isObject(obj) && iterate in obj && length in obj && slice in obj;
}
