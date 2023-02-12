import { ChildNode, Node } from "../../ast";
import { RenderContext } from "../../context";
import { LiquidSyntaxError } from "../../errors";
import { Expression, Literal } from "../../expression";
import { ASSIGN_IDENTIFIER_PATTERN } from "../../expressions/common";
import { parse } from "../../expressions/filtered/parse";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_EXPRESSION } from "../../token";

export class AssignTag implements Tag {
  protected static RE_ASSIGN = new RegExp(
    `^(${ASSIGN_IDENTIFIER_PATTERN})\\s*=\\s*(.+)$`,
    "s"
  );

  readonly block = false;
  readonly name: string = "assign";
  protected nodeClass = AssignNode;

  protected parseExpression(value: string, startIndex: number): Expression {
    return parse(value, startIndex);
  }

  public parse(stream: TokenStream): Node {
    const token = stream.next();
    stream.expect(TOKEN_EXPRESSION);

    const match = stream.current.value.match(AssignTag.RE_ASSIGN);
    if (!match)
      throw new LiquidSyntaxError(
        `invalid assignment expression '${stream.current.value}'`,
        token
      );

    const [, name, expr] = match;
    return new this.nodeClass(
      token,
      name,
      this.parseExpression(expr, stream.current.index)
    );
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

  public children(): ChildNode[] {
    return [
      {
        token: this.token,
        expression: this.expression,
        templateScope: [this.name],
      },
    ];
  }
}
