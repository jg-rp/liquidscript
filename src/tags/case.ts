import type { RenderContext } from "../context";
import type { Expression } from "../expression";
import {
  isBlankBlock,
  renderBlock,
  renderBlockSync,
  type Block,
  type Markup,
  type OutputBuffer,
} from "../markup";
import type { Parser } from "../parser";
import { T, type Token } from "../token";
import { isString } from "../type_guards";
import { ElseBlock } from "./else";

const END_CASE_BLOCK = new Set(["endcase", "when", "else"]);
const CASE_BLOCKS = new Set(["when", "else"]);
const WHEN_DELIMITERS = new Set([T.COMMA, T.OR]);

export class CaseTag implements Markup {
  readonly blank;

  constructor(
    readonly token: Token,
    readonly expression: Expression,
    readonly blocks: Array<WhenBlock | ElseBlock>,
  ) {}

  static parse(token: Token, parser: Parser): Markup {
    parser.expectExpression();
    const expression = parser.parseExpression();
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);

    if (parser.kind() === T.TEXT) {
      // Junk between `{% case %}` and first `{% when %}`.
      parser.eat(T.TEXT);
    }

    const blocks: Array<WhenBlock | ElseBlock> = [];

    for (;;) {
      const tagName = parser.tags(CASE_BLOCKS);

      if (tagName === "when") {
        blocks.push(this.parseWhen(parser));
      } else if (tagName === "else") {
        const nameToken = parser.eatTag("else");
        blocks.push(
          new ElseBlock(nameToken, parser.parseBlock(END_CASE_BLOCK)),
        );
      } else {
        break;
      }
    }

    parser.eatEmptyTag("endcase");
    return new CaseTag(token, expression, blocks);
  }

  static parseWhen(parser: Parser): WhenBlock {}

  children(): Markup[] {}

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {}

  renderSync(context: RenderContext, buffer: OutputBuffer): void {}
}

export class WhenBlock implements Markup {
  readonly blank: boolean;

  constructor(
    readonly token: Token,
    readonly left: Expression,
    readonly right: Expression[],
    public block: Block,
  ) {
    this.blank = isBlankBlock(block);
  }

  children(): Markup[] {
    return this.block.filter((node) => !isString(node)) as Markup[];
  }

  public expressions(): Expression[] {
    return this.right;
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {}

  renderSync(context: RenderContext, buffer: OutputBuffer): void {}
}
