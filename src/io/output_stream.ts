export interface RenderStream {
  write(value: string): void;
}

export class DefaultOutputStream implements RenderStream {
  constructor(private buffer: string[] = []) {}

  write(value: string): void {
    this.buffer.push(value);
  }

  toString(): string {
    return this.buffer.join("");
  }
}
