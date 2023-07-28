import { Root } from "./ast";
import { registerBuiltin } from "./builtin/register";
import { chainObjects } from "./chain_object";
import { LRUCache } from "./cache";
import { RenderContext } from "./context";
import { Filter } from "./filter";
import { compileRules, tokenizerFor } from "./lex";
import { Loader } from "./loader";
import { MapLoader } from "./builtin/loaders";
import { Parser, TemplateParser } from "./parse";
import { Tag } from "./tag";
import { Template } from "./template";
import { TemplateTokenStream, Token } from "./token";
import { LaxUndefined, Undefined } from "./undefined";
import { ContextScope } from "./types";
import { LiquidSyntaxError } from "./errors";
import {
  BufferedRenderStream,
  LimitedRenderStream,
  RenderStream,
} from "./io/output_stream";

const implicitEnvironmentCache = new LRUCache<string, Environment>(10);

/**
 * Liquid environment options.
 */
export type EnvironmentOptions = {
  /**
   * When `true`, render context variables will be HTML escaped before output.
   * @defaultValue `false`
   */
  autoEscape?: boolean;

  /**
   * An optional object who's properties will be added to the render context
   * of every template rendered from this environment.
   *
   * `globals` is not copied, so updates to it after environment construction
   * will be visible to templates.
   * @defaultValue An empty `Object`.
   */
  globals?: ContextScope;

  /**
   * A template loader. Used to load templates from a file system or database,
   * for example.
   * @defaultValue An empty `MapLoader`.
   */
  loader?: Loader;

  /**
   * The maximum number of times a render context can be copied or extended.
   * This helps us guard against recursive use of the `include` or `render`
   * tags.
   * @defaultValue 30
   */
  maxContextDepth?: number;

  /**
   * The maximum "size" of a render context local namespace. Rather than the
   * number of bytes in memory a local namespace occupies, "size" is a non-
   * specific indication of how much a template uses the local namespace when
   * it is rendered, typically using the `assign` and `capture` tags.
   *
   * If `localNamespaceLimit` is `undefined` or less than 0, there is no limit.
   * Otherwise a `LocalNamespaceLimitError`is thrown when the namespace's size
   * exceeds the limit.
   * @defaultValue undefined
   */
  localNamespaceLimit?: number;

  /**
   * The maximum number of loop iteration allowed before a `LoopIterationLimitError`
   * is thrown.
   *
   * If `loopIterationLimit` is undefined or less than 0, there is no soft limit.
   * @defaultValue undefined
   */
  loopIterationLimit?: number;

  /**
   * The maximum number of bytes that can be written to a template's output
   * stream, per render, before an `OutputStreamLimitError` is thrown.
   *
   * If `outputStreamLimit` is undefined or less than 0, there is no soft limit.
   * @defaultValue undefined
   */
  outputStreamLimit?: number;

  /**
   * The sequence of characters indicating the start of a liquid output statement.
   * @defaultValue `{{`
   */
  statementStartString?: string;

  /**
   * The sequence of characters indicating the end of a liquid output statement.
   * @defaultValue `}}`
   */
  statementEndString?: string;

  /**
   * When `true`, a `NoSuchFilterError` will be raised if a template attempts
   * to use an undefined filter. When `false`, undefined filters are silently
   * ignored.
   * @defaultValue `true`
   */
  strictFilters?: boolean;

  /**
   * The sequence of characters indicating the start of a liquid tag.
   * @defaultValue `{%`
   */
  tagStartString?: string;

  /**
   * The sequence of characters indicating the end of a liquid tag.
   * @defaultValue `}}`
   */
  tagEndString?: string;

  /**
   * A function that accepts the name of a template variable name and
   * returns a subclass of `Undefined`.
   * @defaultValue A `LaxUndefined` factory function.
   */
  undefinedFactory?: (name: string) => Undefined;

  /**
   * A factory function that will be used to create a render stream
   * for each template rendered from the environment.
   */
  renderStreamFactory?: () => RenderStream;
};

