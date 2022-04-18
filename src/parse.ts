import { BlockNode, Node, Root } from "./ast";
import { Environment } from "./environment";
import { LiquidSyntaxError } from "./errors";
import {
  Token,
  TokenStream,
  TOKEN_EOF,
  TOKEN_LITERAL,
  TOKEN_STATEMENT,
  TOKEN_TAG,
} from "./token";
import { Tag } from "./tag";

export interface Parser {
  parse(stream: TokenStream): Root;

  /**
   * Parse a block of tokens from the given stream until an end
   * tag is found or the end of the stream is reached.
   *
   * @param stream - A template token stream.
   * @param end - A set of tag names that indicate the end of the
   * block.
   * @param token - The token to store on the block. Defaults to the
   * current token in the stream.
   */
  parseBlock(stream: TokenStream, end: Set<string>, token?: Token): BlockNode;

  /**
   * Like {@link parseBlock}, but read until the end of the stream.
   * Useful for the `liquid` tag.
   *
   * @param stream - A template token stream.
   */
  parseLiquid(stream: TokenStream): BlockNode;
}

export class TemplateParser implements Parser {
  constructor(readonly environment: Environment) {}

  public parse(stream: TokenStream): Root {
    const root = new Root();
    while (stream.current.kind !== TOKEN_EOF) {
      try {
        root.nodes.push(this.parseStatement(stream));
      } catch (error) {
        if (error instanceof Error) this.environment.error(error);
        else throw error;
      }
      stream.next();
    }
    return root;
  }

  public parseBlock(
    stream: TokenStream,
    end: Set<string>,
    token?: Token
  ): BlockNode {
    const block = new BlockNode(token ?? stream.current);
    while (
      !(stream.current.kind === TOKEN_TAG && end.has(stream.current.value))
    ) {
      if (stream.current.kind === TOKEN_EOF)
        throw new LiquidSyntaxError(
          `missing end tag, expected ${Array.from(end.values()).join(", ")}`,
          stream.current
        );
      block.nodes.push(this.parseStatement(stream));
      stream.next();
    }
    return block;
  }

  public parseLiquid(stream: TokenStream): BlockNode {
    const block = new BlockNode(stream.current);
    while (stream.current.kind !== TOKEN_EOF) {
      block.nodes.push(this.parseStatement(stream));
      stream.next();
    }
    return block;
  }

  protected getTag(token: Token): Tag {
    const tag = this.environment.tags[token.value];
    if (!tag)
      throw new LiquidSyntaxError(`unexpected tag '${token.value}'`, token);
    return tag;
  }

  protected parseStatement(stream: TokenStream): Node {
    let node: Node;
    switch (stream.current.kind) {
      case TOKEN_STATEMENT:
        node = this.environment.tags["statement"].parse(
          stream,
          this.environment
        );
        break;
      case TOKEN_TAG:
        node = this.getTag(stream.current).parse(stream, this.environment);
        break;
      case TOKEN_LITERAL:
        node = this.environment.tags["literal"].parse(stream, this.environment);
        break;
      default:
        throw new LiquidSyntaxError(
          `unexpected token ${stream.current.kind}`,
          stream.current
        );
    }
    return node;
  }
}
