import type { Namespace, RenderContext } from "../context";
import { TemplateSyntaxError } from "../errors";
import {
  KeywordArgument,
  Name,
  Variable,
  type Expression,
} from "../expression";
import {
  isBlankBlock,
  renderBlock,
  renderBlockSync,
  type Block,
  type Markup,
  type OutputBuffer,
} from "../markup";
import type { Parser } from "../parser";
import { T, type Token } from "../token";
import { isString } from "../type_guards";
import { ForLoop } from "../drops";
import { Nothing } from "../runtime";
import { Drop } from "../drop";
import * as drop from "../drop";
import { Undefined } from "../drops/undefined";

const END_FOR_BLOCK = new Set(["else", "endfor"]);
const FOR_STACK = Symbol.for("liquid.tags.for");

export const BREAK = Symbol.for("liquid.runtime.break");
export const CONTINUE = Symbol.for("liquid.runtime.continue");

export class ForTag implements Markup {
  constructor(
    readonly token: Token,
    readonly name: Name,
    readonly expression: Expression,
    readonly block: Block,
    readonly blank: boolean,
    readonly reversed: boolean,
    readonly _default?: Block,
    readonly offset?: Expression,
    readonly limit?: Expression,
  ) {}

  static parse(token: Token, parser: Parser): Markup {
    const ident = parser.parseIdent();
    parser.eat(T.IN, "missing 'in'");
    parser.expectExpression();
    const expr = parser.parseExpression();

    const [reversed, offset, limit] = this.unpackArgs(
      parser,
      parser.parseArguments(false),
    );

    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    const block = parser.parseBlock(END_FOR_BLOCK);

    let _default: Block | undefined;
    if (parser.tag("else")) {
      parser.eatEmptyTag("else");
      _default = parser.parseBlock(END_FOR_BLOCK);
    } else {
      _default = undefined;
    }

    parser.eatEmptyTag("endfor");

    // TODO: Is this the best place for this?
    const blank = isBlankBlock(block) && (!_default || isBlankBlock(_default));
    if (blank && _default)
      _default = _default.filter((node) => !isString(node));

    return new ForTag(
      token,
      ident,
      expr,
      blank ? block.filter((node) => !isString(node)) : block,
      blank,
      reversed,
      _default,
      offset,
      limit,
    );
  }

  private static unpackArgs(
    parser: Parser,
    args: Array<Expression | KeywordArgument>,
  ): [boolean, Expression | undefined, Expression | undefined] {
    let reversed: boolean = false;
    let offset: Expression | undefined = undefined;
    let limit: Expression | undefined = undefined;

    for (const arg of args) {
      if (arg instanceof KeywordArgument) {
        if (arg.name.value === "offset") {
          offset = arg.expr;
        } else if (arg.name.value === "limit") {
          limit = arg.expr;
        } else {
          throw new TemplateSyntaxError(
            `unknown argument '${arg.name.value}'`,
            arg.name.token,
            parser.source,
          );
        }
      } else if (
        arg instanceof Variable &&
        arg.root instanceof Name &&
        arg.root.value === "reversed" &&
        arg.segments.length === 0
      ) {
        reversed = true;
      } else {
        throw new TemplateSyntaxError(
          "unexpected argument",
          arg.token,
          parser.source,
        );
      }
    }

    return [reversed, offset, limit];
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    const target = await this.expression.evaluate(context);

    if (target instanceof Drop) {
      return await this.renderForIterable(target, context, buffer);
    }

    await this.renderForArray(target, context, buffer);
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    const target = this.expression.evaluateSync(context);

    if (target instanceof Drop) {
      return this.renderForIterableSync(target, context, buffer);
    }

    this.renderForArraySync(
      context.env.toArray(target, context, this.expression.span),
      context,
      buffer,
    );
  }

