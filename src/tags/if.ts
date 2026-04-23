import type { RenderContext } from "../context";
import { BooleanLiteral, type Expression } from "../expression";
import { ConditionalBlock, type Markup, type OutputBuffer } from "../markup";
import type { Parser } from "../parser";
import { T, type Token } from "../token";
import { isString } from "../type_guards";

const END_IF_BLOCK = new Set(["else", "elsif", "endif"]);
const IF_BLOCKS = new Set(["else", "elsif"]);

export class IfTag implements Markup {
  constructor(
    readonly token: Token,
    readonly blocks: ConditionalBlock[],
    readonly blank: boolean,
  ) {}

  static parse(token: Token, parser: Parser): Markup {
    const blocks: ConditionalBlock[] = [];
    parser.expectExpression();
    const expression = parser.parseExpression();
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    const block = parser.parseBlock(END_IF_BLOCK);
    blocks.push(new ConditionalBlock(expression, block));

    for (;;) {
      const tagName = parser.tags(IF_BLOCKS);

      if (tagName === "elsif") {
        blocks.push(this.parseElsif(parser));
      } else if (tagName === "else") {
        // Any remaining `else` or `elsif` blocks are guaranteed to be ignored,
        // but we keep them in the AST anyway.
        const nameToken = parser.eatTag("else");
        blocks.push(
          new ConditionalBlock(
            new BooleanLiteral(nameToken, true),
            parser.parseBlock(END_IF_BLOCK),
          ),
        );
      } else {
        break;
      }
    }

    parser.eatEmptyTag("endif");

    // TODO: Is this the best place for this?
    const blank = blocks.every((block) => block.blank);

    if (blank) {
      // Discard blank strings from all blocks.
      for (const _block of blocks) {
        _block.filterStrings();
      }
    }

    return new IfTag(token, blocks, blank);
  }

  static parseElsif(parser: Parser): ConditionalBlock {
    parser.eat(T.TAG_START);
    parser.skipWhitespaceControl();
    parser.eat(T.TAG_NAME);
    parser.expectExpression();
    const expression = parser.parseExpression();
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    return new ConditionalBlock(expression, parser.parseBlock(END_IF_BLOCK));
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    for (const block of this.blocks) {
      if (await block.render(context, buffer)) {
        return;
      }
    }
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    for (const block of this.blocks) {
      if (block.renderSync(context, buffer)) {
        return;
      }
    }
  }

  expressions(): Expression[] {
    return this.blocks.map((block) => block.expression);
  }

  children(): Markup[] {
    const result: Markup[] = [];

    for (const block of this.blocks) {
      for (const node of block.nodes) {
        if (!isString(node)) {
          result.push(node);
        }
      }
    }

    return result;
  }
}
