/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RenderContext } from "../context";
import type { Markup } from "../markup";
import type { OutputBuffer } from "../output";
import type { Parser } from "../parser";
import { getTokenValue, T, type Token } from "../token";

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
