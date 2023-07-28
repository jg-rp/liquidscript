import { LiquidDispatchableSync, liquidDispatchSync } from "../../drop";
import { InternalKeyError } from "../../errors";
import { Undefined } from "../../undefined";

export class ForLoopDrop implements LiquidDispatchableSync, Iterable<unknown> {
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

  constructor(
    readonly name: string,
    readonly it: Iterator<unknown>,
    readonly length: number,
    readonly parentloop: ForLoopDrop | Undefined,
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
    if (ForLoopDrop._keys.has(name)) return Reflect.get(this, name);
    throw new InternalKeyError(`ForLoopDrop[${name}]`);
  }

  toString(): string {
    return `ForLoop(${this.name})`;
  }

  public step(): void {
    this._index += 1;
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
}
