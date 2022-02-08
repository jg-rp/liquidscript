import { InternalUndefinedError } from "./errors";

export abstract class Undefined {
  constructor(
    readonly name: string,
    readonly object?: unknown,
    readonly hint?: string
  ) {}
}

export class StrictUndefined extends Undefined {
  toString() {
    throw new InternalUndefinedError(this.name);
  }

  valueOf() {
    throw new InternalUndefinedError(this.name);
  }
}