/**
 * Optional meta data and utilities for managing liquid templates.
 */
export type TemplateContext = {
  /**
   * A name or identifier for the template. This name will be used
   * in error messages.
   */
  name?: string;

  /**
   * Extra global render context variables. Usually added by a
   * template loader.
   */
  matter?: ContextScope;

  /**
   * Additional, arbitrary data that a loader can use to scope or
   * otherwise narrow its search space.
   */
  loaderContext?: ContextScope;

  /**
   * A function that will return `true` if this template is up to
   * date, or `false` if it needs to be loaded again.
   */
  upToDate?: () => Promise<boolean>;

  /**
   * A synchronous version of `upToDate`.
   */
  upToDateSync?: () => boolean;
};

/**
 * Shared configuration from which templates can be loaded and parsed.
 * @see {@link EnvironmentOptions}
 */
export class Environment {
  public autoEscape: boolean;
  public globals: ContextScope;
  public loader: Loader;
  public maxContextDepth: number;
  public localNamespaceLimit: number;
  public loopIterationLimit: number;
  private _outputStreamLimit: number;
  readonly statementStartString: string;
  readonly statementEndString: string;
  public strictFilters: boolean;
  readonly tagStartString: string;
  readonly tagEndString: string;
  protected templateClass: typeof Template = Template;
  readonly undefinedFactory: (name: string) => Undefined;
  public renderStreamFactory: (stream?: RenderStream) => RenderStream;

  /**
   * An object mapping filter names to filter functions.
   */
  readonly filters: { [keys: string]: Filter } = {};

  /**
   * An object mapping tag names to tag implementations.
   */
  readonly tags: { [keys: string]: Tag } = {};

  #tokenRules: RegExp;
  #tokenize: (source: string) => Generator<Token>;
  #parser: Parser;

  /**
   * Environment constructor.
   *
   * @param options - Environment options.
   */
  constructor({
    autoEscape,
    globals,
    loader,
    maxContextDepth,
    localNamespaceLimit,
    loopIterationLimit,
    outputStreamLimit,
    statementStartString,
    statementEndString,
    strictFilters,
    tagStartString,
    tagEndString,
    undefinedFactory,
    renderStreamFactory,
  }: EnvironmentOptions = {}) {
    this.autoEscape = autoEscape ?? false;
    this.globals = globals ?? {};
    this.loader = loader ?? new MapLoader();
    this.maxContextDepth = maxContextDepth ?? 30;
    this.localNamespaceLimit = localNamespaceLimit ?? -1;
    this.loopIterationLimit = loopIterationLimit ?? -1;
    this._outputStreamLimit = outputStreamLimit ?? -1;
    this.statementStartString = statementStartString ?? "{{";
    this.statementEndString = statementEndString ?? "}}";
    this.strictFilters = strictFilters ?? true;
    this.tagStartString = tagStartString ?? "{%";
    this.tagEndString = tagEndString ?? "%}";
    this.undefinedFactory = undefinedFactory ?? LaxUndefined.from;

    this.renderStreamFactory =
      renderStreamFactory ?? _makeRenderStreamFactory(this._outputStreamLimit);

    this.#tokenRules = compileRules(
      this.statementStartString,
      this.statementEndString,
      this.tagStartString,
      this.tagEndString,
    );

