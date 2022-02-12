import { Integer } from "./number";

export function range(stop: number): Range;
export function range(start: number, stop: number): Range;
export function range(...args: number[]): Range {
  let start = 0;
  let stop: number;
  if (args.length === 2) {
    [start, stop] = args;
  } else {
    [stop] = args;
  }
  return new Range(start, stop);
}

export class Range implements Iterable<number> {
  readonly length: number;

  constructor(readonly start: number, readonly stop: number) {
    // TODO: slice.
    // TODO: join.
    this.length = this.stop - this.start + 1;
  }

  *[Symbol.iterator](): Iterator<number> {
    // TODO: Store the first X Integer objects as constants? or
    // maintain an Integer and Float object pool?
    for (let i = this.start; i <= this.stop; i++) yield i;
  }

  toString(): string {
    return `${this.start}..${this.stop}`;
  }
}
