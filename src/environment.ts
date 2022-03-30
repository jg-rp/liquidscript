import { Root } from "./ast";
import { registerBuiltin } from "./builtin/register";
import { chainObjects } from "./chain_object";
import { LRUCache } from "./cache";
import { ContextScope, RenderContext } from "./context";
import { Filter } from "./filter";
import { compileRules, tokenizerFor } from "./lex";
import { Loader } from "./loader";
import { MapLoader } from "./builtin/loaders";
import { Parser, TemplateParser } from "./parse";
import { Tag } from "./tag";
import { Template } from "./template";
import { TemplateTokenStream, Token } from "./token";
import { LaxUndefined, Undefined } from "./undefined";
import { LiquidSyntaxError } from "./errors";

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
  readonly statementStartString: string;
  readonly statementEndString: string;
  public strictFilters: boolean;
  readonly tagStartString: string;
  readonly tagEndString: string;
  protected templateClass: typeof Template = Template;
  readonly undefinedFactory: (name: string) => Undefined;

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

  constructor({
    autoEscape,
    globals,
    loader,
    maxContextDepth,
    statementStartString,
    statementEndString,
    strictFilters,
    tagStartString,
    tagEndString,
    undefinedFactory,
  }: EnvironmentOptions = {}) {
    this.autoEscape = autoEscape ?? false;
    this.globals = globals ?? {};
    this.loader = loader ?? new MapLoader();
    this.maxContextDepth = maxContextDepth ?? 30;
    this.statementStartString = statementStartString ?? "{{";
    this.statementEndString = statementEndString ?? "}}";
    this.strictFilters = strictFilters ?? true;
    this.tagStartString = tagStartString ?? "{%";
    this.tagEndString = tagEndString ?? "%}";
    this.undefinedFactory = undefinedFactory ?? LaxUndefined.from;

    this.#tokenRules = compileRules(
      this.statementStartString,
      this.statementEndString,
      this.tagStartString,
      this.tagEndString
    );

    this.#tokenize = tokenizerFor(
      this.#tokenRules,
      this.statementStartString,
      this.statementEndString,
      this.tagStartString,
      this.tagEndString
    );

    this.#parser = new TemplateParser(this);

    registerBuiltin(this);
  }

  static getImplicitEnvironment(options: EnvironmentOptions = {}): Environment {
    const cacheKey = JSON.stringify(options, Object.keys(options).sort());
    let env = implicitEnvironmentCache.get(cacheKey);
    if (!env) {
      env = new Environment(options);
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
    loaderContext?: { [index: string]: unknown }
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
    loaderContext?: { [index: string]: unknown }
  ): Template {
    return this.loader.loadSync(name, this, context, globals, loaderContext);
  }

  /**
   * Parse the given string as a Liquid template.
   * @param source - The Liquid template source code.
   * @param name - An optional name identifying the template.
   * @param globals - An optional object who's properties will be added
   * to the render context every time the resulting template is rendered.
   * @param matter - Extra globals, usually added by a template loader.
   * @returns A `Template` bound to this environment, ready to be rendered.
   * @throws `NoSuchTemplateError` if a template with the given name can not
   * be found.
   */
  public fromString(
    source: string,
    name?: string,
    globals?: ContextScope,
    matter?: ContextScope,
    upToDate?: () => Promise<boolean>,
    upToDateSync?: () => boolean
  ): Template {
    return new this.templateClass(
      this,
      this.parse(source, name),
      name || "",
      this.makeGlobals(globals),
      matter,
      upToDate,
      upToDateSync
    );
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
}
