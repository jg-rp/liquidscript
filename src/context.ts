/* eslint-disable sonarjs/cognitive-complexity */
import type { Environment } from "./environment";
import { Nothing } from "./runtime";
import { Drop } from "./drop";
import type { Template } from "./template";
import {
  isArray,
  isFunction,
  isIterable,
  isNumber,
  isNumeric,
  isObject,
  isPropertyKey,
  isString,
} from "./type_guards";
import type { ForLoop } from "./drops";
import * as drop from "./drop";
import type { Expression } from "./expression";
import { LiquidNumber } from "./number";
import { ContextDepthError, ResourceLimitError } from "./errors";
import { ChainPop, ChainPush, ReadOnlyChainMap } from "./chain_map";

/**
 * A mapping of template variable names to values.
 */
export type Namespace = Record<string, unknown>;

export type RenderContextOptions = {
  /**
   * Global template variables passed down from the Environment, Template,
   * Loader and arguments to `.render()` or `.renderSync()`.
   */
  globals?: Namespace;

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
};

/**
 * Options passed to `RenderContext.copy()`.
 */
export type ContextCopyOptions = {
  blockScope?: boolean;
  disabledTags?: Set<string>;
  template?: Template;
};

/**
 * Render-time state. A new render context is created automatically for every
 * call to `Template.render()` or `Template.renderSync()`.
 */
export class RenderContext {
  /**
   * A non-specific indicator of template local scope usage.
   */
  assignScore: number = 0;

  /**
   * A non-specific indicator of template local scope usage for the current
   * template and all partial templates combined.
   */
  assignScoreCumulative: number;

  /**
   * The number of times this render context has been extended or copied.
   */
  private contextDepth: number;

  /**
   * The namespace for `{% increment %}` and `{% decrement %}`.
   */
  private counters: Namespace = Object.create(null);

  /**
   * Names of tags that are disallowed in this context.
   */
  readonly disabledTags: Set<string> | undefined;

  /**
   * The Liquid environment this render context and associated template is
   * bound to.
   */
  readonly env: Environment;

  /**
   * A stack of `ForLoop` drops used to populate `forloop.parent`.
   */
  readonly forloops: ForLoop[] = [];

  /**
   * Developer-defined template variables passed down from the environment and
   * template.
   */
  private globals: Namespace;

  /**
   * A stack of interrupt signals used by `{% break %}` and `{% continue %}`,
   * for example.
   */
  readonly interrupts: symbol[] = [];

  /**
   * The namespace for variables defined with `{% assign %}` and
   * `{% capture %}`.
   */
  private locals: Namespace = Object.create(null);

  /**
   * Registers supporting stateful tags. It's OK to use this map for storing
   * custom tag state.
   */
  readonly registers = new Map<string | symbol, unknown>();

  /**
   * The number of nodes rendered for the current template.
   */
  renderScore: number = 0;

  /**
   * The number of nodes rendered for the current template and all partial
   * templates.
   */
  renderScoreCumulative: number;

  /**
   * The current template scope including `locals`, `globals` and `counters`.
   * New block-scoped namespaces get pushed onto and popped off this chain map.
   */
  private scopes: ReadOnlyChainMap;

  /**
   * The current template being rendered.
   */
  template: Template;

  constructor(template: Template, options?: RenderContextOptions) {
    this.template = template;
    this.env = template.env;

    this.globals = options?.globals ?? {};

    // NOTE: The use of ReadOnlyChainMap instead of an array and merge approach
    // results in a significant performance penalty for small scopes. We're
    // expecting that penalty to be less or reversed for larger, real world
    // scopes, and keeping it so developers can manipulate nested namespaces
    // after they've been "merged".
    //
    // Scopes are searched from right to left. New scopes are push on the right.
    this.scopes = new ReadOnlyChainMap(
      this.locals,
      this.globals,
      this.counters,
    );

    this.disabledTags = options?.disabledTags;
    this.contextDepth = options?.contextDepth ?? 0;
    this.assignScoreCumulative = options?.assignScoreCarry ?? 0;
    this.renderScoreCumulative = options?.renderScoreCarry ?? 0;
  }

