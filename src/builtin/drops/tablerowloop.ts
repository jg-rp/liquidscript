import { LiquidDispatchableSync, liquidDispatchSync } from "../../drop";
import { InternalKeyError } from "../../errors";

export class TableRowLoopDrop
  implements LiquidDispatchableSync, Iterable<unknown>
{
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
  ]);

  private _index: number = -1;
  private _row: number = 1;
  private _col: number = 0;

  constructor(
    readonly name: string,
    readonly it: Iterator<unknown>,
    readonly length: number,
    readonly ncols: number
  ) {}

  *[Symbol.iterator](): Iterator<unknown> {
    for (;;) {
      this.step();
      const next = this.it.next();
      if (next.done) break;
      yield next.value;
    }
  }

  [liquidDispatchSync](name: string): unknown {
    if (TableRowLoopDrop._keys.has(name)) return Reflect.get(this, name);
    throw new InternalKeyError(`TableRowLoopDrop[${name}]`);
  }

  toString(): string {
    return `ForLoop(${this.name})`;
  }

  public step(): void {
    this._index += 1;
    if (this._col == this.ncols) {
      this._col = 1;
      this._row += 1;
    } else {
      this._col += 1;
    }
  }

  public get index(): number {
    return this._index + 1;
  }

  public get index0(): number {
    return this._index;
  }

  public get rindex(): number {
    return this.length - this._index;
  }

  public get rindex0(): number {
    return this.length - this._index - 1;
  }

  public get first(): boolean {
    return this._index === 0;
  }

  public get last(): boolean {
    return this._index === this.length - 1;
  }

  public get col(): number {
    return this._col;
  }

  public get col0(): number {
    return this._col - 1;
  }

  public get col_first(): boolean {
    return this._col === 1;
  }

  public get col_last(): boolean {
    return this._col === this.ncols;
  }

  public get row(): number {
    return this._row;
  }
}
