import { Nothing } from "./runtime";

export const ChainHas = Symbol("ChainHas");
export const ChainFlatten = Symbol("ChainFlatten");
export const ChainKeys = Symbol("ChainKeys");
export const ChainPush = Symbol("ChainPush");
export const ChainPop = Symbol("ChainPop");

export class ReadOnlyChainMap {
  private readonly _maps: Record<string, unknown>[];

  constructor(...maps: Readonly<Record<string, unknown>>[]) {
    // Ordered from oldest (index 0) to newest (last index)
    this._maps = maps.filter(Boolean).reverse() as Record<string, unknown>[];

    return new Proxy(this, {
      get(target, prop, receiver) {
        if (
          prop === ChainHas ||
          prop === ChainFlatten ||
          prop === ChainKeys ||
          prop === ChainPush ||
          prop === ChainPop
        ) {
          const value = target[prop as keyof typeof target];
          return typeof value === "function"
            ? (value as Function).bind(target)
            : value;
        }

        if (typeof prop === "string") {
          for (let i = target._maps.length - 1; i >= 0; i--) {
            const map = target._maps[i];
            if (Object.prototype.hasOwnProperty.call(map, prop)) {
              return map[prop];
            }
          }
          return Nothing;
        }

        return Reflect.get(target, prop, receiver);
      },

      has(target, prop) {
        if (typeof prop === "string") {
          for (let i = target._maps.length - 1; i >= 0; i--) {
            if (Object.prototype.hasOwnProperty.call(target._maps[i], prop)) {
              return true;
            }
          }
        }
        return false;
      },
    });
  }

  [ChainPush](map: Readonly<Record<string, unknown>>): void {
    if (map) {
      this._maps.push(map as Record<string, unknown>);
    }
  }

  [ChainPop](): Record<string, unknown> | undefined {
    return this._maps.pop();
  }

  [ChainHas](key: string): boolean {
    for (let i = this._maps.length - 1; i >= 0; i--) {
      if (Object.prototype.hasOwnProperty.call(this._maps[i], key)) {
        return true;
      }
    }
    return false;
  }

  [ChainFlatten](): Record<string, unknown> {
    return this._maps.reduce<Record<string, unknown>>((acc, current) => {
      return { ...acc, ...current };
    }, {});
  }

  get [ChainKeys](): string[] {
    const uniqueKeys = new Set<string>();
    for (const map of this._maps) {
      for (const key of Object.keys(map)) {
        uniqueKeys.add(key);
      }
    }
    return Array.from(uniqueKeys);
  }

  [key: string]: any;
}
