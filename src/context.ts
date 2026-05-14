import type { Environment } from "./environment";
import { Nothing } from "./runtime";
import { Drop } from "./drop";
import type { Template } from "./template";
import {
  isArray,
  isFunction,
  isNumber,
  isObject,
  isPropertyKey,
  isString,
} from "./type_guards";
import type { ForLoop } from "./drops";
import * as drop from "./drop";
import type { Expression } from "./expression";
import { LiquidNumber } from "./number";

export type Namespace = { [index: string]: unknown };

export type RenderContextOptions = {
  globals?: Namespace | Namespace[];
  disabledTags?: Set<string>;
};

export type ContextCopyOptions = {
  blockScope?: boolean;
  disabledTags?: Set<string>;
  template?: Template;
};

export class RenderContext {
  private counters: Namespace = Object.create(null);

  readonly disabledTags: Set<string> | undefined;

  readonly env: Environment;

  readonly forloops: ForLoop[] = [];

  private globals: Namespace | Namespace[];

  readonly interrupts: symbol[] = [];

  private locals: Namespace = Object.create(null);

  /**
   * Namespaces supporting stateful tags. It's OK to use this map for storing
   * custom tag state.
   */
  readonly registers = new Map<string | symbol, unknown>();

  private scopes: Namespace[];

  template: Template;

  constructor(template: Template, options?: RenderContextOptions) {
    this.template = template;
    this.env = template.env;

    // Scopes are searched from right to left. New scopes are push on the right.
    this.globals = options?.globals ?? {};

    if (isArray(this.globals)) {
      this.scopes = this.scopes = [
        this.counters,
        BuiltIn,
        ...this.globals,
        this.locals,
      ];
    } else {
      this.scopes = this.scopes = [
        this.counters,
        BuiltIn,
        this.globals,
        this.locals,
      ];
    }

    this.disabledTags = options?.disabledTags;
  }

  assign(name: string, value: unknown): void {
    // TODO: resource limit
    this.locals[name] = value;
  }

  copy(
    namespace: { [index: string]: unknown },
    options: ContextCopyOptions = {},
  ): RenderContext {
    // TODO: resource limits

    let globals: Namespace[];

    if (options.blockScope) {
      globals = [...this.scopes, namespace];
    } else if (isArray(this.globals)) {
      globals = [...this.globals, namespace];
    } else {
      globals = [this.globals, namespace];
    }

    const ctx = new RenderContext(options.template ?? this.template, {
      disabledTags: options.disabledTags,
      globals,
    });

    for (const register of this.env.persistentRegisters) {
      ctx.registers.set(register, this.registers.get(register));
    }

    return ctx;
  }

  decrement(name: string): number {
    let val = this.counters[name] as number | undefined;

    if (val === undefined) {
      val = 0;
    }

    val -= 1;
    this.counters[name] = val;
    return val;
  }

  async extend(
    namespace: { [index: string]: unknown },
    callback: () => Promise<void>,
    template?: Template,
  ) {
    // TODO: resource limits

    const originalTemplate = this.template;
    if (template) {
      this.template = template;
    }

    this.scopes.push(namespace);

    try {
      return await callback();
    } finally {
      if (template) {
        this.template = originalTemplate;
      }
      this.scopes.pop();
    }
  }

  extendSync(
    namespace: { [index: string]: unknown },
    callback: () => void,
    template?: Template,
  ) {
    // TODO: resource limits

    const originalTemplate = this.template;
    if (template) {
      this.template = template;
    }

    this.scopes.push(namespace);

    try {
      return callback();
    } finally {
      if (template) {
        this.template = originalTemplate;
      }
      this.scopes.pop();
    }
  }

  getRegister<V>(key: string | symbol, defaultFactory: () => V): V {
    if (!this.registers.has(key)) {
      this.registers.set(key, defaultFactory());
    }

    return this.registers.get(key) as V;
  }

  increment(name: string): number {
    let val = this.counters[name] as number | undefined;

    if (val === undefined) {
      val = 0;
    }

    this.counters[name] = val + 1;
    return val;
  }

  /**
   * Lookup `name` in the current scope. Return the special `Nothing` value if
   * `name` is not defined.
   */
  resolve(name: string): unknown {
    for (let i = this.scopes.length - 1; i >= 0; i--) {
      const scope = this.scopes[i] as { [index: string]: unknown };
      if (Object.prototype.hasOwnProperty.call(scope, name)) return scope[name];
    }
    return Nothing;
  }

  /**
   * Follow path segments starting at `obj`. If the path from `obj` does not
   * exist, the special `Nothing` value is returned along with the index of
   * the last segment to be successfully resolved.
   */
  async resolvePath(
    obj: unknown,
    segments: unknown[],
  ): Promise<[unknown, number]> {
    let segmentIndex = -1;

    for (let segment of segments) {
      segmentIndex += 1;

      if (segment instanceof LiquidNumber) {
        segment = segment.valueOf();
      }

      if (obj instanceof Drop) {
        if (segment instanceof Drop) {
          segment = await segment[drop.toLiquid]("string", this);
        }

        if (isProperty(obj, segment)) {
          const prop = obj[segment];

          if (isFunction(prop)) {
            if (obj[drop.isInvocable](segment)) {
              obj = Reflect.apply(prop, obj, []);
            } else {
              obj = Nothing;
            }
          } else {
            obj = prop;
          }
        } else if (isString(segment)) {
          obj = await obj[drop.dispatch](segment, this);
        } else {
          obj = Nothing;
        }
      } else if (isArray(obj)) {
        if (segment instanceof Drop) {
          segment = await segment[drop.toLiquid]("numeric", this);
        }

        obj = resolveArraySegment(obj, segment);
      } else if (isString(obj)) {
        obj = resolveStringSegment(obj, segment);
      } else if (isObject(obj)) {
        if (segment instanceof Drop) {
          segment = await segment[drop.toLiquid]("data", this);
        }

        obj = resolveObjectSegment(obj, segment);
      }

      if (obj === Nothing) return [Nothing, segmentIndex];
    }

    return [obj, segmentIndex];
  }

