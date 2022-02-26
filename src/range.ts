/**
 *
 * @param stop
 */
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
  readonly start: number;
  readonly stop: number;

  constructor(start: number, stop: number) {
    // TODO: slice.
    // TODO: join.
    this.start = Math.trunc(start);
    this.stop = Math.trunc(stop);
    this.length = this.stop - this.start + (this.start === this.stop ? 0 : 1);
  }

  public *[Symbol.iterator](): Iterator<number> {
    // TODO: Store the first X Integer objects as constants? or
    // maintain an Integer and Float object pool?
    for (let i = this.start; i <= this.stop; i++) yield i;
  }

  public equals(other: unknown): boolean {
    return (
      other instanceof Range &&
      this.start === other.start &&
      this.stop === other.stop
    );
  }

  public toString(): string {
    return `${this.start}..${this.stop}`;
  }
}
