import type { RenderContext } from "../context";
import type { Expression } from "../expression";
import { PRECEDENCE_LOWEST } from "../legacy_parser";
import {
  isBlankBlock,
  renderBlock,
  renderBlockSync,
  type Block,
  type Markup,
} from "../markup";
import type { OutputBuffer } from "../output";
import type { Parser } from "../parser";
import { T, type Token, type TokenKind } from "../token";
import { isString } from "../type_guards";
import { ElseBlock } from "./else";

const END_CASE_BLOCK = new Set(["endcase", "when", "else"]);
const CASE_BLOCKS = new Set(["when", "else"]);
const WHEN_DELIMITERS: Set<TokenKind> = new Set([T.COMMA, T.OR]);

export class CaseTag implements Markup {
  readonly blank;

  readonly tag = "case";

  constructor(
    readonly token: Token,
    readonly expression: Expression,
    readonly blocks: Array<WhenBlock | ElseBlock>,
  ) {
    this.blank = blocks.every((block) => block.blank);

    if (this.blank) {
      // Discard blank strings from all blocks.
      for (const block of blocks) {
        block.filterStrings();
      }
    }
  }

  static parse(token: Token, parser: Parser): Markup {
    parser.expectExpression();
    const expression = parser.parseExpression();
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);

    if (parser.kind() === T.TEXT) {
      // Junk between `{% case %}` and first `{% when %}`.
      parser.eat(T.TEXT);
    }

    const blocks: Array<WhenBlock | ElseBlock> = [];

    for (;;) {
      const tagName = parser.tags(CASE_BLOCKS);

      if (tagName === "when") {
        blocks.push(this.parseWhen(parser));
      } else if (tagName === "else") {
        const nameToken = parser.eatTag("else");
        blocks.push(
          new ElseBlock(nameToken, parser.parseBlock(END_CASE_BLOCK)),
        );
      } else {
        break;
      }
    }

    parser.eatEmptyTag("endcase");
    return new CaseTag(token, expression, blocks);
  }

  static parseWhen(parser: Parser): WhenBlock {
    parser.eat(T.TAG_START);
    parser.skipWhitespaceControl();
    const token = parser.eat(T.TAG_NAME);

    if (parser.kind() === T.COMMA) {
      parser.next();
    }

    const right: Expression[] = [];

    for (;;) {
      right.push(parser.parseExpression(PRECEDENCE_LOWEST, false));
      if (!WHEN_DELIMITERS.has(parser.kind())) break;
      parser.next();
    }

    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    const block = parser.parseBlock(END_CASE_BLOCK);
    return new WhenBlock(token, right, block);
  }

  children(): Markup[] {
    return this.blocks;
  }

  expressions(): Expression[] {
    return [this.expression];
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    const left = await this.expression.evaluate(context);
    let alt = true;

    // NOTE: This does not stop at the first truthy expression, nor does it stop
    // at the first `else` block.
    for (const block of this.blocks) {
      if (block instanceof ElseBlock) {
        if (alt) await block.render(context, buffer);
        continue;
      }

      for (const expr of block.right) {
        if (
          context.env.isEqual(
            left,
            await expr.evaluate(context),
            context,
            expr.span,
          )
        ) {
          alt = false;
          await block.render(context, buffer);
        }
      }
    }
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    const left = this.expression.evaluateSync(context);
    let alt = true;

    // NOTE: This does not stop at the first truthy expression, nor does it stop
    // at the first `else` block.
    for (const block of this.blocks) {
      if (block instanceof ElseBlock) {
        if (alt) block.renderSync(context, buffer);
        continue;
      }

      for (const expr of block.right) {
        if (
          context.env.isEqual(
            left,
            expr.evaluateSync(context),
            context,
            expr.span,
          )
        ) {
          alt = false;
          block.renderSync(context, buffer);
        }
      }
    }
  }
}

export class WhenBlock implements Markup {
  readonly blank: boolean;

  readonly tag = "when";

  constructor(
    readonly token: Token,
    readonly right: Expression[],
    public block: Block,
  ) {
    this.blank = isBlankBlock(block);
  }

  children(): Markup[] {
    return this.block.filter((node) => !isString(node)) as Markup[];
  }

  expressions(): Expression[] {
    return this.right;
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
