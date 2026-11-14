import type { RenderContext } from "../context.js";
import type { OutputBuffer } from "../output.js";
import type { Parser } from "../parser.js";

import { isBlankBlock, renderBlock, renderBlockSync, type Block, type Markup } from "../markup.js";
import { T, type Token } from "../token.js";
import { isString } from "../type_guards.js";

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

  childrenSync(): Markup[] {
    return this.block.filter((node) => !isString(node)) as Markup[];
  }
}
