import { LiteralNode } from "./builtin/tags/literal";
import { RenderContext } from "./context";
import { DisabledTagError, InternalLiquidError } from "./errors";
import { Expression } from "./expression";
import { RenderStream } from "./io/output_stream";
import { Token, TOKEN_TAG } from "./token";
import { ContextScope } from "./types";

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
  children?: () => ChildNode[];
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
  constructor(
    readonly token: Token,
    public nodes: Node[] = [],
  ) {}

  public async render(
    context: RenderContext,
    out: RenderStream,
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

  public children(): ChildNode[] {
    return this.nodes.map(
      (n): ChildNode => ({
        token: this.token,
        node: n,
      }),
    );
  }
}

/**
 * An AST node and optional expression guarding that node.
 */
export type ChildNode = {
  /**
   * The token that started this node. Used for reporting line numbers.
   */
  token: Token;

  /**
   * An optional `Expression` object related to the given `Node` object.
   */
  expression?: Expression;

  /**
   * An `Node` object (some AST Nodes will have an `Expression` without
   * an associated `Node`). Typically a `BlockNode`.
   */
  node?: Node;

  /**
   * An array of names the parent node adds to the template local
   * namespace. For example, the built-in `assign`, `capture`, `increment`
   * and `decrement` tags all add names to the template local scope.
   */
  templateScope?: string[];

  /**
   * An array of names the parent node adds to its block. For example, the
   * `for` tag adds the name "forloop" for the duration of its block.
   */
  blockScope?: string[];

  /**
   * If given, indicates that the associated expression should be used to
   * load a partial template. In "render" mode, the partial will be analyzed
   * in an isolated namespace, without access to the parent's template local
   * scope. In "include" mode, the partial will have access to the parents
   * template local scope and the parent's scope can be updated by the partial
   * template too.
   */
  loadMode?: "render" | "include" | "extends";

  /**
   * Meta data a template loader might need to find the source of a partial
   * template.
   */
  loadContext?: ContextScope;
};

/**
 * Traverse the syntax tree rooted at `root` in depth-first pre-order.
 *
 * @param root - The syntax tree node to start from.
 * @returns A generator producing nodes that are decedents of the `root` node.
 */
export function* walk(root: Node): Generator<ChildNode> {
  if (root.children) {
    for (const node of root.children()) {
      yield node;
      if (node.node) yield* walk(node.node);
    }
  }
}

/**
 * Return `true` if the syntax tree rooted at `root` contains
 * output statements (or equivalent nodes). `false` otherwise.
 */
export function forcedOutput(root: Node): boolean {
  for (const child of walk(root)) {
    if (child.node?.captureOutput) return false;
    if (child.node?.forceOutput) return true;
  }
  return false;
}

/**
 * Throw an error if the given tag is disallowed in the given context.
 */
export function throwForDisabledTag(
  node: Node,
  context: RenderContext,
  templateName?: string,
): void {
  if (
    !!context.disabledTags.size &&
    node.token.kind === TOKEN_TAG &&
    context.disabledTags.has(node.token.value)
  )
    throw new DisabledTagError(
      `'${node.token.value}' is not allowed in this context`,
      node.token,
      templateName,
    );
}
