export interface OutputBuffer {
  push(value: string): void;
  join(separator: string): string;
  length: number;
}

export type BufferFactory = () => OutputBuffer;

/**
 * An output buffer that keeps track of its size in bytes.
 */
export class SizedOutputBuffer implements OutputBuffer {
  #buf: string[] = [];

  length: number = 0;

  join(separator: string): string {
    return this.#buf.join(separator);
  }

  push(value: string): void {
    // Two bytes per UTF-16 code unit should be close enough.
    this.length += value.length * 2;
    this.#buf.push(value);
  }
}

export const sizedOutputBufferFactory = () => new SizedOutputBuffer();
