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
    // Two bytes per UTF-16 code unit should be close enough.
    // this.length += value.length * 2;
    this.#buf += value;
  }

  get length(): number {
    return this.#buf.length * 2;
  }
}

export const stringOutputBufferFactory = () => new StringOutputBuffer();
