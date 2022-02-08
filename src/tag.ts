import { Environment } from "./environment";
import { Node } from "./ast";
import { TokenStream } from "./token";

export interface Tag {
  block: boolean;
  parse(stream: TokenStream, environment: Environment): Node;
}
