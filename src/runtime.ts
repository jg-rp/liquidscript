import type { RenderContext } from "./context";
import {
  equals,
  toLiquid,
  toLiquidSync,
  type ContextHint,
  type Drop,
  type EqualityDrop,
} from "./drop";

/**
 * The special value `Nothing` indicates the absence of a value. It is
 * deliberately distinct from `null` or `undefined` (a property can exist
 * and be given the value `undefined`).
 */
export const Nothing = Symbol.for("liquid.context.nothing");

export function isNothing(obj: unknown): boolean {
  // TODO: Nothing type
  // TODO: type guard
  return obj === Nothing;
}

export function range(stop: number): Range;
export function range(start: number, stop: number): Range;
export function range(...args: number[]): Range {
  let start = 0;
  let stop: number;

  if (args.length === 2) {
    start = args[0] as number;
    stop = args[1] as number;
  } else {
    stop = args[0] as number;
  }
  return new Range(start, stop);
}

export class Range implements Iterable<number>, Drop, EqualityDrop {
  readonly length: number;
  readonly start: number;
  readonly stop: number;

  constructor(start: number, stop: number) {
    this.start = Math.trunc(start);
    this.stop = Math.trunc(stop);
    this.length = this.stop - this.start + 1;
  }

  public *[Symbol.iterator](): Iterator<number> {
    // Ranges are inclusive of stop.
    for (let i = this.start; i <= this.stop; i++) yield i;
  }

  public [equals](other: unknown): boolean {
    return (
      other instanceof Range &&
      this.start === other.start &&
      this.stop === other.stop
    );
  }

  public toString(): string {
    return `${this.start}..${this.stop}`;
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
        return this.toString();
      case "data":
        return Array.from({ length: this.length }, (_, i) => this.start + i);
      case "boolean":
        return this.length > 0;
      case "numeric":
        return Nothing;
      default:
        return Nothing;
    }
  }
}
