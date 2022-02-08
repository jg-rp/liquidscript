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
import { TemplateParser } from "./parse";
import { tokenize } from "./lex";
import { TemplateTokenStream } from "./token";
import { Loader, MapLoader } from "./loader";
import { OutputStatement } from "./builtin/tags/statement";
import { append } from "./builtin/filters/string";

export interface Environment {
  // mode: Mode;

  /**
   *
   */
  autoEscape: boolean;

  /**
   *
   */
  filters: { [keys: string]: Filter };

  /**
   *
   */
  maxContextDepth: number;

  /**
   *
   */
  tags: { [keys: string]: Tag };

  /**
   *
   * @param name
   * @param loaderContext
   * @param context
   */
  getTemplate(
    name: string,
    globals?: ContextGlobals,
    context?: Context,
    loaderContext?: { [index: string]: unknown }
  ): Promise<TemplateI>;

  /**
   *
   * @param source
   * @param name
   * @param globals
   * @param matter
   */
  fromString(
    source: string,
    name?: string,
    globals?: ContextGlobals,
    matter?: ContextGlobals
  ): TemplateI;

  /**
   *
   * @param name
   */
  undefined_(name: string): Undefined;

  /**
   *
   * @param err
   */
  error(err: Error): void;
}

export type EnvironmentOptions = {
  // mode?
  autoEscape?: boolean;
  globals?: ContextGlobals;
  maxContextDepth?: number;
  undefinedFactory?: (name: string) => Undefined;
};

export class DefaultEnvironment implements Environment {
  public autoEscape: boolean;
  public globals: ContextGlobals;
  public maxContextDepth: number;
  public undefinedFactory: (name: string) => Undefined;

  public filters: { [keys: string]: Filter } = {};
  public tags: { [keys: string]: Tag } = {};
  public loader: Loader;

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

    // XXX: For early testing.
    this.tags["statement"] = new OutputStatement();
    this.filters["append"] = append;
  }

  undefined_(name: string): Undefined {
    // TODO: Change name/factory pattern?
    return this.undefinedFactory(name);
  }

  async getTemplate(
    name: string,
    globals?: ContextGlobals,
    context?: Context,
    loaderContext?: { [index: string]: unknown }
  ): Promise<TemplateI> {
    return await this.loader.load(name, this, context, globals, loaderContext);
  }

  fromString(
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

  error(err: Error): void {
    // TODO: implement
    throw err;
  }

  protected parse(source: string): Root {
    // TODO: Cache parser.
    const parser = new TemplateParser(this);
    return parser.parse(new TemplateTokenStream(tokenize(source)));
  }

  protected makeGlobals(templateGlobals?: ContextGlobals): ContextGlobals {
    if (templateGlobals === undefined) return this.mapLike(this.globals);
    return new ReadOnlyChainMap(
      this.mapLike(templateGlobals),
      this.mapLike(this.globals)
    );
  }

  protected mapLike(obj: ContextGlobals): ContextScope {
    if (isContextScope(obj)) return obj;
    return new Map<string, unknown>(Object.keys(obj).map((k) => [k, obj[k]]));
  }
}
