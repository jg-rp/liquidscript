import type { RenderContext } from "./context";
import type { Token } from "./token";
import type { Parser } from "./parser";
import type { Expression } from "./expression";
import { isString } from "./type_guards";

export type Node = string | Markup | Expression;
export type Block = Array<string | Markup>;

export interface OutputBuffer {
  push(value: string): void;
  join(separator: string): string;
}

export interface Markup {
  render(context: RenderContext, buffer: OutputBuffer): Promise<void>;
  renderSync(context: RenderContext, buffer: OutputBuffer): void;
  blank: boolean;
}

export interface Tag {
  parse(token: Token, parser: Parser): Markup;
}

export async function renderBlock(
  block: Block,
  context: RenderContext,
  buffer: OutputBuffer,
) {
  for (const node of block) {
    if (isString(node)) {
      buffer.push(node);
    } else {
      await node.render(context, buffer);
    }

    if (context.interrupts.length > 0) {
      break;
    }
  }
}

export function renderBlockSync(
  block: Block,
  context: RenderContext,
  buffer: OutputBuffer,
) {
  for (const node of block) {
    if (isString(node)) {
      buffer.push(node);
    } else {
      node.renderSync(context, buffer);
    }

    if (context.interrupts.length > 0) {
      return;
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
