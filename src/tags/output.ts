import type { RenderContext } from "../context.js";
import type { Expression } from "../expression.js";
import type { Markup } from "../markup.js";
import type { OutputBuffer } from "../output.js";
import type { Token } from "../token.js";

export class OutputStatement implements Markup {
  readonly blank = false;

  readonly tag = "";

  constructor(
    readonly token: Token,
    readonly expression: Expression,
  ) {}

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
