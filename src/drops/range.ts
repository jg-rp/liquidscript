import type { RenderContext } from "../context";
import { type ContextHint, Drop } from "../drop";
import { Nothing } from "../runtime";
import * as drop from "../drop";

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

export class Range extends Drop implements Iterable<number> {
  protected length: number;
  readonly start: number;
  readonly stop: number;
  protected step: number = 1;

  constructor(start: number, stop: number) {
    super();
    this.start = Math.trunc(start);
    this.stop = Math.trunc(stop);
    this.length = this.stop < this.start ? 0 : this.stop - this.start + 1;
  }

  public override *[Symbol.iterator](): Iterator<number> {
    // Ranges are inclusive of stop.
    for (let i = this.start; i <= this.stop; i += this.step) yield i;
  }

  public override [drop.equals](other: unknown): boolean {
    return (
      other instanceof Range &&
      this.start === other.start &&
      this.stop === other.stop
    );
  }

  public override toString(): string {
    return `${this.start}..${this.stop}`;
  }

  public override async [drop.toLiquid](
    hint: ContextHint,
    context: RenderContext,
  ): Promise<unknown> {
    return this[drop.toLiquidSync](hint, context);
  }

  public override [drop.toLiquidSync](
    hint: ContextHint,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: RenderContext,
  ): unknown {
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

  public override [drop.length]() {
    return this.length;
  }

  public override [drop.sliceSync](
    offset?: number,
    limit?: number,
    reversed?: boolean,
  ): Range {
    if (this.length === 0) {
      return EMPTY_RANGE;
    }

    if (offset === undefined && limit === undefined) {
      return reversed ? new DescendingRange(this.stop, this.start) : this;
    }

    let start = this.start;
    let stop = this.stop;

    if (offset !== undefined) {
      start += offset;
    }

    if (limit !== undefined) {
      stop = limit + start - 1;
    }

    return reversed ? new DescendingRange(stop, start) : new Range(start, stop);
  }
}

export const EMPTY_RANGE = new Range(0, 0);

class DescendingRange extends Range {
  protected override step: number = -1;

  constructor(start: number, stop: number) {
    super(start, stop);
    this.length = Math.abs(this.start - this.stop);
  }
}
