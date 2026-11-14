import type { RenderContext } from "../context.js";
import type { Name } from "../expression.js";
import type { Markup } from "../markup.js";
import type { OutputBuffer } from "../output.js";
import type { Parser } from "../parser.js";

import { T, type Token } from "../token.js";

export class IncrementTag implements Markup {
  readonly blank = false;

  readonly tag = "increment";

  constructor(
    readonly token: Token,
    readonly name: Name,
  ) {}

  static parse(token: Token, parser: Parser): Markup {
    const name = parser.parseIdent();
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    return new IncrementTag(token, name);
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    this.renderSync(context, buffer);
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    buffer.push(context.increment(this.name.value).toString());
  }

  templateScope(): Name[] {
    return [this.name];
  }
}