  private async renderForIterable(
    target: Drop,
    context: RenderContext,
    buffer: OutputBuffer,
  ): Promise<void> {
    const offset = this.offset
      ? await this.offset.evaluate(context)
      : undefined;

    const limit = this.limit ? await this.limit.evaluate(context) : undefined;
    // TODO: async iterator?
    const it = await this.lazySlice(target, offset, limit, context);
    const length = it[drop.length]();

    if (!length) {
      if (this._default) {
        await renderBlock(this._default, context, buffer);
      }
      return;
    }

    const name = this.name.value;
    const parents = context.forloops;

    const forloop = new ForLoop(
      `${name}-${this.expression}`,
      length,
      parents[parents.length - 1] || Nothing,
    );

    // TODO raise for loop limit
    const namespace: Namespace = { forloop };
    let interrupt: symbol | undefined = undefined;

    context.forloops.push(forloop);

    try {
      await context.extend(namespace, async () => {
        for (const obj of it) {
          namespace[name] = obj;
          forloop.step();
          await renderBlock(this.block, context, buffer);

          interrupt = context.interrupts.pop();
          if (interrupt === BREAK) break;
          if (interrupt === CONTINUE) continue;
          // TODO: push the interrupt back otherwise?
        }
      });
    } finally {
      context.forloops.pop();
    }
  }

  private renderForIterableSync(
    target: Drop,
    context: RenderContext,
    buffer: OutputBuffer,
  ): void {
    const offset = this.offset ? this.offset.evaluateSync(context) : undefined;

    const limit = this.limit ? this.limit.evaluateSync(context) : undefined;
    const it = this.lazySliceSync(target, offset, limit, context);
    const length = it[drop.length]();

    if (!length) {
      if (this._default) {
        renderBlockSync(this._default, context, buffer);
      }
      return;
    }

    const name = this.name.value;
    const parents = context.forloops;

    const forloop = new ForLoop(
      `${name}-${this.expression}`,
      length,
      parents[parents.length - 1] || Nothing,
    );

    // TODO raise for loop limit
    const namespace: Namespace = { forloop };
    let interrupt: symbol | undefined = undefined;

    context.forloops.push(forloop);

    try {
      context.extendSync(namespace, () => {
        for (const obj of it) {
          namespace[name] = obj;
          forloop.step();
          renderBlockSync(this.block, context, buffer);

          interrupt = context.interrupts.pop();
          if (interrupt === BREAK) break;
          if (interrupt === CONTINUE) continue;
          // TODO: push the interrupt back otherwise?
        }
      });
    } finally {
      context.forloops.pop();
    }
  }

  private async renderForArray(
    target: unknown,
    context: RenderContext,
    buffer: OutputBuffer,
  ): Promise<void> {
    const offset = this.offset
      ? await this.offset.evaluate(context)
      : undefined;

    const limit = this.limit ? await this.limit.evaluate(context) : undefined;

    const array = this.slice(
      context.env.toArray(target, context, this.expression.span),
      offset,
      limit,
      context,
    );

    const length = array.length;

    if (!length) {
      if (this._default) {
        await renderBlock(this._default, context, buffer);
      }
      return;
    }

    const name = this.name.value;
    const parents = context.forloops;

    const forloop = new ForLoop(
      `${name}-${this.expression}`,
      length,
      parents[parents.length - 1] || Nothing,
    );

    // TODO raise for loop limit
    const namespace: Namespace = { forloop };

    let interrupt: symbol | undefined = undefined;

    context.forloops.push(forloop);

    try {
      await context.extend(namespace, async () => {
        let i = 0;
        while (i < length) {
          namespace[name] = array[i];
          i += 1;
          forloop.step();
          await renderBlock(this.block, context, buffer);

          interrupt = context.interrupts.pop();
          if (interrupt === BREAK) break;
          if (interrupt === CONTINUE) continue;
          // TODO: push the interrupt back otherwise?
        }
      });
    } finally {
      context.forloops.pop();
    }
  }

  private renderForArraySync(
    target: unknown,
    context: RenderContext,
    buffer: OutputBuffer,
  ): void {
    const offset = this.offset ? this.offset.evaluateSync(context) : undefined;
    const limit = this.limit ? this.limit.evaluateSync(context) : undefined;

    const array = this.slice(
      context.env.toArray(target, context, this.expression.span),
      offset,
      limit,
      context,
    );

    const length = array.length;

    if (!length) {
      if (this._default) {
        renderBlockSync(this._default, context, buffer);
      }
      return;
    }

    const name = this.name.value;
    const parents = context.forloops;

    const forloop = new ForLoop(
      `${name}-${this.expression}`,
      length,
      parents[parents.length - 1] || Nothing,
    );

    // TODO raise for loop limit
    const namespace: Namespace = { forloop };

    let interrupt: symbol | undefined = undefined;

    context.forloops.push(forloop);

    try {
      context.extendSync(namespace, () => {
        let i = 0;
        while (i < length) {
          namespace[name] = array[i];
          i += 1;
          forloop.step();
          renderBlockSync(this.block, context, buffer);

          interrupt = context.interrupts.pop();
          if (interrupt === BREAK) break;
          if (interrupt === CONTINUE) continue;
          // TODO: push the interrupt back otherwise?
        }
      });
    } finally {
      context.forloops.pop();
    }
  }

