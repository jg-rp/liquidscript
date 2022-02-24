import { Node } from "../../ast";
import { Context } from "../../context";
import { RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_EOF, TOKEN_TAG } from "../../token";

export class CommentTag implements Tag {
  readonly block = true;
  readonly name = "comment";
  readonly end = "endcomment";

  public parse(stream: TokenStream): CommentNode {
    const node = new CommentNode(stream.next());
    while (
      stream.current.kind !== TOKEN_EOF &&
      !(
        stream.current.kind === TOKEN_TAG &&
        stream.current.value === "endcomment"
      )
    ) {
      stream.next();
    }
    return node;
  }
}

export class CommentNode implements Node {
  constructor(readonly token: Token) {}

  public async render(): Promise<void> {
    return;
  }

  public renderSync(): void {
    return;
  }

  branches(): Node[] {
    throw new Error("Method not implemented.");
  }
}
