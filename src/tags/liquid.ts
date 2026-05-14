import type { RenderContext } from "../context";
import {
  isBlankBlock,
  renderBlock,
  renderBlockSync,
  type Block,
  type Markup,
} from "../markup";
import type { OutputBuffer } from "../output";
import type { Parser } from "../parser";
import { T, type Token } from "../token";

export class LiquidTag implements Markup {
  readonly blank: boolean;

  readonly tag = "liquid";

  constructor(
    readonly token: Token,
    readonly block: Block,
  ) {
    this.blank = isBlankBlock(block);
  }

  static parse(token: Token, parser: Parser): Markup {
    const block = parser.parseLineStatements();
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    return new LiquidTag(token, block);
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    await renderBlock(this.block, context, buffer);
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    renderBlockSync(this.block, context, buffer);
  }
}
