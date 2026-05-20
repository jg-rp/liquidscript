// This interface was initially modelled on a plain olf Array, but benchmarks
// show string concatenation to be significantly faster than Array.push and
// Array.join.

export interface OutputBuffer {
  push(value: string): void;
  join(separator: string): string;
  length: number;
}

export type BufferFactory = () => OutputBuffer;

export class StringOutputBuffer implements OutputBuffer {
  #buf: string = "";

  join(separator: string): string {
    return this.#buf;
  }

  push(value: string): void {
    this.#buf += value;
  }

  get length(): number {
    // Two bytes per UTF-16 code unit should be close enough.
    return this.#buf.length * 2;
  }
}

export const stringOutputBufferFactory = () => new StringOutputBuffer();
