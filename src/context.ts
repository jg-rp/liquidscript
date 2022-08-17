import { ForLoopDrop } from "./builtin/drops/forloop";
import {
  chainObjects,
  chainPop,
  chainPush,
  chainSize,
  Missing,
  ObjectChain,
} from "./chain_object";
import {
  hasLiquidCallable,
  isLiquidable,
  isLiquidableSync,
  isLiquidCallable,
  isLiquidDispatchable,
  isLiquidDispatchableSync,
  isLiquidPrimitive,
  liquidDispatch,
  liquidDispatchSync,
  LiquidPrimitive,
  toLiquid,
  toLiquidPrimitive,
  toLiquidSync,
} from "./drop";
import { Environment } from "./environment";
import {
  InternalKeyError,
  MaxContextDepthError,
  MaxLocalNamespaceLimitError,
} from "./errors";
import { isNumberT } from "./number";
import { Template } from "./template";
import {
  ContextScope,
  isArray,
  isFunction,
  isIterable,
  isNumber,
  isObject,
  isPrimitiveNumber,
  isPropertyKey,
  isString,
} from "./types";

export type ContextPath = Array<number | string | LiquidPrimitive>;

export type RenderContextOptions = {
  templateName?: string;
  disabledTags?: Set<string>;
  copyDepth?: number;
  loaderContext?: ContextScope;
  localsScoreCarry?: number;
};

/**
 * A RenderContext manages template scopes, internal registers and
 * access to the bound environment during the rendering of a template.
 *
 * A new RenderContext is created automatically every time `render()`
 * is called on a `Template`, so you probably don't want to instantiate
 * it directly.
 */
export class RenderContext {
  /**
   * A distinct scope for counters set using the `increment` and
   * `decrement` tags.
   */
  readonly counters: { [index: string]: number } = {};

  /**
   * A stack of `ForLoopDrop` objects. Used to populate the `parentloop`
   * property of a `ForLoopDrop`.
   */
  readonly forLoops: ForLoopDrop[] = [];

  /**
   * A register is a Map used by tags and/or filters to store arbitrary
   * values that are not available to template authors. Use `getRegister()`
   * to obtain a named register.
   */
  readonly registers = new Map<
    string | symbol,
    Map<string | symbol, unknown>
  >();

  /**
   * A namespace for variables set using the `assign` or `capture` tags.
   */
  private locals: ContextScope = {};

  /**
   * A non-specific indication of how much the local namespace has been used.
   */
  public localsScore: number;

  /**
   * A chain of scopes. When resolving names, each scope in the chain is
   * searched in order. If a new scope if pushed on to a RenderContext,
   * it is pushed to the front if this chain.
   */
  readonly scope: ObjectChain;

  /**
   * A set of tag names that are disallowed in this render context. For
   * example, the `include` tag is not allowed in templates rendered
   * with the `render` tag.
   */
  readonly disabledTags: Set<string>;

  /** The name of the template being rendered. Will be `<string>` for
   * templates parsed using `Environment.fromString()` without being
   * given a name.
   */
  readonly templateName: string;

  /**
   * The number of times this render context has been copied or
   * extended. This helps us guard against recursive use of `include`
   * or `render` tags.
   */
  private copyDepth: number;

  /**
   * An object containing arbitrary properties passed down from a
   * template loader. The properties of this object are not intended
   * to be accessible by template authors.
   */
  readonly loaderContext: ContextScope;

  /**
   *
   * @param environment - The environment from which this context was created.
   * @param globals - Global template variables, passed down from the
   * Environment, Template, Loader and arguments to `.render()`.
   * @param options - Extra render context options.
   */
  constructor(
    readonly environment: Environment,
    private globals: ContextScope = {},
    {
      disabledTags,
      templateName,
      copyDepth,
      loaderContext,
      localsScoreCarry,
    }: RenderContextOptions = {}
  ) {
    this.disabledTags = disabledTags ?? new Set();
    this.templateName = templateName ?? "<string>";
    this.copyDepth = copyDepth ?? 0;
    this.localsScore = localsScoreCarry ?? 0;
    this.loaderContext = loaderContext ?? {};
    // Scopes are searched in this order.
    this.scope = chainObjects(
      this.locals,
      this.globals,
      BuiltIn,
      this.counters
    );
  }

