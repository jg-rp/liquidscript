import { RenderContext } from "./context";
import type { Environment } from "./environment";
import type { Block } from "./markup";
import type { OutputBuffer } from "./markup";
import { isString } from "./type_guards";

export class Template {
  constructor(
    readonly env: Environment,
    readonly nodes: Block,
  ) {}

  public async render(data?: { [index: string]: unknown }): Promise<string> {
    const buffer: string[] = [];
    const context = new RenderContext(this, { globals: data });
    await this.renderWithContext(context, buffer);
    return buffer.join("");
  }

  public async renderWithContext(
    context: RenderContext,
    buffer: OutputBuffer,
  ): Promise<void> {
    for (const node of this.nodes) {
      if (isString(node)) {
        buffer.push(node);
      } else {
        await node.render(context, buffer);
      }
    }
  }

  public renderSync(data?: { [index: string]: unknown }): string {
    const buffer: string[] = [];
    const context = new RenderContext(this, { globals: data });
    this.renderWithContextSync(context, buffer);
    return buffer.join("");
  }

  public renderWithContextSync(
    context: RenderContext,
    buffer: OutputBuffer,
  ): void {
    for (const node of this.nodes) {
      if (isString(node)) {
        buffer.push(node);
      } else {
        node.renderSync(context, buffer);
      }
    }
  }
}
