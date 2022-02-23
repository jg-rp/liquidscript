import { Environment } from "./environment";
import { TemplateI } from "./template";
import { Filter } from "./filter";
import { InternalKeyError, MaxContextDepthError } from "./errors";
import { isLiquidPrimitive, LiquidPrimitive, liquidValueOf } from "./drop";
import { isPropertyKey } from "./types";

export type ContextGlobals =
  | Map<string, unknown>
  | { [index: string]: unknown }
  | ReadOnlyChainMap;

export type ContextScope = {
  get(key: string): unknown;
  has(key: string): boolean;
};

export function isContextScope(obj: object): obj is ContextScope {
  return "get" in obj && "has" in obj;
}

export type ContextPath = Array<number | string | LiquidPrimitive>;
export type LoadContext = { [index: string]: string | number };

const _missing = Symbol("missing");

export interface Context {
  /**
   *
   */
  autoEscape: boolean;
  counters: Map<string, number>;
  registers: Map<string | symbol, Map<string | symbol, unknown>>;
  templateName?: string;

  /**
   *
   * @param key
   * @param value
   */
  assign(key: string, value: unknown): void;

  /**
   *
   * @param name
   * @param path
   */
  get(name: string, path: ContextPath, default_?: unknown): Promise<unknown>;

  /**
   *
   * @param name
   */
  resolve(name: string): unknown;

  /**
   *
   * @param name
   * @param value
   * @param args
   */
  filter(name: string): Filter | undefined;

  /**
   *
   * @param name
   * @param loaderContext
   */
  getTemplate(
    name: string,
    loaderContext: { [index: string]: unknown }
  ): Promise<TemplateI>;

  /**
   *
   * @param key
   */
  getRegister(key: string | symbol): Map<string | symbol, unknown>;

  /**
   *
   * @param scope
   */
  push(scope: ContextScope): void;
  pop(): ContextScope | undefined;
  copy(scope: ContextScope, disabledTags: string[]): Context;
}

/**
 *
 */
export class ReadOnlyChainMap {
  private maps: ContextScope[];
  constructor(...maps: ContextScope[]) {
    this.maps = maps.length ? maps.reverse() : [];
  }

  get(key: string): unknown {
    for (let i = this.maps.length - 1; i >= 0; i--) {
      if (this.maps[i].has(key)) return this.maps[i].get(key);
    }
    return undefined;
  }

  has(key: string): boolean {
    for (let i = this.maps.length - 1; i >= 0; i--) {
      if (this.maps[i].has(key)) return true;
    }
    return false;
  }

  /**
   * Like `ReadOnlyChainMap.get()` but returns `MISSING` if the
   * key did not exist in any of the chained maps, rather than
   * `undefined`.
   *
   * @param key the key string to search for.
   * @returns the value at `key` in the first map in the chain that
   * has a key of `key`, or `@@MISSING`.
   */
  resolve(key: string): unknown {
    for (let i = this.maps.length - 1; i >= 0; i--) {
      if (this.maps[i].has(key)) return this.maps[i].get(key);
    }
    return _missing;
  }

  push(map: ContextScope): void {
    this.maps.push(map);
  }

  pop(): ContextScope | undefined {
    return this.maps.pop();
  }
}

/**
 *
 */
export class BuiltIn {
  get(key: string): Date | undefined {
    if (key === "now" || key === "today") return new Date();
    return undefined;
  }

  has(key: string): boolean {
    if (key === "now" || key === "today") return true;
    return false;
  }
}

/**
 *
 */
export class DefaultContext implements Context {
  public autoEscape: boolean;
  public counters = new Map<string, number>();
  readonly registers = new Map<
    string | symbol,
    Map<string | symbol, unknown>
  >();
  private locals = new Map<string, unknown>();
  private scope: ReadOnlyChainMap;

  constructor(
    private environment: Environment,
    private globals: ContextScope,
    readonly templateName: string = "<string>",
    private disabledTags: string[] = [],
    private copyDepth: number = 0
  ) {
    this.autoEscape = environment.autoEscape;

    this.scope = new ReadOnlyChainMap(
      this.locals,
      this.globals,
      new BuiltIn(),
      this.counters
    );
  }

  assign(key: string, value: unknown): void {
    this.locals.set(key, value);
  }

  resolve(name: string): unknown {
    const value = this.scope.resolve(name);
    if (value === _missing) return this.environment.undefined_(name);
    return value;
  }

  async get(
    name: string,
    path?: ContextPath,
    default_: unknown = _missing
  ): Promise<unknown> {
    let obj = this.resolve(name);
    if (!path || !path.length) return obj;

    for (const item of path) {
      try {
        obj = await getItem(obj, item);
      } catch (error) {
        if (error instanceof InternalKeyError) {
          if (default_ !== _missing) return default_;
          return this.environment.undefined_(`${item}`);
        }
        throw error;
      }
    }

    return obj;
  }

  async getTemplate(
    name: string,
    loaderContext: { [index: string]: unknown }
  ): Promise<TemplateI> {
    return this.environment.getTemplate(name, loaderContext, this);
  }

  /**
   *
   * @param key
   * @returns
   */
  public getRegister(key: string | symbol): Map<string | symbol, unknown> {
    let reg = this.registers.get(key);
    if (reg === undefined) {
      reg = new Map();
      this.registers.set(key, reg);
    }
    return reg;
  }

  filter(name: string): Filter | undefined {
    return this.environment.filters[name];
  }

  push(scope: ContextScope): void {
    this.scope.push(scope);
  }

  pop(): ContextScope | undefined {
    return this.scope.pop();
  }

  copy(scope: ContextScope, disabledTags: string[]): Context {
    if (this.copyDepth > this.environment.maxContextDepth)
      throw new MaxContextDepthError(
        "maximum context depth reached, possible recursive render"
      );

    return new DefaultContext(
      this.environment,
      new ReadOnlyChainMap(scope, this.globals),
      this.templateName,
      disabledTags,
      this.copyDepth + 1
    );
  }
}

async function getItem(obj: unknown, item: unknown): Promise<unknown> {
  if (obj === null) throw new InternalKeyError(`can't get property of null`);
  if (item === null) throw new InternalKeyError(`can't read null property`);

  if (isLiquidPrimitive(item)) item = item[liquidValueOf]();
  if (!isPropertyKey(item))
    throw new InternalKeyError(`${item} is not a valid property key`);

  if (obj instanceof Map && obj.has(item)) return obj.get(item);
  if (typeof obj === "object" && item in obj) return Reflect.get(obj, item);

  // TODO: size, first and last.

  throw new InternalKeyError(`${obj}[${String(item)}]`);
}
