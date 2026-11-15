import type { Namespace, RenderContext } from "../context.js";
import type { OutputBuffer } from "../output.js";
import type { Parser } from "../parser.js";
import type { Template } from "../template.js";

import { ForLoop } from "../drops/index.js";
import { NoSuchTemplateError, TemplateNotFoundError } from "../errors.js";
import { Name, type Expression, type KeywordArgument, type StringLiteral } from "../expression.js";
import { fnv1a32 } from "../fnv.js";
import { Scope, type Markup, type Partial } from "../markup.js";
import { isNothing, Nothing } from "../runtime.js";
import { T, type Token } from "../token.js";
import { isArray } from "../type_guards.js";

const DISABLED_TAGS = new Set(["include"]);

export class RenderTag implements Markup {
  readonly blank = false;

  readonly tag = "render";

  constructor(
    readonly token: Token,
    readonly name: StringLiteral,
    readonly loop: boolean,
    readonly variable: Expression | undefined,
    readonly alias: Name | undefined,
    readonly args: KeywordArgument[],
  ) {}

  static parse(token: Token, parser: Parser): Markup {
    const nameExpr = parser.parseStringLiteral();

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

  async partial(staticContext: RenderContext): Promise<Partial> {
    const template = await staticContext.env.getTemplate(
      this.name.value,
      undefined,
      staticContext,
      { tag: "render" },
    );

    const scope: Name[] = this.args.map((arg) => arg.name);

    if (this.variable) {
      if (this.alias) {
        scope.push(this.alias);
      } else {
        scope.push(new Name(this.name.token, this.name.value));
      }
    }

    return {
      template,
      scopeKind: Scope.ISOLATED,
      inScope: scope,
      key: fnv1a32(this.name.value + scope.map((n) => n.value).join(":")),
    };
  }

  partialSync(staticContext: RenderContext): Partial {
    const template = staticContext.env.getTemplateSync(this.name.value, undefined, staticContext, {
      tag: "render",
    });

    const scope: Name[] = this.args.map((arg) => arg.name);

    if (this.variable) {
      if (this.alias) {
        scope.push(this.alias);
      } else {
        scope.push(new Name(this.name.token, this.name.value));
      }
    }

    return {
      template,
      scopeKind: Scope.ISOLATED,
      inScope: scope,
      key: fnv1a32(this.name.value + scope.map((n) => n.value).join(":")),
    };
  }

  expressions(): Expression[] {
    const result = [];
    if (this.variable) result.push(this.variable);
    result.push(...this.args.map((arg) => arg.expr));
    return result;
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    const templateName = `${await this.name.evaluate(context)}`;
    let template: Template;

    try {
      template = await context.env.getTemplate(templateName, undefined, context, { tag: "render" });
    } catch (err) {
      if (err instanceof TemplateNotFoundError) {
        // Promote TemplateNotFoundError to NoSuchTemplateError
        throw new NoSuchTemplateError(
          err.message,
          this.name.span,
          context.template.source,
          context.template.name,
        );
      }

      throw err;
    }

    const bindKey = this.alias?.value || template.name.split(".", 1)[0] || "";

    let bindValue: unknown;

    if (this.variable) {
      bindValue = await this.variable.evaluate(context);
    } else {
      bindValue = context.resolve(templateName);
      if (isNothing(bindValue)) bindValue = undefined;
    }

    const scope: Namespace = Object.create(null);
    for (const arg of this.args) {
      scope[arg.name.value] = await arg.expr.evaluate(context);
    }

    const ctx = context.copy(scope, {
      disabledTags: DISABLED_TAGS,
      blockScope: false,
      template,
    });

    if (this.loop && isArray(bindValue)) {
      const forloop = new ForLoop(bindKey, bindValue.length, Nothing);
      scope.forloop = forloop;

      for (const item of bindValue) {
        scope[bindKey] = item;
        forloop.step();
        await template.renderWithContext(ctx, buffer);
      }
    } else {
      scope[bindKey] = bindValue;
      await template.renderWithContext(ctx, buffer);
    }

    context.renderScoreCumulative += ctx.renderScore;
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    const templateName = `${this.name.evaluateSync(context)}`;
    let template: Template;

    try {
      template = context.env.getTemplateSync(templateName, undefined, context, {
        tag: "render",
      });
    } catch (err) {
      if (err instanceof TemplateNotFoundError) {
        // Promote TemplateNotFoundError to NoSuchTemplateError
        throw new NoSuchTemplateError(
          err.message,
          this.name.span,
          context.template.source,
          context.template.name,
        );
      }

      throw err;
    }

    const bindKey = this.alias?.value || template.name.split(".", 1)[0] || "";

    let bindValue: unknown;

    if (this.variable) {
      bindValue = this.variable.evaluateSync(context);
    } else {
      bindValue = context.resolve(templateName);
      if (isNothing(bindValue)) bindValue = undefined;
    }

    const scope: Namespace = Object.create(null);
    for (const arg of this.args) {
      scope[arg.name.value] = arg.expr.evaluateSync(context);
    }

    const ctx = context.copy(scope, {
      disabledTags: DISABLED_TAGS,
      blockScope: false,
      template,
    });

    if (this.loop && isArray(bindValue)) {
      const forloop = new ForLoop(bindKey, bindValue.length, Nothing);
      scope.forloop = forloop;

      for (const item of bindValue) {
        scope[bindKey] = item;
        forloop.step();
        template.renderWithContextSync(ctx, buffer);
      }
    } else {
      scope[bindKey] = bindValue;
      template.renderWithContextSync(ctx, buffer);
    }

    context.renderScoreCumulative += ctx.renderScore;
  }
}
