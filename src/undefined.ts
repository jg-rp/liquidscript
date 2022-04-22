import { liquidDispatch, liquidDispatchSync, toLiquidPrimitive } from "./drop";
import { InternalUndefinedError } from "./errors";

/**
 * The base class for objects wrapping undefined variables found in
 * Liquid templates.
 */
export abstract class Undefined {
  /**
   * Create a new `Undefined` object.
   *
   * @param name - The name of the undefined variable.
   * @param object - The target object which does not have a property
   * with the given name.
   * @param hint - Optionally override the default "undefined" message.
   */
  constructor(
    readonly name: string,
    readonly object?: unknown,
    readonly hint?: string
  ) {}

  public toString(): string {
    return `Undefined(${this.name})`;
  }

  /**
   * Prompt the undefined type to throw an error.
   */
  public poke(): void {
    this.toString();
  }
}

/**
 * An {@link Undefined} type that throws an error whenever it appears
 * in a Liquid expression.
 */
export class StrictUndefined extends Undefined {
  static from(name: string): StrictUndefined {
    return new StrictUndefined(name);
  }

  public toString(): string {
    throw new InternalUndefinedError(this.name);
  }

  public poke(): void {
    throw new InternalUndefinedError(this.name);
  }

  public valueOf() {
    throw new InternalUndefinedError(this.name);
  }

  public [Symbol.iterator](): Iterator<unknown> {
    throw new InternalUndefinedError(this.name);
  }

  public [toLiquidPrimitive]() {
    throw new InternalUndefinedError(this.name);
  }

  public async [liquidDispatch]() {
    throw new InternalUndefinedError(this.name);
  }
  public [liquidDispatchSync]() {
    throw new InternalUndefinedError(this.name);
  }

  get first() {
    throw new InternalUndefinedError(this.name);
  }

  get last() {
    throw new InternalUndefinedError(this.name);
  }

  get size() {
    throw new InternalUndefinedError(this.name);
  }
}

/**
 * An {@link Undefined} type that evaluates to an empty string or `0`,
 * and can be indexed and iterated over without error.
 */
export class LaxUndefined extends Undefined {
  static from(name: string): LaxUndefined {
    return new LaxUndefined(name);
  }

  public toString() {
    return "";
  }

  public poke(): void {
    return;
  }

  public valueOf() {
    return "";
  }

  public async [liquidDispatch]() {
    return this;
  }
  public [liquidDispatchSync]() {
    return this;
  }

  public [Symbol.iterator](): Iterator<unknown> {
    return [].values();
  }

  public [Symbol.toPrimitive](hint: string) {
    if (hint === "number") {
      return 0;
    }
    if (hint === "string") {
      return "";
    }
    return null;
  }

  get first() {
    return this;
  }

  get last() {
    return this;
  }

  get size() {
    return this;
  }
}

/**
 * An {@link Undefined} type that will evaluate to `false` in a boolean
 * expression and throw an error when iterated, output or when accessing
 * its properties.
 */
export class FalsyStrictUndefined extends Undefined {
  static from(name: string): FalsyStrictUndefined {
    return new FalsyStrictUndefined(name);
  }

  public toString(): string {
    throw new InternalUndefinedError(this.name);
  }

  public poke(): void {
    throw new InternalUndefinedError(this.name);
  }

  public valueOf() {
    throw new InternalUndefinedError(this.name);
  }

  public [Symbol.iterator](): Iterator<unknown> {
    throw new InternalUndefinedError(this.name);
  }

  public async [liquidDispatch]() {
    throw new InternalUndefinedError(this.name);
  }
  public [liquidDispatchSync]() {
    throw new InternalUndefinedError(this.name);
  }

  get first() {
    throw new InternalUndefinedError(this.name);
  }

  get last() {
    throw new InternalUndefinedError(this.name);
  }

  get size() {
    throw new InternalUndefinedError(this.name);
  }
}
