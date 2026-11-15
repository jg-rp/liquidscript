/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RenderContext } from "../context.js";
import type { Expression, Name } from "../expression.js";
import type { Markup } from "../markup.js";
import type { OutputBuffer } from "../output.js";
import type { Parser } from "../parser.js";

import { TemplateSyntaxError } from "../errors.js";
import { T, type Token } from "../token.js";

export class AssignTag implements Markup {
  readonly blank = true;

  readonly tag = "assign";

  constructor(
    readonly token: Token,
    readonly name: Name,
    readonly expression: Expression,
  ) {}

  static parse(token: Token, parser: Parser): Markup {
    const name = parser.parseIdent();
    if (name.value[name.value.length - 1] === "?") {
      throw new TemplateSyntaxError(
        "invalid variable name",
        name.span,
        parser.source,
        parser.templateName,
      );
    }

    parser.eat(T.ASSIGN, "bad identifier or missing assignment operator");
    const expression = parser.parseFilteredExpression();
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    return new AssignTag(token, name, expression);
  }

  expressions(): Expression[] {
    return [this.expression];
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    context.assign(this.name.value, await this.expression.evaluate(context));
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    context.assign(this.name.value, this.expression.evaluateSync(context));
  }

  templateScope(): Name[] {
    return [this.name];
  }
}
