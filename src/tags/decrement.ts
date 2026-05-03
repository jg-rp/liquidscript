import type { RenderContext } from "../context";
import type { Name } from "../expression";
import type { Markup, OutputBuffer } from "../markup";
import type { Parser } from "../parser";
import { T, type Token } from "../token";

export class DecrementTag implements Markup {
  readonly blank = false;

  constructor(
    readonly token: Token,
    readonly name: Name,
  ) {}

  static parse(token: Token, parser: Parser): Markup {
    const name = parser.parseIdent();
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    return new DecrementTag(token, name);
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    this.renderSync(context, buffer);
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    buffer.push(context.decrement(this.name.value).toString());
  }

  templateScope(): Name[] {
    return [this.name];
  }
}
