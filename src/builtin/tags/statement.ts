import { Node } from "../../ast";
import { Context } from "../../context";
import { RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TokenStream } from "../../token";
import { parse } from "../../expressions/filtered/parse";
import { Expression } from "../../expression";
import { toLiquidString } from "../../types";

export class OutputStatement implements Tag {
  readonly block = false;
  readonly name = "statement";

  parse(stream: TokenStream): Node {
    return new OutputStatementNode(
      stream.current,
      parse(stream.current.value, stream.current.index)
    );
  }
}

export class OutputStatementNode implements Node {
  readonly forceOutput = true;
  constructor(readonly token: Token, readonly expression: Expression) {}

  public async render(context: Context, out: RenderStream): Promise<void> {
    out.write(toLiquidString(await this.expression.evaluate(context)));
  }

  public renderSync(context: Context, out: RenderStream): void {
    out.write(toLiquidString(this.expression.evaluateSync(context)));
  }

  children(): Node[] {
    return [];
  }

  toString(): string {
    return "`" + this.expression.toString() + "`";
  }
}
