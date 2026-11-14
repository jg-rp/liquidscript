import type { RenderContext } from "../context.js";
import type { Markup } from "../markup.js";
import type { OutputBuffer } from "../output.js";
import type { Parser } from "../parser.js";

import { getTokenValue, T, type Token } from "../token.js";

export class RawTag implements Markup {
  readonly blank = false;

  readonly tag = "raw";

  constructor(
    readonly token: Token,
    readonly text: string,
  ) {}

  static parse(token: Token, parser: Parser): Markup {
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    const textToken = parser.eat(T.TEXT);
    parser.eatEmptyTag("endraw");
    return new RawTag(token, getTokenValue(textToken, parser.source));
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    buffer.push(this.text);
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    buffer.push(this.text);
  }
}
