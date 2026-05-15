import type { Environment } from "./environment";
import { Nothing } from "./runtime";
import { Drop } from "./drop";
import type { Template } from "./template";
import {
  isArray,
  isFunction,
  isIterable,
  isNumber,
  isObject,
  isPropertyKey,
  isString,
} from "./type_guards";
import type { ForLoop } from "./drops";
import * as drop from "./drop";
import type { Expression } from "./expression";
import { LiquidNumber } from "./number";
import { ContextDepthError, ResourceLimitError } from "./errors";

export type Namespace = { [index: string]: unknown };

export type RenderContextOptions = {
  /**
   * Global template variables passed down from the Environment, Template,
   * Loader and arguments to `.render()` or `.renderSync()`.
   */
  globals?: Namespace | Namespace[];

  /**
   * A set of tag names that are disallowed in this render context. For
   * example, the `include` tag is not allowed in templates rendered
   * with the `render` tag.
   */
  disabledTags?: Set<string>;

  /**
   * The number of times this render context has been copied or extended. This
   * helps us guard against recursive use of `include` and `render` tags.
   */
  contextDepth?: number;

  /**
   * The cumulative assign score (approximate bytes in the local scope) carried
   * from parent render contexts.
   */
  assignScoreCarry?: number;

  /**
   * The cumulative render score (nodes rendered) carried from parent render
   * contexts.
   */
  renderScoreCarry?: number;

  /**
   * The cumulative write score (bytes written) carried from parent render
   * contexts.
   */
  writeScoreCarry?: number;
};

export type ContextCopyOptions = {
  blockScope?: boolean;
  disabledTags?: Set<string>;
  template?: Template;
};

export class RenderContext {
  assignScore: number = 0;

  assignScoreCumulative: number;

  private contextDepth: number;

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

  renderScore: number = 0;

  renderScoreCumulative: number;

  private scopes: Namespace[];

  template: Template;

  writeScore: number;

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
    this.contextDepth = options?.contextDepth ?? 0;
    this.assignScoreCumulative = options?.assignScoreCarry ?? 0;
    this.renderScoreCumulative = options?.renderScoreCarry ?? 0;
    this.writeScore = options?.writeScoreCarry ?? 0;
  }

  assign(name: string, value: unknown): void {
    if (this.env.maxAssignScore || this.env.maxAssignScoreCumulative) {
      const score = assignScoreOf(value);
      this.assignScore += score;
      this.assignScoreCumulative += score;
      if (
        (this.env.maxAssignScore &&
          this.assignScore > this.env.maxAssignScore) ||
        (this.env.maxAssignScoreCumulative &&
          this.assignScoreCumulative > this.env.maxAssignScoreCumulative)
      ) {
        throw new ResourceLimitError("memory limits exceeded");
      }
    }

    this.locals[name] = value;
  }

  /**
   * Return a new render context with render state from this context.
   *
   * The caller is responsible for updating renderScoreCumulative when the new
   * context is no longer needed.
   */
  copy(
    namespace: { [index: string]: unknown },
    options: ContextCopyOptions = {},
  ): RenderContext {
    this.throwForContextDepth();
    let globals: Namespace[];

    // TODO: chain object instead of merge?
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
      contextDepth: this.contextDepth + 1,
      assignScoreCarry: this.assignScoreCumulative,
      renderScoreCarry: this.renderScoreCumulative,
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
    this.throwForContextDepth();

    const originalAssignScore = this.assignScore;
    const originalRenderScore = this.renderScore;
    const originalTemplate = this.template;
    if (template) {
      this.template = template;
    }

    this.scopes.push(namespace);
    this.contextDepth += 1;
    this.assignScore = 0;
    this.renderScore = 0;

    try {
      return await callback();
    } finally {
      if (template) this.template = originalTemplate;
      this.scopes.pop();
      this.contextDepth -= 1;
      this.assignScore = originalAssignScore;
      this.renderScore = originalRenderScore;
    }
  }

  extendSync(
    namespace: { [index: string]: unknown },
    callback: () => void,
    template?: Template,
  ) {
    this.throwForContextDepth();

    const originalAssignScore = this.assignScore;
    const originalRenderScore = this.renderScore;
    const originalTemplate = this.template;
    if (template) {
      this.template = template;
    }

    this.scopes.push(namespace);
    this.contextDepth += 1;
    this.assignScore = 0;
    this.renderScore = 0;

    try {
      return callback();
    } finally {
      if (template) this.template = originalTemplate;
      this.scopes.pop();
      this.contextDepth -= 1;
      this.assignScore = originalAssignScore;
      this.renderScore = originalRenderScore;
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

  private throwForContextDepth(): void {
    if (this.contextDepth + 1 > this.env.maxContextDepth) {
      throw new ContextDepthError(
        "maximum context depth reached, possible recursive render",
      );
    }
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
function isNonFunctionProperty(
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
  if (isNonFunctionProperty(obj, segment)) {
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

export function assignScoreOf(obj: unknown): number {
  // TODO: drop protocol override?
  if (isString(obj)) return obj.length * 2;
  if (isArray(obj)) {
    return obj.reduce((a: number, b: unknown) => a + assignScoreOf(b), 0);
  }
  if (obj instanceof Set) {
    let sum = 0;
    for (const val of obj.keys()) {
      sum += assignScoreOf(val);
    }
    return sum;
  }
  if (obj instanceof Map) {
    let sum = 0;
    for (const val of obj.entries()) {
      sum += assignScoreOf(val);
    }
    return sum;
  }
  if (isIterable(obj)) {
    let sum = 0;
    for (const val of obj) {
      sum += assignScoreOf(val);
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
          for (const [k, v] of Object.entries(obj)) {
            sum += assignScoreOf(k);
            stack.push(v);
          }
        }
      } else {
        sum += assignScoreOf(val);
      }
    }

    return sum;
  }
  return 1;
}
