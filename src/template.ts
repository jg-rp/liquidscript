import { Node, Root, throwForDisabledTag } from "./ast";
import { LiteralNode } from "./builtin/tags/literal";
import { chainObjects } from "./chain_object";
import { RenderContext } from "./context";
import {
  Environment,
  EnvironmentOptions,
  TemplateContext,
} from "./environment";
import {
  InternalLiquidError,
  LiquidError,
  LiquidInterrupt,
  LiquidSyntaxError,
  StopRender,
} from "./errors";
import { RenderStream } from "./io/output_stream";
import {
  TemplateAnalysis,
  TemplateAnalysisOptions,
  TemplateVariableCounter,
} from "./static_analysis";
import { ContextScope } from "./types";

// For backwards compatibility. We've moved these to static_analysis.ts.
export type {
  TemplateAnalysis,
  TemplateAnalysisOptions,
  VariableRefs,
  VariableLocation,
  VariableLocations,
} from "./static_analysis";

/**
 * A Liquid template that has been parsed and is bound to an environment,
 * ready to be rendered. Rather than constructing a template directly, you
 * should use `Template.fromString()`, `Environment.fromString()` or
 * `Environment.getTemplate()`.
 */
export class Template {
  readonly environment: Environment;
  readonly tree: Root;
  readonly name: string;
  readonly globals: ContextScope;
  readonly matter: ContextScope;
  readonly loaderContext: ContextScope;
  readonly isUpToDate: () => Promise<boolean>;
  readonly isUpToDateSync: () => boolean;
  protected renderContextClass = RenderContext;

