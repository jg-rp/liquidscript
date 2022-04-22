/**
 * An object to which a {@link Tag} can write its rendered content to.
 */
export interface RenderStream {
  /**
   * Write rendered content to the output stream.
   * @param value - Template output text.
   */
  write(value: string): void;
}

/**
 * A {@link RenderStream} implementation that buffers rendered content
 * in memory.
 */
export class BufferedRenderStream implements RenderStream {
  constructor(private buffer: string[] = []) {}

  write(value: string): void {
    this.buffer.push(value);
  }

  toString(): string {
    return this.buffer.join("");
  }
}
