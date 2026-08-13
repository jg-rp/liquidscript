import type { Namespace, RenderContext } from "../context";
import { TableRowLoop } from "../drops/tablerowloop";
import { TemplateSyntaxError } from "../errors";
import { KeywordArgument, Name, type Expression } from "../expression";
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
import { BREAK } from "./for";

const END_TABLEROW_BLOCK = new Set(["endtablerow"]);

export class TableRowTag implements Markup {
  readonly blank = false;

  readonly tag = "tablerow";

  constructor(
    readonly token: Token,
    readonly name: Name,
    readonly expression: Expression,
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
      } else if (arg.name.value === "range") {
        // ignore
      } else {
        throw new TemplateSyntaxError(
          `unknown argument '${arg.name.value}'`,
          arg.name.token,
          parser.source,
          parser.templateName,
        );
      }
    }

    return [cols, offset, limit];
  }

  blockScope(): Name[] {
    return [this.name];
  }

  childrenSync(): Markup[] {
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
    const offset = await this.toInteger(this.offset, context, 0, 0);
    const limit = await this.toInteger(this.limit, context, array.length, 0);
    const a = array.slice(offset, offset + limit);

    const length = a.length;

    const tablerowloop = new TableRowLoop(
      length,
      await this.toInteger(this.cols, context, length, 0),
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
    const offset = this.toIntegerSync(this.offset, context, 0, 0);
    const limit = this.toIntegerSync(this.limit, context, array.length, 0);
    const a = array.slice(offset, offset + limit);
    const length = a.length;

    const tablerowloop = new TableRowLoop(
      length,
      this.toIntegerSync(this.cols, context, length, 0),
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

  protected async toInteger<T>(
    expression: Expression | undefined,
    context: RenderContext,
    default_: T,
    null_: T,
  ): Promise<number | T> {
    if (!expression) return default_;
    const value = await expression.evaluate(context);
    if (context.env.isNil(value)) return null_;
    return context.env.toInteger(value, context, expression.span);
  }

  protected toIntegerSync<T>(
    expression: Expression | undefined,
    context: RenderContext,
    default_: T,
    null_: T,
  ): number | T {
    if (!expression) return default_;
    const value = expression.evaluateSync(context);
    if (context.env.isNil(value)) return null_;
    return context.env.toInteger(value, context, expression.span);
  }
}
