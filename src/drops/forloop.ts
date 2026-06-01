import type { RenderContext } from "../context";
import { Nothing } from "../runtime";
import {
  type ContextHint,
  Drop,
  isInvocable,
  toLiquid,
  toLiquidSync,
} from "../drop";

export class ForLoop extends Drop {
  private _index: number = -1;

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

  private _length: number;

  private _name: string;

  private _parentloop: ForLoop | typeof Nothing;

  constructor(
    name: string,
    length: number,
    parentloop: ForLoop | typeof Nothing,
  ) {
    super();
    this._name = name;
    this._length = length;
    this._parentloop = parentloop;
  }

  first(): boolean {
    return this._index === 0;
  }

  index(): number {
    return this._index + 1;
  }

  index0(): number {
    return this._index;
  }

  override [isInvocable](name: string): boolean {
    return ForLoop._keys.has(name);
  }

  last(): boolean {
    return this._index === this._length - 1;
  }

  length(): number {
    return this._length;
  }

  name(): string {
    return this._name;
  }

  parentloop(): ForLoop | typeof Nothing {
    return this._parentloop;
  }

  rindex(): number {
    return this._length - this._index;
  }

  rindex0(): number {
    return this._length - this._index - 1;
  }

  step(): void {
    this._index += 1;
  }

  override async [toLiquid](
    hint: ContextHint,
    context?: RenderContext,
  ): Promise<unknown> {
    return this[toLiquidSync](hint, context);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override [toLiquidSync](hint: ContextHint, context?: RenderContext): unknown {
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

  override toString(): string {
    return "Liquid::ForLoopDrop";
  }
}
