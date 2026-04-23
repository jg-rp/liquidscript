import type { Filter } from "./filter";
import { LegacyLexer } from "./legacy_lexer";
import { LegacyParser } from "./legacy_parser";
import type { Block, Tag } from "./markup";
import { isNothing } from "./runtime";
import { equals, isDrop, isEqualityDrop, toLiquid, toLiquidSync } from "./drop";
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

interface _Parser {
  parse(env: Environment, source: string, startIndex?: number): Block;
}

interface _Lexer {
  tokenize(env: Environment, source: string, startIndex?: number): Token[];
}

export class Environment {
  public lexer: _Lexer = LegacyLexer;
  public parser: _Parser = LegacyParser;

  public tags: { [key: string]: Tag };
  public filters: { [key: string]: Filter };

  public persistentRegisters: Set<string> = new Set();
  public strictFilters = true;
  public falsyUndefined = true;

  constructor() {
    this.tags = {};
    this.filters = {};
    this.setupTags();
    this.setupFilters();
  }

  public parse(source: string): Template {
    return new Template(this, this.parser.parse(this, source, 0));
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
  }

  public setupFilters(): void {
    this.filters["split"] = filters.split;
  }

  public serialize(obj: unknown, context: RenderContext): string {
    if (isArray(obj)) {
      return obj.map((item) => this.toString(item, context)).join("");
    }
    return this.toString(obj, context);
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

  public isTruthy(obj: unknown, context: RenderContext): boolean {
    if (isDrop(obj)) {
      obj = obj[toLiquid]("boolean", context);
    }

    if (this.falsyUndefined && isNothing(obj)) {
      return false;
    }

    return !(obj === false || obj === null || obj === undefined);
  }

  public isEqual(
    left: unknown,
    right: unknown,
    context: RenderContext,
  ): boolean {
    if (isDrop(right)) [left, right] = [right, left];
    if (isEqualityDrop(left)) {
      return left[equals](right, context);
    }

    if (
      (isNothing(left) || left === null || left === undefined) &&
      (isNothing(right) || right === null || right === undefined)
    ) {
      return true;
    }

    if (isArray(left) && isArray(right)) {
      return (
        left.length === right.length && left.every((v, i) => v === right[i])
      );
    }

    // TODO: number equality?
    // TODO: range equality? Make range a drop?
    return left === right;
  }

  public isLessThan(
    left: unknown,
    right: unknown,
    context: RenderContext,
  ): boolean {
    // TODO: OrderedDrop protocol
    if (isString(left) && isString(right)) {
      return left < right;
    }

    if (isBoolean(left) || isBoolean(right)) {
      return false;
    }

    if (isNumber(left) && isNumber(right)) {
      return left < right;
    }

    // TODO: error on not orderable?
    return false;
  }

  public contains(
    left: unknown,
    right: unknown,
    context: RenderContext,
  ): boolean {
    // TODO: MembershipDrop
    if (isString(left)) {
      return left.indexOf(String(right)) !== -1;
    }

    if (isArray(left)) {
      return left.indexOf(right) !== -1;
    }

    if (isNothing(left)) {
      return false;
    }

    if (isObject(left) && isPropertyKey(right)) {
      return Object.propertyIsEnumerable.call(left, right);
    }

    // TODO: error on not a container?
    return false;
  }

  public toNumber(obj: unknown): number {
    const n = Number(obj);
    if (isNaN(n)) return 0;
    return n;
  }

  public toInteger(obj: unknown): number {
    return Math.trunc(this.toNumber(obj));
  }

  public toString(obj: unknown, context: RenderContext): string {
    if (isDrop(obj)) return obj[toLiquidSync]("string", context) as string;
    if (isArray(obj) || isObject(obj)) return JSON.stringify(obj);
    return String(obj);
  }

  public toArray(obj: unknown): unknown[] {
    if (isArray(obj)) return obj; // TODO: flatten
    if (isString(obj)) return [obj];
    if (isIterable(obj)) return Array.from(obj);
    return [obj];
  }

  public toIterable(obj: unknown): Iterable<unknown> {
    // TODO:
    throw new Error("not implemented");
  }
}