  /**
   * Parse a Liquid template, automatically creating an environment to
   * bind it to.
   *
   * @param source - The Liquid template source code.
   * @param templateGlobals - Global render context variables that will
   * included every time this template is rendered.
   * @param options - Options to set on the implicit environment. `globals`
   * and `loader` will be ignored when creating an implicit environment.
   * @returns A new template, bound to an implicit environment.
   */
  static fromString(
    source: string,
    templateGlobals?: ContextScope,
    options: EnvironmentOptions = {},
  ): Template {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loader, ...opts } = options;
    return Environment.getImplicitEnvironment(opts).fromString(
      source,
      templateGlobals,
      { name: "<string>" },
    );
  }

  /**
   * Parse a Liquid template, automatically creating an environment to
   * bind it to.
   *
   * Alias of {@link fromString}
   *
   * @param source - The Liquid template source code.
   * @param templateGlobals - Global render context variables that will
   * included every time this template is rendered.
   * @param options - Options to set on the implicit environment.
   * @returns A new template, bound to an implicit environment.
   */
  static from(
    source: string,
    templateGlobals?: ContextScope,
    options: EnvironmentOptions = {},
  ): Template {
    return Template.fromString(source, templateGlobals, options);
  }

  /**
   * Template constructor. Rather than constructing a template directly, you
   * should use `Template.fromString()`, `Environment.fromString()` or
   * `Environment.getTemplate()`.
   *
   * @param environment - The environment this template is bound to.
   * @param tree - The root of the abstract syntax tree representing this
   * template.
   * @param globals - An optional object who's properties will be added
   * to the render context every time the resulting template is rendered.
   * @param templateContext - Optional meta data. Mostly for managing loading
   * and reloading of templates.
   */
  constructor(
    environment: Environment,
    tree: Root,
    globals?: ContextScope,
    templateContext: TemplateContext = {},
  ) {
    this.environment = environment;
    this.tree = tree;
    this.name = templateContext.name ?? "<string>";
    this.globals = globals === undefined ? {} : globals;
    this.matter = templateContext.matter ?? {};
    this.loaderContext = templateContext.loaderContext ?? {};
    this.isUpToDate = templateContext.upToDate ?? (async () => true);
    this.isUpToDateSync = templateContext.upToDateSync ?? (() => true);
  }

  /**
   * Render the template.
   * @param globals - An optional object who's properties will be added
   * to the render context,
   * @returns The rendered template.
   */
  public async render(globals: ContextScope = {}): Promise<string> {
    const context = new this.renderContextClass(
      this.environment,
      this.makeGlobals(globals),
      {
        templateName: this.name,
        loaderContext: this.loaderContext,
        template: this,
      },
    );
    const outputStream = this.environment.renderStreamFactory();
    await this.renderWithContext(context, outputStream);
    return outputStream.toString();
  }

  /**
   * A synchronous version of `render`.
   * @see {@link render}
   */
  public renderSync(globals: ContextScope = {}): string {
    const context = new this.renderContextClass(
      this.environment,
      this.makeGlobals(globals),
      {
        templateName: this.name,
        loaderContext: this.loaderContext,
        template: this,
      },
    );
    const outputStream = this.environment.renderStreamFactory();
    this.renderWithContextSync(context, outputStream);
    return outputStream.toString();
  }

  protected handleError(
    error: unknown,
    node: Node,
    blockScope: boolean,
    partial: boolean,
  ): void {
    if (error instanceof LiquidInterrupt) {
      if (!partial || blockScope) {
        this.environment.error(
          new LiquidSyntaxError(
            `unexpected '${error.message}'`,
            node.token,
            this.name,
          ),
        );
      } else {
        throw error;
      }
    } else if (error instanceof InternalLiquidError) {
      this.environment.error(error.withToken(node.token, this.name));
    } else if (error instanceof LiquidError) {
      this.environment.error(error);
    } else {
      throw error;
    }
  }

  /**
   * Render a template given an existing render context and output stream.
   * This is used by the built-in `include` and `render` tags.
   */
  public async renderWithContext(
    context: RenderContext,
    outputStream: RenderStream,
    blockScope: boolean = false,
    partial: boolean = false,
  ): Promise<void> {
    for (const node of this.tree.nodes) {
      throwForDisabledTag(node, context, this.name);
      try {
        if (node instanceof LiteralNode) {
          node.renderSync(context, outputStream);
        } else {
          await node.render(context, outputStream);
        }
      } catch (error) {
        if (error instanceof StopRender) {
          break;
        }
        this.handleError(error, node, blockScope, partial);
      }
    }
  }

  /**
   * A synchronous version of `renderWithContext`.
   * @see {@link renderWithContext}
   */
  public renderWithContextSync(
    context: RenderContext,
    outputStream: RenderStream,
    blockScope: boolean = false,
    partial: boolean = false,
  ): void {
    for (const node of this.tree.nodes) {
      throwForDisabledTag(node, context, this.name);
      try {
        node.renderSync(context, outputStream);
      } catch (error) {
        if (error instanceof StopRender) {
          break;
        }
        this.handleError(error, node, blockScope, partial);
      }
    }
  }

  /**
   * Copy this template with new render context globals.
   *
   * @param globals - An object who's properties will be added
   * to the render context every time this template is rendered.
   * @returns A copy of this template with new render context globals.
   */
  public withGlobals(globals?: ContextScope) {
    return new Template(this.environment, this.tree, globals, {
      loaderContext: this.loaderContext,
      matter: this.matter,
      name: this.name,
      upToDate: this.isUpToDate,
      upToDateSync: this.isUpToDateSync,
    });
  }

  /**
   * Combine render context global variables from the bound environment,
   * the "matter" object originating from a template loader (if any) and
   * those passed to `render()`.
   *
   * Override this to change global template scope priorities.
   */
  protected makeGlobals(templateGlobals: ContextScope): ContextScope {
    return chainObjects(templateGlobals, this.matter, this.globals);
  }

  /**
   * Statically analyze this template and any included/rendered templates.
   * Currently we only analyze references to template variables.
   *
   * @param options - Template analysis options.
   */
  public async analyze({
    followPartials,
    raiseForFailures,
  }: TemplateAnalysisOptions = {}): Promise<TemplateAnalysis> {
    const counter = new TemplateVariableCounter(this, {
      followPartials,
      raiseForFailures,
    });
    const refs = await counter.analyze();
    return {
      variables: Object.fromEntries(refs.variables.entries()),
      localVariables: Object.fromEntries(refs.templateLocals.entries()),
      globalVariables: Object.fromEntries(refs.templateGlobals.entries()),
      failedVisits: Object.fromEntries(refs.failedVisits.entries()),
      unloadablePartials: Object.fromEntries(refs.unloadablePartials.entries()),
    };
  }

  /**
   * A synchronous version of `analyze`
   * @see {@link analyze}
   * @param options - Template analysis options.
   */
  public analyzeSync({
    followPartials,
    raiseForFailures,
  }: TemplateAnalysisOptions = {}): TemplateAnalysis {
    const counter = new TemplateVariableCounter(this, {
      followPartials,
      raiseForFailures,
    });
    const refs = counter.analyzeSync();
    return {
      variables: Object.fromEntries(refs.variables.entries()),
      localVariables: Object.fromEntries(refs.templateLocals.entries()),
      globalVariables: Object.fromEntries(refs.templateGlobals.entries()),
      failedVisits: Object.fromEntries(refs.failedVisits.entries()),
      unloadablePartials: Object.fromEntries(refs.unloadablePartials.entries()),
    };
  }
}
