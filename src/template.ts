import { ReadOnlyChainMap } from "./chain_map";
import { RenderContext, type Namespace } from "./context";
import type { Environment, TemplateMeta } from "./environment";
import { LiquidError } from "./errors";
import { renderBlock, renderBlockSync, type Block } from "./markup";
import type { OutputBuffer } from "./output";
import {
  analyze,
  analyzeSync,
  type AnalysisOptions,
  type Segments,
  type TemplateAnalysis,
} from "./static_analysis";

export class Template {
  globals: Namespace;

  readonly name: string;

  overlay: Namespace;

  readonly path: string | undefined;

  readonly upToDate: (() => Promise<boolean>) | undefined;

  readonly upToDateSync: (() => boolean) | undefined;

  #lines: string[] | undefined;

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
    return namespace
      ? new ReadOnlyChainMap(namespace, this.overlay, this.globals)
      : new ReadOnlyChainMap(this.overlay, this.globals);
  }

  async render(data?: { [index: string]: unknown }): Promise<string> {
    const buffer = this.env.bufferFactory();
    const context = new RenderContext(this, {
      globals: this.makeGlobals(data),
    });
    await this.renderWithContext(context, buffer);
    return buffer.join("");
  }

  renderSync(data?: { [index: string]: unknown }): string {
    const buffer = this.env.bufferFactory();
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
    // Note that `renderBlock` handles interrupts, even if we're not inside a
    // tag that intuitively could produce an interrupt.
    await renderBlock(this.nodes, context, buffer);
  }

  renderWithContextSync(context: RenderContext, buffer: OutputBuffer): void {
    // Note that `renderBlockSync` handles interrupts, even if we're not
    // inside a tag that intuitively could produce an interrupt.
    renderBlockSync(this.nodes, context, buffer);
  }

  /**
   * This template's source code split into lines.
   */
  get lines(): string[] {
    if (this.#lines === undefined) {
      const lines = this.source.split(/(?<=\n)/);
      if (lines[lines.length - 1] === "") {
        lines.pop();
      }

      this.#lines = lines;
    }

    return this.#lines;
  }

  /**
   * Statically analyze this template.
   *
   * When the `includePartials` option is true, attempt to load and analyze
   * included/rendered templates too.
   */
  async analyze(
    options: AnalysisOptions = { includePartials: true },
  ): Promise<TemplateAnalysis> {
    return await analyze(this, options);
  }

  /**
   * Statically analyze this template.
   *
   * When the `includePartials` option is true, attempt to load and analyze
   * included/rendered templates too.
   */
  analyzeSync(
    options: AnalysisOptions = { includePartials: true },
  ): TemplateAnalysis {
    return analyzeSync(this, options);
  }

  /**
   * Return a list of variables used in this template without path segments.
   *
   * Includes variables that are _local_ to the template, like those created
   * with `{% assign %}` and `{% capture %}`.
   *
   * When the `includePartials` option is true, attempt to load and analyze
   * included/rendered templates too.
   */
  async variables(
    options: AnalysisOptions = { includePartials: true },
  ): Promise<string[]> {
    return Array.from(Object.keys((await this.analyze(options)).variables));
  }

  /**
   * Return a list of variables used in this template without path segments.
   *
   * Includes variables that are _local_ to the template, like those created
   * with `{% assign %}` and `{% capture %}`.
   *
   * When the `includePartials` option is true, attempt to load and analyze
   * included/rendered templates too.
   */
  variablesSync(
    options: AnalysisOptions = { includePartials: true },
  ): string[] {
    return Array.from(Object.keys(this.analyzeSync(options).variables));
  }

  /**
   * Return a list of variables used in this template including path segments.
   *
   * Includes variables that are _local_ to the template, like those created
   * with `{% assign %}` and `{% capture %}`.
   *
   * When the `includePartials` option is true, attempt to load and analyze
   * included/rendered templates too.
   */
  async variablePaths(
    options: AnalysisOptions = { includePartials: true },
  ): Promise<string[]> {
    return unique(
      Object.values((await this.analyze(options)).variables).flatMap((s) =>
        s.map((v) => v.path),
      ),
    );
  }

  /**
   * Return a list of variables used in this template including path segments.
   *
   * Includes variables that are _local_ to the template, like those created
   * with `{% assign %}` and `{% capture %}`.
   *
   * When the `includePartials` option is true, attempt to load and analyze
   * included/rendered templates too.
   */
  variablePathsSync(
    options: AnalysisOptions = { includePartials: true },
  ): string[] {
    return unique(
      Object.values(this.analyzeSync(options).variables).flatMap((s) =>
        s.map((v) => v.path),
      ),
    );
  }

  /**
   * Return a list of variables used in this template, each as a list of segments.
   *
   * Includes variables that are _local_ to the template, like those created
   * with `{% assign %}` and `{% capture %}`.
   *
   * When the `includePartials` option is true, attempt to load and analyze
   * included/rendered templates too.
   */
  async variableSegments(
    options: AnalysisOptions = { includePartials: true },
  ): Promise<Segments[]> {
    return unique(
      Object.values((await this.analyze(options)).variables).flatMap((s) =>
        s.map((v) => v.segments),
      ),
    );
  }

  /**
   * Return a list of variables used in this template, each as a list of segments.
   *
   * Includes variables that are _local_ to the template, like those created
   * with `{% assign %}` and `{% capture %}`.
   *
   * When the `includePartials` option is true, attempt to load and analyze
   * included/rendered templates too.
   */
  variableSegmentsSync(
    options: AnalysisOptions = { includePartials: true },
  ): Segments[] {
    return unique(
      Object.values(this.analyzeSync(options).variables).flatMap((s) =>
        s.map((v) => v.segments),
      ),
    );
  }

  // TODO: same for globals
  // TODO: filterNames
  // TODO: tagNames
  // TODO: comments
  // TODO: docs
}

function unique<T>(a: T[]): T[] {
  const seen = new Map<string, T>();

  for (const item of a) {
    const key = JSON.stringify(item);

    if (!seen.has(key)) {
      seen.set(key, item);
    }
  }

  return Array.from(seen.values());
}
