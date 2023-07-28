import { LiquidSyntaxError } from "../../errors";
import { Tag } from "../../tag";
import { TokenStream, TOKEN_EXPRESSION } from "../../token";
import { CommentNode } from "./comment";

export class InlineCommentTag implements Tag {
  readonly block = true;
  readonly name: string = "comment";
  protected nodeClass = CommentNode;

  protected static RE_INVALID_INLINE_COMMENT = /\n\s*[^#\s]/m;

  public parse(stream: TokenStream): CommentNode {
    const tok = stream.current;
    if (stream.peek.kind === TOKEN_EXPRESSION) {
      stream.next();
      if (
        stream.current.value.search(
          InlineCommentTag.RE_INVALID_INLINE_COMMENT,
        ) !== -1
      ) {
        throw new LiquidSyntaxError(
          "every line of an inline comment must start with a '#' character",
          stream.current,
        );
      }
    }
    return new this.nodeClass(tok, stream.current.value);
  }
}