    this.#tokenize = tokenizerFor(
      this.#tokenRules,
      this.statementStartString,
      this.statementEndString,
      this.tagStartString,
      this.tagEndString,
    );

    this.#parser = new TemplateParser(this);

    registerBuiltin(this);
  }

  /**
   * Return an environment configured with the given options. The `globals`
   * and `loader` options are ignored when creating implicit environments.
   *
   * @param options - Options for the implicit environment.
   */
  static getImplicitEnvironment(options: EnvironmentOptions = {}): Environment {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { globals, loader, ...opts } = options;
    const cacheKey = JSON.stringify(opts, Object.keys(opts).sort());
    let env = implicitEnvironmentCache.get(cacheKey);
    if (!env) {
      env = new Environment(opts);
      implicitEnvironmentCache.set(cacheKey, env);
    }
    return env;
  }

  /**
   * Load a template using the configured template loader.
   * @param name - The name or identifier of the template to load.
   * @param globals - An optional object who's properties will be added
   * to the render context every time the resulting template is rendered.
   * @param context - A reference to the active render context, if one is
   * active.
   * @param loaderContext - Additional, arbitrary data that a loader can use
   * to scope or otherwise narrow its search space.
   * @returns A `Template` bound to this environment, ready to be rendered.
   * @throws `NoSuchTemplateError` if a template with the given name can not
   * be found.
   */
  public async getTemplate(
    name: string,
    globals?: ContextScope,
    context?: RenderContext,
    loaderContext?: { [index: string]: unknown },
  ): Promise<Template> {
    return this.loader.load(name, this, context, globals, loaderContext);
  }

  /**
   * A synchronous version of `Environment.getTemplate()`.
   * @see {@link getTemplate}
   */
  public getTemplateSync(
    name: string,
    globals?: ContextScope,
    context?: RenderContext,
    loaderContext?: { [index: string]: unknown },
  ): Template {
    return this.loader.loadSync(name, this, context, globals, loaderContext);
  }

  /**
   * Parse the given string as a Liquid template.
   * @param source - The Liquid template source code.
   * @param globals - An optional object who's properties will be added
   * to the render context every time the resulting template is rendered.
   * @param templateContext - Optional meta data. Mostly for managing loading
   * and reloading of templates.
   * @returns A `Template` bound to this environment, ready to be rendered.
   * @throws `NoSuchTemplateError` if a template with the given name can not
   * be found.
   */
  public fromString(
    source: string,
    globals?: ContextScope,
    templateContext: TemplateContext = {},
  ): Template {
    return new this.templateClass(
      this,
      this.parse(source, templateContext?.name),
      this.makeGlobals(globals),
      templateContext,
    );
  }

  /**
   * Add a filter to this environment.
   *
   * @param name - The filter's name, as used by template authors to apply
   * the filter.
   * @param filter - A function implementing the filter.
   */
  public addFilter(name: string, filter: Filter): void {
    this.filters[name] = filter;
  }

  /**
   * Add a tag to this environment.
   *
   * @param name - The tag's name, as used by template authors to use the
   * tag.
   * @param tag - An object implementing the Tag interface.
   */
  public addTag(name: string, tag: Tag): void {
    this.tags[name] = tag;
  }

  /**
   * Re-throw an error.
   *
   * Override this method if you want to implement a "lax mode".
   */
  public error(err: Error): void {
    throw err;
  }

  get parser(): Parser {
    return this.#parser;
  }

  protected parse(source: string, name?: string): Root {
    try {
      return this.parser.parse(new TemplateTokenStream(this.#tokenize(source)));
    } catch (error) {
      if (error instanceof LiquidSyntaxError) {
        throw error.withTemplateName(name);
      }
      throw error;
    }
  }

  protected makeGlobals(templateGlobals?: ContextScope): ContextScope {
    if (templateGlobals === undefined) return this.globals;
    return chainObjects(templateGlobals, this.globals);
  }

  public get outputStreamLimit() {
    return this._outputStreamLimit;
  }

  public set outputStreamLimit(value: number) {
    // Update the render stream factory with the new limit.
    this._outputStreamLimit = value;
    this.renderStreamFactory = _makeRenderStreamFactory(
      this._outputStreamLimit,
    );
  }
}

function _makeRenderStreamFactory(
  limit: number,
): (buf?: RenderStream) => RenderStream {
  return limit > -1
    ? (buf?: RenderStream) => new LimitedRenderStream(limit - (buf?.size ?? 0))
    : () => new BufferedRenderStream();
}
