import { Environment } from "./environment";
import { Node } from "./ast";
import { TokenStream } from "./token";

/**
 * A class that implements the `Tag` interface is responsible for
 * parsing one or more tokens from a token stream, and returning
 * an {@link ast.Node} to be added into the abstract syntax tree.
 */
export interface Tag {
  /**
   * Create a syntax tree node by parsing tokens from the token
   * stream.
   *
   * If implementing a block tag (one with a start and end tag),
   * the stream should be left with the end tag as its current
   * token.
   *
   * @param stream - A stream of template tokens.
   * @param environment - The active environment.
   */
  parse(stream: TokenStream, environment: Environment): Node;
}
