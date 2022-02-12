import { BlockNode, Node } from "../../ast";
import { Context } from "../../context";
import { Environment } from "../../environment";
import { LiquidTypeError } from "../../errors";
import { LoopExpression } from "../../expression";
import { parse } from "../../expressions/loop/parse";
import { RenderStream } from "../../io/output_stream";
import { isInteger } from "../../number";
import { isPrimitiveInteger } from "../../object";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_EXPRESSION } from "../../token";
import { TableRowLoopDrop } from "../drops/tablerowloop";

const TAG_TABLEROW = "tablerow";
const TAG_ENDTABLEROW = "endtablerow";
const END_TAGBLOCK = new Set([TAG_ENDTABLEROW]);

export class TableRowTag implements Tag {
  readonly block = true;
  readonly name = TAG_TABLEROW; // XXX: Do we need these?
  readonly end = TAG_ENDTABLEROW;

  parse(stream: TokenStream, environment: Environment): TableRowNode {
    const parser = environment.getParser(); // TODO: inline getParser
    const token = stream.next();
    stream.expect(TOKEN_EXPRESSION);
    const expr = parse(stream.current.value);
    stream.next();
    return new TableRowNode(
      token,
      expr,
      parser.parseBlock(stream, END_TAGBLOCK)
    );
  }
}

export class TableRowNode implements Node {
  constructor(
    readonly token: Token,
    readonly expression: LoopExpression,
    readonly block: BlockNode
  ) {}

  async render(context: Context, out: RenderStream): Promise<void> {
    const name = this.expression.name;
    const [it, length] = await this.expression.evaluate(context);

    let cols =
      this.expression.cols === undefined
        ? length
        : await this.expression.cols.evaluate(context);

    if (isInteger(cols)) {
      cols = cols.valueOf();
    } else if (!isPrimitiveInteger(cols)) {
      throw new LiquidTypeError(
        `tablerow cols must be an integer, found '${cols}'`
      );
    }

    const tablerowloop = new TableRowLoopDrop(name, it, length, cols as number);
    const namespace: Map<string, unknown> = new Map([
      ["tablerowloop", tablerowloop],
    ]);
    context.push(namespace);

    try {
      out.write('<tr class="row1">\n');
      for (const item of tablerowloop) {
        namespace.set(name, item);
        out.write(`<td class="col${tablerowloop.col}">`);
        await this.block.render(context, out);
        out.write("</td>");

        if (tablerowloop.col_last && !tablerowloop.last) {
          out.write(`</tr>\n<tr class="row${tablerowloop.row + 1}">`);
        }
      }
      out.write("</tr>\n");
    } finally {
      context.pop();
    }
  }

  branches(): Node[] {
    throw new Error("Method not implemented.");
  }
}
