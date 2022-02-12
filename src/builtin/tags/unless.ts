import { BlockNode, Node } from "../../ast";
import { Context } from "../../context";
import { Environment } from "../../environment";
import { Expression } from "../../expression";
import { parse } from "../../expressions/boolean/parse";
import { RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import {
  Token,
  TokenStream,
  TOKEN_EOF,
  TOKEN_EXPRESSION,
  TOKEN_TAG,
} from "../../token";

const TAG_UNLESS = "unless";
const TAG_ENDUNLESS = "endunless";
const TAG_ELSIF = "elsif";
const TAG_ELSE = "else";

const END_IF_BLOCK = new Set([TAG_ENDUNLESS, TAG_ELSIF, TAG_ELSE, TOKEN_EOF]);
const END_ELSEIF_BLOCK = new Set([TAG_ENDUNLESS, TAG_ELSIF, TAG_ELSE]);
const END_ELSE_BLOCK = new Set([TAG_ENDUNLESS]);

type ConditionalAlternative = {
  condition: Expression;
  consequence: BlockNode;
};

export class UnlessTag implements Tag {
  readonly block = true;
  readonly name = TAG_UNLESS;
  readonly end = TAG_ENDUNLESS;

  protected parseExpression(stream: TokenStream): Expression {
    stream.expect(TOKEN_EXPRESSION);
    return parse(stream.current.value);
  }

  parse(stream: TokenStream, environment: Environment): UnlessNode {
    const parser = environment.getParser();
    const token = stream.next();
    const condition = this.parseExpression(stream);
    stream.next();

    const consequence = parser.parseBlock(stream, END_IF_BLOCK);
    const conditionalAlternatives: ConditionalAlternative[] = [];

    while (
      stream.current.kind === TOKEN_TAG &&
      stream.current.value === TAG_ELSIF
    ) {
      // Eat TAG_ELSIF
      stream.next();
      const expr = this.parseExpression(stream);
      stream.next();
      conditionalAlternatives.push({
        condition: expr,
        consequence: parser.parseBlock(stream, END_ELSEIF_BLOCK),
      });
    }

    if (
      stream.current.kind === TOKEN_TAG &&
      stream.current.value === TAG_ELSE
    ) {
      stream.next();
      return new UnlessNode(
        token,
        condition,
        consequence,
        conditionalAlternatives,
        parser.parseBlock(stream, END_ELSE_BLOCK)
      );
    }

    return new UnlessNode(
      token,
      condition,
      consequence,
      conditionalAlternatives
    );
  }
}

export class UnlessNode implements Node {
  constructor(
    readonly token: Token,
    private condition: Expression,
    private consequence: BlockNode,
    private conditionalAlternatives: ConditionalAlternative[],
    private alternative?: BlockNode
  ) {}

  async render(context: Context, out: RenderStream): Promise<void> {
    if (!(await this.condition.evaluate(context))) {
      await this.consequence.render(context, out);
      return;
    }

    for (const alt of this.conditionalAlternatives) {
      if (await alt.condition.evaluate(context)) {
        await alt.consequence.render(context, out);
        return;
      }
    }

    if (this.alternative !== undefined) {
      await this.alternative.render(context, out);
    }
  }

  branches(): Node[] {
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
