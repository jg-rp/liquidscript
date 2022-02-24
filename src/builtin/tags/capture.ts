import { BlockNode, Node } from "../../ast";
import { Context } from "../../context";
import { Environment } from "../../environment";
import { LiquidSyntaxError } from "../../errors";
import { ASSIGN_IDENTIFIER_PATTERN } from "../../expressions/common";
import { DefaultOutputStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_EOF, TOKEN_EXPRESSION } from "../../token";

const TAG_CAPTURE = "capture";
const TAG_END_CAPTURE = "endcapture";
const END_CAPTURE_BLOCK = new Set([TAG_END_CAPTURE, TOKEN_EOF]);
const RE_CAPTURE = new RegExp("^\\w[a-zA-Z0-9_\\-]*$"); // TODO: confirm

export class CaptureTag implements Tag {
  readonly block = true;
  readonly name = TAG_CAPTURE;
  readonly end = TAG_END_CAPTURE;

  public parse(stream: TokenStream, environment: Environment): CaptureNode {
    const parser = environment.getParser();
    const token = stream.next();
    stream.expect(TOKEN_EXPRESSION);

    if (!RE_CAPTURE.test(stream.current.value)) {
      throw new LiquidSyntaxError(
        `invalid capture identifier '${stream.current.value}'`,
        token
      );
    }

    const name = stream.next().value;
    return new CaptureNode(
      token,
      name,
      parser.parseBlock(stream, END_CAPTURE_BLOCK)
    );
  }
}

export class CaptureNode implements Node {
  constructor(
    readonly token: Token,
    readonly name: string,
    readonly block: BlockNode
  ) {}

  public async render(context: Context): Promise<void> {
    const buf = new DefaultOutputStream();
    await this.block.render(context, buf);
    context.assign(this.name, buf.toString());
  }

  public renderSync(context: Context): void {
    const buf = new DefaultOutputStream();
    this.block.renderSync(context, buf);
    context.assign(this.name, buf.toString());
  }

  branches(): Node[] {
    return [];
  }
}
