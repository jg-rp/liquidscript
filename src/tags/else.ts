import type { RenderContext } from "../context.js";
import type { OutputBuffer } from "../output.js";
import type { Token } from "../token.js";

import { BooleanLiteral, type Expression } from "../expression.js";
import { isBlankBlock, renderBlock, renderBlockSync, type Block, type Markup } from "../markup.js";
import { isString } from "../type_guards.js";

export class ElseBlock implements Markup {
  readonly blank: boolean;

  readonly expression: Expression;

  readonly tag = "else";

  constructor(
    readonly token: Token,
    public block: Block,
  ) {
    this.blank = isBlankBlock(block);
    this.expression = new BooleanLiteral(token, true);
  }

  childrenSync(): Markup[] {
    return this.block.filter((node) => !isString(node)) as Markup[];
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
