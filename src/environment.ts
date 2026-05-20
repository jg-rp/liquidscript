import type { Filter } from "./filter";
import { LegacyLexer } from "./legacy_lexer";
import { LegacyParser } from "./legacy_parser";
import type { Block, Tag } from "./markup";
import {
  containsSync,
  Drop,
  equals,
  lessThanSync,
  toHTMLSafeStringSync,
  toLiquidSync,
} from "./drop";
import * as tags from "./tags";
import * as filters from "./filters";
import { Template } from "./template";
import type { Token } from "./token";
import {
  isArray,
  isBoolean,
  isIterable,
  isNumber,
  isNumeric,
  isObject,
  isPropertyKey,
  isString,
} from "./type_guards";
import type { Namespace, RenderContext } from "./context";
import { TemplateTypeError } from "./errors";
import { Undefined } from "./drops/undefined";
import { isLiquidNumber, isPrimitiveNumber, LiquidNumber } from "./number";
import type { TemplateLoader } from "./loader";
import { MapLoader } from "./loaders";
import { Nothing } from "./runtime";
import { stringOutputBufferFactory, type BufferFactory } from "./output";
import { escape } from "./escape";
import { ReadOnlyChainMap } from "./chain_map";

export interface _Parser {
  parse(
    env: Environment,
    source: string,
    templateName: string,
    startIndex?: number,
  ): Block;
}

export interface _Lexer {
  tokenize(env: Environment, source: string, startIndex?: number): Token[];
}

export interface _Undefined {
  new (
    path: string,
    token: Token,
    source: string,
    templateName: string,
  ): Undefined;
}

/**
 * Additional info accompanying template source code.
 */
export type TemplateMeta = {
  /**
   * Template name or identifier.
   */
  name: string;

  /**
   * Fully qualified path to `name`.
   */
  path?: string;

  /**
   * Additional template global variables.
   */
  overlay?: Namespace;

  /**
   * A function returning `true` if the template is up to date, or
   * `false` if it needs to be loaded again.
   */
  upToDate?: () => Promise<boolean>;

  /**
   * A function returning `true` if the template is up to date, or
   * `false` if it needs to be loaded again.
   */
  upToDateSync?: () => boolean;
};

/**
 * Options for the `Environment` constructor.
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
  globals?: Namespace;

  /**
   * A template loader. Used to load templates from a file system or database,
   * for example.
   * @defaultValue An empty `MapLoader`.
   */
  loader?: TemplateLoader;

  /**
   * The maximum assign score allowed per template before a resource limit
   * error is thrown.
   */
  maxAssignScore?: number;

  /**
   * The maximum combined assign score allowed for a template and any rendered
   * partial templates before a resource limit error is thrown.
   */
  maxAssignScoreCumulative?: number;

  /**
   * The maximum number of times a render context can be copied or extended
   * before throwing a resource limit error.
   * @defaultValue 30
   */
  maxContextDepth?: number;

  /**
   * The maximum number of bytes that can be written to an output buffer before
   * a resource limit error is thrown.
   */
  maxRenderSize?: number;

  /**
   * The maximum render score allowed per template before a resource limit
   * error is thrown.
   */
  maxRenderScore?: number;

  /**
   * The maximum combined render score allowed for a template and any rendered
   * partial templates before a resource limit error is thrown.
   */
  maxRenderScoreCumulative?: number;

  /**
   * When `true`, a `NoSuchFilterError` will be raised if a template attempts
   * to use an undefined filter. When `false`, undefined filters are silently
   * ignored.
   * @defaultValue `true`
   */
  strictFilters?: boolean;

  /**
   * The `Undefined` type used when a variable or property can not be resolved.
   * @defaultValue `Undefined`
   */
  undefinedType?: _Undefined;
};

/**
 * Template engine configuration from which templates can be loaded and parsed.
 */
export class Environment {
  autoEscape: boolean;

  bufferFactory: BufferFactory;

  filters: { [key: string]: Filter };

  globals: Namespace | undefined;

  lexer: _Lexer = LegacyLexer;

  loader: TemplateLoader;

  maxAssignScore?: number;

  maxAssignScoreCumulative?: number;

