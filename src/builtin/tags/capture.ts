import { BlockNode, Node } from "../../ast";
import { RenderContext } from "../../context";
import { Environment } from "../../environment";
import { LiquidSyntaxError } from "../../errors";
import { ASSIGN_IDENTIFIER_PATTERN } from "../../expressions/common";
import { BufferedRenderStream, RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_EOF, TOKEN_EXPRESSION } from "../../token";
import { Markup } from "../drops/markup";

// TODO: Move these inside the Tag class for easier sub classing. Maybe as static members.
const TAG_CAPTURE = "capture";
const TAG_END_CAPTURE = "endcapture";
const END_CAPTURE_BLOCK = new Set([TAG_END_CAPTURE, TOKEN_EOF]);
const RE_CAPTURE = new RegExp("^\\w[a-zA-Z0-9_\\-]*$");

export class CaptureTag implements Tag {
  readonly block = true;
  readonly name: string = TAG_CAPTURE;
  readonly end: string = TAG_END_CAPTURE;
  protected nodeClass = CaptureNode;

  public parse(stream: TokenStream, environment: Environment): Node {
    const token = stream.next();
    stream.expect(TOKEN_EXPRESSION);

    if (!RE_CAPTURE.test(stream.current.value)) {
      throw new LiquidSyntaxError(
        `invalid capture identifier '${stream.current.value}'`,
        token
      );
    }

    const name = stream.next().value;
    return new this.nodeClass(
      token,
      name,
      environment.parser.parseBlock(stream, END_CAPTURE_BLOCK)
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

  public async render(context: RenderContext): Promise<void> {
    const buf = new BufferedRenderStream();
    await this.block.render(context, buf);
    this.assign(context, buf);
  }

  public renderSync(context: RenderContext): void {
    const buf = new BufferedRenderStream();
    this.block.renderSync(context, buf);
    this.assign(context, buf);
  }

  children(): Node[] {
    return [this.block];
  }
}
