import { BlockNode, forcedOutput, Node, ChildNode } from "../../ast";
import { RenderContext } from "../../context";
import { Environment } from "../../environment";
import { Expression } from "../../expression";
import { parse } from "../../expressions/boolean/parse";
import { BufferedRenderStream, RenderStream } from "../../io/output_stream";
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
  protected nodeClass = UnlessNode;

  protected parseExpression(stream: TokenStream): Expression {
    stream.expect(TOKEN_EXPRESSION);
    return parse(stream.current.value);
  }

  parse(stream: TokenStream, environment: Environment): Node {
    const parser = environment.parser;
    const token = stream.next();
    const condition = this.parseExpression(stream);
    stream.next();

    const consequence = parser.parseBlock(stream, END_IF_BLOCK, token);
    const conditionalAlternatives: ConditionalAlternative[] = [];

    while (
      stream.current.kind === TOKEN_TAG &&
      stream.current.value === TAG_ELSIF
    ) {
      // Eat TAG_ELSIF
      stream.next();
      const expr = this.parseExpression(stream);
      conditionalAlternatives.push({
        condition: expr,
        consequence: parser.parseBlock(stream, END_ELSEIF_BLOCK, stream.next()),
      });
    }

    if (
      stream.current.kind === TOKEN_TAG &&
      stream.current.value === TAG_ELSE
    ) {
      return new this.nodeClass(
        token,
        condition,
        consequence,
        conditionalAlternatives,
        parser.parseBlock(stream, END_ELSE_BLOCK, stream.next())
      );
    }

    return new this.nodeClass(
      token,
      condition,
      consequence,
      conditionalAlternatives
    );
  }
}

export class UnlessNode implements Node {
  public forceOutput = false;
  constructor(
    readonly token: Token,
    private condition: Expression,
    private consequence: BlockNode,
    private conditionalAlternatives: ConditionalAlternative[],
    private alternative?: BlockNode
  ) {
    this.forceOutput = forcedOutput(this);
  }

  public async render(
    context: RenderContext,
    out: RenderStream
  ): Promise<void> {
    const buf = this.forceOutput ? out : new BufferedRenderStream();
    let rendered = false;

    if (!(await this.condition.evaluate(context))) {
      await this.consequence.render(context, buf);
      rendered = true;
    } else {
      for (const alt of this.conditionalAlternatives) {
        if (await alt.condition.evaluate(context)) {
          await alt.consequence.render(context, buf);
          rendered = true;
          break;
        }
      }
    }

    if (!rendered && this.alternative !== undefined) {
      await this.alternative.render(context, buf);
    }

    if (!this.forceOutput) {
      const buffered = buf.toString();
      if (/\S/.test(buffered)) out.write(buffered);
    }
  }

  public renderSync(context: RenderContext, out: RenderStream): void {
    const buf = this.forceOutput ? out : new BufferedRenderStream();
    let rendered = false;

    if (!this.condition.evaluateSync(context)) {
      this.consequence.renderSync(context, buf);
      rendered = true;
    } else {
      for (const alt of this.conditionalAlternatives) {
        if (alt.condition.evaluateSync(context)) {
          alt.consequence.renderSync(context, buf);
          rendered = true;
          break;
        }
      }
    }

    if (!rendered && this.alternative !== undefined) {
      this.alternative.renderSync(context, buf);
    }

    if (!this.forceOutput) {
      const buffered = buf.toString();
      if (/\S/.test(buffered)) out.write(buffered);
    }
  }

  children(): ChildNode[] {
    const _children = [
      { node: this.consequence, expression: this.condition },
      ...this.conditionalAlternatives.map(
        (alt: ConditionalAlternative): ChildNode => ({
          node: alt.consequence,
          expression: alt.condition,
        })
      ),
    ];
    if (this.alternative !== undefined)
      _children.push({ node: this.alternative });
    return _children;
  }
}
