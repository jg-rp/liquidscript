import { Environment } from "../../environment";
import { BlockNode, Node } from "../../ast";
import { Tag } from "../../tag";
import {
  Token,
  TokenStream,
  TOKEN_EOF,
  TOKEN_EXPRESSION,
  TOKEN_TAG,
} from "../../token";
import { BooleanExpression } from "../../expression";
import { Context } from "../../context";
import { RenderStream } from "../../io/output_stream";
import { parse } from "../../expressions/boolean/parse";

type ConditionalAlternative = {
  condition: BooleanExpression;
  consequence: BlockNode;
};

const TAG_IF = "if";
const TAG_ENDIF = "endif";
const TAG_ELSIF = "elsif";
const TAG_ELSE = "else";

const END_IF_BLOCK = new Set([TAG_ENDIF, TAG_ELSIF, TAG_ELSE, TOKEN_EOF]);
const END_ELSEIF_BLOCK = new Set([TAG_ENDIF, TAG_ELSIF, TAG_ELSE]);
const END_ELSE_BLOCK = new Set([TAG_ENDIF]);

export class IfTag implements Tag {
  readonly block = true;
  readonly name = TAG_IF;
  readonly end = TAG_ENDIF;

  protected parseExpression(stream: TokenStream): BooleanExpression {
    stream.expect(TOKEN_EXPRESSION);
    return parse(stream.current.value);
  }

  parse(stream: TokenStream, environment: Environment): IfNode {
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
      return new IfNode(
        token,
        condition,
        consequence,
        conditionalAlternatives,
        parser.parseBlock(stream, END_ELSE_BLOCK)
      );
    }

    return new IfNode(token, condition, consequence, conditionalAlternatives);
  }
}

export class IfNode implements Node {
  constructor(
    readonly token: Token,
    private condition: BooleanExpression,
    private consequence: BlockNode,
    private conditionalAlternatives: ConditionalAlternative[],
    private alternative?: BlockNode
  ) {}

  public async render(context: Context, out: RenderStream): Promise<void> {
    if (await this.condition.evaluate(context)) {
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

  public renderSync(context: Context, out: RenderStream): void {
    if (this.condition.evaluateSync(context)) {
      this.consequence.renderSync(context, out);
      return;
    }

    for (const alt of this.conditionalAlternatives) {
      if (alt.condition.evaluateSync(context)) {
        alt.consequence.renderSync(context, out);
        return;
      }
    }

    if (this.alternative !== undefined) {
      this.alternative.renderSync(context, out);
    }
  }

  branches(): Node[] {
    const _children = [
      this.consequence,
      ...this.conditionalAlternatives.map(
        (alt: ConditionalAlternative) => alt.consequence
      ),
    ];
    if (this.alternative !== undefined) _children.push(this.alternative);
    return _children;
  }
}
