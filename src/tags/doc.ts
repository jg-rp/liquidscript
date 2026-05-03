/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RenderContext } from "../context";
import type { Markup, OutputBuffer } from "../markup";
import type { Parser } from "../parser";
import { getTokenValue, T, type Token } from "../token";

export class DocTag implements Markup {
  readonly blank = true;

  constructor(
    readonly token: Token,
    readonly text: string,
  ) {}

  static parse(token: Token, parser: Parser): Markup {
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    const comment = parser.eat(T.COMMENT);
    parser.eatEmptyTag("enddoc");
    return new DocTag(token, getTokenValue(comment, parser.source));
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {}

  renderSync(context: RenderContext, buffer: OutputBuffer): void {}
}
