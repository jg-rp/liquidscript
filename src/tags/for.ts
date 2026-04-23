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
import { isDrop } from "../drop";
import { T, type Token } from "../token";
import { isString } from "../type_guards";
import { ForLoopDrop } from "../drops/forloop";
import { Nothing } from "../runtime";

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
        throw new TemplateSyntaxError("unexpected argument", arg.token);
      }
    }

    return [reversed, offset, limit];
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    const target = await this.expression.evaluate(context);

    if (isDrop(target)) {
      // TODO: Only Drops can be lazy.
      throw new Error("not implemented");
    }

    await this.renderForArray(target, context, buffer);
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    const target = this.expression.evaluateSync(context);

    if (isDrop(target)) {
      // TODO: Only Drops can be lazy.
      throw new Error("not implemented");
    }

    this.renderForArraySync(context.env.toArray(target), context, buffer);
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
      context.env.toArray(target),
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

    const forloop = new ForLoopDrop(
      name,
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
      context.env.toArray(target),
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

    const forloop = new ForLoopDrop(
      name,
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

  private slice(
    target: unknown[],
    offset: unknown,
    limit: unknown,
    context: RenderContext,
  ): unknown[] {
    const offsets = (context.registers.get(FOR_STACK) || new Map()) as Map<
      string,
      number
    >;

    const offsetKey = `${this.name.value}-${this.expression}`;
    const length = target.length;

    let normalizedOffset = 0;

    if (offset === "continue") {
      normalizedOffset = offsets.get(offsetKey) as number;
    } else if (offset !== undefined) {
      normalizedOffset = context.env.toInteger(offset);
    }

    let normalizedLimit = length;
    if (limit !== undefined) {
      normalizedLimit = context.env.toInteger(limit);
    }

    const result = target.slice(normalizedOffset, normalizedLimit);
    if (normalizedOffset) offsets.set(offsetKey, result.length);
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
