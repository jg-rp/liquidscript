import { BlockNode, forcedOutput, Node, ChildNode } from "../../ast";
import { RenderContext } from "../../context";
import { Environment } from "../../environment";
import { BreakIteration, ContinueIteration } from "../../errors";
import { LoopExpression } from "../../expression";
import { parse } from "../../expressions/loop/parse";
import { RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TOKEN_EXPRESSION, TOKEN_TAG, TokenStream } from "../../token";
import { ForLoopDrop } from "../drops/forloop";
import { ContextScope } from "../../types";

const TAG_FOR = "for";
const TAG_ENDFOR = "endfor";
const TAG_ELSE = "else";
const TAG_BREAK = "break";
const TAG_CONTINUE = "continue";

export class BreakTag implements Tag {
  readonly name: string = TAG_BREAK;
  readonly block = false;

  parse(stream: TokenStream): BreakNode {
    return new BreakNode(stream.current);
  }
}

export class ContinueTag implements Tag {
  readonly name: string = TAG_CONTINUE;
  readonly block = false;

  parse(stream: TokenStream): ContinueNode {
    return new ContinueNode(stream.current);
  }
}

export class ForTag implements Tag {
  protected static ENDFORBLOCK = new Set([TAG_ENDFOR, TAG_ELSE]);
  protected static ENDFORELSEBLOCK = new Set([TAG_ENDFOR]);

  readonly name: string = TAG_FOR;
  readonly block = true;
  readonly end: string = TAG_ENDFOR;
  protected nodeClass = ForNode;

  parse(stream: TokenStream, environment: Environment): Node {
    const token = stream.next();

    stream.expect(TOKEN_EXPRESSION);
    const expr = parse(stream.current.value);
    stream.next();
    const block = environment.parser.parseBlock(
      stream,
      ForTag.ENDFORBLOCK,
      token,
    );

    let _default: BlockNode | undefined = undefined;

    if (
      stream.current.kind === TOKEN_TAG &&
      stream.current.value === TAG_ELSE
    ) {
      _default = environment.parser.parseBlock(
        stream,
        ForTag.ENDFORELSEBLOCK,
        stream.next(),
      );
    }

    stream.expect(TOKEN_TAG);
    return new this.nodeClass(token, expr, block, _default);
  }
}

export class BreakNode implements Node {
  constructor(readonly token: Token) {}

  public toString(): string {
    return "[break]";
  }

  public async render(): Promise<void> {
    throw new BreakIteration("break");
  }

  public renderSync(): void {
    throw new BreakIteration("break");
  }

  public children(): ChildNode[] {
    return [];
  }
}

export class ContinueNode implements Node {
  constructor(readonly token: Token) {}

  public toString(): string {
    return "[continue]";
  }

  public async render(): Promise<void> {
    throw new ContinueIteration("continue");
  }

  public renderSync(): void {
    throw new ContinueIteration("continue");
  }

  public children(): ChildNode[] {
    return [];
  }
}

export class ForNode implements Node {
  public forceOutput = false;
  constructor(
    readonly token: Token,
    readonly expression: LoopExpression,
    readonly block: BlockNode,
    readonly default_?: BlockNode,
  ) {
    this.forceOutput = forcedOutput(this);
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  public async render(
    context: RenderContext,
    out: RenderStream,
  ): Promise<void> {
    const [it, length] = await this.expression.evaluate(context);
    // This intermediate buffer is used to detect and possibly
    // suppress blocks that, when rendered, contain only whitespace
    // Don't buffer the output stream if this.forceOutput is true.
    const buf = this.forceOutput
      ? out
      : context.environment.renderStreamFactory(out);

    if (length > 0) {
      const name = this.expression.name;
      const forloop = new ForLoopDrop(
        `${name}-${this.expression.iterable}`,
        it,
        length,
        context.forLoops.length
          ? context.forLoops[context.forLoops.length - 1]
          : context.environment.undefinedFactory("parentloop"),
      );

      context.raiseForLoopLimit(forloop.length);
      const namespace: ContextScope = { forloop };
      context.forLoops.push(forloop);
      try {
        await context.extend(namespace, async () => {
          for (const item of forloop) {
            namespace[name] = item;
            try {
              await this.block.render(context, buf);
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
        });
      } finally {
        context.forLoops.pop();
      }
    } else if (this.default_ !== undefined) {
      await this.default_.render(context, buf);
    }

    if (!this.forceOutput) {
      const buffered = buf.toString();
      if (/\S/.test(buffered)) out.write(buffered);
    }
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  public renderSync(context: RenderContext, out: RenderStream): void {
    const [it, length] = this.expression.evaluateSync(context);
    const buf = this.forceOutput
      ? out
      : context.environment.renderStreamFactory(out);

    if (length > 0) {
      const name = this.expression.name;
      const forloop = new ForLoopDrop(
        `${name}-${this.expression.iterable}`,
        it,
        length,
        context.forLoops.length
          ? context.forLoops[context.forLoops.length - 1]
          : context.environment.undefinedFactory("parentloop"),
      );

      context.raiseForLoopLimit(forloop.length);
      const namespace: ContextScope = { forloop };
      context.forLoops.push(forloop);
      try {
        context.extendSync(namespace, () => {
          for (const item of forloop) {
            namespace[name] = item;
            try {
              this.block.renderSync(context, buf);
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
        });
      } finally {
        context.forLoops.pop();
      }
    } else if (this.default_ !== undefined) {
      this.default_.renderSync(context, buf);
    }

    if (!this.forceOutput) {
      const buffered = buf.toString();
      if (/\S/.test(buffered)) out.write(buffered);
    }
  }

  children(): ChildNode[] {
    const _children: ChildNode[] = [
      {
        token: this.block.token,
        node: this.block,
        expression: this.expression,
        blockScope: [this.expression.name, "forloop"],
      },
    ];
    if (this.default_)
      _children.push({ token: this.default_.token, node: this.default_ });
    return _children;
  }
}
