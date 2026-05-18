import type { RenderContext } from "./context";
import type { Token } from "./token";
import type { Parser } from "./parser";
import type { Expression, Name } from "./expression";
import { isString } from "./type_guards";
import type { OutputBuffer } from "./output";
import { DisabledTagError, ResourceLimitError } from "./errors";

export type Node = string | Markup | Expression;
export type Block = Array<string | Markup>;

export interface Markup {
  render(context: RenderContext, buffer: OutputBuffer): Promise<void>;
  renderSync(context: RenderContext, buffer: OutputBuffer): void;
  children?(
    staticContext: RenderContext,
    includePartials: boolean,
  ): Promise<Markup[]>;
  childrenSync?(
    staticContext: RenderContext,
    includePartials: boolean,
  ): Markup[];
  expressions?(): Expression[];
  blockScope?(): Name[];
  templateScope?(): Name[];
  partialScope?(): Partial;
  blank: boolean;

  /**
   * Name of the tag used for static analysis. Set tag to an empty string
   * if it's not a tag or to silence it.
   */
  tag: string;
  token: Token;
}

export interface Tag {
  parse(token: Token, parser: Parser): Markup;
}

export const Scope = {
  SHARED: 1,
  ISOLATED: 2,
  INHERITED: 3,
} as const;

export type Partial = {
  name: string | Expression;
  scopeKind: (typeof Scope)[keyof typeof Scope];
  inScope: Name[];
  key: number;
};

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
        );
      }
      await node.render(context, buffer);
    }

    if (context.interrupts.length > 0) {
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
        );
      }
      node.renderSync(context, buffer);
    }

    if (context.interrupts.length > 0) {
      return;
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
