import { BlockNode, forcedOutput, Node, ChildNode } from "../../ast";
import { RenderContext } from "../../context";
import { Environment } from "../../environment";
import { BooleanExpression, Literal } from "../../expression";
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

const TAG_CASE = "case";
const TAG_ENDCASE = "endcase";
const TAG_WHEN = "when";
const TAG_ELSE = "else";

type ConditionalAlternative = {
  token: Token;
  condition: BooleanExpression;
  block: BlockNode;
};

export class CaseTag implements Tag {
  protected static END_WHEN_BLOCK = new Set([
    TAG_ENDCASE,
    TAG_WHEN,
    TAG_ELSE,
    TOKEN_EOF,
  ]);
  protected static END_CASE_BLOCK = new Set([TAG_ENDCASE]);

  readonly block = true;
  readonly name: string = TAG_CASE;
  readonly end: string = TAG_ENDCASE;
  protected nodeClass = CaseNode;

  protected parseExpression(
    _when: string,
    obj: string,
    stream: TokenStream
  ): BooleanExpression {
    stream.expect(TOKEN_EXPRESSION);
    return parse(`${_when} == ${obj}`);
  }

  public parse(stream: TokenStream, environment: Environment): Node {
    const parser = environment.parser;
    const token = stream.next();
    stream.expect(TOKEN_EXPRESSION);
    const _case = stream.next().value;

    // Eat whitespace or junk between `case` and when/else/endcase
    while (
      stream.current.kind !== TOKEN_TAG &&
      !CaseTag.END_WHEN_BLOCK.has(stream.current.value)
    )
      stream.next();

    const whens: ConditionalAlternative[] = [];
    while (
      stream.current.kind === TOKEN_TAG &&
      stream.current.value === TAG_WHEN
    ) {
      const whenToken = stream.next();
      // One conditional block for every object in a comma separated list.
      const whenExprs = stream.current.value
        .split(",")
        .map((expr) => this.parseExpression(_case, expr, stream));

      const whenBlock = parser.parseBlock(
        stream,
        CaseTag.END_WHEN_BLOCK,
        stream.next()
      );
      whens.push(
        ...whenExprs.map((expr) => ({
          token: whenToken,
          condition: expr,
          block: whenBlock,
        }))
      );
    }

    // Optional catch-all default block.
    if (
      stream.current.kind === TOKEN_TAG &&
      stream.current.value === TAG_ELSE
    ) {
      return new this.nodeClass(
        token,
        whens,
        parser.parseBlock(stream, CaseTag.END_CASE_BLOCK, stream.next())
      );
    }
    return new this.nodeClass(token, whens);
  }
}

export class CaseNode implements Node {
  public forceOutput = false;
  constructor(
    readonly token: Token,
    readonly whens: ConditionalAlternative[],
    readonly default_?: BlockNode
  ) {
    this.forceOutput = forcedOutput(this);
  }

  public async render(
    context: RenderContext,
    out: RenderStream
  ): Promise<void> {
    const buf = new BufferedRenderStream();
    let rendered = false;

    for (const _when of this.whens) {
      if (
        _when.condition instanceof Literal
          ? _when.condition.evaluateSync(context)
          : await _when.condition.evaluate(context)
      ) {
        rendered = true;
        await _when.block.render(context, buf);
      }
    }

    if (!rendered && this.default_ !== undefined) {
      await this.default_.render(context, buf);
    }

    const buffered = buf.toString();
    if (this.forceOutput || /\S/.test(buffered)) out.write(buffered);
  }

  public renderSync(context: RenderContext, out: RenderStream): void {
    const buf = new BufferedRenderStream();
    let rendered = false;

    for (const _when of this.whens) {
      if (_when.condition.evaluateSync(context)) {
        rendered = true;
        _when.block.renderSync(context, buf);
      }
    }

    if (!rendered && this.default_ !== undefined) {
      this.default_.renderSync(context, buf);
    }

    const buffered = buf.toString();
    if (this.forceOutput || /\S/.test(buffered)) out.write(buffered);
  }

  children(): ChildNode[] {
    const _children = this.whens.map(
      (alt: ConditionalAlternative): ChildNode => ({
        token: alt.token,
        node: alt.block,
        expression: alt.condition,
      })
    );
    if (this.default_ !== undefined)
      _children.push({ token: this.default_.token, node: this.default_ });
    return _children;
  }
}
