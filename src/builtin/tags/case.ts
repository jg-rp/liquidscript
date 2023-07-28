import { BlockNode, forcedOutput, Node, ChildNode } from "../../ast";
import { RenderContext } from "../../context";
import { Environment } from "../../environment";
import {
  BooleanExpression,
  Expression,
  InfixExpression,
  Literal,
} from "../../expression";
import { RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import {
  Token,
  TokenStream,
  TOKEN_EOF,
  TOKEN_EXPRESSION,
  TOKEN_TAG,
} from "../../token";

import {
  TOKEN_COMMA,
  TOKEN_OR,
  ExpressionTokenStream,
} from "../../expressions";

import { tokenize, parse } from "../../expressions/standard";

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
  protected static DELIM_TOKENS = new Set([TOKEN_COMMA, TOKEN_OR]);

  readonly block = true;
  readonly name: string = TAG_CASE;
  readonly end: string = TAG_ENDCASE;
  protected nodeClass = CaseNode;

  public parse(stream: TokenStream, environment: Environment): Node {
    const parser = environment.parser;
    const token = stream.next();

    // Parse the case expression
    stream.expect(TOKEN_EXPRESSION);
    const _case = this.parse_case_expression(
      stream.current.value,
      stream.current.index,
    );
    stream.next();

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
      stream.expect(TOKEN_EXPRESSION);

      const whenExprs = this.parse_when_expression(
        stream.current.value,
        stream.current.index,
      ).map(
        (expr) => new BooleanExpression(new InfixExpression(_case, "==", expr)),
      );

      const whenBlock = parser.parseBlock(
        stream,
        CaseTag.END_WHEN_BLOCK,
        stream.next(),
      );
      whens.push(
        ...whenExprs.map((expr) => ({
          token: whenToken,
          condition: expr,
          block: whenBlock,
        })),
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
        parser.parseBlock(stream, CaseTag.END_CASE_BLOCK, stream.next()),
      );
    }

    stream.expectTag(TAG_ENDCASE);
    return new this.nodeClass(token, whens);
  }

  protected parse_case_expression(
    expr: string,
    startIndex: number,
  ): Expression {
    return parse(new ExpressionTokenStream(tokenize(expr, startIndex)));
  }

  protected parse_when_expression(
    expr: string,
    startIndex: number,
  ): Expression[] {
    const expressions: Expression[] = [];
    const stream = new ExpressionTokenStream(tokenize(expr, startIndex));

    for (;;) {
      expressions.push(parse(stream));
      stream.next();
      if (CaseTag.DELIM_TOKENS.has(stream.current.kind)) {
        stream.next();
      } else {
        break;
      }
    }

    return expressions;
  }
}

export class CaseNode implements Node {
  public forceOutput = false;
  constructor(
    readonly token: Token,
    readonly whens: ConditionalAlternative[],
    readonly default_?: BlockNode,
  ) {
    this.forceOutput = forcedOutput(this);
  }

  public async render(
    context: RenderContext,
    out: RenderStream,
  ): Promise<void> {
    const buf = context.environment.renderStreamFactory(out);
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
    const buf = context.environment.renderStreamFactory(out);
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
      }),
    );
    if (this.default_ !== undefined)
      _children.push({ token: this.default_.token, node: this.default_ });
    return _children;
  }
}
