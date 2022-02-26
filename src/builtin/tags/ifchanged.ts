import { BlockNode, Node } from "../../ast";
import { Context } from "../../context";
import { Environment } from "../../environment";
import { DefaultOutputStream, RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TokenStream } from "../../token";

const END_IFCHANGED_BLOCK = new Set(["endifchanged"]);

export class IfChangedTag implements Tag {
  readonly name = "ifchanged";
  readonly block = true;

  parse(stream: TokenStream, environment: Environment): Node {
    const parser = environment.getParser();
    const token = stream.next();
    return new IfChangedNode(
      token,
      parser.parseBlock(stream, END_IFCHANGED_BLOCK)
    );
  }
}

export class IfChangedNode implements Node {
  constructor(readonly token: Token, readonly block: BlockNode) {}

  public async render(context: Context, out: RenderStream): Promise<void> {
    const buf = new DefaultOutputStream();
    await this.block.render(context, buf);
    const buffered = buf.toString();

    if (context.ifchanged !== buffered) {
      context.ifchanged = buffered;
      out.write(buffered);
    }
  }

  public renderSync(context: Context, out: RenderStream): void {
    const buf = new DefaultOutputStream();
    this.block.renderSync(context, buf);
    const buffered = buf.toString();

    if (context.ifchanged !== buffered) {
      context.ifchanged = buffered;
      out.write(buffered);
    }
  }

  public children(): Node[] {
    return [this.block];
  }
}
