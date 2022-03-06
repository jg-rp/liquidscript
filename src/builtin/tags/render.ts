import { Node } from "../../ast";
import { RenderContext, ContextScope } from "../../context";
import { LiquidSyntaxError } from "../../errors";
import { Expression, Identifier, StringLiteral } from "../../expression";
import {
  parseIdentifier,
  parseStringLiteral,
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
  TOKEN_STRING,
  TOKEN_WITH,
} from "../../expressions/tokens";
import { RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_EOF, TOKEN_EXPRESSION } from "../../token";
import { isLiquidArrayLike } from "../../types";
import { ForLoopDrop } from "../drops/forloop";

export class RenderTag implements Tag {
  readonly block = false;
  readonly name = "render";
  protected nodeClass = RenderNode;

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
    // This should to a string literal.
    exprStream.expect(TOKEN_STRING);
    const templateName = parseStringLiteral(exprStream);
    exprStream.next();

    // Optionally bind an object to a name while rendering
    // the included template, possibly with an alias.
    let bindName: Identifier | undefined = undefined;
    let alias: string | undefined = undefined;
    let bindLoop = false;

    if (
      exprStream.current.kind === TOKEN_WITH ||
      exprStream.current.kind === TOKEN_FOR ||
      exprStream.current.kind === TOKEN_AS // working around dodgy ts
    ) {
      // Remember if this was a 'for' or 'with' binding.
      // Note that the 'include' tag does not make this distinction.
      bindLoop = exprStream.current.kind === TOKEN_FOR;
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

    return new this.nodeClass(
      token,
      templateName,
      bindLoop,
      bindName,
      alias,
      args
    );
  }
}

export class RenderNode implements Node {
  protected tag: string = "render";

  constructor(
    readonly token: Token,
    readonly templateName: StringLiteral | Identifier,
    readonly bindLoop: boolean,
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

    // Disable include tags in this context.
    const ctx = context.copy(scope, ["include"]);

    if (this.bindName) {
      const bindValue = await this.bindName.evaluate(context);
      const bindKey = this.alias || template.name.split(".")[0];

      if (this.bindLoop && isLiquidArrayLike(bindValue)) {
        // Render the template once for each item in an array.
        const forloop = new ForLoopDrop(
          bindKey,
          bindValue.values(),
          bindValue.length,
          context.environment.undefinedFactory("parentloop")
        );

        scope.forloop = forloop;

        for (const item of forloop) {
          scope[bindKey] = item;
          await template.renderWithContext(ctx, out, true, true);
        }
      } else {
        scope[bindKey] = bindValue;
        await template.renderWithContext(ctx, out, true, true);
      }
    } else {
      await template.renderWithContext(ctx, out, true, true);
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

    // Disable include tags in this context.
    const ctx = context.copy(scope, ["include"]);

    if (this.bindName) {
      const bindValue = this.bindName.evaluateSync(context);
      const bindKey = this.alias || template.name.split(".")[0];

      if (this.bindLoop && isLiquidArrayLike(bindValue)) {
        // Render the template once for each item in an array.
        const forloop = new ForLoopDrop(
          bindKey,
          bindValue.values(),
          bindValue.length,
          context.environment.undefinedFactory("parentloop")
        );

        scope.forloop = forloop;

        for (const item of forloop) {
          scope[bindKey] = item;
          template.renderWithContextSync(ctx, out, true, true);
        }
      } else {
        scope[bindKey] = bindValue;
        template.renderWithContextSync(ctx, out, true, true);
      }
    } else {
      template.renderWithContextSync(ctx, out, true, true);
    }
  }

  children(): Node[] {
    return [];
  }
}
