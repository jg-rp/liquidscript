import { Context, ContextScope } from "./context";
import { Template } from "./template";
import { Tag } from "./tag";
import { Filter } from "./filter";
import { Undefined, StrictUndefined } from "./undefined";
import { Root } from "./ast";
import { Parser, TemplateParser } from "./parse";
import { tokenize } from "./lex";
import { TemplateTokenStream } from "./token";
import { Loader, MapLoader } from "./loader";
import { registerBuiltin } from "./builtin/register";
import { chainObjects } from "./chainObject";

export type EnvironmentOptions = {
  // TODO: Complete options
  // mode?
  autoEscape?: boolean;
  globals?: ContextScope;
  loader?: Loader;
  maxContextDepth?: number;
  undefinedFactory?: (name: string) => Undefined;
};

/**
 *
 */
export class Environment {
  public autoEscape: boolean;
  public globals: ContextScope;
  public maxContextDepth: number;
  public undefinedFactory: (name: string) => Undefined;
  public filters: { [keys: string]: Filter } = {};
  public tags: { [keys: string]: Tag } = {};
  public loader: Loader;
  private _parser: Parser;

  constructor({
    autoEscape,
    globals,
    loader,
    maxContextDepth,
    undefinedFactory,
  }: EnvironmentOptions = {}) {
    this.autoEscape = autoEscape === undefined ? false : autoEscape;
    this.globals = globals === undefined ? {} : globals;
    this.maxContextDepth = maxContextDepth === undefined ? 30 : maxContextDepth;
    this.undefinedFactory =
      undefinedFactory === undefined
        ? (name: string) => new StrictUndefined(name)
        : undefinedFactory;

    this.loader = loader === undefined ? new MapLoader() : loader;
    this._parser = new TemplateParser(this);
    registerBuiltin(this);
  }

  /**
   *
   * @param name
   * @returns
   */
  public undefined_(name: string): Undefined {
    // TODO: Change name/factory pattern?
    // XXX: Maybe use "missing" instead of "undefined"
    return this.undefinedFactory(name);
  }

  /**
   *
   * @param name
   * @param globals
   * @param context
   * @param loaderContext
   * @returns
   */
  public async getTemplate(
    name: string,
    globals?: ContextScope,
    context?: Context,
    loaderContext?: { [index: string]: unknown }
  ): Promise<Template> {
    return this.loader.load(name, this, context, globals, loaderContext);
  }

  public getTemplateSync(
    name: string,
    globals?: ContextScope,
    context?: Context,
    loaderContext?: { [index: string]: unknown }
  ): Template {
    return this.loader.loadSync(name, this, context, globals, loaderContext);
  }

  /**
   *
   * @param source
   * @param name
   * @param globals
   * @param matter
   * @returns
   */
  public fromString(
    source: string,
    name?: string,
    globals?: ContextScope,
    matter?: ContextScope
  ): Template {
    return new Template(
      this,
      this.parse(source),
      name || "",
      this.makeGlobals(globals),
      matter
    );
  }

  /**
   *
   * @param err
   */
  public error(err: Error): void {
    // TODO: implement
    throw err;
  }

  /**
   *
   * @returns
   */
  public getParser(): Parser {
    // TODO: Cache parser.
    return this._parser;
  }

  /**
   *
   * @param source
   * @returns
   */
  protected parse(source: string): Root {
    return this.getParser().parse(new TemplateTokenStream(tokenize(source)));
  }

  /**
   *
   * @param templateGlobals
   * @returns
   */
  public makeGlobals(templateGlobals?: ContextScope): ContextScope {
    if (templateGlobals === undefined) return this.globals;
    return chainObjects(templateGlobals, this.globals);
  }
}
