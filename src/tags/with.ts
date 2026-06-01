import type { Namespace, RenderContext } from "../context";
import type { KeywordArgument, Name } from "../expression";
import {
  renderBlock,
  renderBlockSync,
  type Block,
  type Markup,
} from "../markup";
import type { OutputBuffer } from "../output";
import type { Parser } from "../parser";
import { T, type Token } from "../token";
import { isString } from "../type_guards";

const END_WITH_BLOCK = new Set(["endwith"]);

export class WithTag implements Markup {
  readonly blank = false;

  readonly tag = "with";

  constructor(
    readonly token: Token,
    readonly args: KeywordArgument[],
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

  async children(staticContext: RenderContext): Promise<Markup[]> {
    return this.childrenSync(staticContext);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  childrenSync(staticContext: RenderContext): Markup[] {
    return this.block.filter((node) => !isString(node)) as Markup[];
  }

  blockScope(): Name[] {
    return this.args.map((a) => a.name);
  }
}
