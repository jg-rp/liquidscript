import { BlockNode, Node, Root } from "./ast";
import { Environment } from "./environment";
import { LiquidSyntaxError, NoSuchTagError } from "./errors";
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
  parse(stream: TokenStream, environment: Environment): Root;
  parseBlock(stream: TokenStream, end: Set<string>): BlockNode;
}

export class TemplateParser implements Parser {
  constructor(readonly environment: Environment) {}

  public parse(stream: TokenStream): Root {
    const root = new Root();
    while (stream.current.kind !== TOKEN_EOF) {
      try {
        root.statements.push(this.parseStatement(stream));
      } catch (error) {
        if (error instanceof Error) this.environment.error(error);
        else throw error;
      }
      stream.next();
    }
    return root;
  }

  public parseBlock(stream: TokenStream, end: Set<string>): BlockNode {
    const block = new BlockNode(stream.current);
    while (
      stream.current.kind !== TOKEN_EOF &&
      !(stream.current.kind === TOKEN_TAG && end.has(stream.current.value))
    ) {
      block.statements.push(this.parseStatement(stream));
      stream.next();
    }
    return block;
  }

  private getTag(token: Token): Tag {
    const tag = this.environment.tags[token.value];
    if (!tag) throw new NoSuchTagError(`unknown tag '${token.value}'`, token);
    return tag;
  }

  private parseStatement(stream: TokenStream): Node {
    let node: Node;
    switch (stream.current.kind) {
      case TOKEN_STATEMENT:
        // TODO: change "statement" to a symbol
        node = this.environment.tags["statement"].parse(
          stream,
          this.environment
        );
        break;
      case TOKEN_TAG:
        node = this.getTag(stream.current).parse(stream, this.environment);
        break;
      case TOKEN_LITERAL:
        // TODO: change "literal" to a symbol
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
