/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import type { RenderContext } from "../context";
import { type Expression } from "../expression";
import { PRECEDENCE_LOWEST } from "../legacy_parser";
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
import { ElseBlock } from "./else";
import { IfBlock } from "./if";

const END_UNLESS_BLOCK = new Set(["else", "elsif", "endunless"]);
const IF_BLOCKS = new Set(["else", "elsif"]);

export class UnlessTag implements Markup {
  readonly blank: boolean;

  constructor(
    readonly token: Token,
    readonly alts: Array<IfBlock | ElsIfBlock | ElseBlock>,
  ) {
    this.blank = alts.every((block) => block.blank);

    if (this.blank) {
      // Discard blank strings from all blocks.
      for (const alt of alts) {
        alt.filterStrings();
      }
    }
  }

  static parse(token: Token, parser: Parser): Markup {
    const blocks: Array<UnlessBlock | ElsIfBlock | ElseBlock> = [];
    parser.expectExpression();
    const expression = parser.parseExpression(PRECEDENCE_LOWEST, true);
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    const block = parser.parseBlock(END_UNLESS_BLOCK);
    blocks.push(new UnlessBlock(token, expression, block));

    for (;;) {
      const tagName = parser.tags(IF_BLOCKS);

      if (tagName === "elsif") {
        blocks.push(this.parseElsif(parser));
      } else if (tagName === "else") {
        // Any remaining `else` or `elsif` blocks are guaranteed to be ignored,
        // but we keep them in the AST anyway.
        const nameToken = parser.eatTag("else");
        blocks.push(
          new ElseBlock(nameToken, parser.parseBlock(END_UNLESS_BLOCK)),
        );
      } else {
        break;
      }
    }

    parser.eatEmptyTag("endunless");
    return new UnlessTag(token, blocks);
  }

  static parseElsif(parser: Parser): ElsIfBlock {
    parser.eat(T.TAG_START);
    parser.skipWhitespaceControl();
    const token = parser.eat(T.TAG_NAME);
    parser.expectExpression();
    const expression = parser.parseExpression(PRECEDENCE_LOWEST, true);
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    return new ElsIfBlock(
      token,
      expression,
      parser.parseBlock(END_UNLESS_BLOCK),
    );
  }

  children(): Markup[] {
    return this.alts;
  }

  expressions(): Expression[] {
    return this.alts.map((block) => block.expression);
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    for (const alt of this.alts) {
      if (alt instanceof UnlessBlock) {
        if (
          !context.env.isTruthy(await alt.expression.evaluate(context), context)
        ) {
          return await alt.render(context, buffer);
        }
      } else if (
        context.env.isTruthy(await alt.expression.evaluate(context), context)
      ) {
        return await alt.render(context, buffer);
      }
    }
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    for (const alt of this.alts) {
      if (alt instanceof UnlessBlock) {
        if (
          !context.env.isTruthy(alt.expression.evaluateSync(context), context)
        ) {
          return alt.renderSync(context, buffer);
        }
      } else if (
        context.env.isTruthy(alt.expression.evaluateSync(context), context)
      ) {
        return alt.renderSync(context, buffer);
      }
    }
  }
}

export class UnlessBlock implements Markup {
  readonly blank: boolean;

  constructor(
    readonly token: Token,
    readonly expression: Expression,
    public block: Block,
  ) {
    this.blank = isBlankBlock(block);
  }

  children(): Markup[] {
    return this.block.filter((node) => !isString(node)) as Markup[];
  }

  expressions(): Expression[] {
    return [this.expression];
  }

  filterStrings(): void {
    this.block = this.block.filter((node) => !isString(node));
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    await renderBlock(this.block, context, buffer);
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    renderBlockSync(this.block, context, buffer);
  }
}

export class ElsIfBlock extends IfBlock {}
