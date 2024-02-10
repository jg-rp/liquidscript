import { Environment } from "../../environment";
import { BlockNode, forcedOutput, Node, ChildNode } from "../../ast";
import { Tag } from "../../tag";
import {
  Token,
  TokenStream,
  TOKEN_EOF,
  TOKEN_EXPRESSION,
  TOKEN_TAG,
} from "../../token";
import { BooleanExpression } from "../../expression";
import { RenderContext } from "../../context";
import { RenderStream } from "../../io/output_stream";
import { parse } from "../../expressions/boolean/parse";

type ConditionalAlternative = {
  token: Token;
  condition: BooleanExpression;
  consequence: BlockNode;
};

const TAG_IF = "if";
const TAG_ENDIF = "endif";
const TAG_ELSIF = "elsif";
const TAG_ELSE = "else";

export class IfTag implements Tag {
  protected static END_IF_BLOCK = new Set([
    TAG_ENDIF,
    TAG_ELSIF,
    TAG_ELSE,
    TOKEN_EOF,
  ]);
  protected static END_ELSEIF_BLOCK = new Set([TAG_ENDIF, TAG_ELSIF, TAG_ELSE]);
  protected static END_ELSE_BLOCK = new Set([TAG_ENDIF, TAG_ELSIF, TAG_ELSE]);

  readonly block = true;
  readonly name: string = TAG_IF;
  readonly end: string = TAG_ENDIF;
  protected nodeClass = IfNode;

  protected parseExpression(stream: TokenStream): BooleanExpression {
    stream.expect(TOKEN_EXPRESSION);
    return parse(stream.current.value);
  }

  parse(stream: TokenStream, environment: Environment): Node {
    const parser = environment.parser;
    const token = stream.next();
    const condition = this.parseExpression(stream);
    stream.next();

    const consequence = parser.parseBlock(stream, IfTag.END_IF_BLOCK, token);
    const conditionalAlternatives: ConditionalAlternative[] = [];

    while (
      stream.current.kind === TOKEN_TAG &&
      stream.current.value === TAG_ELSIF
    ) {
      // Eat TAG_ELSIF
      const altTok = stream.next();
      const expr = this.parseExpression(stream);
      conditionalAlternatives.push({
        token: altTok,
        condition: expr,
        consequence: parser.parseBlock(
          stream,
          IfTag.END_ELSEIF_BLOCK,
          stream.next(),
        ),
      });
    }

    let alternative: BlockNode | undefined = undefined;

    if (
      stream.current.kind === TOKEN_TAG &&
      stream.current.value === TAG_ELSE
    ) {
      const tok = stream.next();
      // @ts-expect-error: stream.current has changed, so `kind` will have changed too.
      if (stream.current.kind === TOKEN_EXPRESSION) {
        // Superfluous expressions inside an `else` tag are ignored.
        stream.next();
      }

      alternative = parser.parseBlock(stream, IfTag.END_ELSE_BLOCK, tok);
    }

    // Extraneous `else` and `elsif` blocks are ignored.
    if (
      !(stream.current.kind === TOKEN_TAG && stream.current.value === TAG_ENDIF)
    ) {
      while (stream.current.kind !== TOKEN_EOF) {
        if (
          stream.current.kind === TOKEN_TAG &&
          stream.current.value === TAG_ENDIF
        ) {
          break;
        }
        stream.next();
      }
    }

    stream.expectTag(TAG_ENDIF);

    return new this.nodeClass(
      token,
      condition,
      consequence,
      conditionalAlternatives,
      alternative,
    );
  }
}

export class IfNode implements Node {
  public forceOutput = false;
  constructor(
    readonly token: Token,
    private condition: BooleanExpression,
    private consequence: BlockNode,
    private conditionalAlternatives: ConditionalAlternative[],
    private alternative?: BlockNode,
  ) {
    this.forceOutput = forcedOutput(this);
  }

  public async render(
    context: RenderContext,
    out: RenderStream,
  ): Promise<void> {
    // This intermediate buffer is used to detect and possibly
    // suppress blocks that, when rendered, contain only whitespace.
    // Don't buffer the output stream if this.forceOutput is true.
    const buf = this.forceOutput
      ? out
      : context.environment.renderStreamFactory(out);
    let rendered = false;

    if (await this.condition.evaluate(context)) {
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
    const buf = this.forceOutput
      ? out
      : context.environment.renderStreamFactory(out);
    let rendered = false;

    if (this.condition.evaluateSync(context)) {
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
    const _children: ChildNode[] = [
      { token: this.token, node: this.consequence, expression: this.condition },
      ...this.conditionalAlternatives.map(
        (alt: ConditionalAlternative): ChildNode => ({
          token: alt.token,
          node: alt.consequence,
          expression: alt.condition,
        }),
      ),
    ];
    if (this.alternative !== undefined)
      _children.push({ token: this.alternative.token, node: this.alternative });
    return _children;
  }
}
