import { Node } from "../../ast";
import { RenderContext } from "../../context";
import { RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_LITERAL } from "../../token";

export class TemplateLiteral implements Tag {
  readonly block = false;
  readonly name = TOKEN_LITERAL;
  protected nodeClass = LiteralNode;

  parse(stream: TokenStream): Node {
    return new this.nodeClass(stream.current);
  }
}

export class LiteralNode implements Node {
  constructor(readonly token: Token) {}

  async render(context: RenderContext, out: RenderStream): Promise<void> {
    out.write(this.token.value);
  }

  public renderSync(context: RenderContext, out: RenderStream): void {
    out.write(this.token.value);
  }
}
