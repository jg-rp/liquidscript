import { ReadOnlyChainMap } from "./chain_map";
import { RenderContext, type Namespace } from "./context";
import type { Environment, TemplateMeta } from "./environment";
import {
  renderBlock,
  renderBlockSync,
  type Block,
  type Markup,
} from "./markup";
import type { OutputBuffer } from "./output";
import {
  analyze,
  analyzeSync,
  type AnalysisOptions,
  type Segments,
  type TemplateAnalysis,
} from "./static_analysis";
import { CommentTag, DocTag, InlineCommentTag } from "./tags";
import { isString } from "./type_guards";

export class Template {
  globals: Namespace;

  readonly name: string;

  overlay: Namespace;

  readonly path: string | undefined;

  readonly upToDate: () => Promise<boolean>;

  readonly upToDateSync: () => boolean;

  #lines: string[] | undefined;

  constructor(
    readonly env: Environment,
    readonly source: string,
    readonly nodes: Block,
    globals?: Namespace,
    meta?: TemplateMeta,
  ) {
    this.name = meta?.name ?? "";
    this.globals = globals ?? {};
    this.overlay = meta?.overlay ?? {};
    this.upToDate = meta?.upToDate ?? (async () => true);
    this.upToDateSync = meta?.upToDateSync ?? (() => true);
  }

  protected makeGlobals(namespace?: Namespace): Namespace {
    return namespace
      ? new ReadOnlyChainMap(namespace, this.overlay, this.globals)
      : new ReadOnlyChainMap(this.overlay, this.globals);
  }

  /**
   * Copy this template with new pinned global variables.
   *
   * @param globals - An object who's properties will be added
   * to the render context every time this template is rendered.
   * @returns A copy of this template with new render context globals.
   */
  withGlobals(globals?: Namespace) {
    return new Template(this.env, this.source, this.nodes, globals, {
      name: this.name,
      overlay: this.overlay,
      upToDate: this.upToDate,
      upToDateSync: this.upToDateSync,
    });
  }

  async render(data?: Namespace): Promise<string> {
    const buffer = this.env.bufferFactory();
    const context = new RenderContext(this, {
      globals: this.makeGlobals(data),
    });
    await this.renderWithContext(context, buffer);
    return buffer.join("");
  }

  renderSync(data?: Namespace): string {
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

  /**
   * Return a list of variables used in this template without path segments.
   *
   * Excludes variables that are _local_ to the template, like those created
   * with `{% assign %}` and `{% capture %}`.
   *
   * When the `includePartials` option is true, attempt to load and analyze
   * included/rendered templates too.
   */
  async globalVariables(
    options: AnalysisOptions = { includePartials: true },
  ): Promise<string[]> {
    return Array.from(Object.keys((await this.analyze(options)).globals));
  }

  /**
   * Return a list of variables used in this template without path segments.
   *
   * Excludes variables that are _local_ to the template, like those created
   * with `{% assign %}` and `{% capture %}`.
   *
   * When the `includePartials` option is true, attempt to load and analyze
   * included/rendered templates too.
   */
  globalVariablesSync(
    options: AnalysisOptions = { includePartials: true },
  ): string[] {
    return Array.from(Object.keys(this.analyzeSync(options).globals));
  }

  async globalVariablePaths(
    options: AnalysisOptions = { includePartials: true },
  ): Promise<string[]> {
    return unique(
      Object.values((await this.analyze(options)).globals).flatMap((s) =>
        s.map((v) => v.path),
      ),
    );
  }

  /**
   * Return a list of variables used in this template including path segments.
   *
   * Excludes variables that are _local_ to the template, like those created
   * with `{% assign %}` and `{% capture %}`.
   *
   * When the `includePartials` option is true, attempt to load and analyze
   * included/rendered templates too.
   */
  globalVariablePathsSync(
    options: AnalysisOptions = { includePartials: true },
  ): string[] {
    return unique(
      Object.values(this.analyzeSync(options).globals).flatMap((s) =>
        s.map((v) => v.path),
      ),
    );
  }

  /**
   * Return a list of variables used in this template, each as a list of segments.
   *
   * Excludes variables that are _local_ to the template, like those created
   * with `{% assign %}` and `{% capture %}`.
   *
   * When the `includePartials` option is true, attempt to load and analyze
   * included/rendered templates too.
   */
  async globalVariableSegments(
    options: AnalysisOptions = { includePartials: true },
  ): Promise<Segments[]> {
    return unique(
      Object.values((await this.analyze(options)).globals).flatMap((s) =>
        s.map((v) => v.segments),
      ),
    );
  }

  /**
   * Return a list of variables used in this template, each as a list of segments.
   *
   * Excludes variables that are _local_ to the template, like those created
   * with `{% assign %}` and `{% capture %}`.
   *
   * When the `includePartials` option is true, attempt to load and analyze
   * included/rendered templates too.
   */
  globalVariableSegmentsSync(
    options: AnalysisOptions = { includePartials: true },
  ): Segments[] {
    return unique(
      Object.values(this.analyzeSync(options).globals).flatMap((s) =>
        s.map((v) => v.segments),
      ),
    );
  }

  /**
   * Return a list of filter names used in this template.
   */
  async filterNames(
    options: AnalysisOptions = { includePartials: true },
  ): Promise<string[]> {
    return Object.keys((await this.analyze(options)).filters);
  }

  /**
   * Return a list of filter names used in this template.
   */
  filterNamesSync(
    options: AnalysisOptions = { includePartials: true },
  ): string[] {
    return Object.keys(this.analyzeSync(options).filters);
  }

  /**
   * Return a list of tag names used in this template.
   */
  async tagNames(
    options: AnalysisOptions = { includePartials: true },
  ): Promise<string[]> {
    return Object.keys((await this.analyze(options)).tags);
  }

  /**
   * Return a list of filter names used in this template.
   */
  tagNamesSync(options: AnalysisOptions = { includePartials: true }): string[] {
    return Object.keys(this.analyzeSync(options).tags);
  }

  /**
   * Return a list of comment tag nodes found in this template.
   *
   * Instances of `CommentTag` and `InlineCommentTag` have `token` and `text`
   * properties.
   *
   * Note that this method does not try to load included or rendered templates.
   */
  comments(): Array<CommentTag | InlineCommentTag> {
    const context = new RenderContext(this);
    const nodes: Array<CommentTag | InlineCommentTag> = [];

    const visit = (node: Markup) => {
      if (node instanceof CommentTag || node instanceof InlineCommentTag) {
        nodes.push(node);
      }

      if (node.childrenSync !== undefined) {
        for (const child of node.childrenSync(context)) {
          visit(child);
        }
      }
    };

    for (const child of this.nodes) {
      if (!isString(child)) {
        visit(child);
      }
    }

    return nodes;
  }

  /**
   * Return a list of doc tag nodes found in this template.
   *
   * Instances of `DocTag` have `token` and `text` properties.
   *
   * Note that this method does not try to load included or rendered templates.
   */
  docs(): Array<DocTag> {
    const context = new RenderContext(this);
    const nodes: Array<DocTag> = [];

    const visit = (node: Markup) => {
      if (node instanceof DocTag) {
        nodes.push(node);
      }

      if (node.childrenSync !== undefined) {
        for (const child of node.childrenSync(context)) {
          visit(child);
        }
      }
    };

    for (const child of this.nodes) {
      if (!isString(child)) {
        visit(child);
      }
    }

    return nodes;
  }
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