  maxContextDepth: number;

  maxRenderScore?: number;

  maxRenderScoreCumulative?: number;

  maxRenderSize?: number;

  parser: _Parser = LegacyParser;

  persistentRegisters: Set<string> = new Set();

  strictFilters: boolean;

  tags: { [key: string]: Tag };

  undefinedType: _Undefined;

  constructor(options?: EnvironmentOptions) {
    this.tags = Object.create(null);
    this.filters = Object.create(null);
    this.setupTags();
    this.setupFilters();

    this.autoEscape = options?.autoEscape ?? false;
    this.globals = options?.globals;
    this.loader = options?.loader ?? new MapLoader();
    this.maxAssignScore = options?.maxAssignScore;
    this.maxAssignScoreCumulative = options?.maxAssignScoreCumulative;
    this.maxContextDepth = options?.maxContextDepth ?? 30;
    this.maxRenderSize = options?.maxRenderSize;
    this.maxRenderScore = options?.maxRenderScore;
    this.maxRenderScoreCumulative = options?.maxRenderScoreCumulative;
    this.bufferFactory = stringOutputBufferFactory;
    this.strictFilters = options?.strictFilters ?? true;
    this.undefinedType = options?.undefinedType ?? Undefined;
  }

  contains(
    left: unknown,
    right: unknown,
    context: RenderContext,
    token: Token,
  ): boolean {
    if (left instanceof Drop) {
      return left[containsSync](right, context);
    }

    if (!(this.isTruthy(left, context) && this.isTruthy(right, context))) {
      // See https://github.com/Shopify/liquid/blob/1954a2655cf4d427b6c9169354832638740f2db5/lib/liquid/condition.rb#L20
      return false;
    }

    if (isString(left)) {
      return left.indexOf(String(right)) !== -1;
    }

    if (isArray(left)) {
      let i = left.indexOf(right);

      if (i === -1 && right instanceof LiquidNumber) {
        for (const [index, item] of Object.entries(left)) {
          if (isNumeric(item) && right.eq(item)) {
            i = Number(index);
            break;
          }
        }
      }

      // NOTE: In Shopify/liquid, falsy values always return false.
      return i !== -1 && this.isTruthy(right, context);
    }

    if (isObject(left) && isPropertyKey(right)) {
      return Object.propertyIsEnumerable.call(left, right);
    }

    throw new TemplateTypeError(
      `${left} is not a container`,
      token,
      context.template.source,
      context.template.name,
    );
  }

  async getTemplate(
    name: string,
    globals?: Namespace,
    context?: RenderContext,
    options?: Record<string, unknown>,
  ): Promise<Template> {
    return await this.loader.load(this, name, globals, context, options);
  }

  getTemplateSync(
    name: string,
    globals?: Namespace,
    context?: RenderContext,
    options?: Record<string, unknown>,
  ): Template {
    return this.loader.loadSync(this, name, globals, context, options);
  }

  isEqual(
    left: unknown,
    right: unknown,
    context: RenderContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    token: Token,
  ): boolean {
    if (left instanceof Drop) {
      return left[equals](right, context);
    }

    if (right instanceof Drop) {
      return right[equals](left, context);
    }

    if (
      (left === null || left === undefined) &&
      (right === null || right === undefined)
    ) {
      return true;
    }

    if (isArray(left) && isArray(right)) {
      return (
        left.length === right.length && left.every((v, i) => v === right[i])
      );
    }

    if (
      left instanceof LiquidNumber &&
      (isNumber(right) || right instanceof LiquidNumber)
    ) {
      return left.eq(right);
    }

    if (
      right instanceof LiquidNumber &&
      (isNumber(left) || left instanceof LiquidNumber)
    ) {
      return right.eq(left);
    }

    return left === right;
  }

