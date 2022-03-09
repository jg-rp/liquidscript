import { Node } from "../../ast";
import { RenderContext } from "../../context";
import { RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TokenStream } from "../../token";
import { parse } from "../../expressions/filtered/parse";
import { Expression } from "../../expression";
import { liquidStringify } from "../../types";

export class OutputStatement implements Tag {
  readonly block = false;
  readonly name = "statement";
  protected nodeClass = OutputStatementNode;

  parse(stream: TokenStream): Node {
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
    // TODO: toHTML drop
    if (context.environment.autoEscape)
      out.write(
        escape(liquidStringify(await this.expression.evaluate(context)))
      );
    else out.write(liquidStringify(await this.expression.evaluate(context)));
  }

  public renderSync(context: RenderContext, out: RenderStream): void {
    // TODO: toHTML drop
    if (context.environment.autoEscape)
      out.write(escape(liquidStringify(this.expression.evaluateSync(context))));
    else out.write(liquidStringify(this.expression.evaluateSync(context)));
  }

  children(): Node[] {
    return [];
  }

  toString(): string {
    return "`" + this.expression.toString() + "`";
  }
}

function escape(s: string): string {
  return s
    .replace("&", "&amp;")
    .replace(">", "&gt;")
    .replace("<", "&lt;")
    .replace("'", "&#39;")
    .replace('"', "&#34;");
}
