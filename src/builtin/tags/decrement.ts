import { ChildNode, Node } from "../../ast";
import { RenderContext } from "../../context";
import { parseUnchainedIdentifier } from "../../expressions/common";
import { tokenize } from "../../expressions/filtered/lex";
import { ExpressionTokenStream } from "../../expressions/tokens";
import { RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_EXPRESSION } from "../../token";

export class DecrementTag implements Tag {
  readonly block = false;
  readonly name: string = "decrement";
  protected nodeClass = DecrementNode;

  public parse(stream: TokenStream): Node {
    const token = stream.next();
    stream.expect(TOKEN_EXPRESSION);
    return new this.nodeClass(
      token,
      parseUnchainedIdentifier(
        new ExpressionTokenStream(tokenize(stream.current.value))
      ).toString()
    );
  }
}

export class DecrementNode implements Node {
  constructor(readonly token: Token, readonly identifier: string) {}

  public async render(
    context: RenderContext,
    out: RenderStream
  ): Promise<void> {
    this.renderSync(context, out);
  }

  public renderSync(context: RenderContext, out: RenderStream): void {
    let val = context.counters[this.identifier];
    if (val === undefined) val = 0;
    val -= 1;
    context.counters[this.identifier] = val;
    out.write(val.toString());
  }

  public children(): ChildNode[] {
    return [
      {
        token: this.token,
        templateScope: [this.identifier],
      },
    ];
  }
}
