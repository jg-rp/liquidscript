import { BlockNode, Node, ChildNode } from "../../ast";
import { RenderContext } from "../../context";
import { Environment } from "../../environment";
import { LiquidSyntaxError } from "../../errors";
import { RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_EOF, TOKEN_EXPRESSION } from "../../token";
import { Markup } from "../drops/markup";

export class CaptureTag implements Tag {
  protected static END_CAPTURE_BLOCK = new Set(["endcapture", TOKEN_EOF]);
  protected static RE_CAPTURE = new RegExp("^\\w[a-zA-Z0-9_\\-]*$");

  readonly block = true;
  readonly name: string = "capture";
  readonly end: string = "endcapture";
  protected nodeClass = CaptureNode;

  public parse(stream: TokenStream, environment: Environment): Node {
    const token = stream.next();
    stream.expect(TOKEN_EXPRESSION);

    if (!CaptureTag.RE_CAPTURE.test(stream.current.value)) {
      throw new LiquidSyntaxError(
        `invalid capture identifier '${stream.current.value}'`,
        token
      );
    }

    const name = stream.next().value;
    return new this.nodeClass(
      token,
      name,
      environment.parser.parseBlock(stream, CaptureTag.END_CAPTURE_BLOCK, token)
    );
  }
}

export class CaptureNode implements Node {
  readonly captureOutput = true;
  constructor(
    readonly token: Token,
    readonly name: string,
    readonly block: BlockNode
  ) {}

  protected assign(context: RenderContext, buffer: RenderStream): void {
    if (context.environment.autoEscape)
      context.assign(this.name, new Markup(buffer.toString()));
    else context.assign(this.name, buffer.toString());
  }

  public async render(
    context: RenderContext,
    out: RenderStream
  ): Promise<void> {
    const buf = context.environment.renderStreamFactory(out);
    await this.block.render(context, buf);
    this.assign(context, buf);
  }

  public renderSync(context: RenderContext, out: RenderStream): void {
    const buf = context.environment.renderStreamFactory(out);
    this.block.renderSync(context, buf);
    this.assign(context, buf);
  }

  public children(): ChildNode[] {
    return [
      {
        token: this.token,
        node: this.block,
        templateScope: [this.name],
      },
    ];
  }
}
