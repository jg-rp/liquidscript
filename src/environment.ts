/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Filter } from "./filter";
import { LegacyLexer } from "./legacy_lexer";
import { LegacyParser } from "./legacy_parser";
import type { Block, Tag } from "./markup";
import {
  containsSync,
  Drop,
  equals,
  lessThanSync,
  toLiquid,
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
  isObject,
  isPropertyKey,
  isString,
} from "./type_guards";
import type { RenderContext } from "./context";
import { TemplateTypeError } from "./errors";
import { Undefined } from "./drops/undefined";

export interface _Parser {
  parse(env: Environment, source: string, startIndex?: number): Block;
}

export interface _Lexer {
  tokenize(env: Environment, source: string, startIndex?: number): Token[];
}

export interface _Undefined {
  new (path: string, token: Token, source: string): Undefined;
}

export class Environment {
  public lexer: _Lexer = LegacyLexer;
  public parser: _Parser = LegacyParser;
  public undefinedFactory: _Undefined = Undefined;

  public tags: { [key: string]: Tag };
  public filters: { [key: string]: Filter };

  public persistentRegisters: Set<string> = new Set();
  public strictFilters = true;

  constructor() {
    this.tags = {};
    this.filters = {};
    this.setupTags();
    this.setupFilters();
  }

  public parse(source: string): Template {
    return new Template(this, source, this.parser.parse(this, source, 0));
  }

  public async render(
    source: string,
    data?: { [index: string]: unknown },
  ): Promise<string> {
    return await this.parse(source).render(data);
  }

  public renderSync(
    source: string,
    data?: { [index: string]: unknown },
  ): string {
    return this.parse(source).renderSync(data);
  }

  public setupTags(): void {
    this.tags["assign"] = tags.AssignTag;
    this.tags["comment"] = tags.CommentTag;
    this.tags["for"] = tags.ForTag;
    this.tags["if"] = tags.IfTag;
    this.tags["raw"] = tags.RawTag;
    this.tags["continue"] = tags.ContinueTag;
    this.tags["break"] = tags.BreakTag;
  }

  public setupFilters(): void {
    this.filters["split"] = filters.split;
    this.filters["upcase"] = filters.upcase;
  }

  public serialize(obj: unknown, context: RenderContext, token: Token): string {
    if (isArray(obj)) {
      return obj.map((item) => this.toString(item, context, token)).join("");
    }
    return this.toString(obj, context, token);
  }

  public trim(value: string, left?: string, right?: string): string {
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

  // TODO: sync and async
  public isTruthy(obj: unknown, context: RenderContext): boolean {
    if (obj instanceof Drop) {
      obj = obj[toLiquidSync]("boolean", context);
    }

    return !(obj === false || obj === null || obj === undefined);
  }

  public isEqual(
    left: unknown,
    right: unknown,
    context: RenderContext,
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

    // TODO: number equality?
    return left === right;
  }

  public isLessThan(
    left: unknown,
    right: unknown,
    context: RenderContext,
    token: Token,
  ): boolean {
    if (left instanceof Drop) {
      return left[lessThanSync](right, context);
    }

    if (isString(left) && isString(right)) {
      return left < right;
    }

    if (isBoolean(left) || isBoolean(right)) {
      return false;
    }

    if (isNumber(left) && isNumber(right)) {
      return left < right;
    }

    throw new TemplateTypeError(
      `${left && left.constructor.name} and ${right && right.constructor.name} are not comparable`,
      token,
      context.template.source,
    );
  }

  public contains(
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
      // NOTE: In Shopify/liquid, falsy values always return false.
      return left.indexOf(right) !== -1 && this.isTruthy(right, context);
    }

    if (isObject(left) && isPropertyKey(right)) {
      return Object.propertyIsEnumerable.call(left, right);
    }

    throw new TemplateTypeError(
      `${left} is not a container`,
      token,
      context.template.source,
    );
  }

  public toNumber(obj: unknown, context: RenderContext, token: Token): number {
    const n = Number(obj);
    if (isNaN(n)) return 0;
    return n;
  }

  public toInteger(obj: unknown, context: RenderContext, token: Token): number {
    return Math.trunc(this.toNumber(obj, context, token));
  }

  public toString(obj: unknown, context: RenderContext, token: Token): string {
    if (obj instanceof Drop)
      return obj[toLiquidSync]("string", context) as string;
    if (isArray(obj) || isObject(obj)) return JSON.stringify(obj);
    return String(obj);
  }

  public toArray(
    obj: unknown,
    context: RenderContext,
    token: Token,
  ): unknown[] {
    if (isArray(obj)) return obj; // TODO: flatten
    if (isString(obj)) return [obj];
    if (isObject(obj)) {
      return isIterable(obj) ? Array.from(obj) : Object.entries(obj);
    }
    return [obj];
  }

  public toIterable(
    obj: unknown,
    context: RenderContext,
    token: Token,
  ): Iterable<unknown> {
    // TODO:
    throw new Error("not implemented");
  }
}
