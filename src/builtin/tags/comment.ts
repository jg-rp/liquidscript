import { Node } from "../../ast";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_EOF, TOKEN_TAG } from "../../token";

export class CommentTag implements Tag {
  readonly block = true;
  readonly name = "comment";
  readonly end = "endcomment";
  protected nodeClass = CommentNode;

  public parse(stream: TokenStream): Node {
    const node = new this.nodeClass(stream.next());
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

  children(): Node[] {
    return [];
  }
}
