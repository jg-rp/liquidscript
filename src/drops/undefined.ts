/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RenderContext } from "../context";
import {
  containsSync,
  dispatchSync,
  Drop,
  equals,
  length,
  lessThanSync,
  sliceSync,
  toLiquidSync,
  type ContextHint,
} from "../drop";
import { UndefinedVariableError } from "../errors";
import type { Token } from "../token";
import { Blank } from "./blank";

export class Undefined extends Drop {
  constructor(
    readonly path: string,
    protected token: Token,
    protected source: string,
    protected templateName: string,
  ) {
    super();
  }

  override [dispatchSync](name: string, context: RenderContext): unknown {
    return this;
  }

  override [equals](obj: unknown, context: RenderContext): boolean {
    return (
      obj === null ||
      obj === undefined ||
      obj instanceof Undefined ||
      obj instanceof Blank
    );
  }

  get first() {
    return this;
  }

  get last() {
    return this;
  }

  poke(): void {}

  get size() {
    return this;
  }

  override toString(): string {
    return "";
  }

  override valueOf(): unknown {
    return "";
  }
}

export class StrictUndefined extends Undefined {
  override [containsSync](obj: unknown, context: RenderContext): boolean {
    this.error();
  }

  override [dispatchSync](name: string, context: RenderContext): unknown {
    this.error();
  }

  override [equals](obj: unknown, context: RenderContext): boolean {
    this.error();
  }

  protected error(): never {
    throw new UndefinedVariableError(
      `'${this.path}' is undefined`,
      this.token,
      this.source,
      this.templateName,
    );
  }

  override [length](): number {
    this.error();
  }

  override [lessThanSync](obj: unknown, context: RenderContext): boolean {
    this.error();
  }

  override poke(): void {
    this.error();
  }

  override [sliceSync](
    offset?: number,
    limit?: number,
    reversed?: boolean,
  ): Drop {
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

  override [toLiquidSync](hint: ContextHint, context: RenderContext): unknown {
    this.error();
  }

  override toString(): string {
    this.error();
  }

  override valueOf() {
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

  override [containsSync](obj: unknown, context: RenderContext): boolean {
    return false;
  }

  override [equals](obj: unknown, context: RenderContext): boolean {
    return context.env.isNil(obj);
  }
}
