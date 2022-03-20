import { ReadOnlyObjectChainError } from "./errors";

export const Missing = Symbol.for("liquid.context.missing");
const ChainObjects = Symbol.for("liquid.context.chain_objects");

export type ObjectChain = {
  [index: string]: unknown;
  push(obj: object): void;
  pop(): object | undefined;
};

class ChainObject {
  private _objects: object[];
  constructor(...objects: object[]) {
    this._objects = objects.length ? objects.reverse() : [];
  }

  public push(obj: object): void {
    this[ChainObjects].push(obj);
  }

  public pop(): object | undefined {
    return this[ChainObjects].pop();
  }

  public get [ChainObjects](): object[] {
    return this._objects;
  }
}

const chainObjectHandler = {
  get: function (target: ChainObject, prop: string | symbol): unknown {
    if (prop === "push" || prop === "pop" || prop === ChainObjects) {
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
  has: function (target: ChainObject, prop: string | symbol): boolean {
    if (prop == "push" || prop == "pop") {
      return true;
    }

    for (let i = target[ChainObjects].length - 1; i >= 0; i--) {
      if (target[ChainObjects][i] instanceof ChainObject) {
        return prop in target[ChainObjects][i];
      }
      if (Object.prototype.hasOwnProperty.call(target[ChainObjects][i], prop))
        return true;
    }

    return false;
  },
  set: function () {
    throw new ReadOnlyObjectChainError("chains objects are read only");
  },
};

/**
 *
 * @param objects
 * @returns
 */
export function chainObjects(...objects: object[]): ObjectChain {
  return new Proxy(
    new ChainObject(...objects),
    chainObjectHandler
  ) as unknown as ObjectChain;
}
