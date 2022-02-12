import { Node } from "../../ast";
import { Context } from "../../context";
import { RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_LITERAL } from "../../token";

export class TemplateLiteral implements Tag {
  readonly block = false;
  readonly name = TOKEN_LITERAL;

  parse(stream: TokenStream): Node {
    return new LiteralNode(stream.current);
  }
}

export class LiteralNode implements Node {
  constructor(readonly token: Token) {}

  async render(context: Context, out: RenderStream): Promise<void> {
    out.write(this.token.value);
  }

  branches(): Node[] {
    return [];
  }
}
