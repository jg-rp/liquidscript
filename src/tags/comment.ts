import type { RenderContext } from "../context";
import type { Markup } from "../markup";
import type { OutputBuffer } from "../output";
import type { Parser } from "../parser";
import { getTokenValue, T, type Token } from "../token";

export class CommentTag implements Markup {
  readonly blank = true;

  readonly tag = "comment";

  constructor(
    readonly token: Token,
    readonly text: string,
  ) {}

  static parse(token: Token, parser: Parser): Markup {
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    const comment = parser.eat(T.COMMENT);
    parser.eatEmptyTag("endcomment");
    return new CommentTag(token, getTokenValue(comment, parser.source));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderSync(context: RenderContext, buffer: OutputBuffer): void {}
}
