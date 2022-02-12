import { Node } from "../../ast";
import { Context } from "../../context";
import { parseUnchainedIdentifier } from "../../expressions/common";
import { tokenize } from "../../expressions/filtered/lex";
import { ExpressionTokenStream } from "../../expressions/tokens";
import { RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_EXPRESSION } from "../../token";

export class DecrementTag implements Tag {
  readonly block = false;
  readonly name = "decrement";

  parse(stream: TokenStream): DecrementNode {
    const token = stream.next();
    stream.expect(TOKEN_EXPRESSION);
    return new DecrementNode(
      token,
      parseUnchainedIdentifier(
        new ExpressionTokenStream(tokenize(stream.current.value))
      ).toString()
    );
  }
}

export class DecrementNode implements Node {
  constructor(readonly token: Token, readonly identifier: string) {}

  async render(context: Context, out: RenderStream): Promise<void> {
    let val = context.counters.get(this.identifier);
    if (val === undefined) val = 0;
    val -= 1;
    context.counters.set(this.identifier, val);
    out.write(val.toString());
  }

  branches(): Node[] {
    return [];
  }
}
