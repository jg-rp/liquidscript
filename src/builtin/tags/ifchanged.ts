import { BlockNode, Node, ChildNode } from "../../ast";
import { RenderContext } from "../../context";
import { Environment } from "../../environment";
import { BufferedRenderStream, RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TokenStream } from "../../token";

export class IfChangedTag implements Tag {
  protected static END_IFCHANGED_BLOCK = new Set(["endifchanged"]);

  readonly name: string = "ifchanged";
  readonly block = true;
  protected nodeClass = IfChangedNode;

  parse(stream: TokenStream, environment: Environment): Node {
    const token = stream.next();
    return new this.nodeClass(
      token,
      environment.parser.parseBlock(
        stream,
        IfChangedTag.END_IFCHANGED_BLOCK,
        token
      )
    );
  }
}

export class IfChangedNode implements Node {
  constructor(readonly token: Token, readonly block: BlockNode) {}

  public async render(
    context: RenderContext,
    out: RenderStream
  ): Promise<void> {
    const buf = new BufferedRenderStream();
    await this.block.render(context, buf);
    const buffered = buf.toString();
    const ifchanged = context.getRegister("ifchanged");
    const last = ifchanged.get("last");

    if (buffered !== last) {
      ifchanged.set("last", buffered);
      out.write(buffered);
    }
  }

  public renderSync(context: RenderContext, out: RenderStream): void {
    const buf = new BufferedRenderStream();
    this.block.renderSync(context, buf);
    const buffered = buf.toString();
    const ifchanged = context.getRegister("ifchanged");
    const last = ifchanged.get("last");

    if (buffered !== last) {
      ifchanged.set("last", buffered);
      out.write(buffered);
    }
  }

  public children(): ChildNode[] {
    return this.block.children();
  }
}
