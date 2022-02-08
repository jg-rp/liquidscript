import { Environment } from "../../environment";
import { BlockNode, Node } from "../../ast";
import { Tag } from "../../tag";
import { Token, TokenStream } from "../../token";
import { Expression } from "../../expression";
import { Context } from "../../context";
import { RenderStream } from "../../io/output_stream";

type ConditionalAlternative = {
  condition: Expression;
  consequence: BlockNode;
};

export class IfTag implements Tag {
  readonly block = true;
  readonly name = "if";
  readonly end = "endif";

  parse(stream: TokenStream, environment: Environment): Node {
    // TODO: Implement
    return new BlockNode(stream.current);
  }
}

export class IfNode implements Node {
  constructor(
    readonly token: Token,
    private condition: Expression,
    private consequence: BlockNode,
    private conditionalAlternatives: ConditionalAlternative[],
    private alternative?: BlockNode
  ) {}

  async render(context: Context, out: RenderStream): Promise<boolean> {
    // TODO: Implement
    return true;
  }

  children(): Node[] {
    const _children = [
      this.consequence,
      ...this.conditionalAlternatives.map(
        (alt: ConditionalAlternative) => alt.consequence
      ),
    ];
    if (this.alternative !== undefined) _children.push(this.consequence);
    return _children;
  }
}
