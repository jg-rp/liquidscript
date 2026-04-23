/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RenderContext } from "../context";
import type { Expression, Name } from "../expression";
import type { Markup, OutputBuffer } from "../markup";
import type { Parser } from "../parser";
import { T, type Token } from "../token";

export class AssignTag implements Markup {
  readonly blank = true;

  constructor(
    readonly token: Token,
    readonly name: Name,
    readonly expression: Expression,
  ) {}

  static parse(token: Token, parser: Parser): Markup {
    const name = parser.parseIdent();
    parser.eat(T.ASSIGN, "bad identifier or missing assignment operator");
    const expression = parser.parseFilteredExpression();
    parser.eat(T.TAG_END);
    return new AssignTag(token, name, expression);
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    context.assign(this.name.value, await this.expression.evaluate(context));
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    context.assign(this.name.value, this.expression.evaluateSync(context));
  }

  expressions(): Expression[] {
    return [this.expression];
  }

  templateScope(): Name[] {
    return [this.name];
  }
}
