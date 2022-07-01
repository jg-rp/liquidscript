/**
 * Construct a new `Range` object, a lazy sequence of integer.
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
    this.start = Math.trunc(start);
    this.stop = Math.trunc(stop);
    this.length = this.stop - this.start + 1;
  }

  public *[Symbol.iterator](): Iterator<number> {
    // Ranges are inclusive of stop.
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
