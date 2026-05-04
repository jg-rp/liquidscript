import { RenderContext, type Namespace } from "./context";
import type { Environment, TemplateMeta } from "./environment";
import type { Block } from "./markup";
import type { OutputBuffer } from "./markup";
import { isString } from "./type_guards";

export class Template {
  globals: Namespace;

  readonly name: string;

  overlay: Namespace;

  readonly path: string | undefined;

  readonly upToDate: (() => Promise<boolean>) | undefined;

  readonly upToDateSync: (() => boolean) | undefined;

  constructor(
    readonly env: Environment,
    readonly source: string,
    readonly nodes: Block,
    globals?: Namespace,
    meta?: TemplateMeta,
  ) {
    this.name = meta?.name ?? "";
    this.path = meta?.path;
    this.globals = globals ?? {};
    this.overlay = meta?.overlay ?? {};
    this.upToDate = meta?.upToDate;
    this.upToDateSync = meta?.upToDateSync;
  }

  protected makeGlobals(namespace?: Namespace): Namespace {
    // TODO: chain object
    return { ...this.globals, ...this.overlay, ...(namespace || {}) };
  }

  async render(data?: { [index: string]: unknown }): Promise<string> {
    const buffer: string[] = [];
    const context = new RenderContext(this, {
      globals: this.makeGlobals(data),
    });
    await this.renderWithContext(context, buffer);
    return buffer.join("");
  }

  renderSync(data?: { [index: string]: unknown }): string {
    const buffer: string[] = [];
    const context = new RenderContext(this, {
      globals: this.makeGlobals(data),
    });
    this.renderWithContextSync(context, buffer);
    return buffer.join("");
  }

  async renderWithContext(
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

  renderWithContextSync(context: RenderContext, buffer: OutputBuffer): void {
    for (const node of this.nodes) {
      if (isString(node)) {
        buffer.push(node);
      } else {
        node.renderSync(context, buffer);
      }
    }
  }
}
