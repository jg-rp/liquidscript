import {
  type Block,
  Environment,
  expression,
  type Markup,
  type Namespace,
  type OutputBuffer,
  Parser,
  renderBlock,
  renderBlockSync,
  RenderContext,
  T,
  type Token,
} from "./src/liquidscript";

const END_WITH_BLOCK = new Set(["endwith"]);

export class WithTag implements Markup {
  readonly blank = false;
  readonly tag = "with";

  constructor(
    readonly token: Token,
    readonly args: expression.KeywordArgument[],
    readonly block: Block,
  ) {}

  static parse(token: Token, parser: Parser): WithTag {
    if (parser.kind() === T.COMMA) {
      // Leading commas are OK.
      parser.next();
    }

    const args = parser.parseKeywordArguments(true);

    if (parser.kind() === T.COMMA) {
      // Trailing commas are OK.
      parser.next();
    }

    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    const block = parser.parseBlock(END_WITH_BLOCK);
    parser.eatEmptyTag("endwith");
    return new WithTag(token, args, block);
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    const namespace: Namespace = Object.create(null);

    for (const arg of this.args) {
      namespace[arg.name.value] = await arg.expr.evaluate(context);
    }

    await context.extend(namespace, async () => {
      await renderBlock(this.block, context, buffer);
    });
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    const namespace: Namespace = Object.create(null);

    for (const arg of this.args) {
      namespace[arg.name.value] = arg.expr.evaluateSync(context);
    }

    context.extendSync(namespace, () => {
      renderBlockSync(this.block, context, buffer);
    });
  }
}

const env = new Environment();
env.tags["with"] = WithTag;