  private normalizedOffsetAndLimit(
    offset: unknown,
    limit: unknown,
    length: number,
    context: RenderContext,
  ): [number, number, Map<string, number>, string] {
    if (!context.registers.has(FOR_STACK)) {
      context.registers.set(FOR_STACK, new Map());
    }

    const offsets = context.registers.get(FOR_STACK) as Map<string, number>;
    let normalizedOffset = 0;
    let normalizedLimit = length;

    const offsetKey = `${this.name.value}-${this.expression}`;

    if (offset instanceof Undefined && offset.path === "continue") {
      normalizedOffset = offsets.get(offsetKey) as number;
    } else if (offset !== undefined) {
      normalizedOffset = context.env.toInteger(
        offset,
        context,
        this.expression.span,
      );
    }

    if (limit !== undefined) {
      normalizedLimit = context.env.toInteger(
        limit,
        context,
        this.expression.span,
      );
    }

    return [normalizedOffset, normalizedLimit, offsets, offsetKey];
  }

  private slice(
    target: unknown[],
    offset: unknown,
    limit: unknown,
    context: RenderContext,
  ): unknown[] {
    const [normalizedOffset, normalizedLimit, offsets, offsetKey] =
      this.normalizedOffsetAndLimit(offset, limit, target.length, context);

    const result = target.slice(normalizedOffset, normalizedLimit);

    if (normalizedLimit) offsets.set(offsetKey, result.length);
    return this.reversed ? result.reverse() : result;
  }

  expressions(): Expression[] {
    const result = [this.expression];
    if (this.offset) {
      result.push(this.offset);
    }
    if (this.limit) {
      result.push(this.limit);
    }
    return result;
  }

  children(): Markup[] {
    const result: Markup[] = [];

    for (const node of this.block) {
      if (!isString(node)) {
        result.push(node);
      }
    }

    if (this._default) {
      for (const node of this._default) {
        if (!isString(node)) {
          result.push(node);
        }
      }
    }

    return result;
  }

  private lazySliceSync(
    sequence: Drop,
    offset: unknown,
    limit: unknown,
    context: RenderContext,
  ): Drop {
    const [normalizedOffset, normalizedLimit, offsets, offsetKey] =
      this.normalizedOffsetAndLimit(
        offset,
        limit,
        sequence[drop.length](),
        context,
      );

    const it = sequence[drop.sliceSync](
      normalizedOffset,
      normalizedLimit,
      this.reversed,
    );

    if (offset) offsets.set(offsetKey, it[drop.length]());
    return it;
  }
  private async lazySlice(
    sequence: Drop,
    offset: unknown,
    limit: unknown,
    context: RenderContext,
  ): Promise<Drop> {
    const [normalizedOffset, normalizedLimit, offsets, offsetKey] =
      this.normalizedOffsetAndLimit(
        offset,
        limit,
        sequence[drop.length](),
        context,
      );

    const it = await sequence[drop.slice](
      normalizedOffset,
      normalizedLimit,
      this.reversed,
    );

    if (offset) offsets.set(offsetKey, it[drop.length]());
    return it;
  }

  blockScope(): Name[] {
    return [this.name];
  }
}

export class BreakTag implements Markup {
  readonly blank = true;

  static parse(token: Token, parser: Parser): Markup {
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    return new BreakTag(token);
  }

  constructor(readonly token: Token) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    context.interrupts.push(BREAK);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    context.interrupts.push(BREAK);
  }
}

export class ContinueTag implements Markup {
  readonly blank = true;

  static parse(token: Token, parser: Parser): Markup {
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    return new ContinueTag(token);
  }

  constructor(readonly token: Token) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    context.interrupts.push(CONTINUE);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    context.interrupts.push(CONTINUE);
  }
}
