import type { RenderContext } from "../context.js";
import type { Expression } from "../expression.js";
import type { Markup } from "../markup.js";
import type { OutputBuffer } from "../output.js";
import type { Parser } from "../parser.js";

import { T, type Token } from "../token.js";

export class EchoTag implements Markup {
  readonly blank = false;

  readonly tag = "echo";

  constructor(
    readonly token: Token,
    readonly expression: Expression,
  ) {}

  static parse(token: Token, parser: Parser): Markup {
    const expr = parser.parseFilteredExpression();
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    return new EchoTag(token, expr);
  }

  expressions(): Expression[] {
    return [this.expression];
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    buffer.push(
      context.env.serialize(await this.expression.evaluate(context), context, this.expression.span),
    );
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    buffer.push(
      context.env.serialize(this.expression.evaluateSync(context), context, this.expression.span),
    );
  }
}