  /**
   * Assign or re-assign a template local variable, probably from either the
   * `assign` or `capture` tags.
   * @param key - The name of the template local variable.
   * @param value - The value of the template local variable.
   */
  public assign(key: string, value: unknown): void {
    if (this.environment.localNamespaceLimit > -1) {
      this.localsScore += assignScore(value);
      if (this.localsScore > this.environment.localNamespaceLimit) {
        throw new MaxLocalNamespaceLimitError("local namespace limit reached");
      }
    }
    this.locals[key] = value;
  }

  /**
   * Resolve a template variable by searching the scope chain. Unlike `get`,
   * `resolve` performs a single, top level search of the scope chain. It
   * does not expect a dotted or bracketed identifier.
   * @param name - The name of the template variable to resolve.
   * @returns The value stored against the given name, or an instance of
   * the `Undefined` class defined on the attached environment.
   */
  public async resolve(name: string): Promise<unknown> {
    const value = this.scope[name];
    if (value === Missing) return this.environment.undefinedFactory(name);
    return isLiquidable(value) ? value[toLiquid](this) : value;
  }

  public resolveSync(name: string): unknown {
    const value = this.scope[name];
    if (value === Missing) return this.environment.undefinedFactory(name);
    return isLiquidableSync(value) ? value[toLiquidSync](this) : value;
  }

  /**
   * Search the current scope for a template variable and, if found, follow
   * the given path. This is a bit like resolving a JSONPath expression.
   * @param name - The name of the template variable to resolve.
   * @param path - An optional array of path elements to follow.
   * @param missing - A default value used if the name and path fail to find
   * a value.
   * @returns The value at `path`, starting from the given name, or `missing`
   * otherwise. If `missing` is not given, an instance of the `Undefined`
   * class defined on the attached environment will be used.
   */
  public async get(
    name: string,
    path?: ContextPath,
    missing: unknown = Missing
  ): Promise<unknown> {
    let obj = await this.resolve(name);
    if (!path || !path.length) return obj;

    for (const item of path) {
      try {
        obj = await getItem(obj, item);
        if (isLiquidable(obj)) obj = await obj[toLiquid](this);
      } catch (error) {
        if (error instanceof InternalKeyError) {
          if (missing !== Missing) return missing;
          return this.environment.undefinedFactory(`${item}`);
        }
        throw error;
      }
    }

    return obj;
  }

  /**
   * A synchronous version of `RenderContext.get()`.
   * @see {@link get}
   */
  public getSync(
    name: string,
    path?: ContextPath,
    missing: unknown = Missing
  ): unknown {
    let obj = this.resolveSync(name);
    if (!path || !path.length) return obj;

    for (const item of path) {
      try {
        obj = getItemSync(obj, item);
        if (isLiquidableSync(obj)) obj = obj[toLiquidSync](this);
      } catch (error) {
        if (error instanceof InternalKeyError) {
          if (missing !== Missing) return missing;
          return this.environment.undefinedFactory(`${item}`);
        }
        throw error;
      }
    }

    return obj;
  }

  /**
   * A convenience method for loading a template from the attached environment.
   * @param name - The name or identifier of the template to load.
   * @param loaderContext - Additional, arbitrary data that a loader can use
   * to scope or otherwise narrow its search space.
   * @returns A `Template`, ready to be rendered.
   * @throws `NoSuchTemplateError` if a template with the given name can not
   * be found.
   */
  public async getTemplate(
    name: string,
    loaderContext: { [index: string]: unknown }
  ): Promise<Template> {
    return this.environment.getTemplate(
      name,
      undefined,
      this,
      this.makeLoaderContext(loaderContext)
    );
  }

  /**
   * A synchronous version of `RenderContext.getTemplate()`.
   * @see {@link getTemplate}
   */
  public getTemplateSync(
    name: string,
    loaderContext: { [index: string]: unknown } = {}
  ): Template {
    return this.environment.getTemplateSync(
      name,
      undefined,
      this,
      this.makeLoaderContext(loaderContext)
    );
  }

  /**
   * Merge a loader context object with the loader context already stored
   * in this render context.
   */
  protected makeLoaderContext(loaderContext: ContextScope): ContextScope {
    return { ...this.loaderContext, ...loaderContext };
  }

