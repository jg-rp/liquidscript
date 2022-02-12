import { BlockNode, Node } from "../../ast";
import { Context } from "../../context";
import { Environment } from "../../environment";
import { BreakIteration, ContinueIteration } from "../../errors";
import { LoopExpression } from "../../expression";
import { parse } from "../../expressions/loop/parse";
import { RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_EXPRESSION, TOKEN_TAG } from "../../token";
import { ForLoopDrop } from "../drops/forloop";

const TAG_FOR = "for";
const TAG_ENDFOR = "endfor";
const TAG_ELSE = "else";
const TAG_BREAK = "break";
const TAG_CONTINUE = "continue";
const ENDFORBLOCK = new Set([TAG_ENDFOR, TAG_ELSE]);
const ENDFORELSEBLOCK = new Set([TAG_ENDFOR]);

export class BreakTag implements Tag {
  readonly name = TAG_BREAK;
  readonly block = false;

  parse(stream: TokenStream): BreakNode {
    return new BreakNode(stream.current);
  }
}

export class ContinueTag implements Tag {
  readonly name = TAG_CONTINUE;
  readonly block = false;

  parse(stream: TokenStream): ContinueNode {
    return new ContinueNode(stream.current);
  }
}

export class ForTag implements Tag {
  readonly name = TAG_FOR;
  readonly block = true;
  readonly end = TAG_ENDFOR;

  parse(stream: TokenStream, environment: Environment): ForNode {
    const parser = environment.getParser();
    const token = stream.next();

    stream.expect(TOKEN_EXPRESSION);
    const expr = parse(stream.current.value);
    stream.next();
    const block = parser.parseBlock(stream, ENDFORBLOCK);

    let _default: BlockNode | undefined = undefined;

    if (
      stream.current.kind === TOKEN_TAG &&
      stream.current.value === TAG_ELSE
    ) {
      stream.next();
      _default = parser.parseBlock(stream, ENDFORELSEBLOCK);
    }

    stream.expect(TOKEN_TAG);
    return new ForNode(token, expr, block, _default);
  }
}

export class BreakNode implements Node {
  constructor(readonly token: Token) {}

  toString(): string {
    return "[break]";
  }

  async render(): Promise<void> {
    throw new BreakIteration("break");
  }

  branches(): Node[] {
    return [];
  }
}

export class ContinueNode implements Node {
  constructor(readonly token: Token) {}

  toString(): string {
    return "[continue]";
  }

  async render(): Promise<void> {
    throw new ContinueIteration("continue");
  }

  branches(): Node[] {
    return [];
  }
}

export class ForNode implements Node {
  constructor(
    readonly token: Token,
    readonly expression: LoopExpression,
    readonly block: BlockNode,
    readonly default_?: BlockNode
  ) {}

  async render(context: Context, out: RenderStream): Promise<void> {
    const [it, length] = await this.expression.evaluate(context);

    if (length > 0) {
      const name = this.expression.name;

      // TODO: parentloop
      const forloop = new ForLoopDrop(
        `${name}-${this.expression.iterable}`,
        it,
        length
      );

      const namespace: Map<string, unknown> = new Map([["forloop", forloop]]);
      context.push(namespace);

      try {
        for (const item of forloop) {
          namespace.set(name, item);
          try {
            await this.block.render(context, out);
          } catch (error) {
            if (error instanceof BreakIteration) {
              break;
            } else if (error instanceof ContinueIteration) {
              continue;
            } else {
              throw error;
            }
          }
        }
      } finally {
        context.pop();
      }
    } else if (this.default_ !== undefined) {
      await this.default_.render(context, out);
    }
  }

  branches(): Node[] {
    return [];
  }
}
