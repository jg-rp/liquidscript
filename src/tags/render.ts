import type { Namespace, RenderContext } from "../context";
import { ForLoop } from "../drops";
import type { Expression, KeywordArgument, Name } from "../expression";
import type { Markup, OutputBuffer, Partial } from "../markup";
import type { Parser } from "../parser";
import { isNothing, Nothing } from "../runtime";
import { T, type Token } from "../token";
import { isArray } from "../type_guards";

const DISABLED_TAGS = new Set(["include"]);

export class RenderTag implements Markup {
  readonly blank = false;

  constructor(
    readonly token: Token,
    readonly name: Expression,
    readonly loop: boolean,
    readonly variable: Expression | undefined,
    readonly alias: Name | undefined,
    readonly args: KeywordArgument[],
  ) {}

  static parse(token: Token, parser: Parser): Markup {
    const nameExpr = parser.parseExpression();

    let loop = false;
    let variable: Expression | undefined = undefined;
    let alias: Name | undefined = undefined;

    // `for`, `with` and `as` don't have their own tokens kinds.
    const ident = parser.currentValue();
    if (ident == "for" || ident == "with") {
      parser.next();
      if (ident == "for") loop = true;
      variable = parser.parseExpression();
    }

    if (parser.currentValue() == "as") {
      parser.next();
      alias = parser.parseIdent();
    }

    if (parser.kind() == T.COMMA) parser.next();
    const args = parser.parseKeywordArguments(false);

    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    return new RenderTag(token, nameExpr, loop, variable, alias, args);
  }

  children(
    staticContext: RenderContext,
    options?: { includePartials?: boolean },
  ): Markup[] {
    // TODO:
    throw new Error("not implemented");
  }

  expressions(): Expression[] {
    const result = [this.name];
    if (this.variable) result.push(this.variable);
    result.push(...this.args.map((arg) => arg.expr));
    return result;
  }

  partialScope(): Partial {
    // TODO:
    throw new Error("not implemented");
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    const templateName = `${await this.name.evaluate(context)}`;

    const template = await context.env.getTemplate(
      templateName,
      undefined,
      context,
      { tag: "include" },
    );

    const bindKey =
      this.alias?.value || (template.name.split(".", 1)[0] as string);

    let bindValue: unknown;

    if (this.variable) {
      bindValue = await this.variable.evaluate(context);
    } else {
      bindValue = context.resolve(templateName);
      if (isNothing(bindValue)) bindValue = undefined;
    }

    const scope: Namespace = {};
    for (const arg of this.args) {
      scope[arg.name.value] = await arg.expr.evaluate(context);
    }

    const ctx = context.copy(scope, {
      disabledTags: DISABLED_TAGS,
      blockScope: false,
      template,
    });

    if (this.loop && isArray(bindValue)) {
      // TODO: support looping over drops
      // TODO: raise for loop limit

      const forloop = new ForLoop(bindKey, bindValue.length, Nothing);
      scope.forloop = forloop;

      for (const item of bindValue) {
        scope[bindKey] = item;
        forloop.step();
        await template.renderWithContext(ctx, buffer, {
          partial: true,
          blockScope: false,
        });
      }
    } else {
      scope[bindKey] = bindValue;
      await template.renderWithContext(ctx, buffer, {
        partial: true,
        blockScope: false,
      });
    }
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    const templateName = `${this.name.evaluateSync(context)}`;

    const template = context.env.getTemplateSync(
      templateName,
      undefined,
      context,
      { tag: "include" },
    );

    const bindKey =
      this.alias?.value || (template.name.split(".", 1)[0] as string);

    let bindValue: unknown;

    if (this.variable) {
      bindValue = this.variable.evaluateSync(context);
    } else {
      bindValue = context.resolve(templateName);
      if (isNothing(bindValue)) bindValue = undefined;
    }

    const scope: Namespace = {};
    for (const arg of this.args) {
      scope[arg.name.value] = arg.expr.evaluateSync(context);
    }

    const ctx = context.copy(scope, {
      disabledTags: DISABLED_TAGS,
      blockScope: false,
      template,
    });

    if (this.loop && isArray(bindValue)) {
      // TODO: support looping over drops
      // TODO: raise for loop limit

      const forloop = new ForLoop(bindKey, bindValue.length, Nothing);
      scope.forloop = forloop;

      for (const item of bindValue) {
        scope[bindKey] = item;
        forloop.step();
        template.renderWithContextSync(ctx, buffer, {
          partial: true,
          blockScope: false,
        });
      }
    } else {
      scope[bindKey] = bindValue;
      template.renderWithContextSync(ctx, buffer, {
        partial: true,
        blockScope: false,
      });
    }
  }
}
