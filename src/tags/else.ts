import type { RenderContext } from "../context";
import { BooleanLiteral, type Expression } from "../expression";
import {
  isBlankBlock,
  renderBlock,
  renderBlockSync,
  type Block,
  type Markup,
} from "../markup";
import type { OutputBuffer } from "../output";
import type { Token } from "../token";
import { isString } from "../type_guards";

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

  children(): Markup[] {
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
