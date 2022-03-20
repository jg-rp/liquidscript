import { Node, Root } from "./ast";
import { LiteralNode } from "./builtin/tags/literal";
import { chainObjects } from "./chainObject";
import { ContextScope, RenderContext } from "./context";
import { Environment, EnvironmentOptions } from "./environment";
import {
  InternalLiquidError,
  LiquidError,
  LiquidInterrupt,
  LiquidSyntaxError,
} from "./errors";
import { BufferedRenderStream, RenderStream } from "./io/output_stream";

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
  readonly isUpToDate: () => Promise<boolean>;
  readonly isUpToDateSync: () => boolean;
  protected renderContextClass = RenderContext;

  /**
   * Parse a Liquid template, automatically creating an environment to
   * bind it to.
   *
   * @param source - The Liquid template source code.
   * @param options - Options to set on the implicit environment.
   * @returns A new template, bound to an implicit environment.
   */
  static fromString(
    source: string,
    options: EnvironmentOptions = {}
  ): Template {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { globals, loader, ...opts } = options;
    return Environment.getImplicitEnvironment(opts).fromString(
      source,
      "<string>",
      globals
    );
  }

  // TODO: static fromStream

  /**
   * Parse a Liquid template, automatically creating an environment to
   * bind it to.
   *
   * Alias of {@link fromString}
   *
   * @param source - The Liquid template source code.
   * @param options - Options to set on the implicit environment.
   * @returns A new template, bound to an implicit environment.
   */
  static from(source: string, options: EnvironmentOptions = {}): Template {
    return Template.fromString(source, options);
  }

  /**
   * Template constructor.Rather than constructing a template directly, you
   * should use `Template.fromString()`, `Environment.fromString()` or
   * `Environment.getTemplate()`.
   *
   * @param environment - The environment this template is bound to.
   * @param tree - The root of the abstract syntax tree representing this
   * template.
   * @param name - A name or identifier for this template.
   * @param globals - An optional object who's properties will be added
   * to the render context every time this template is rendered.
   * @param matter - Extra globals, usually added by a template loader.
   * @param upToDate - A function that will return `true` if this template is
   * up to date, or `false` if it needs to loaded again.
   * @param upToDateSync - A synchronous version of `upToDate`.
   */
  constructor(
    environment: Environment,
    tree: Root,
    name: string,
    globals?: ContextScope,
    matter?: ContextScope,
    upToDate?: () => Promise<boolean>,
    upToDateSync?: () => boolean
  ) {
    this.environment = environment;
    this.tree = tree;
    this.name = name;
    this.globals = globals === undefined ? {} : globals;
    this.matter = matter === undefined ? {} : matter;
    this.isUpToDate = upToDate ?? (async () => true);
    this.isUpToDateSync = upToDateSync ?? (() => true);
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
      { templateName: this.name }
    );
    const outputStream = new BufferedRenderStream();
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
      { templateName: this.name }
    );
    const outputStream = new BufferedRenderStream();
    this.renderWithContextSync(context, outputStream);
    return outputStream.toString();
  }

  // TODO: createReadStream

  protected handleError(
    error: unknown,
    node: Node,
    blockScope: boolean,
    partial: boolean
  ): void {
    if (error instanceof LiquidInterrupt) {
      if (!partial || blockScope) {
        this.environment.error(
          new LiquidSyntaxError(`unexpected ${error}`, node.token)
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
    partial: boolean = false
  ): Promise<void> {
    for (const node of this.tree.nodes) {
      try {
        if (node instanceof LiteralNode) {
          node.renderSync(context, outputStream);
        } else {
          await node.render(context, outputStream);
        }
      } catch (error) {
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
    partial: boolean = false
  ): void {
    for (const node of this.tree.nodes) {
      try {
        node.renderSync(context, outputStream);
      } catch (error) {
        this.handleError(error, node, blockScope, partial);
      }
    }
  }

  /**
   * Copy this template with new globals.
   * @param globals - An optional object who's properties will be added
   * to the render context every time this template is rendered.
   * @returns A this template with new globals.
   */
  public withGlobals(globals?: ContextScope) {
    return new Template(
      this.environment,
      this.tree,
      this.name,
      globals,
      this.matter,
      this.isUpToDate,
      this.isUpToDateSync
    );
  }

  /**
   * Override this to change global template scope priorities.
   */
  protected makeGlobals(templateGlobals: ContextScope): ContextScope {
    return chainObjects(templateGlobals, this.matter, this.globals);
  }
}
