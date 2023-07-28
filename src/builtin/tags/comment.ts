import { Node } from "../../ast";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_EOF, TOKEN_TAG } from "../../token";

export class CommentTag implements Tag {
  readonly block = true;
  readonly name: string = "comment";
  readonly end: string = "endcomment";
  protected nodeClass = CommentNode;

  public parse(stream: TokenStream): Node {
    const token = stream.next();
    const text: string[] = [];

    while (
      stream.current.kind !== TOKEN_EOF &&
      !(
        stream.current.kind === TOKEN_TAG &&
        stream.current.value === "endcomment"
      )
    ) {
      text.push(stream.current.value);
      stream.next();
    }
    return new this.nodeClass(token, text.join(""));
  }
}

export class CommentNode implements Node {
  constructor(
    readonly token: Token,
    readonly text: string,
  ) {}

  public async render(): Promise<void> {
    return;
  }

  public renderSync(): void {
    return;
  }
}
