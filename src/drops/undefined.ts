/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RenderContext } from "../context";
import {
  dispatchSync,
  Drop,
  equals,
  length,
  sliceSync,
  toLiquidSync,
  type ContextHint,
} from "../drop";
import { UndefinedVariableError } from "../errors";
import type { Token } from "../token";

export class Undefined extends Drop {
  constructor(
    protected path: string,
    protected token: Token,
    protected source: string,
  ) {
    super();
  }

  override toString(): string {
    return "";
  }

  override valueOf(): unknown {
    return "";
  }

  override [dispatchSync](name: string, context: RenderContext): unknown {
    return this;
  }

  override [equals](obj: unknown, context: RenderContext): boolean {
    return obj === null || obj === undefined || obj instanceof Undefined;
  }

  poke(): void {}

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

export class StrictUndefined extends Undefined {
  protected error(): never {
    throw new UndefinedVariableError(
      `'${this.path}' is undefined`,
      this.token,
      this.source,
    );
  }

  override toString(): string {
    this.error();
  }

  override valueOf() {
    this.error();
  }

  override [toLiquidSync](hint: ContextHint, context: RenderContext): unknown {
    this.error();
  }

  override [dispatchSync](name: string, context: RenderContext): unknown {
    this.error();
  }

  override [equals](obj: unknown, context: RenderContext): boolean {
    this.error();
  }

  override async *[Symbol.asyncIterator](): AsyncGenerator<
    unknown,
    void,
    void
  > {
    this.error();
    yield;
  }

  override *[Symbol.iterator](): Iterator<unknown> {
    this.error();
    yield;
  }

  override [length](): number {
    this.error();
  }

  override [sliceSync](
    offset?: number,
    limit?: number,
    reversed?: boolean,
  ): Drop {
    this.error();
  }

  override poke(): void {
    this.error();
  }
}

export class FalsyStrictUndefined extends StrictUndefined {
  override [toLiquidSync](hint: ContextHint, context: RenderContext): unknown {
    if (hint === "boolean") {
      return false;
    }
    this.error();
  }
}
