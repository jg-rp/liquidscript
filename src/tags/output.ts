import type { RenderContext } from "../context";
import type { Expression } from "../expression";
import type { Markup, OutputBuffer } from "../markup";
import type { Token } from "../token";

export class OutputStatement implements Markup {
  readonly blank = false;

  constructor(
    readonly token: Token,
    readonly expression: Expression,
  ) {}

  expressions(): Expression[] {
    return [this.expression];
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    buffer.push(
      context.env.serialize(
        await this.expression.evaluate(context),
        context,
        this.expression.span,
      ),
    );
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    buffer.push(
      context.env.serialize(
        this.expression.evaluateSync(context),
        context,
        this.expression.span,
      ),
    );
  }
}
