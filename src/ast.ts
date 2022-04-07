import { LiteralNode } from "./builtin/tags/literal";
import { RenderContext } from "./context";
import { DisabledTagError, InternalLiquidError } from "./errors";
import { RenderStream } from "./io/output_stream";
import { Token, TOKEN_TAG } from "./token";

export interface Node {
  /**
   * The token that started this node. Used to add line and column numbers
   * to error messages.
   */
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

  /**
   * Render this node to the given output stream.
   * @param context - The active render context.
   * @param out - The stream to output to.
   */
  render(context: RenderContext, out: RenderStream): Promise<void>;

  /**
   * A synchronous version of {@link render}.
   * @see {@link render}
   */
  renderSync(context: RenderContext, out: RenderStream): void;

  /**
   * Return an array of child nodes.
   */
  children(): Node[];
}

/**
 * The root of an abstract syntax tree.
 */
export class Root {
  readonly nodes: Node[] = [];
}

/**
 * A block of abstract syntax tree nodes.
 */
export class BlockNode implements Node {
  constructor(readonly token: Token, public nodes: Node[] = []) {}

  public async render(
    context: RenderContext,
    out: RenderStream
  ): Promise<void> {
    for (const node of this.nodes) {
      throwForDisabledTag(node, context);
      try {
        if (node instanceof LiteralNode) {
          node.renderSync(context, out);
        } else {
          await node.render(context, out);
        }
      } catch (error) {
        if (error instanceof InternalLiquidError) {
          throw error.withToken(node.token, context.templateName);
        }
        throw error;
      }
    }
  }

  public renderSync(context: RenderContext, out: RenderStream): void {
    for (const node of this.nodes) {
      throwForDisabledTag(node, context);
      try {
        node.renderSync(context, out);
      } catch (error) {
        if (error instanceof InternalLiquidError) {
          throw error.withToken(node.token, context.templateName);
        }
        throw error;
      }
    }
  }

  public children(): Node[] {
    return this.nodes;
  }
}

/**
 * Traverse the syntax tree rooted at `root` in depth-first pre-order.
 *
 * @param root - The syntax tree node to start from.
 * @returns A generator producing nodes that are decedents of the `root` node.
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
 */
export function forcedOutput(root: Node): boolean {
  for (const node of walk(root)) {
    if (node.captureOutput) return false;
    if (node.forceOutput) return true;
  }
  return false;
}

/**
 * Throw an error if the given tag is disallowed in the given context.
 */
export function throwForDisabledTag(
  node: Node,
  context: RenderContext,
  templateName?: string
): void {
  if (
    !!context.disabledTags.size &&
    node.token.kind === TOKEN_TAG &&
    context.disabledTags.has(node.token.value)
  )
    throw new DisabledTagError(
      `'${node.token.value}' is not allowed in this context`,
      node.token,
      templateName
    );
}
