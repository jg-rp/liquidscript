import { ChildNode, Node } from "../../ast";
import { RenderContext } from "../../context";
import { escape } from "../../html";
import { RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TokenStream } from "../../token";
import { parse } from "../../expressions/filtered/parse";
import { Expression } from "../../expression";
import { liquidStringify } from "../../types";
import { isLiquidHTMLable, toLiquidHtml } from "../../drop";

export class OutputStatement implements Tag {
  readonly block = false;
  readonly name: string = "statement";
  protected nodeClass = OutputStatementNode;

  public parse(stream: TokenStream): Node {
    return new this.nodeClass(
      stream.current,
      parse(stream.current.value, stream.current.index)
    );
  }
}

export class OutputStatementNode implements Node {
  readonly forceOutput = true;
  constructor(readonly token: Token, readonly expression: Expression) {}

  public async render(
    context: RenderContext,
    out: RenderStream
  ): Promise<void> {
    const result = await this.expression.evaluate(context);
    if (context.environment.autoEscape) {
      if (isLiquidHTMLable(result)) out.write(result[toLiquidHtml]());
      else out.write(escape(liquidStringify(result)));
    } else out.write(liquidStringify(result));
  }

  public renderSync(context: RenderContext, out: RenderStream): void {
    const result = this.expression.evaluateSync(context);
    if (context.environment.autoEscape) {
      if (isLiquidHTMLable(result)) {
        out.write(result[toLiquidHtml]());
      } else {
        out.write(escape(liquidStringify(result)));
      }
    } else {
      out.write(liquidStringify(result));
    }
  }

  toString(): string {
    return `\`${this.expression.toString()}\``;
  }

  public children(): ChildNode[] {
    return [
      {
        token: this.token,
        expression: this.expression,
      },
    ];
  }
}
