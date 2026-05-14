import { RenderContext, type Namespace } from "./context";
import type { Environment, TemplateMeta } from "./environment";
import { renderBlock, renderBlockSync, type Block } from "./markup";
import type { OutputBuffer } from "./output";

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
    options?: RenderTemplateOptions,
  ): Promise<void> {
    await renderBlock(this.nodes, context, buffer);
  }

  renderWithContextSync(
    context: RenderContext,
    buffer: OutputBuffer,
    options?: RenderTemplateOptions,
  ): void {
    renderBlockSync(this.nodes, context, buffer);
  }
}

export type RenderTemplateOptions = {
  partial?: boolean;
  blockScope?: boolean;
};
