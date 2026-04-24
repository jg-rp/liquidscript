import type { RenderContext } from "../context";
import { Nothing } from "../runtime";
import {
  type ContextHint,
  type Drop,
  type InvocableDrop,
  isInvocable,
  toLiquid,
  toLiquidSync,
} from "../drop";

export class ForLoop implements Drop, InvocableDrop {
  private static _keys = new Set([
    "name",
    "length",
    "index",
    "index0",
    "rindex",
    "rindex0",
    "first",
    "last",
    "parentloop",
  ]);

  private _index: number = -1;
  private _name: string;
  private _length: number;
  private _parentloop: ForLoop | typeof Nothing;

  constructor(
    name: string,
    length: number,
    parentloop: ForLoop | typeof Nothing,
  ) {
    this._name = name;
    this._length = length;
    this._parentloop = parentloop;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [toLiquidSync](hint: ContextHint, context?: RenderContext): unknown {
    switch (hint) {
      case "string":
      case "data":
        return this.toString();
      case "boolean":
        return true;
      case "numeric":
        return Nothing;
      default:
        return Nothing;
    }
  }

  async [toLiquid](
    hint: ContextHint,
    context?: RenderContext,
  ): Promise<unknown> {
    return this[toLiquidSync](hint, context);
  }

  [isInvocable](name: string): boolean {
    return ForLoop._keys.has(name);
  }

  public toString(): string {
    return "Liquid::ForLoopDrop";
  }

  public step(): void {
    this._index += 1;
  }

  public name(): string {
    return this._name;
  }

  public length(): number {
    return this._length;
  }

  public parentloop(): ForLoop | typeof Nothing {
    return this._parentloop;
  }

  public index(): number {
    return this._index + 1;
  }

  public index0(): number {
    return this._index;
  }

  public rindex(): number {
    return this._length - this._index;
  }

  public rindex0(): number {
    return this._length - this._index - 1;
  }

  public first(): boolean {
    return this._index === 0;
  }

  public last(): boolean {
    return this._index === this._length - 1;
  }
}
