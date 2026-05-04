import type { RenderContext } from "../context";
import type { Name } from "../expression";
import {
  renderBlock,
  renderBlockSync,
  type Block,
  type Markup,
  type OutputBuffer,
} from "../markup";
import type { Parser } from "../parser";
import { T, type Token } from "../token";
import { isString } from "../type_guards";

const END_CAPTURE_BLOCK = new Set(["endcapture"]);

export class CaptureTag implements Markup {
  readonly blank = true;

  constructor(
    readonly token: Token,
    readonly name: Name,
    readonly block: Block,
  ) {}

  static parse(token: Token, parser: Parser): Markup {
    const name = parser.parseIdent();
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    const block = parser.parseBlock(END_CAPTURE_BLOCK);
    parser.eatEmptyTag("endcapture");
    return new CaptureTag(token, name, block);
  }

  children(): Markup[] {
    return this.block.filter((node) => !isString(node)) as Markup[];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    const buf = context.env.bufferFactory();
    await renderBlock(this.block, context, buf);
    // TODO: auto escape?
    context.assign(this.name.value, buf.join(""));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    const buf = context.env.bufferFactory();
    renderBlockSync(this.block, context, buf);
    // TODO: auto escape?
    context.assign(this.name.value, buf.join(""));
  }

  templateScope(): Name[] {
    return [this.name];
  }
}
