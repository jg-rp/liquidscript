import { Node } from "../../ast";
import { RenderContext } from "../../context";
import { LiquidSyntaxError } from "../../errors";
import { Expression, Literal } from "../../expression";
import { ASSIGN_IDENTIFIER_PATTERN } from "../../expressions/common";
import { parse } from "../../expressions/filtered/parse";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_EXPRESSION } from "../../token";

const TAG_ASSIGN = "assign";
const RE_ASSIGN = new RegExp(`^(${ASSIGN_IDENTIFIER_PATTERN})\\s*=\\s*(.+)$`);

export class AssignTag implements Tag {
  readonly block = false;
  readonly name = TAG_ASSIGN;

  public parse(stream: TokenStream): AssignNode {
    const token = stream.next();
    stream.expect(TOKEN_EXPRESSION);

    const match = stream.current.value.match(RE_ASSIGN);
    if (!match)
      throw new LiquidSyntaxError(
        `invalid assignment expression '${stream.current.value}'`,
        token
      );

    const [, name, expr] = match;
    return new AssignNode(token, name, parse(expr));
  }
}

export class AssignNode implements Node {
  constructor(
    readonly token: Token,
    readonly name: string,
    readonly expression: Expression
  ) {}

  public async render(context: RenderContext): Promise<void> {
    context.assign(
      this.name,
      this.expression instanceof Literal
        ? this.expression.evaluateSync(context)
        : await this.expression.evaluate(context)
    );
  }

  public renderSync(context: RenderContext): void {
    context.assign(this.name, this.expression.evaluateSync(context));
  }

  children(): Node[] {
    return [];
  }
}