  /**
   * Fetch a render context register, creating one if it does not exist.
   *
   * A register is a place for tags and/or filters to store arbitrary data,
   * without leaking said data into the template scope.
   * @param key - An identifier for the register.
   * @returns A register.
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
   * Create a new context by copying this one, without any local variables and
   * registers, and extending the copy with the given scope.
   * @param scope - A scope with which to extend the current context.
   * @param disabledTags - The names of any tags that should be disallowed in
   * the new context.
   * @returns An extended copy of this context.
   */
  public copy(
    scope: ContextScope,
    disabledTags: Iterable<string>
  ): RenderContext {
    if (this.copyDepth + 1 > this.environment.maxContextDepth)
      throw new MaxContextDepthError(
        "maximum context depth reached, possible recursive render"
      );

    return new RenderContext(
      this.environment,
      chainObjects(scope, this.globals),
      {
        templateName: this.templateName,
        disabledTags: new Set(disabledTags),
        copyDepth: this.copyDepth + 1,
        localsScoreCarry: this.localsScore,
      }
    );
  }

  /**
   * Extend the current scope for the duration of the given callback function.
   *
   * @param scope - Variables with which to extend the
   * @param callback - A function to call with the extended scope.
   * @returns The callback functions return value.
   */
  public async extend<T>(scope: ContextScope, callback: () => T): Promise<T> {
    if (this.scope[chainSize]() > this.environment.maxContextDepth)
      throw new MaxContextDepthError("maximum context depth reached");

    this.scope[chainPush](scope);
    try {
      return await callback();
    } finally {
      this.scope[chainPop]();
    }
  }

  /**
   * A synchronous version of {@link extend}.
   */
  public extendSync<T>(scope: ContextScope, callback: () => T): T {
    if (this.scope[chainSize]() > this.environment.maxContextDepth)
      throw new MaxContextDepthError("maximum context depth reached");

    this.scope[chainPush](scope);
    try {
      return callback();
    } finally {
      this.scope[chainPop]();
    }
  }
}

/**
 * Get a property of an object while adhering to Liquid semantics.
 * @param obj - An object that may or may not implement some of the Drop
 * protocol.
 * @param item - The item to get from the object.
 * @returns An unknown value.
 * @throws InternalKeyError if the item does not exist on the object or
 * is not allowed in Liquid.
 */
export function getItemSync(obj: unknown, item: unknown): unknown {
  if (obj === null) throw new InternalKeyError(`can't get property of null`);
  if (item === null) throw new InternalKeyError(`can't read null property`);

  // `toLiquidPrimitive` is part of the Drop protocol. If defined, an
  // object can be used as an array index, or compared to to a boolean,
  // for example.
  if (isLiquidPrimitive(item)) item = item[toLiquidPrimitive]();

  if (!isPropertyKey(item))
    throw new InternalKeyError(`${item} is not a valid property key`);

  // Special, built-in properties.
  if (item === "size") return getSize(obj);
  if (item === "first") return getFirst(obj);
  if (item === "last") return getLast(obj);

  // Access arrays using positive or negative integers, or enumerable
  // properties set on array sub classes.
  if (isArray(obj)) {
    // Integers are OK
    if (isNumber(item) && item < 0) {
      return obj[item + obj.length];
    }

    // .length is not OK
    if (Object.propertyIsEnumerable.call(obj, item)) {
      return Reflect.get(obj, item);
    }

    throw new InternalKeyError(
      `can't read non-enumerable property '${String(item)}' of Array`
    );
  }

  if (typeof obj === "object") {
    if (item === "__proto__" || item === "constructor") {
      throw new InternalKeyError(`can't access property '${item}'`);
    }

    if (item in obj) {
      const result = obj[item as keyof typeof obj] as unknown;
      // Functions will only be called if they are explicitly whitelisted.
      if (isFunction(result)) {
        // `liquidCallable` is part of the Drop protocol. If defined it
        // should return `true` if the given function name is allowed
        // to be called.
        if (hasLiquidCallable(obj) && obj[isLiquidCallable](item))
          return Reflect.apply(result, obj, []);

        // Pretend the function does not exist.
        throw new InternalKeyError(
          `function '${String(item)}' is not liquid callable`
        );
      }
      return result;
    } else if (isLiquidDispatchableSync(obj)) {
      return obj[liquidDispatchSync](item);
    }
  }

  throw new InternalKeyError(`${obj}[${String(item)}]`);
}