  /**
   * Set `name` to `value` in the template local scope.
   */
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
    namespace: Record<string, unknown>,
    options: ContextCopyOptions = {},
  ): RenderContext {
    this.throwForContextDepth();
    let globals: Namespace;

    if (options.blockScope) {
      globals = new ReadOnlyChainMap(namespace, this.scopes);
    } else {
      globals = new ReadOnlyChainMap(namespace, this.globals);
    }

    const ctx = new RenderContext(options.template ?? this.template, {
      disabledTags: options.disabledTags,
      globals,
      contextDepth: this.contextDepth + 1,
      assignScoreCarry: this.assignScoreCumulative,
      renderScoreCarry: this.renderScoreCumulative,
    });

    for (const register of this.env.persistentRegisters) {
      if (this.registers.has(register)) {
        ctx.registers.set(register, this.registers.get(register));
      }
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

  /**
   * Temporarily extend this render context with variables from `namespace`.
   *
   * Push `namespace` to the front of the scope stack for the duration of
   * `callback.`
   *
   * If `template` is given, sets the current template for the duration of
   * `callback`, before restoring the previous template.
   *
   * This is used by the built-in `{% include %}` tag, where parent and partial
   * templates share render context state, with additional partial-scoped
   * variables.
   */
  async extend(
    namespace: Record<string, unknown>,
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

    this.scopes[ChainPush](namespace);
    this.contextDepth += 1;
    this.assignScore = 0;
    this.renderScore = 0;

    try {
      return await callback();
    } finally {
      if (template) this.template = originalTemplate;
      this.scopes[ChainPop]();
      this.contextDepth -= 1;
      this.assignScore = originalAssignScore;
      this.renderScore = originalRenderScore;
    }
  }

  /**
   * Temporarily extend this render context with variables from `namespace`.
   *
   * Push `namespace` to the front of the scope stack for the duration of
   * `callback.`
   *
   * If `template` is given, sets the current template for the duration of
   * `callback`, before restoring the previous template.
   *
   * This is used by the built-in `{% include %}` tag, where parent and partial
   * templates share render context state, with additional partial-scoped
   * variables.
   */
  extendSync(
    namespace: Record<string, unknown>,
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

    this.scopes[ChainPush](namespace);
    this.contextDepth += 1;
    this.assignScore = 0;
    this.renderScore = 0;

    try {
      return callback();
    } finally {
      if (template) this.template = originalTemplate;
      this.scopes[ChainPop]();
      this.contextDepth -= 1;
      this.assignScore = originalAssignScore;
      this.renderScore = originalRenderScore;
    }
  }

  /**
   * Return a register for `key`. If a register does not yet exist for key,
   * add and return the result of calling `defaultFactory`.
   */
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
    return this.scopes[name];
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
      } else {
        obj = resolveUnknownSegment(obj, segment);
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
        obj = resolveUnknownSegment(obj, segment);
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

  /**
   * Evaluate `expression` and coerce the result to an array.
   */
  async toArray(expression: Expression | undefined): Promise<unknown[]> {
    return expression
      ? this.env.toArray(await expression.evaluate(this), this, expression.span)
      : [];
  }

  /**
   * Evaluate `expression` and coerce the result to an array.
   */
  toArraySync(expression: Expression | undefined): unknown[] {
    return expression
      ? this.env.toArray(expression.evaluateSync(this), this, expression.span)
      : [];
  }

  /**
   * Evaluate `expression` and coerce the result to an integer.
   */
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

  /**
   * Evaluate `expression` and coerce the result to an integer.
   */
  toIntegerSync<T>(
    expression: Expression | undefined,
    default_: T,
  ): number | T {
    return expression
      ? this.env.toInteger(expression.evaluateSync(this), this, expression.span)
      : default_;
  }
}

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

function resolveUnknownSegment(obj: unknown, segment: unknown): unknown {
  if (segment == "size") {
    if (isNumeric(obj)) return 8; // Close enough, most of the time.
    return Nothing;
  }

  return Nothing;
}

export function assignScoreOf(obj: unknown): number {
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