  isLessThan(
    left: unknown,
    right: unknown,
    context: RenderContext,
    token: Token,
  ): boolean {
    if (left instanceof Drop) {
      return left[lessThanSync](right, context);
    }

    if (right instanceof Drop) {
      return right[lessThanSync](left, context);
    }

    if (isString(left) && isString(right)) {
      return left < right;
    }

    if (isBoolean(left) || isBoolean(right)) {
      return false;
    }

    // TODO: optimize

    if (isNumber(left) && isNumber(right)) {
      return left < right;
    }

    if (
      left instanceof LiquidNumber &&
      (isNumber(right) || right instanceof LiquidNumber)
    ) {
      return left.lt(right);
    }

    if (
      right instanceof LiquidNumber &&
      (isNumber(left) || left instanceof LiquidNumber)
    ) {
      return right.gt(left);
    }

    throw new TemplateTypeError(
      `${left && left.constructor.name} and ${right && right.constructor.name} are not comparable`,
      token,
      context.template.source,
      context.template.name,
    );
  }

  isNil(obj: unknown): boolean {
    return (
      obj === undefined ||
      obj === null ||
      obj === Nothing ||
      obj instanceof Undefined
    );
  }

  // TODO: sync and async
  isTruthy(obj: unknown, context: RenderContext): boolean {
    if (obj instanceof Drop) {
      obj = obj[toLiquidSync]("boolean", context);
    }

    return !(obj === false || obj === null || obj === undefined);
  }

  makeGlobals(namespace?: Namespace): Namespace | undefined {
    if (namespace === undefined) return this.globals;
    if (this.globals === undefined) return namespace;
    return new ReadOnlyChainMap(namespace, this.globals);
  }

  parse(source: string, globals?: Namespace, meta?: TemplateMeta): Template {
    return new Template(
      this,
      source,
      this.parser.parse(this, source, meta?.name ?? "", 0),
      this.makeGlobals(globals),
      meta,
    );
  }

  async render(
    source: string,
    data?: Record<string, unknown>,
  ): Promise<string> {
    return await this.parse(source).render(data);
  }

  renderSync(source: string, data?: Record<string, unknown>): string {
    return this.parse(source).renderSync(data);
  }

  serialize(obj: unknown, context: RenderContext, token: Token): string {
    if (this.autoEscape && obj instanceof Drop) {
      const htmlSafe = obj[toHTMLSafeStringSync](context);
      if (htmlSafe !== undefined) {
        return htmlSafe;
      }
    }

    const s = isArray(obj)
      ? obj.map((item) => this.toString(item, context, token)).join("")
      : this.toString(obj, context, token);
    return this.autoEscape ? escape(s) : s;
  }

  setupFilters(): void {
    this.filters["abs"] = filters.abs;
    this.filters["append"] = filters.append;
    this.filters["at_least"] = filters.atLeast;
    this.filters["at_most"] = filters.atMost;
    this.filters["base64_decode"] = filters.base64Decode;
    this.filters["base64_encode"] = filters.base64Encode;
    this.filters["base64_url_safe_decode"] = filters.base64URLSafeDecode;
    this.filters["base64_url_safe_encode"] = filters.base64URLSafeEncode;
    this.filters["capitalize"] = filters.capitalize;
    this.filters["ceil"] = filters.ceil;
    this.filters["compact"] = filters.compact;
    this.filters["concat"] = filters.concat;
    this.filters["date"] = filters.date;
    this.filters["default"] = filters.default_;
    this.filters["divided_by"] = filters.dividedBy;
    this.filters["downcase"] = filters.downcase;
    this.filters["escape_once"] = filters.escapeOnce;
    this.filters["escape"] = filters.escape;
    this.filters["h"] = filters.escape;
    this.filters["find_index"] = filters.findIndex;
    this.filters["find"] = filters.find;
    this.filters["first"] = filters.first;
    this.filters["floor"] = filters.floor;
    this.filters["has"] = filters.has;
    this.filters["join"] = filters.join;
    this.filters["last"] = filters.last;
    this.filters["lstrip"] = filters.lStrip;
    this.filters["map"] = filters.map;
    this.filters["minus"] = filters.minus;
    this.filters["modulo"] = filters.modulo;
    this.filters["newline_to_br"] = filters.newlineToBr;
    this.filters["plus"] = filters.plus;
    this.filters["prepend"] = filters.prepend;
    this.filters["reject"] = filters.reject;
    this.filters["remove_first"] = filters.removeFirst;
    this.filters["remove_last"] = filters.removeLast;
    this.filters["remove"] = filters.remove;
    this.filters["replace_first"] = filters.replaceFirst;
    this.filters["replace_last"] = filters.replaceLast;
    this.filters["replace"] = filters.replace;
    this.filters["reverse"] = filters.reverse;
    this.filters["round"] = filters.round;
    this.filters["rstrip"] = filters.rStrip;
    this.filters["size"] = filters.size;
    this.filters["slice"] = filters.slice;
    this.filters["sort_natural"] = filters.sortNatural;
    this.filters["sort"] = filters.sort;
    this.filters["split"] = filters.split;
    this.filters["squish"] = filters.squish;
    this.filters["strip_html"] = filters.stripHTML;
    this.filters["strip_newlines"] = filters.stripNewlines;
    this.filters["strip"] = filters.strip;
    this.filters["sum"] = filters.sum;
    this.filters["times"] = filters.times;
    this.filters["truncate"] = filters.truncate;
    this.filters["truncatewords"] = filters.truncateWords;
    this.filters["uniq"] = filters.uniq;
    this.filters["upcase"] = filters.upcase;
    this.filters["url_decode"] = filters.urlDecode;
    this.filters["url_encode"] = filters.urlEncode;
    this.filters["where"] = filters.where;
  }

