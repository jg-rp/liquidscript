import { InternalUndefinedError } from "./errors";

export abstract class Undefined {
  constructor(
    readonly name: string,
    readonly object?: unknown,
    readonly hint?: string
  ) {}
}

export class StrictUndefined extends Undefined {
  public toString() {
    throw new InternalUndefinedError(this.name);
  }

  public valueOf() {
    throw new InternalUndefinedError(this.name);
  }

  public [Symbol.iterator](): Iterator<unknown> {
    throw new InternalUndefinedError(this.name);
  }
}

export class LaxUndefined extends Undefined {
  public toString() {
    return "";
  }

  public valueOf() {
    return "";
  }

  public [Symbol.iterator](): Iterator<unknown> {
    return [].values();
  }
}