  /**
   * A sync version of `resolvePath`. The only difference is the handling of
   * the async Drop protocol.
   */
  resolvePathSync(obj: unknown, segments: unknown[]): [unknown, number] {
    let segmentIndex = -1;

    for (let segment of segments) {
      segmentIndex += 1;

      if (segment instanceof LiquidNumber) {
        segment = segment.valueOf();
      }

      if (obj instanceof Drop) {
        if (segment instanceof Drop) {
          segment = segment[drop.toLiquidSync]("string", this);
        }

        if (isProperty(obj, segment)) {
          const prop = obj[segment];

          if (isFunction(prop)) {
            if (obj[drop.isInvocable](segment)) {
              obj = Reflect.apply(prop, obj, []);
            } else {
              obj = Nothing;
            }
          } else {
            obj = prop;
          }
        } else if (isString(segment)) {
          obj = obj[drop.dispatchSync](segment, this);
        } else {
          obj = Nothing;
        }
      } else if (isArray(obj)) {
        if (segment instanceof Drop) {
          segment = segment[drop.toLiquidSync]("numeric", this);
        }

        obj = resolveArraySegment(obj, segment);
      } else if (isString(obj)) {
        obj = resolveStringSegment(obj, segment);
      } else if (isObject(obj)) {
        if (segment instanceof Drop) {
          segment = segment[drop.toLiquidSync]("string", this);
        }

        obj = resolveObjectSegment(obj, segment);
      } else {
        obj = Nothing;
      }

      if (obj === Nothing) return [Nothing, segmentIndex];
    }

    return [obj, segmentIndex];
  }

  async toArray(expression: Expression | undefined): Promise<unknown[]> {
    return expression
      ? this.env.toArray(await expression.evaluate(this), this, expression.span)
      : [];
  }

  toArraySync(expression: Expression | undefined): unknown[] {
    return expression
      ? this.env.toArray(expression.evaluateSync(this), this, expression.span)
      : [];
  }

  async toInteger<T>(
    expression: Expression | undefined,
    default_: T,
  ): Promise<number | T> {
    return expression
      ? this.env.toInteger(
          await expression.evaluate(this),
          this,
          expression.span,
        )
      : default_;
  }

  toIntegerSync<T>(
    expression: Expression | undefined,
    default_: T,
  ): number | T {
    return expression
      ? this.env.toInteger(expression.evaluateSync(this), this, expression.span)
      : default_;
  }
}

export const BuiltIn: Namespace = {
  // now: () => new Date(),
  // today: () => new Date(),
};

export class StaticContext {}

function normalizeIndex(index: unknown, length: number): number | undefined {
  if (!isNumber(index)) {
    return undefined;
  }

  if (index < 0 && length >= Math.abs(index)) return length + index;
  return index;
}

/**
 * Return true of `obj` or an object in the prototype chain of `obj` contains `key`.
 * Excludes `Object.prototype` and function valued properties. Getters are OK.
 */
function hasNonFunctionProperty(
  obj: object,
  key: unknown,
): key is keyof typeof obj {
  if (!isPropertyKey(key)) return false;

  for (let p = obj; p && p !== Object.prototype; p = Object.getPrototypeOf(p)) {
    if (Object.hasOwn(p, key) && !isFunction(obj[key as keyof typeof obj])) {
      return true;
    }
  }

  return false;
}

/**
 * Return true if `obj` or an object in the prototype chain of `obj` contains `key`.
 * Excludes `Object.prototype`. Properties may be functions.
 */
function isProperty(obj: object, key: unknown): key is keyof typeof obj {
  if (!isPropertyKey(key)) return false;

  for (let p = obj; p && p !== Object.prototype; p = Object.getPrototypeOf(p)) {
    if (Object.hasOwn(p, key)) {
      return true;
    }
  }

  return false;
}

function resolveArraySegment(obj: unknown[], segment: unknown): unknown {
  const normIndex = normalizeIndex(segment, obj.length);

  if (normIndex === undefined) {
    switch (segment) {
      case "first":
        return obj[0];
      case "last":
        return obj[obj.length - 1];
      case "size":
        return obj.length;
      default:
        return Nothing;
    }
  }

  if (normIndex in obj) {
    return obj[normIndex];
  }

  return Nothing;
}

function resolveStringSegment(obj: string, segment: unknown): unknown {
  switch (segment) {
    case "first":
      return obj[0];
    case "last":
      return obj[obj.length - 1];
    case "size":
      return obj.length;
    default:
      return Nothing;
  }
}

function resolveObjectSegment(obj: object, segment: unknown): unknown {
  if (hasNonFunctionProperty(obj, segment)) {
    return obj[segment as keyof typeof obj];
  }

  switch (segment) {
    case "first":
      return Object.entries(obj)[0];
    case "size":
      return Object.keys(obj).length;
    default:
      return Nothing;
  }
}
