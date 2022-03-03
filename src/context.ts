import { Environment } from "./environment";
import { Template } from "./template";
import { Filter } from "./filter";
import { InternalKeyError, MaxContextDepthError } from "./errors";
import { isLiquidPrimitive, LiquidPrimitive, liquidValueOf } from "./drop";
import {
  isArray,
  isIterable,
  isNumber,
  isObject,
  isPrimitiveNumber,
  isPropertyKey,
  isString,
} from "./types";
import { chainObjects, Missing, ObjectChain } from "./chainObject";
import { isNumberT } from "./number";
import { ForLoopDrop } from "./builtin/drops/forloop";

export type ContextScope = { [index: string]: unknown };
export type ContextPath = Array<number | string | LiquidPrimitive>;
export type LoadContext = { [index: string]: string | number };

/**
 *
 */
export const builtIn = {
  now: () => new Date(),
  today: () => new Date(),
};

/**
 *
 */
export class Context {
  public autoEscape: boolean;
  public counters: { [index: string]: number } = {};
  public ifchanged: string = "";
  readonly forLoops: ForLoopDrop[] = [];
  readonly registers = new Map<
    string | symbol,
    Map<string | symbol, unknown>
  >();

  private locals: ContextScope = {};
  private scope: ObjectChain;

  constructor(
    readonly environment: Environment,
    private globals: ContextScope = {},
    readonly templateName: string = "<string>",
    private disabledTags: string[] = [],
    private copyDepth: number = 0
  ) {
    this.autoEscape = environment.autoEscape;

    this.scope = chainObjects(
      this.locals,
      this.globals,
      builtIn,
      this.counters
    );
  }

  /**
   *
   * @param key
   * @param value
   */
  public assign(key: string, value: unknown): void {
    this.locals[key] = value;
  }

  /**
   *
   * @param name
   * @returns
   */
  public resolve(name: string): unknown {
    const value = this.scope[name];
    if (value === Missing) return this.environment.undefined_(name);
    return value;
  }

  /**
   *
   * @param name
   * @param path
   * @param default_
   * @returns
   */
  public async get(
    name: string,
    path?: ContextPath,
    default_: unknown = Missing
  ): Promise<unknown> {
    let obj = this.resolve(name);
    if (!path || !path.length) return obj;

    for (const item of path) {
      try {
        obj = await getItem(obj, item);
      } catch (error) {
        if (error instanceof InternalKeyError) {
          if (default_ !== Missing) return default_;
          return this.environment.undefined_(`${item}`);
        }
        throw error;
      }
    }

    return obj;
  }

  /**
   *
   * @param name
   * @param path
   * @param default_
   * @returns
   */
  public getSync(
    name: string,
    path?: ContextPath,
    default_: unknown = Missing
  ): unknown {
    let obj = this.resolve(name);
    if (!path || !path.length) return obj;

    for (const item of path) {
      try {
        obj = getItemSync(obj, item);
      } catch (error) {
        if (error instanceof InternalKeyError) {
          if (default_ !== Missing) return default_;
          return this.environment.undefined_(`${item}`);
        }
        throw error;
      }
    }

    return obj;
  }

  /**
   *
   * @param name
   * @param loaderContext
   * @returns
   */
  public async getTemplate(
    name: string,
    loaderContext: { [index: string]: unknown }
  ): Promise<Template> {
    return this.environment.getTemplate(name, loaderContext, this);
  }

  /**
   *
   * @param name
   * @param loaderContext
   * @returns
   */
  public getTemplateSync(
    name: string,
    loaderContext: { [index: string]: unknown } = {}
  ): Template {
    return this.environment.getTemplateSync(name, loaderContext, this);
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

  /**
   *
   * @param name
   * @returns
   */
  public filter(name: string): Filter | undefined {
    return this.environment.filters[name];
  }

  /**
   *
   * @param scope
   */
  public push(scope: ContextScope): void {
    this.scope.push(scope);
  }

  /**
   *
   * @returns
   */
  public pop(): object | undefined {
    return this.scope.pop();
  }

  /**
   *
   * @param scope
   * @param disabledTags
   * @returns
   */
  public copy(scope: ContextScope, disabledTags: string[]): Context {
    if (this.copyDepth > this.environment.maxContextDepth)
      throw new MaxContextDepthError(
        "maximum context depth reached, possible recursive render"
      );

    return new Context(
      this.environment,
      chainObjects(scope, this.globals),
      this.templateName,
      disabledTags,
      this.copyDepth + 1
    );
  }
}

/**
 *
 * @param obj
 * @param item
 * @returns
 */
function getItemSync(obj: unknown, item: unknown): unknown {
  if (obj === null) throw new InternalKeyError(`can't get property of null`);
  if (item === null) throw new InternalKeyError(`can't read null property`);

  if (isLiquidPrimitive(item)) item = item[liquidValueOf]();
  if (!isPropertyKey(item))
    throw new InternalKeyError(`${item} is not a valid property key`);

  // TODO: Drop protocol item getter

  if (item === "size") return getSize(obj);
  else if (item === "first") return getFirst(obj);
  else if (item === "last") return getLast(obj);
  else if (isArray(obj) && isNumber(item)) {
    if (item < 0) return obj[item + obj.length];
    return obj[item];
  } else if (typeof obj === "object" && item in obj)
    return Reflect.get(obj, item);

  throw new InternalKeyError(`${obj}[${String(item)}]`);
}

/**
 *
 * @param obj
 * @param item
 * @returns
 */
async function getItem(obj: unknown, item: unknown): Promise<unknown> {
  // TODO: getItem with async drop protocol
  return getItemSync(obj, item);
}

function getSize(obj: unknown): number {
  if (isNumberT(obj) || isPrimitiveNumber(obj)) {
    // XXX: This is not necessarily the case for wrapped decimal numbers
    return 8;
  } else if (isArray(obj) || isString(obj)) {
    return obj.length;
  } else if (isObject(obj)) {
    if ("size" in obj) {
      return Reflect.get(obj, "size");
    } else {
      return Object.keys(obj).length;
    }
  }
  throw new InternalKeyError(`${obj}[size]`);
}

// TODO: First/Last of Map and/or Set?

function getFirst(obj: unknown): unknown {
  // First of a string is not supported.
  if (isString(obj)) return null;
  if (isObject(obj) && "first" in obj) return Reflect.get(obj, "first");
  // Iterable objects are OK.
  if (isObject(obj) && isIterable(obj))
    return obj[Symbol.iterator]().next().value;
  // XXX: Object.entries does not guarantee insertion order.
  if (isObject(obj)) {
    const val = Object.entries(obj).entries().next().value;
    return val === undefined ? null : (val as unknown as Array<unknown>)[1];
  }
  return null;
}

function getLast(obj: unknown): unknown {
  // Last of a string is not supported.
  if (isString(obj)) return null;
  if (isObject(obj) && "last" in obj) return Reflect.get(obj, "last");
  if (isArray(obj)) return obj[obj.length - 1];
  return null;
}
