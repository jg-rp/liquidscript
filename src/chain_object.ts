import { ReadOnlyObjectChainError } from "./errors";

export const Missing = Symbol.for("liquid.context.missing");
export const chainPush = Symbol.for("liquid.context.chain_push");
export const chainPop = Symbol.for("liquid.context.chain_pop");
export const chainSize = Symbol.for("liquid.context.chain_size");
const ChainObjects = Symbol.for("liquid.context.chain_objects");

export type ObjectChain = {
  [index: string]: unknown;
  [chainPush](obj: object): void;
  [chainPop](): object | undefined;
  [chainSize](): number;
};

class ChainObject {
  private _objects: object[];
  constructor(...objects: object[]) {
    this._objects = objects.length ? objects.reverse() : [];
  }

  public [chainPush](obj: object): void {
    this[ChainObjects].push(obj);
  }

  public [chainPop](): object | undefined {
    return this[ChainObjects].pop();
  }

  public [chainSize](): number {
    return this[ChainObjects].length;
  }

  public get [ChainObjects](): object[] {
    return this._objects;
  }
}

const chainObjectHandler = {
  get(target: ChainObject, prop: string | symbol): unknown {
    if (
      prop === chainPush ||
      prop === chainPop ||
      prop === chainSize ||
      prop === ChainObjects
    ) {
      return Reflect.get(target, prop);
    }

    for (let i = target[ChainObjects].length - 1; i >= 0; i--) {
      if (
        target[ChainObjects][i] instanceof ChainObject &&
        prop in target[ChainObjects][i]
      ) {
        return Reflect.get(target[ChainObjects][i], prop);
      }
      if (Object.prototype.hasOwnProperty.call(target[ChainObjects][i], prop))
        return Reflect.get(target[ChainObjects][i], prop);
    }

    return Missing;
  },
  has(target: ChainObject, prop: string | symbol): boolean {
    for (let i = target[ChainObjects].length - 1; i >= 0; i--) {
      if (target[ChainObjects][i] instanceof ChainObject) {
        return prop in target[ChainObjects][i];
      }
      if (Object.prototype.hasOwnProperty.call(target[ChainObjects][i], prop))
        return true;
    }

    return false;
  },
  set() {
    throw new ReadOnlyObjectChainError("chains objects are read only");
  },
};

/**
 *
 * @param objects -
 * @returns
 */
export function chainObjects(...objects: object[]): ObjectChain {
  return new Proxy(
    new ChainObject(...objects),
    chainObjectHandler,
  ) as unknown as ObjectChain;
}
