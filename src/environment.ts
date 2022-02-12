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
import { TemplateTokenStream, TOKEN_LITERAL } from "./token";
import { Loader, MapLoader } from "./loader";
import { OutputStatement } from "./builtin/tags/statement";
import { append } from "./builtin/filters/string";
import { IfTag } from "./builtin/tags/if";
import { TemplateLiteral } from "./builtin/tags/literal";
import { UnlessTag } from "./builtin/tags/unless";
import { BreakTag, ContinueTag, ForTag } from "./builtin/tags/for";
import { CaseTag } from "./builtin/tags/case";
import { AssignTag } from "./builtin/tags/assign";
import { join } from "./builtin/filters/array";
import { CaptureTag } from "./builtin/tags/capture";
import { IncrementTag } from "./builtin/tags/increment";
import { DecrementTag } from "./builtin/tags/decrement";
import { TableRowTag } from "./builtin/tags/tablerow";

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
   */
  getParser(): Parser;

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
    this.tags[TOKEN_LITERAL] = new TemplateLiteral();
    this.tags["statement"] = new OutputStatement();
    this.tags["if"] = new IfTag();
    this.tags["unless"] = new UnlessTag();
    this.tags["for"] = new ForTag();
    this.tags["break"] = new BreakTag();
    this.tags["continue"] = new ContinueTag();
    this.tags["case"] = new CaseTag();
    this.tags["assign"] = new AssignTag();
    this.tags["capture"] = new CaptureTag();
    this.tags["increment"] = new IncrementTag();
    this.tags["decrement"] = new DecrementTag();
    this.tags["tablerow"] = new TableRowTag();

    this.filters["append"] = append;
    this.filters["join"] = join;
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

  getParser(): Parser {
    // TODO: Cache parser.
    return new TemplateParser(this);
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
