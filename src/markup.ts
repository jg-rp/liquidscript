/* eslint-disable sonarjs/cognitive-complexity */
import type { RenderContext } from "./context";
import type { Token } from "./token";
import type { Parser } from "./parser";
import type { Expression, Name } from "./expression";
import { isString } from "./type_guards";
import type { OutputBuffer } from "./output";
import { DisabledTagError, ResourceLimitError } from "./errors";
import type { Template } from "./template";
import { STOP_RENDER } from "./tags/extends";

export type Node = string | Markup | Expression;
export type Block = Array<string | Markup>;

/**
 * All tags and the output statement in out template ASTs must implement the
 * `Markup` interface.
 *
 * Optional methods are for the benefit of static analysis, and can be omitted
 * from custom tags if static analysis is not needed.
 */
export interface Markup {
  /**
   * If true, indicates that this node renders to the empty string or a string
   * containing only whitespace. This is used to suppress control flow blocks
   * that don't contain text nodes or markup that contributes to the output.
   */
  blank: boolean;

  /**
   * Name of the tag used for static analysis. Set tag to an empty string
   * if it's not a tag or to silence it.
   */
  tag: string;

  /**
   * The token spanning the start of this node. In the absence of a more
   * specific token from an `Expression`, use this token when throwing
   * errors.
   */
  token: Token;

  /**
   * Render this node to the output buffer with data from `context`.
   */
  render(context: RenderContext, buffer: OutputBuffer): Promise<void>;

  /**
   * Render this node to the output buffer with data from `context`.
   */
  renderSync(context: RenderContext, buffer: OutputBuffer): void;

  /**
   * Return an array of child markup nodes. This is used to traverse template
   * syntax trees during static analysis.
   */
  children?(staticContext: RenderContext): Promise<Markup[]>;

  /**
   * Return an array of child markup nodes. This is used to traverse template
   * syntax trees during static analysis.
   */
  childrenSync?(staticContext: RenderContext): Markup[];

  /**
   * Return an array of child expression nodes. This is used to traverse
   * template syntax trees during static analysis.
   */
  expressions?(): Expression[];

  /**
   * Return an array of variable names that are in scope for the duration of
   * this node's block.
   *
   * This is used during static analysis to isolate and report global
   * variables, excluding temporary block-scoped names.
   */
  blockScope?(): Name[];

  /**
   * Return an array of variable names this node adds to the template local
   * scope (variables that remain in scope after the tag has been rendered).
   */
  templateScope?(): Name[];

  /**
   * Return meta data about partial templates rendered from this node.
   */
  partial?(staticContext: RenderContext): Promise<Partial>;

  /**
   * Return meta data about partial templates rendered from this node.
   */
  partialSync?(staticContext: RenderContext): Partial;
}

/**
 * Parse tokens into {@link Markup} nodes.
 *
 * It is common to implement `parse()` as a static method of a class
 * implementing `Markup`.
 */
export interface Tag {
  parse(token: Token, parser: Parser): Markup;
}

export const Scope = {
  SHARED: 1,
  ISOLATED: 2,
  INHERITED: 3,
} as const;

export type Partial = {
  template: Template;
  scopeKind: (typeof Scope)[keyof typeof Scope];
  inScope: Name[];
  key: number;
};

/**
 * Render `block` to output buffer `buffer` with data from `context`.
 */
export async function renderBlock(
  block: Block,
  context: RenderContext,
  buffer: OutputBuffer,
) {
  if (context.env.maxRenderScore || context.env.maxRenderScoreCumulative) {
    context.renderScore += block.length;
    context.renderScoreCumulative += block.length;

    if (
      (context.env.maxRenderScore &&
        context.renderScore > context.env.maxRenderScore) ||
      (context.env.maxRenderScoreCumulative &&
        context.renderScoreCumulative > context.env.maxRenderScoreCumulative)
    ) {
      throw new ResourceLimitError("memory limits reached");
    }
  }

  for (const node of block) {
    if (isString(node)) {
      buffer.push(node);
    } else {
      if (context.disabledTags && context.disabledTags.has(node.tag)) {
        throw new DisabledTagError(
          `'${node.tag}' is not allowed in this context`,
          node.token,
          context.template.source,
          context.template.name,
        );
      }
      await node.render(context, buffer);
    }

    if (context.interrupts.length > 0) {
      if (context.interrupts[context.interrupts.length - 1] === STOP_RENDER) {
        context.interrupts.pop();
      }
      break;
    }

    if (
      context.env.maxRenderSize &&
      buffer.length > context.env.maxRenderSize
    ) {
      throw new ResourceLimitError("memory limits exceeded");
    }
  }
}

/**
 * Render `block` to output buffer `buffer` with data from `context`.
 */
export function renderBlockSync(
  block: Block,
  context: RenderContext,
  buffer: OutputBuffer,
) {
  if (context.env.maxRenderScore || context.env.maxRenderScoreCumulative) {
    context.renderScore += block.length;
    context.renderScoreCumulative += block.length;

    if (
      (context.env.maxRenderScore &&
        context.renderScore > context.env.maxRenderScore) ||
      (context.env.maxRenderScoreCumulative &&
        context.renderScoreCumulative > context.env.maxRenderScoreCumulative)
    ) {
      throw new ResourceLimitError("memory limits reached");
    }
  }

  for (const node of block) {
    if (isString(node)) {
      buffer.push(node);
    } else {
      if (context.disabledTags && context.disabledTags.has(node.tag)) {
        throw new DisabledTagError(
          `'${node.tag}' is not allowed in this context`,
          node.token,
          context.template.source,
          context.template.name,
        );
      }
      node.renderSync(context, buffer);
    }

    if (context.interrupts.length > 0) {
      if (context.interrupts[context.interrupts.length - 1] === STOP_RENDER) {
        context.interrupts.pop();
      }
      break;
    }

    if (
      context.env.maxRenderSize &&
      buffer.length > context.env.maxRenderSize
    ) {
      throw new ResourceLimitError("memory limits exceeded");
    }
  }
}

const RE_WHITESPACE = /^\s*$/;

export function isBlankBlock(nodes: Block): boolean {
  return nodes.every((node) => {
    if (isString(node)) return RE_WHITESPACE.test(node);
    return node.blank;
  });
}