// TODO: Refactor to avoid duplicated code. The only difference between
// getItem and getItemSync is the calls to liquidDispatch and liquidDispatchSync.

/**
 * An asynchronous version of `getItemSync()`.
 */
async function getItem(obj: unknown, item: unknown): Promise<unknown> {
  if (obj === null) throw new InternalKeyError(`can't get property of null`);
  if (item === null) throw new InternalKeyError(`can't read null property`);

  // `toLiquidPrimitive` is part of the Drop protocol. If defined, an
  // object can be used as an array index, or compared to to a boolean,
  // for example.
  if (isLiquidPrimitive(item)) item = item[toLiquidPrimitive]();

  if (!isPropertyKey(item))
    throw new InternalKeyError(`${item} is not a valid property key`);

  // Special, built-in properties.
  if (item === "size") return getSize(obj);
  if (item === "first") return getFirst(obj);
  if (item === "last") return getLast(obj);

  // Access arrays using positive or negative integers, or enumerable
  // properties set on array sub classes.
  if (isArray(obj)) {
    // Integers are OK
    if (isNumber(item) && item < 0) {
      return obj[item + obj.length];
    }

    // .length is not OK
    if (Object.propertyIsEnumerable.call(obj, item)) {
      return Reflect.get(obj, item);
    }

    throw new InternalKeyError(
      `can't read non-enumerable property '${String(item)}' of Array`
    );
  }

  if (typeof obj === "object") {
    if (item === "__proto__" || item === "constructor") {
      throw new InternalKeyError(`can't access property '${item}'`);
    }

    if (item in obj) {
      const result = obj[item as keyof typeof obj] as unknown;
      // Functions will only be called if they are explicitly whitelisted.
      if (isFunction(result)) {
        // `liquidCallable` is part of the Drop protocol. If defined it
        // should return `true` if the given function name is allowed
        // to be called.
        if (hasLiquidCallable(obj) && obj[isLiquidCallable](item))
          return Reflect.apply(result, obj, []);

        // Pretend the function does not exist.
        throw new InternalKeyError(
          `function '${String(item)}' is not liquid callable`
        );
      }
      return result;
    } else if (isLiquidDispatchable(obj)) {
      return obj[liquidDispatch](item);
    } else if (isLiquidDispatchableSync(obj)) {
      return obj[liquidDispatchSync](item);
    }
  }

  throw new InternalKeyError(`${obj}[${String(item)}]`);
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

// TODO: First/Last of Map?

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

/**
 * An object implementing the special, built-in `now` and `today` objects.
 */
export const BuiltIn = {
  now: () => new Date(),
  today: () => new Date(),
};

function _toLiquid(value: unknown, context: RenderContext): unknown {
  return isLiquidable(value) ? value[toLiquid](context) : value;
}

export function assignScore(obj: unknown): number {
  // TODO: drop protocol override?
  if (isString(obj)) return obj.length * 2;
  if (isArray(obj)) {
    return obj.reduce((a: number, b: unknown) => a + assignScore(b), 0);
  }
  if (obj instanceof Set) {
    let sum = 0;
    for (const val of obj.keys()) {
      sum += assignScore(val);
    }
    return sum;
  }
  if (obj instanceof Map) {
    let sum = 0;
    for (const val of obj.entries()) {
      sum += assignScore(val);
    }
    return sum;
  }
  if (isIterable(obj)) {
    let sum = 0;
    for (const val of obj) {
      sum += assignScore(val);
    }
    return sum;
  }
  if (isObject(obj)) {
    const seen: Set<object> = new Set();
    const stack: object[] = [obj];
    let sum = 0;

    while (stack.length) {
      const val = stack.pop();
      if (typeof val === "object") {
        if (!seen.has(val)) {
          seen.add(val);
          for (const [key, val] of Object.entries(obj)) {
            sum += assignScore(key);
            stack.push(val);
          }
        }
      } else {
        sum += assignScore(val);
      }
    }

    return sum;
  }
  return 1;
}
