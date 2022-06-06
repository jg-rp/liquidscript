import { BlockNode, Node, ChildNode } from "../../ast";
import { RenderContext } from "../../context";
import { Environment } from "../../environment";
import {
  ExpressionTokenStream,
  parseUnchainedIdentifier,
  TOKEN_COLON,
  TOKEN_COMMA,
  TOKEN_FALSE,
  TOKEN_NIL,
  TOKEN_NULL,
  TOKEN_TRUE,
} from "../../expressions";
import { parseObject } from "../../expressions/filtered/parse";
import { RenderStream } from "../../liquidscript";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_EOF, TOKEN_EXPRESSION } from "../../token";
import { RE, makeTokenizer } from "../../expressions/include";
import { Expression } from "../../expression";
import { ContextScope } from "../../types";

// Reuse the tokenizer from the built-in `include` tag, but with some different keywords.
const tokenize = makeTokenizer(
  RE,
  new Set([TOKEN_TRUE, TOKEN_FALSE, TOKEN_NIL, TOKEN_NULL])
);

const TAG_ENDWITH = "endwith";
const END_WITH_BLOCK = new Set([TAG_ENDWITH]);

type Arguments = {
  [index: string]: Expression;
};

/**
 * An implementation of the `with` tag.
 *
 * Extend the current scope for the duration of the `with` block. Useful for
 * aliasing long or nested variable names. Also useful for caching the result
 * of a drop's methods, if the drop does not perform its own caching.
 */
export class WithTag implements Tag {
  public parse(stream: TokenStream, environment: Environment): Node {
    const token = stream.next();
    stream.expect(TOKEN_EXPRESSION);
    const args = this.parseExpression(stream.current);
    stream.next();
    const block = environment.parser.parseBlock(stream, END_WITH_BLOCK, token);
    return new WithNode(token, args, block);
  }

  protected parseExpression(expressionToken: Token): Arguments {
    const args: Arguments = {};
    const eStream = new ExpressionTokenStream(
      tokenize(expressionToken.value, expressionToken.index)
    );

    while (eStream.current.kind !== TOKEN_EOF) {
      const [key, expr] = this.parseArgument(eStream);
      args[key] = expr;
      // Eat comma.
      if (eStream.current.kind === TOKEN_COMMA) eStream.next();
    }

    return args;
  }

  protected parseArgument(
    eStream: ExpressionTokenStream
  ): [string, Expression] {
    const key = parseUnchainedIdentifier(eStream).toString();
    eStream.next();
    eStream.expect(TOKEN_COLON);
    eStream.next(); // Eat colon
    const val = parseObject(eStream);
    eStream.next();
    return [key, val];
  }
}

export class WithNode implements Node {
  constructor(
    readonly token: Token,
    readonly args: Arguments,
    readonly block: BlockNode
  ) {}

  async render(context: RenderContext, out: RenderStream): Promise<void> {
    const scope: ContextScope = {};
    for (const [key, value] of Object.entries(this.args)) {
      scope[key] = await value.evaluate(context);
    }
    await context.extend(scope, () => this.block.render(context, out));
  }

  renderSync(context: RenderContext, out: RenderStream): void {
    const scope: ContextScope = Object.fromEntries(
      Object.entries(this.args).map(([key, value]) => [
        key,
        value.evaluateSync(context),
      ])
    );
    context.extendSync(scope, () => this.block.renderSync(context, out));
  }

  children(): ChildNode[] {
    return [{ token: this.token, node: this.block }];
  }
}
