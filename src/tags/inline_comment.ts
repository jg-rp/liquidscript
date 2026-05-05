import type { RenderContext } from "../context";
import { TemplateSyntaxError } from "../errors";
import type { Markup, OutputBuffer } from "../markup";
import type { Parser } from "../parser";
import { getTokenValue, T, type Token } from "../token";

export class InlineCommentTag implements Markup {
  readonly blank = true;

  protected static RE_INVALID_INLINE_COMMENT = /\n\s*[^#\s]/m;

  constructor(
    readonly token: Token,
    readonly text: string,
  ) {}

  static parse(token: Token, parser: Parser): Markup {
    const textToken = parser.eat(T.COMMENT);
    const text = getTokenValue(textToken, parser.source);
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);

    if (text.search(this.RE_INVALID_INLINE_COMMENT) !== -1) {
      throw new TemplateSyntaxError(
        "every line of an inline comment must start with a '#' character",
        token,
        parser.source,
      );
    }

    return new InlineCommentTag(token, text);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderSync(context: RenderContext, buffer: OutputBuffer): void {}
}
