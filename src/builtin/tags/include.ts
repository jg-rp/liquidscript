import { Node } from "../../ast";
import { RenderContext, ContextScope } from "../../context";
import { LiquidSyntaxError } from "../../errors";
import { Expression, Identifier, StringLiteral } from "../../expression";
import {
  parseIdentifier,
  parseStringOrIdentifier,
  parseUnchainedIdentifier,
} from "../../expressions/common";
import { parseObject } from "../../expressions/filtered/parse";
import { tokenize } from "../../expressions/include/lex";
import {
  ExpressionTokenStream,
  TOKEN_AS,
  TOKEN_COLON,
  TOKEN_COMMA,
  TOKEN_FOR,
  TOKEN_IDENT,
  TOKEN_WITH,
} from "../../expressions/tokens";
import { RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_EOF, TOKEN_EXPRESSION } from "../../token";
import { isLiquidArrayLike } from "../../types";

// TODO: set `nodeClass` on all built-in tags for easier sub classing.

export class IncludeTag implements Tag {
  readonly block = false;
  readonly name = "include";
  protected nodeClass = IncludeNode;

  protected parseArgument(stream: ExpressionTokenStream): [string, Expression] {
    const key = parseUnchainedIdentifier(stream).toString();
    stream.next();
    stream.expect(TOKEN_COLON);
    stream.next(); // Eat colon
    const val = parseObject(stream);
    stream.next();
    return [key, val];
  }

  public parse(stream: TokenStream): Node {
    const token = stream.next();
    stream.expect(TOKEN_EXPRESSION);
    const exprStream = new ExpressionTokenStream(
      tokenize(stream.current.value, stream.current.index)
    );

    // The name of a template to include.
    // This should be a string literal or an identifier that resolve to a string.
    const templateName = parseStringOrIdentifier(exprStream);
    exprStream.next();

    // Optionally bind an object to a name while rendering the included template, possibly with an alias.
    let bindName: Identifier | undefined = undefined;
    let alias: string | undefined = undefined;

    if (
      exprStream.current.kind === TOKEN_WITH ||
      exprStream.current.kind === TOKEN_FOR ||
      exprStream.current.kind === TOKEN_AS // working around dodgy ts
    ) {
      // Eat 'with' or 'for'
      exprStream.next();
      exprStream.expect(TOKEN_IDENT);
      bindName = parseIdentifier(exprStream);
      exprStream.next();

      // Optional alias for the bind name.
      if (exprStream.current.kind === TOKEN_AS) {
        // Eat 'with' or 'for'
        exprStream.next();
        exprStream.expect(TOKEN_IDENT);
        alias = parseUnchainedIdentifier(exprStream).toString();
        exprStream.next();
      }
    }

    const args: { [index: string]: Expression } = {};

    // The first keyword argument might follow immediately or after a comma.
    if (exprStream.current.kind === TOKEN_IDENT) {
      const [k, v] = this.parseArgument(exprStream);
      args[k] = v;
    }

    while (exprStream.current.kind !== TOKEN_EOF) {
      if (exprStream.current.kind === TOKEN_COMMA) {
        exprStream.next();
        const [k, v] = this.parseArgument(exprStream);
        args[k] = v;
      } else {
        throw new LiquidSyntaxError(
          "expected a comma separated list of arguments, " +
            `found ${exprStream.current.kind}`,
          token
        );
      }
    }

    return new this.nodeClass(token, templateName, bindName, alias, args);
  }
}

export class IncludeNode implements Node {
  protected tag: string = "include";

  constructor(
    readonly token: Token,
    readonly templateName: StringLiteral | Identifier,
    readonly bindName?: Identifier,
    readonly alias?: string,
    readonly args: { [index: string]: Expression } = {}
  ) {}

  public async render(
    context: RenderContext,
    out: RenderStream
  ): Promise<void> {
    const templateName = `${await this.templateName.evaluate(context)}`;
    const template = await context.getTemplate(templateName, { tag: this.tag });
    const scope: ContextScope = {};

    for (const [key, value] of Object.entries(this.args)) {
      scope[key] = await value.evaluate(context);
    }

    context.scope.push(scope);

    try {
      if (this.bindName) {
        const bindValue = await this.bindName.evaluate(context);
        const bindKey = this.alias || template.name.split(".")[0];

        if (isLiquidArrayLike(bindValue)) {
          // Render the template once for each item in an array.
          for (const item of bindValue) {
            scope[bindKey] = item;
            await template.renderWithContext(context, out, false, true);
          }
        } else {
          scope[bindKey] = bindValue;
          await template.renderWithContext(context, out, false, true);
        }
      } else {
        await template.renderWithContext(context, out, false, true);
      }
    } finally {
      context.scope.pop();
    }
  }

  public renderSync(context: RenderContext, out: RenderStream): void {
    const templateName = `${this.templateName.evaluateSync(context)}`;
    const template = context.getTemplateSync(templateName, { tag: this.tag });
    const scope: ContextScope = Object.fromEntries(
      Object.entries(this.args).map(([key, value]) => [
        key,
        value.evaluateSync(context),
      ])
    );

    context.scope.push(scope);

    try {
      if (this.bindName) {
        const bindValue = this.bindName.evaluateSync(context);
        const bindKey = this.alias || template.name.split(".")[0];

        if (isLiquidArrayLike(bindValue)) {
          // Render the template once for each item in an array.
          for (const item of bindValue) {
            scope[bindKey] = item;
            template.renderWithContextSync(context, out, false, true);
          }
        } else {
          scope[bindKey] = bindValue;
          template.renderWithContextSync(context, out, false, true);
        }
      } else {
        template.renderWithContextSync(context, out, false, true);
      }
    } finally {
      context.scope.pop();
    }
  }

  children(): Node[] {
    return [];
  }
}
