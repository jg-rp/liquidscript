import type { Namespace, RenderContext } from "../context";
import { TableRowLoop } from "../drops/tablerowloop";
import { TemplateSyntaxError } from "../errors";
import { KeywordArgument, Name, type Expression } from "../expression";
import {
  renderBlock,
  renderBlockSync,
  type Block,
  type Markup,
  type OutputBuffer,
} from "../markup";
import type { Parser } from "../parser";
import { T, type Token } from "../token";
import { isString } from "../type_guards";
import { BREAK } from "./for";

const END_TABLEROW_BLOCK = new Set(["endtablerow"]);

export class TableRowTag implements Markup {
  readonly blank = false;

  constructor(
    readonly token: Token,
    readonly name: Name,
    readonly expression: Expression, // TODO: TableRowBlock?
    readonly block: Block,
    readonly cols: Expression | undefined,
    readonly offset: Expression | undefined,
    readonly limit: Expression | undefined,
  ) {}

  static parse(token: Token, parser: Parser): Markup {
    const name = parser.parseIdent();
    parser.eat(T.IN, "missing 'in'");
    parser.expectExpression();
    const expr = parser.parseExpression();

    // Leading commas are OK.
    if (parser.kind() === T.COMMA) {
      parser.eat(T.COMMA);
    }

    const [cols, offset, limit] = this.unpackArgs(
      parser,
      parser.parseKeywordArguments(false),
    );

    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    const block = parser.parseBlock(END_TABLEROW_BLOCK);
    parser.eatEmptyTag("endtablerow");

    return new TableRowTag(token, name, expr, block, cols, offset, limit);
  }

  private static unpackArgs(
    parser: Parser,
    args: Array<KeywordArgument>,
  ): [Expression | undefined, Expression | undefined, Expression | undefined] {
    let cols: Expression | undefined = undefined;
    let offset: Expression | undefined = undefined;
    let limit: Expression | undefined = undefined;

    for (const arg of args) {
      if (arg.name.value === "offset") {
        offset = arg.expr;
      } else if (arg.name.value === "limit") {
        limit = arg.expr;
      } else if (arg.name.value === "cols") {
        cols = arg.expr;
      } else {
        throw new TemplateSyntaxError(
          `unknown argument '${arg.name.value}'`,
          arg.name.token,
          parser.source,
        );
      }
    }

    return [cols, offset, limit];
  }

  blockScope(): Name[] {
    return [this.name];
  }

  children(): Markup[] {
    // TODO: TableRowBlock
    const result: Markup[] = [];

    for (const node of this.block) {
      if (!isString(node)) {
        result.push(node);
      }
    }

    return result;
  }

  expressions(): Expression[] {
    const result = [this.expression];
    if (this.cols) {
      result.push(this.cols);
    }
    if (this.offset) {
      result.push(this.offset);
    }
    if (this.limit) {
      result.push(this.limit);
    }
    return result;
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    const name = this.name.value;
    const array = await context.toArray(this.expression);

    const a = array.slice(
      await context.toInteger(this.offset, 0),
      await context.toInteger(this.limit, undefined),
    );

    const length = a.length;

    const tablerowloop = new TableRowLoop(
      length,
      await context.toInteger(this.cols, length),
    );

    const namespace: Namespace = { tablerowloop };

    await context.extend(namespace, async () => {
      buffer.push('<tr class="row1">\n');

      for (const item of a) {
        namespace[name] = item;

        buffer.push(`<td class="col${tablerowloop.col()}">`);
        await renderBlock(this.block, context, buffer);
        buffer.push("</td>");

        if (context.interrupts.pop() === BREAK) break;

        if (tablerowloop.col_last() && !tablerowloop.last()) {
          buffer.push(`</tr>\n<tr class="row${tablerowloop.row() + 1}">`);
        }

        tablerowloop.step();
      }

      buffer.push("</tr>\n");
    });
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    const name = this.name.value;
    const array = context.toArraySync(this.expression);

    const a = array.slice(
      context.toIntegerSync(this.offset, 0),
      context.toIntegerSync(this.limit, undefined),
    );

    const length = a.length;

    const tablerowloop = new TableRowLoop(
      length,
      context.toIntegerSync(this.cols, length),
    );

    const namespace: Namespace = { tablerowloop };

    context.extendSync(namespace, () => {
      buffer.push('<tr class="row1">\n');

      for (const item of a) {
        namespace[name] = item;

        buffer.push(`<td class="col${tablerowloop.col()}">`);
        renderBlockSync(this.block, context, buffer);
        buffer.push("</td>");

        if (context.interrupts.pop() === BREAK) break;

        if (tablerowloop.col_last() && !tablerowloop.last()) {
          buffer.push(`</tr>\n<tr class="row${tablerowloop.row() + 1}">`);
        }

        tablerowloop.step();
      }

      buffer.push("</tr>\n");
    });
  }
}
