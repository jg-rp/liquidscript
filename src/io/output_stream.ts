import { InternalOutputStreamLimitError } from "../errors";

/**
 * An object to which a {@link Tag} can write its rendered content to.
 */
export interface RenderStream {
  /**
   * Write rendered content to the output stream.
   * @param value - Template output text.
   */
  write(value: string): void;

  size?: number;
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

/**
 * A {@link RenderStream} implementation that buffers rendered content in
 * memory and throws an OutputStreamLimitError if bytes written exceed its
 * limit.
 */
export class LimitedRenderStream implements RenderStream {
  public size: number = 0;
  constructor(private limit: number, private buffer: string[] = []) {}

  write(value: string): void {
    if (value.length) {
      this.size += _byteLength(value);
      if (this.size > this.limit) {
        throw new InternalOutputStreamLimitError("output stream limit reached");
      }
    }
    this.buffer.push(value);
  }

  toString(): string {
    return this.buffer.join("");
  }
}

function _byteLength(value: string): number {
  // From https://stackoverflow.com/questions/5515869/string-length-in-bytes-in-javascript
  // returns the byte length of an utf8 string
  let length: number = value.length;
  for (let i = value.length - 1; i >= 0; i--) {
    const code = value.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) length++;
    else if (code > 0x7ff && code <= 0xffff) length += 2;
    if (code >= 0xdc00 && code <= 0xdfff) i--; //trail surrogate
  }
  return length;
}
