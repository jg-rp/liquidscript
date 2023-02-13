import { Node } from "../../ast";
import { Tag } from "../../tag";
import { TokenStream, TOKEN_EOF, TOKEN_EXPRESSION } from "../../token";
import { parse } from "../../expressions/filtered/parse";
import { OutputStatementNode } from "./statement";
import { Expression, NIL } from "../../expression";

export class EchoTag implements Tag {
  readonly block = false;
  readonly name: string = "echo";
  protected nodeClass = EchoNode;

  protected parseExpression(value: string, startIndex: number): Expression {
    return parse(value, startIndex);
  }

  parse(stream: TokenStream): Node {
    const token = stream.next();

    // Empty echo tag at end of file.
    if (stream.current.kind === TOKEN_EOF) return new EchoNode(token, NIL);

    stream.expect(TOKEN_EXPRESSION);
    return new this.nodeClass(
      token,
      this.parseExpression(stream.current.value, stream.current.index)
    );
  }
}

export class EchoNode extends OutputStatementNode implements Node {
  toString(): string {
    return `EchoNode(token=${this.token}, expression=${this.expression})`;
  }
}
