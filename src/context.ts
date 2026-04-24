import type { Environment } from "./environment";
import { Nothing } from "./runtime";
import { isDrop, toLiquid } from "./drop";
import type { Template } from "./template";
import { isArray, isNumber, isObject, isPropertyKey } from "./type_guards";
import type { ForLoop } from "./drops";

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
  public template: Template;

  readonly env: Environment;
  readonly disabledTags: Set<string> | undefined;
  readonly forloops: ForLoop[] = [];

  /**
   * Namespaces supporting stateful tags. It's OK to use this map for storing
   * custom tag state.
   */
  readonly registers = new Map<string | symbol, unknown>();

  readonly interrupts: symbol[] = [];

  private globals: Namespace | Namespace[];
  private locals: Namespace = {};
  private counters: Namespace = {};
  private scopes: Namespace[];

  constructor(template: Template, options: RenderContextOptions = {}) {
    this.template = template;
    this.env = template.env;

    // Scopes are searched from right to left. New scopes are push on the right.
    this.globals = options.globals ?? {};

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

    this.disabledTags = options.disabledTags;
  }

  /**
   * Lookup `name` in the current scope. Return the special `Nothing` value if
   * `name` is not defined.
   */
  public resolve(name: string): unknown {
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
  public async resolvePath(
    obj: unknown,
    segments: unknown[],
  ): Promise<[unknown, number]> {
    let segmentIndex = -1;

    for (let segment of segments) {
      segmentIndex += 1;

      if (isDrop(obj)) {
        // TODO: Pass property values through.
        // TODO: Call function valued properties only if they are whitelisted.
        // TODO: Fall back to catch-all async dispatch protocol.
        // TODO: Fall back to catch-all sync dispatch protocol.
        throw new Error("not implemented");
      }

      if (isArray(obj)) {
        if (isDrop(segment)) {
          segment = segment[toLiquid]("numeric", this);
        }

        const normIndex = normalizeIndex(segment, obj.length);
        if (normIndex === undefined) {
          return [Nothing, segmentIndex];
        }

        if (normIndex in obj) {
          obj = obj[normIndex];
        } else {
          return [Nothing, segmentIndex];
        }
      } else if (isObject(obj)) {
        if (isDrop(segment)) {
          segment = segment[toLiquid]("data", this);
        }

        if (
          segment === "__proto__" ||
          segment === "constructor" ||
          !isPropertyKey(segment)
        ) {
          return [Nothing, segmentIndex];
        }

        if (segment in obj) {
          obj = obj[segment as keyof typeof obj];
        } else {
          return [Nothing, segmentIndex];
        }
      }
    }

    return [obj, segmentIndex];
  }

  /**
   * A sync version of `resolvePath`. The only difference is the handling of
   * the async Drop protocol.
   */
  public resolvePathSync(obj: unknown, segments: unknown[]): [unknown, number] {
    let segmentIndex = -1;

    for (let segment of segments) {
      segmentIndex += 1;

      if (isDrop(obj)) {
        // TODO: Pass property values through.
        // TODO: Call function valued properties only if they are whitelisted.
        // TODO: Fall back to catch-all async dispatch protocol.
        throw new Error("not implemented");
      }

      if (isArray(obj)) {
        if (isDrop(segment)) {
          segment = segment[toLiquid]("numeric", this);
        }

        const normIndex = normalizeIndex(segment, obj.length);
        if (normIndex === undefined) {
          return [Nothing, segmentIndex];
        }

        if (normIndex in obj) {
          obj = obj[normIndex];
        } else {
          return [Nothing, segmentIndex];
        }
      } else if (isObject(obj)) {
        if (isDrop(segment)) {
          segment = segment[toLiquid]("data", this);
        }

        if (
          segment === "__proto__" ||
          segment === "constructor" ||
          !isPropertyKey(segment)
        ) {
          return [Nothing, segmentIndex];
        }

        if (segment in obj) {
          obj = obj[segment as keyof typeof obj];
        } else {
          return [Nothing, segmentIndex];
        }
      }
    }

    return [obj, segmentIndex];
  }

  public assign(name: string, value: unknown): void {
    // TODO: resource limit
    this.locals[name] = value;
  }

  public async extend(
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

  public extendSync(
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

  public copy(
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
}

/**
 * An object implementing the special, built-in `now` and `today` objects.
 */
export const BuiltIn = {
  now: () => new Date(),
  today: () => new Date(),
};

export class StaticContext {}

function normalizeIndex(index: unknown, length: number): number | undefined {
  if (!isNumber(index)) {
    return undefined;
  }

  if (index < 0 && length >= Math.abs(index)) return length + index;
  return index;
}
