// oxlint-disable no-unused-vars
import type { RenderContext } from "../context.js";
import type { Markup } from "../markup.js";
import type { OutputBuffer } from "../output.js";
import type { Parser } from "../parser.js";

import { TemplateSyntaxError } from "../errors.js";
import { getTokenValue, T, type Token } from "../token.js";

export class InlineCommentTag implements Markup {
  readonly blank = true;

  protected static RE_INVALID_INLINE_COMMENT = /\n\s*[^#\s]/m;

  readonly tag = "#";

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
        parser.templateName,
      );
    }

    return new InlineCommentTag(token, text);
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {}

  renderSync(context: RenderContext, buffer: OutputBuffer): void {}
}
