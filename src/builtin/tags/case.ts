import { BlockNode, Node } from "../../ast";
import { Context } from "../../context";
import { Environment } from "../../environment";
import { BooleanExpression } from "../../expression";
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

const TAG_CASE = "case";
const TAG_ENDCASE = "endcase";
const TAG_WHEN = "when";
const TAG_ELSE = "else";

const END_WHEN_BLOCK = new Set([TAG_ENDCASE, TAG_WHEN, TAG_ELSE, TOKEN_EOF]);
const END_CASE_BLOCK = new Set([TAG_ENDCASE]);

type ConditionalAlternative = {
  condition: BooleanExpression;
  block: BlockNode;
};

export class CaseTag implements Tag {
  readonly block = true;
  readonly name = TAG_CASE;
  readonly end = TAG_ENDCASE;

  protected parseExpression(
    _when: string,
    obj: string,
    stream: TokenStream
  ): BooleanExpression {
    stream.expect(TOKEN_EXPRESSION);
    return parse(`${_when} == ${obj}`);
  }

  public parse(stream: TokenStream, environment: Environment): CaseNode {
    const parser = environment.getParser();
    const token = stream.next();
    stream.expect(TOKEN_EXPRESSION);
    const _case = stream.next().value;

    // Eat whitespace or junk between `case` and when/else/endcase
    while (
      stream.current.kind !== TOKEN_TAG &&
      !END_WHEN_BLOCK.has(stream.current.value)
    )
      stream.next();

    const whens: ConditionalAlternative[] = [];
    while (
      stream.current.kind === TOKEN_TAG &&
      stream.current.value === TAG_WHEN
    ) {
      stream.next();
      // One conditional block for every object in a comma separated list.
      const whenExprs = stream.current.value
        .split(",")
        .map((expr) => this.parseExpression(_case, expr, stream));

      stream.next();
      const whenBlock = parser.parseBlock(stream, END_WHEN_BLOCK);
      whens.push(
        ...whenExprs.map((expr) => ({ condition: expr, block: whenBlock }))
      );
    }

    // Optional catch-all default block.
    if (
      stream.current.kind === TOKEN_TAG &&
      stream.current.value === TAG_ELSE
    ) {
      stream.next();
      return new CaseNode(
        token,
        whens,
        parser.parseBlock(stream, END_CASE_BLOCK)
      );
    }
    return new CaseNode(token, whens);
  }
}

export class CaseNode implements Node {
  constructor(
    readonly token: Token,
    readonly whens: ConditionalAlternative[],
    readonly default_?: BlockNode
  ) {}

  public async render(context: Context, out: RenderStream): Promise<void> {
    let rendered = false;
    for (const _when of this.whens) {
      if (await _when.condition.evaluate(context)) {
        rendered = true;
        await _when.block.render(context, out);
      }
    }

    if (!rendered && this.default_ !== undefined) {
      await this.default_.render(context, out);
    }
  }

  public renderSync(context: Context, out: RenderStream): void {
    let rendered = false;
    for (const _when of this.whens) {
      if (_when.condition.evaluateSync(context)) {
        rendered = true;
        _when.block.renderSync(context, out);
      }
    }

    if (!rendered && this.default_ !== undefined) {
      this.default_.renderSync(context, out);
    }
  }

  branches(): Node[] {
    const _children = Array.from(
      this.whens.map((alt: ConditionalAlternative) => alt.block)
    );
    if (this.default_ !== undefined) _children.push(this.default_);
    return _children;
  }
}
