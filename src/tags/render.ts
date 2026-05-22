import type { Namespace, RenderContext } from "../context";
import { ForLoop } from "../drops";
import {
  Name,
  type Expression,
  type KeywordArgument,
  type StringLiteral,
} from "../expression";
import { fnv1a32 } from "../fnv";
import { Scope, type Markup, type Partial } from "../markup";
import type { OutputBuffer } from "../output";
import type { Parser } from "../parser";
import { isNothing, Nothing } from "../runtime";
import { T, type Token } from "../token";
import { isArray } from "../type_guards";

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
    const template = staticContext.env.getTemplateSync(
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

  expressions(): Expression[] {
    const result = [];
    if (this.variable) result.push(this.variable);
    result.push(...this.args.map((arg) => arg.expr));
    return result;
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    const templateName = `${await this.name.evaluate(context)}`;

    // TODO: promote TemplateNotFoundError to NoSuchTemplateError
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
      // TODO: support looping over drops

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

    // TODO: promote TemplateNotFoundError to NoSuchTemplateError
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
      // TODO: support looping over drops

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
