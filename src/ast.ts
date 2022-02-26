import { Context } from "./context";
import { InternalLiquidError } from "./errors";
import { RenderStream } from "./io/output_stream";
import { Token } from "./token";

export interface Node {
  readonly token: Token;

  /**
   * Indicates that nodes that do automatic whitespace suppression
   * should output this node regardless of its contents.
   */
  readonly forceOutput?: boolean;

  /**
   * Indicates that a node will never produce an output, even if it
   * has output statement child nodes.
   */
  readonly captureOutput?: boolean;

  render(context: Context, out: RenderStream): Promise<void>;
  renderSync(context: Context, out: RenderStream): void;
  children(): Node[];
}

export class Root {
  public statements: Node[] = [];
}

export class BlockNode implements Node {
  constructor(readonly token: Token, public statements: Node[] = []) {}

  public async render(context: Context, out: RenderStream): Promise<void> {
    for (const statement of this.statements) {
      try {
        await statement.render(context, out);
      } catch (error) {
        if (error instanceof InternalLiquidError) {
          throw error.withToken(statement.token, context.templateName);
        }
        throw error;
      }
    }
  }

  public renderSync(context: Context, out: RenderStream): void {
    for (const statement of this.statements) {
      try {
        statement.renderSync(context, out);
      } catch (error) {
        if (error instanceof InternalLiquidError) {
          throw error.withToken(statement.token, context.templateName);
        }
        throw error;
      }
    }
  }

  public children(): Node[] {
    return this.statements;
  }
}

/**
 * Traverse the syntax tree rooted at `root` in depth-first pre-order.
 *
 * @param root The syntax tree node to start from.
 * @yields Nodes that are decedents of the `root` node.
 */
export function* walk(root: Node): Generator<Node> {
  if (root.children) {
    for (const node of root.children()) {
      yield node;
      yield* walk(node);
    }
  }
}

/**
 * Return `true` if the syntax tree rooted at `root` contains
 * output statements (or equivalent nodes). `false` otherwise.
 *
 * @param root
 * @returns
 */
export function forcedOutput(root: Node): boolean {
  for (const node of walk(root)) {
    if (node.captureOutput) return false;
    if (node.forceOutput) return true;
  }
  return false;
}
