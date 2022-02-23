import {
  Context,
  ContextGlobals,
  ContextScope,
  isContextScope,
  ReadOnlyChainMap,
} from "./context";
import { Template, TemplateI } from "./template";
import { Tag } from "./tag";
import { Filter } from "./filter";
import { Undefined, StrictUndefined } from "./undefined";
import { Root } from "./ast";
import { Parser, TemplateParser } from "./parse";
import { tokenize } from "./lex";
import { TemplateTokenStream } from "./token";
import { Loader, MapLoader } from "./loader";
import { registerBuiltin } from "./builtin/register";

export type EnvironmentOptions = {
  // TODO: Complete options
  // mode?
  autoEscape?: boolean;
  globals?: ContextGlobals;
  maxContextDepth?: number;
  undefinedFactory?: (name: string) => Undefined;
};

/**
 *
 */
export class Environment {
  public autoEscape: boolean;
  public globals: ContextGlobals;
  public maxContextDepth: number;
  public undefinedFactory: (name: string) => Undefined;
  public filters: { [keys: string]: Filter } = {};
  public tags: { [keys: string]: Tag } = {};
  public loader: Loader;
  private _parser: Parser;

  /**
   *
   * @param param0
   */
  constructor({
    autoEscape,
    globals,
    maxContextDepth,
    undefinedFactory,
  }: EnvironmentOptions) {
    this.autoEscape = autoEscape === undefined ? false : autoEscape;
    this.globals = globals === undefined ? {} : globals;
    this.maxContextDepth = maxContextDepth === undefined ? 30 : maxContextDepth;
    this.undefinedFactory =
      undefinedFactory === undefined
        ? (name: string) => new StrictUndefined(name)
        : undefinedFactory;

    this.loader = new MapLoader();
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
    globals?: ContextGlobals,
    context?: Context,
    loaderContext?: { [index: string]: unknown }
  ): Promise<TemplateI> {
    return await this.loader.load(name, this, context, globals, loaderContext);
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
    globals?: ContextGlobals,
    matter?: ContextGlobals
  ): TemplateI {
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
  public makeGlobals(templateGlobals?: ContextGlobals): ContextGlobals {
    if (templateGlobals === undefined) return this.mapLike(this.globals);
    return new ReadOnlyChainMap(
      this.mapLike(templateGlobals),
      this.mapLike(this.globals)
    );
  }

  /**
   *
   * @param obj
   * @returns
   */
  protected mapLike(obj: ContextGlobals): ContextScope {
    if (isContextScope(obj)) return obj;
    return new Map<string, unknown>(Object.keys(obj).map((k) => [k, obj[k]]));
  }
}
