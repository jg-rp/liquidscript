import type { RenderContext } from "./context";
import type { Token } from "./token";
import type { Parser } from "./parser";
import type { Expression } from "./expression";
import { isString } from "./type_guards";

export type Node = string | Markup | Expression;
export type Block = Array<string | Markup>;

export interface OutputBuffer {
  push(value: string): void;
}

export interface Markup {
  render(context: RenderContext, buffer: OutputBuffer): Promise<void>;
  renderSync(context: RenderContext, buffer: OutputBuffer): void;
  blank: boolean;
}

export interface Tag {
  parse(token: Token, parser: Parser): Markup;
}

export class ConditionalBlock {
  readonly expression: Expression;
  readonly blank: boolean;
  public nodes: Block;

  constructor(expression: Expression, nodes: Block) {
    this.expression = expression;
    this.blank = isBlankBlock(nodes);
    this.nodes = nodes;
  }

  public filterStrings(): void {
    this.nodes = this.nodes.filter((node) => !isString(node));
  }

  public async render(
    context: RenderContext,
    buffer: OutputBuffer,
  ): Promise<boolean> {
    if (context.env.isTruthy(await this.expression.evaluate(context))) {
      for (const node of this.nodes) {
        if (isString(node)) {
          buffer.push(node);
        } else {
          await node.render(context, buffer);
        }
      }
      return true;
    }
    return false;
  }

  public renderSync(context: RenderContext, buffer: OutputBuffer): boolean {
    if (context.env.isTruthy(this.expression.evaluateSync(context))) {
      for (const node of this.nodes) {
        if (isString(node)) {
          buffer.push(node);
        } else {
          node.renderSync(context, buffer);
        }
      }
      return true;
    }
    return false;
  }
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
  }
}

const RE_WHITESPACE = /^\s*$/;

export function isBlankBlock(nodes: Block): boolean {
  return nodes.every((node) => {
    if (isString(node)) return RE_WHITESPACE.test(node);
    return node.blank;
  });
}
