import type { RenderContext } from "../context";
import {
  renderBlock,
  renderBlockSync,
  type Block,
  type Markup,
  type OutputBuffer,
} from "../markup";
import type { Parser } from "../parser";
import { T, type Token } from "../token";

const END_IFCHANGED_BLOCK = new Set(["endifchanged"]);
const IFCHANGED = Symbol.for("liquid.tags.ifchanged");

export class IfChangedTag implements Markup {
  readonly blank = false;

  constructor(
    readonly token: Token,
    readonly block: Block,
  ) {}

  static parse(token: Token, parser: Parser): Markup {
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    const block = parser.parseBlock(END_IFCHANGED_BLOCK);
    parser.eatEmptyTag("endifchanged");
    return new IfChangedTag(token, block);
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    const buf = context.env.bufferFactory();
    await renderBlock(this.block, context, buf);
    const buffered = buf.join("");

    const last = context.registers.has(IFCHANGED)
      ? context.registers.get(IFCHANGED)
      : undefined;

    if (last !== buffered) {
      buffer.push(buffered);
      context.registers.set(IFCHANGED, buffered);
    }
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    const buf = context.env.bufferFactory();
    renderBlockSync(this.block, context, buf);
    const buffered = buf.join("");

    const last = context.registers.has(IFCHANGED)
      ? context.registers.get(IFCHANGED)
      : undefined;

    if (last !== buffered) {
      buffer.push(buffered);
      context.registers.set(IFCHANGED, buffered);
    }
  }
}
