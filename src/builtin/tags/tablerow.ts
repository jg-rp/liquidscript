import { BlockNode, Node, ChildNode } from "../../ast";
import { RenderContext } from "../../context";
import { Environment } from "../../environment";
import { InternalTypeError } from "../../errors";
import { LoopExpression } from "../../expression";
import { parse } from "../../expressions/loop/parse";
import { RenderStream } from "../../io/output_stream";
import { isInteger } from "../../number";
import { isPrimitiveInteger, ContextScope } from "../../types";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_EXPRESSION } from "../../token";
import { TableRowLoopDrop } from "../drops/tablerowloop";
import { chainPop, chainPush } from "../../chain_object";

const TAG_TABLEROW = "tablerow";
const TAG_ENDTABLEROW = "endtablerow";

export class TableRowTag implements Tag {
  protected static END_TAGBLOCK = new Set([TAG_ENDTABLEROW]);
  readonly block = true;
  readonly name: string = TAG_TABLEROW;
  readonly end: string = TAG_ENDTABLEROW;
  protected nodeClass = TableRowNode;

  parse(stream: TokenStream, environment: Environment): Node {
    const token = stream.next();
    stream.expect(TOKEN_EXPRESSION);
    const expr = parse(stream.current.value);
    stream.next();
    return new this.nodeClass(
      token,
      expr,
      environment.parser.parseBlock(stream, TableRowTag.END_TAGBLOCK, token)
    );
  }
}

export class TableRowNode implements Node {
  constructor(
    readonly token: Token,
    readonly expression: LoopExpression,
    readonly block: BlockNode
  ) {}

  public async render(
    context: RenderContext,
    out: RenderStream
  ): Promise<void> {
    const name = this.expression.name;
    const [it, length] = await this.expression.evaluate(context);

    let cols =
      this.expression.cols === undefined
        ? length
        : await this.expression.cols.evaluate(context);

    if (isInteger(cols)) {
      cols = cols.valueOf();
    } else if (!isPrimitiveInteger(cols)) {
      throw new InternalTypeError(
        `tablerow cols must be an integer, found '${cols}'`
      );
    }

    const tablerowloop = new TableRowLoopDrop(name, it, length, cols as number);
    const namespace: ContextScope = { tablerowloop: tablerowloop };
    context.scope[chainPush](namespace);

    try {
      out.write('<tr class="row1">\n');
      for (const item of tablerowloop) {
        namespace[name] = item;
        out.write(`<td class="col${tablerowloop.col}">`);
        await this.block.render(context, out);
        out.write("</td>");

        if (tablerowloop.col_last && !tablerowloop.last) {
          out.write(`</tr>\n<tr class="row${tablerowloop.row + 1}">`);
        }
      }
      out.write("</tr>\n");
    } finally {
      context.scope[chainPop]();
    }
  }

  public renderSync(context: RenderContext, out: RenderStream): void {
    const name = this.expression.name;
    const [it, length] = this.expression.evaluateSync(context);

    let cols =
      this.expression.cols === undefined
        ? length
        : this.expression.cols.evaluateSync(context);

    if (isInteger(cols)) {
      cols = cols.valueOf();
    } else if (!isPrimitiveInteger(cols)) {
      throw new InternalTypeError(
        `tablerow cols must be an integer, found '${cols}'`
      );
    }

    const tablerowloop = new TableRowLoopDrop(name, it, length, cols as number);
    const namespace: ContextScope = { tablerowloop: tablerowloop };
    context.scope[chainPush](namespace);

    try {
      out.write('<tr class="row1">\n');
      for (const item of tablerowloop) {
        namespace[name] = item;
        out.write(`<td class="col${tablerowloop.col}">`);
        this.block.renderSync(context, out);
        out.write("</td>");

        if (tablerowloop.col_last && !tablerowloop.last) {
          out.write(`</tr>\n<tr class="row${tablerowloop.row + 1}">`);
        }
      }
      out.write("</tr>\n");
    } finally {
      context.scope[chainPop]();
    }
  }

  children(): ChildNode[] {
    return this.block.children();
  }
}
