import type { RenderContext } from "../context";
import { Nothing } from "../runtime";
import {
  type ContextHint,
  Drop,
  isInvocable,
  toLiquid,
  toLiquidSync,
} from "../drop";

export class TableRowLoop extends Drop {
  private static _keys = new Set([
    "length",
    "index",
    "index0",
    "rindex",
    "rindex0",
    "first",
    "last",
    "col",
    "col0",
    "col_first",
    "col_last",
    "row",
  ]);

  #col: number = 1;

  #cols: number;

  #index: number = 0;

  #length: number;

  #row: number = 1;

  constructor(length: number, cols: number) {
    super();
    this.#length = length;
    this.#cols = cols;
  }

  col(): number {
    return this.#col;
  }

  col_first(): boolean {
    return this.#col === 1;
  }

  col_last(): boolean {
    return this.#col === this.#cols;
  }

  col0(): number {
    return this.#col - 1;
  }

  first(): boolean {
    return this.#index === 0;
  }

  index(): number {
    return this.#index + 1;
  }

  index0(): number {
    return this.#index;
  }

  override [isInvocable](name: string): boolean {
    return TableRowLoop._keys.has(name);
  }

  last(): boolean {
    return this.#index === this.#length - 1;
  }

  length(): number {
    return this.#length;
  }

  rindex(): number {
    return this.#length - this.#index;
  }

  rindex0(): number {
    return this.#length - this.#index - 1;
  }

  row(): number {
    return this.#row;
  }

  step(): void {
    this.#index += 1;
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
    return "Liquid::TableRowDrop";
  }
}
