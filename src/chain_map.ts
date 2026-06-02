import { Nothing } from "./runtime";

export const ChainKeys = Symbol("ChainKeys");
export const ChainPush = Symbol("ChainPush");
export const ChainPop = Symbol("ChainPop");
export const ChainSize = Symbol("ChainSize");

/**
 * A chain map groups multiple records together to create a single, read-only
 * view exposing a standard `Record<string, unknown>` interface.
 *
 * Internally mappings are stored on a stack. Property resolution searches
 * records on the stack from top to bottom, allowing properties from records
 * at the top of the stack to mask properties from records at the bottom of
 * the stack.
 *
 * In the event that a property does not exist in the chain, property access
 * resolves to `[Nothing]` - the symbol used to indicate the absence of a
 * property rather than a property with a falsy or `undefined` value. This
 * avoids the need to call `x in chainMap` before `chainMap[x]` in some cases.
 *
 * New records can be pushed onto and popped off the stack using `[ChainPush]()`
 * and `[ChainPop]()`, respectively.
 *
 * `ReadOnlyChainMap` is itself a `Record<string, unknown>`, so chain maps can
 * be arbitrarily nested.
 *
 * `ReadOnlyChainMap` does not copy or freeze supplied records. Changes made to
 * records after they are added to the chain are immediately reflected in the
 * composite view.
 */
export class ReadOnlyChainMap {
  private readonly _maps: Record<string, unknown>[];

  constructor(...maps: Readonly<Record<string, unknown>>[]) {
    this._maps = maps.filter(Boolean).reverse() as Record<string, unknown>[];

    return new Proxy(this, {
      get(target, prop, receiver) {
        if (
          prop === ChainKeys ||
          prop === ChainPush ||
          prop === ChainPop ||
          prop === ChainSize
        ) {
          const value = target[prop as keyof typeof target];
          return typeof value === "function" ? value.bind(target) : value;
        }

        if (typeof prop === "string") {
          for (let i = target._maps.length - 1; i >= 0; i--) {
            const map = target._maps[i] as Record<string, unknown>;
            if (
              Object.prototype.hasOwnProperty.call(map, prop) ||
              (map instanceof ReadOnlyChainMap && prop in map)
            ) {
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
            const map = target._maps[i] as Record<string, unknown>;
            if (
              Object.prototype.hasOwnProperty.call(map, prop) ||
              (map instanceof ReadOnlyChainMap && prop in map)
            ) {
              return true;
            }
          }
        }
        return false;
      },

      ownKeys(target) {
        return target[ChainKeys]();
      },

      getOwnPropertyDescriptor(target, prop) {
        if (typeof prop === "string") {
          for (let i = target._maps.length - 1; i >= 0; i--) {
            const map = target._maps[i] as Record<string, unknown>;
            if (
              Object.prototype.hasOwnProperty.call(map, prop) ||
              (map instanceof ReadOnlyChainMap && prop in map)
            ) {
              return {
                enumerable: true,
                configurable: true,
                // We omit 'value' here because Object.values() and Object.entries()
                // will automatically hit our 'get' trap to fetch it safely.
              };
            }
          }
        }

        // Fallback for internal properties (like _maps) and symbols
        return Reflect.getOwnPropertyDescriptor(target, prop);
      },

      set() {
        throw new TypeError(
          "ReadOnlyChainMap does not support property assignment",
        );
      },

      deleteProperty() {
        throw new TypeError(
          "ReadOnlyChainMap does not support property deletion",
        );
      },

      defineProperty() {
        throw new TypeError(
          "ReadOnlyChainMap does not support property assignment",
        );
      },

      setPrototypeOf() {
        throw new TypeError(
          "ReadOnlyChainMap does not support setting it prototype",
        );
      },
    });
  }

  [key: string]: unknown;

  /**
   * Push `map` onto the top of the stack.
   */
  [ChainPush](map: Readonly<Record<string, unknown>>): void {
    this._maps.push(map);
  }

  /**
   * Pop and return the record off the top of the stack.
   */
  [ChainPop](): Record<string, unknown> | undefined {
    return this._maps.pop();
  }

  /**
   * Compiles an array containing all unique keys across the stack hierarchy.
   */
  [ChainKeys](): string[] {
    const uniqueKeys = new Set<string>();
    for (let i = this._maps.length - 1; i >= 0; i--) {
      const map = this._maps[i] as Record<string, unknown>;

      const keys =
        map instanceof ReadOnlyChainMap ? map[ChainKeys]() : Object.keys(map);

      for (const key of keys) {
        uniqueKeys.add(key);
      }
    }
    return Array.from(uniqueKeys);
  }

  /**
   * Returns the total number of discrete map layers currently on the stack.
   */
  [ChainSize](): number {
    return this._maps.length;
  }

  /**
   * Iterates over the composite map view, yielding `[key, value]` pairs.
   */
  *[Symbol.iterator](): Generator<[string, unknown], void, unknown> {
    for (const key of this[ChainKeys]()) {
      yield [key, this[key]];
    }
  }
}