  setupTags(): void {
    this.tags["#"] = tags.InlineCommentTag;
    this.tags["assign"] = tags.AssignTag;
    this.tags["break"] = tags.BreakTag;
    this.tags["capture"] = tags.CaptureTag;
    this.tags["case"] = tags.CaseTag;
    this.tags["comment"] = tags.CommentTag;
    this.tags["continue"] = tags.ContinueTag;
    this.tags["cycle"] = tags.CycleTag;
    this.tags["decrement"] = tags.DecrementTag;
    this.tags["doc"] = tags.DocTag;
    this.tags["echo"] = tags.EchoTag;
    this.tags["for"] = tags.ForTag;
    this.tags["if"] = tags.IfTag;
    this.tags["ifchanged"] = tags.IfChangedTag;
    this.tags["include"] = tags.IncludeTag;
    this.tags["increment"] = tags.IncrementTag;
    this.tags["liquid"] = tags.LiquidTag;
    this.tags["raw"] = tags.RawTag;
    this.tags["render"] = tags.RenderTag;
    this.tags["tablerow"] = tags.TableRowTag;
    this.tags["unless"] = tags.UnlessTag;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toArray(obj: unknown, context: RenderContext, token: Token): unknown[] {
    if (isArray(obj)) return obj;
    if (isString(obj)) return [obj];
    if (isObject(obj)) {
      return isIterable(obj) ? Array.from(obj) : Object.entries(obj);
    }
    if (this.isNil(obj)) return [];
    return [obj];
  }

  toInteger(obj: unknown, context: RenderContext, token: Token): number {
    if (isLiquidNumber(obj)) return obj.trunc().valueOf();
    if (isPrimitiveNumber(obj)) return Math.trunc(obj);

    const num = Number(String(obj));

    if (obj instanceof Undefined || isNaN(num)) {
      throw new TemplateTypeError(
        "invalid integer",
        token,
        context.template.source,
        context.template.name,
      );
    }

    return Math.trunc(num);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toNumber(obj: unknown, context: RenderContext, token: Token): number {
    const n = Number(obj);
    if (isNaN(n)) return 0;
    return n;
  }

  toString(obj: unknown, context: RenderContext, token: Token): string {
    if (obj === null || obj === undefined) {
      return "";
    }

    if (obj instanceof Drop) {
      return obj[toLiquidSync]("string", context) as string;
    }

    if (isArray(obj)) {
      return JSON.stringify(obj);
    }

    if (obj instanceof LiquidNumber) {
      return obj.toString();
    }

    if (isObject(obj)) {
      return JSON.stringify(obj);
    }

    return String(obj);
  }

  trim(value: string, left?: string, right?: string): string {
    if (left === "-" && right === "-") {
      return value.trim();
    }

    if (left === "-") {
      return value.trimStart();
    }

    if (right === "-") {
      return value.trimEnd();
    }

    return value;
  }
}
