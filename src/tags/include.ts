import type { Namespace, RenderContext } from "../context";
import {
  Name,
  StringLiteral,
  type Expression,
  type KeywordArgument,
} from "../expression";
import { fnv1a32 } from "../fnv";
import { Scope, type Markup, type Partial } from "../markup";
import type { OutputBuffer } from "../output";
import type { Parser } from "../parser";
import { isNothing } from "../runtime";
import { T, type Token } from "../token";
import { isArray } from "../type_guards";

export class IncludeTag implements Markup {
  readonly blank = false;

  readonly tag = "include";

  constructor(
    readonly token: Token,
    readonly name: Expression,
    readonly variable: Expression | undefined,
    readonly alias: Name | undefined,
    readonly args: KeywordArgument[],
  ) {}

  static parse(token: Token, parser: Parser): Markup {
    const nameExpr = parser.parseExpression();

    let variable: Expression | undefined = undefined;
    let alias: Name | undefined = undefined;

    // `for`, `with` and `as` don't have their own tokens kinds.
    const ident = parser.currentValue();
    if (ident == "for" || ident == "with") {
      parser.next();
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
    return new IncludeTag(token, nameExpr, variable, alias, args);
  }

  expressions(): Expression[] {
    const result = [this.name];
    if (this.variable) result.push(this.variable);
    result.push(...this.args.map((arg) => arg.expr));
    return result;
  }

  async partial(staticContext: RenderContext): Promise<Partial> {
    const name = await this.name.evaluate(staticContext);

    const template = await staticContext.env.getTemplate(
      staticContext.env.toString(name, staticContext, this.name.token),
      undefined,
      staticContext,
      { tag: "include" },
    );

    const scope: Name[] = this.args.map((arg) => arg.name);

    if (this.variable) {
      if (this.alias) {
        scope.push(this.alias);
      } else if (this.name instanceof StringLiteral) {
        scope.push(new Name(this.name.token, this.name.value));
      }
    }

    return {
      template,
      scopeKind: Scope.SHARED,
      inScope: scope,
      key: fnv1a32(this.name.toString() + scope.map((n) => n.value).join(":")),
    };
  }

  partialSync(staticContext: RenderContext): Partial {
    const name = this.name.evaluateSync(staticContext);

    const template = staticContext.env.getTemplateSync(
      staticContext.env.toString(name, staticContext, this.name.token),
      undefined,
      staticContext,
      { tag: "include" },
    );

    const scope: Name[] = this.args.map((arg) => arg.name);

    if (this.variable) {
      if (this.alias) {
        scope.push(this.alias);
      } else if (this.name instanceof StringLiteral) {
        scope.push(new Name(this.name.token, this.name.value));
      }
    }

    return {
      template,
      scopeKind: Scope.SHARED,
      inScope: scope,
      key: fnv1a32(this.name.toString() + scope.map((n) => n.value).join(":")),
    };
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    const templateName = context.env.toString(
      await this.name.evaluate(context),
      context,
      this.name.token,
    );

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

    await context.extend(
      scope,
      async () => {
        if (isArray(bindValue)) {
          for (const item of bindValue) {
            scope[bindKey] = item;
            await template.renderWithContext(context, buffer);
          }
        } else {
          scope[bindKey] = bindValue;
          await template.renderWithContext(context, buffer);
        }
      },
      template,
    );
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    const templateName = context.env.toString(
      this.name.evaluateSync(context),
      context,
      this.name.token,
    );

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

    context.extendSync(
      scope,
      () => {
        if (isArray(bindValue)) {
          for (const item of bindValue) {
            scope[bindKey] = item;
            template.renderWithContextSync(context, buffer);
          }
        } else {
          scope[bindKey] = bindValue;
          template.renderWithContextSync(context, buffer);
        }
      },
      template,
    );
  }
}
