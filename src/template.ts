import { ChildNode, Node, Root, throwForDisabledTag } from "./ast";
import { LiteralNode } from "./builtin/tags/literal";
import {
  chainObjects,
  chainPop,
  chainPush,
  Missing,
  ObjectChain,
} from "./chain_object";
import { DefaultMap } from "./collections";
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
  TemplateTraversalError,
} from "./errors";
import { Expression, Identifier, Literal, StringLiteral } from "./expression";
import { RenderStream } from "./io/output_stream";
import { ContextScope } from "./types";

/**
 * Options passed to `Template.analyze` and `Template.analyzeSync`.
 */
export type TemplateAnalysisOptions = {
  /**
   * If `true`, we will try to load partial templates and analyze those
   * templates too.
   * @defaultValue `true`.
   */
  followPartials?: boolean;

  /**
   * If `true`, we will throw an error if an `ast.Node` or `expression.Expression`
   * does not define a `children()` method, or if a partial template can not be loaded.
   * When `false`, no error is thrown and an mapping of failed nodes and expressions
   * is available as the `failedVisits` property of the resulting `TemplateAnalysis`
   * object.
   */
  raiseForFailures?: boolean;
};

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

/**
 * The location of a template variable, as found during static template
 * analysis.
 *
 * A column number might be added later.
 */
export type VariableLocation = { templateName: string; lineNumber: number };

/**
 * An array of template variable locations.
 */
export type VariableLocations = VariableLocation[];

/**
 * A mapping of template variable names to their locations.
 */
export type VariableRefs = { [index: string]: VariableLocations };

/**
 * The result of statically analyzing a template's variables.
 *
 * Each of the following properties is an object mapping template variable names
 * to an array of objects. Each object includes the template name and line number
 * of the associated variable. If a name is referenced multiple times, it will
 * appear multiple times in the array. If a name is referenced before it is
 * "assigned", it will appear in `localVariables` and `globalVariables`.
 */
export type TemplateAnalysis = {
  /**
   * All referenced variables, whether they are in scope or not. Including
   * references to names such as `forloop` from the `for` tag.
   */
  variables: VariableRefs;

  /**
   * Template variables that are added to the template local scope, whether
   * they are subsequently used or not.
   */
  localVariables: VariableRefs;

  /**
   * Template variables that, on the given line number and "file", are out of
   * scope or are assumed to be "global". That is, expected to be included by
   * the application developer rather than a template author.
   */
  globalVariables: VariableRefs;

  /**
   * Names and locations of AST `Node` and `Expression` objects that could not
   * be visited, probably because they do not implement a `children` method.
   */
  failedVisits: VariableRefs;

  /**
   * Names/identifiers and locations of partial templates that could not be
   * loaded. This will be empty if `followPartials` is `false`.
   */
  unloadablePartials: VariableRefs;
};

/**
 *
 */
export type RefMap = DefaultMap<string, VariableLocations>;

type PartialTemplateContext = {
  templateName: string;
  loadContext: ContextScope;
};

type TemplateVariableCounterOptions = {
  followPartials?: boolean;
  raiseForFailures?: boolean;
  scope?: ObjectChain;
  templateLocals?: RefMap;
  partials?: Set<string>;
};

class TemplateVariableCounter {
  readonly templateName: string;
  readonly followPartials: boolean;
  readonly raiseForFailures: boolean;
  readonly scope: ObjectChain;
  readonly partials: Set<string>;
  readonly templateLocals: RefMap;
  readonly templateGlobals: RefMap;
  readonly variables: RefMap;
  readonly failedVisits: RefMap;
  readonly unloadablePartials: RefMap;

  protected static RE_SPLIT_IDENT = /(\.|\[)/;

  constructor(
    private template: Template,
    {
      followPartials,
      raiseForFailures,
      scope,
      templateLocals,
      partials,
    }: TemplateVariableCounterOptions,
  ) {
    this.templateName = this.template.name;
    this.followPartials = followPartials ?? true;
    this.raiseForFailures = raiseForFailures ?? true;
    this.scope = scope ?? chainObjects();
    this.partials = partials ?? new Set();

    this.templateLocals =
      templateLocals ?? new DefaultMap<string, VariableLocations>(Array);

    this.templateGlobals = new DefaultMap<string, VariableLocations>(Array);
    this.variables = new DefaultMap<string, VariableLocations>(Array);
    this.failedVisits = new DefaultMap<string, VariableLocations>(Array);
    this.unloadablePartials = new DefaultMap<string, VariableLocations>(Array);
  }

  public async analyze(): Promise<TemplateVariableCounter> {
    for (const node of this.template.tree.nodes) {
      await this._analyze(node);
    }
    this._raiseForFailures();
    return this;
  }

  public analyzeSync(): TemplateVariableCounter {
    for (const node of this.template.tree.nodes) {
      this._analyzeSync(node);
    }
    this._raiseForFailures();
    return this;
  }

  private async _analyze(root: Node): Promise<void> {
    if (root.children === undefined) {
      // This node does not define a children method.
      const name = root.constructor.name;
      this.failedVisits.get(name).push({
        templateName: this.templateName,
        lineNumber: root.token.lineNumber(),
      });
      return;
    }

    for (const child of root.children()) {
      this._analyzeChild(child);

      if (child.blockScope) {
        this.scope[chainPush](
          Object.fromEntries(child.blockScope.map((val) => [val, undefined])),
        );
      }

      if (this.followPartials) {
        switch (child.loadMode) {
          case "include":
            await this._analyzeInclude(child);
            break;
          case "render":
            await this._analyzeRender(child);
            break;
          case undefined:
            break;
          default:
            throw new TemplateTraversalError(
              `unknown load mode '${child.loadMode}'`,
            );
        }
      }

      // Recurse
      if (child.node) {
        await this._analyze(child.node);
      }

      if (child.blockScope) {
        this.scope[chainPop]();
      }
    }
  }

  private _analyzeSync(root: Node): void {
    if (root.children === undefined) {
      // This node does not define a children method.
      const name = root.constructor.name;
      this.failedVisits.get(name).push({
        templateName: this.templateName,
        lineNumber: root.token.lineNumber(),
      });
      return;
    }

    for (const child of root.children()) {
      this._analyzeChild(child);

      if (child.blockScope) {
        this.scope[chainPush](
          Object.fromEntries(child.blockScope.map((val) => [val, undefined])),
        );
      }

      if (this.followPartials) {
        switch (child.loadMode) {
          case "include":
            this._analyzeIncludeSync(child);
            break;
          case "render":
            this._analyzeRenderSync(child);
            break;
          case undefined:
            break;
          default:
            throw new TemplateTraversalError(
              `unknown load mode '${child.loadMode}'`,
            );
        }
      }

      // Recurse
      if (child.node) {
        this._analyzeSync(child.node);
      }

      if (child.blockScope) {
        this.scope[chainPop]();
      }
    }
  }

  private _analyzeChild(child: ChildNode): void {
    if (child.expression) {
      if (!child.expression.children) {
        // This expression does not define a children method.
        const name = child.expression.constructor.name;
        this.failedVisits.get(name).push({
          templateName: this.templateName,
          lineNumber: child.token.lineNumber(),
        });
        return;
      }

      const refs = this._analyzeExpression(child.expression);
      for (const ref of refs) {
        this.variables.get(ref).push({
          templateName: this.templateName,
          lineNumber: child.token.lineNumber(),
        });
      }

      // Check refs that are not in scope or in the local namespace before
      // pushing the next block scope. This should highlight names that are
      // expected to be "global"
      for (const ref of refs) {
        const _ref = ref.split(TemplateVariableCounter.RE_SPLIT_IDENT, 1)[0];
        if (this.scope[_ref] === Missing && !this.templateLocals.has(_ref)) {
          this.templateGlobals.get(ref).push({
            templateName: this.templateName,
            lineNumber: child.token.lineNumber(),
          });
        }
      }
    }

    if (child.templateScope) {
      for (const name of child.templateScope) {
        this.templateLocals.get(name).push({
          templateName: this.templateName,
          lineNumber: child.token.lineNumber(),
        });
      }
    }
  }

  private _analyzeExpression(expression: Expression): string[] {
    const refs: string[] = [];

    if (expression instanceof Identifier) {
      refs.push(expression.toString());
    }

    if (expression.children) {
      for (const expr of expression.children()) {
        for (const child of this._analyzeExpression(expr)) {
          refs.push(child);
        }
      }
    }

    return refs;
  }

  private async _analyzeInclude(child: ChildNode): Promise<void> {
    const { templateName, loadContext } = this._includeContext(child);
    if (templateName === undefined || loadContext === undefined) {
      return;
    }

    try {
      const template = await this.template.environment.getTemplate(
        templateName,
        undefined,
        undefined,
        loadContext,
      );

      const refs = new TemplateVariableCounter(template, {
        followPartials: this.followPartials,
        scope: this.scope,
        templateLocals: this.templateLocals,
        partials: this.partials,
      });

      await refs.analyze();

      this._updateReferenceCounters(refs);
    } catch (TemplateNotFoundError) {
      this.unloadablePartials.get(templateName).push({
        templateName: this.templateName,
        lineNumber: child.token.lineNumber(),
      });
    }
  }

  private _analyzeIncludeSync(child: ChildNode): void {
    const { templateName, loadContext } = this._includeContext(child);
    if (templateName === undefined || loadContext === undefined) {
      return;
    }

    try {
      const template = this.template.environment.getTemplateSync(
        templateName,
        undefined,
        undefined,
        loadContext,
      );

      const refs = new TemplateVariableCounter(template, {
        followPartials: this.followPartials,
        scope: this.scope,
        templateLocals: this.templateLocals,
        partials: this.partials,
      });

      refs.analyzeSync();

      this._updateReferenceCounters(refs);
    } catch (TemplateNotFoundError) {
      this.unloadablePartials.get(templateName).push({
        templateName: this.templateName,
        lineNumber: child.token.lineNumber(),
      });
    }
  }

  private _includeContext(child: ChildNode): Partial<PartialTemplateContext> {
    if (child.expression === undefined) {
      return {};
    }

    // Partial templates rendered in "include" mode might use a variable template
    // name. We can't statically analyze a partial template unless it's name is a
    // literal string (or possibly an integer, but unlikely).
    if (!(child.expression instanceof Literal)) {
      this.unloadablePartials.get(child.expression.toString()).push({
        templateName: this.templateName,
        lineNumber: child.token.lineNumber(),
      });
      return {};
    }

    const context: PartialTemplateContext = {
      templateName: child.expression.value.toString(),
      loadContext: child.loadContext ?? {},
    };
    const contextKey = JSON.stringify(context);

    // Keep track of partial templates that have already been analyzed. This prevents
    // us from analyzing the same template twice and protects us against recursive
    // includes/renders.
    if (this.partials.has(contextKey)) {
      return {};
    }

    this.partials.add(contextKey);
    return context;
  }

  private async _analyzeRender(child: ChildNode): Promise<void> {
    const { templateName, loadContext } = this._renderContext(child);
    if (templateName === undefined || loadContext === undefined) {
      return;
    }

    try {
      const template = await this.template.environment.getTemplate(
        templateName,
        undefined,
        undefined,
        loadContext,
      );

      // Partial templates rendered in "render" mode do not share the parent template
      // local namespace. We do not pass the current block scope stack to "rendered"
      // templates either.
      const scope = chainObjects();
      if (child.blockScope) {
        scope[chainPush](
          Object.fromEntries(child.blockScope.map((val) => [val, undefined])),
        );
      }

      const refs = new TemplateVariableCounter(template, {
        followPartials: this.followPartials,
        scope,
        partials: this.partials,
      });

      this._updateReferenceCounters(await refs.analyze());
    } catch (TemplateNotFoundError) {
      this.unloadablePartials.get(templateName).push({
        templateName: this.templateName,
        lineNumber: child.token.lineNumber(),
      });
    }
  }

  private _analyzeRenderSync(child: ChildNode): void {
    const { templateName, loadContext } = this._renderContext(child);
    if (templateName === undefined || loadContext === undefined) {
      return;
    }

    try {
      const template = this.template.environment.getTemplateSync(
        templateName,
        undefined,
        undefined,
        loadContext,
      );

      // Partial templates rendered in "render" mode do not share the parent template
      // local namespace. We do not pass the current block scope stack to "rendered"
      // templates either.
      const scope = chainObjects();
      if (child.blockScope) {
        scope[chainPush](
          Object.fromEntries(child.blockScope.map((val) => [val, undefined])),
        );
      }

      const refs = new TemplateVariableCounter(template, {
        followPartials: this.followPartials,
        scope,
        partials: this.partials,
      });

      this._updateReferenceCounters(refs.analyzeSync());
    } catch (TemplateNotFoundError) {
      this.unloadablePartials.get(templateName).push({
        templateName: this.templateName,
        lineNumber: child.token.lineNumber(),
      });
    }
  }

  private _renderContext(child: ChildNode): Partial<PartialTemplateContext> {
    if (child.expression === undefined) {
      return {};
    }

    if (!(child.expression instanceof StringLiteral)) {
      this.unloadablePartials.get(child.expression.toString()).push({
        templateName: this.templateName,
        lineNumber: child.token.lineNumber(),
      });
      return {};
    }

    const context: PartialTemplateContext = {
      templateName: child.expression.value.toString(),
      loadContext: child.loadContext ?? {},
    };
    const contextKey = JSON.stringify(context);

    // Keep track of partial templates that have already been analyzed. This prevents
    // us from analyzing the same template twice and protects us against recursive
    // includes/renders.
    if (this.partials.has(contextKey)) {
      return {};
    }

    this.partials.add(contextKey);
    return context;
  }

  private _updateReferenceCounters(refs: TemplateVariableCounter): void {
    for (const [_name, _refs] of refs.variables.entries()) {
      for (const location of _refs) {
        this.variables.get(_name).push(location);
      }
    }

    for (const [_name, _refs] of refs.templateGlobals.entries()) {
      for (const location of _refs) {
        this.templateGlobals.get(_name).push(location);
      }
    }

    for (const [_name, _refs] of refs.failedVisits.entries()) {
      for (const location of _refs) {
        this.failedVisits.get(_name).push(location);
      }
    }

    for (const [_name, _refs] of refs.unloadablePartials.entries()) {
      for (const location of _refs) {
        this.unloadablePartials.get(_name).push(location);
      }
    }
  }

  private _raiseForFailures(): void {
    if (this.raiseForFailures && this.failedVisits.size) {
      const msgTarget = this.failedVisits.entries().next().value[0];
      let msg: string;
      if (this.failedVisits.size > 1) {
        msg =
          `${msgTarget} (+${this.failedVisits.size - 1} more) ` +
          "does not implement a 'children' method";
      } else {
        msg = `${msgTarget} does not implement a 'children' method`;
      }
      throw new TemplateTraversalError(`failed visit: ${msg}`);
    }

    if (this.raiseForFailures && this.unloadablePartials.size) {
      const msgTarget = this.unloadablePartials.entries().next().value[0];
      let msg: string;
      if (this.unloadablePartials.size > 1) {
        msg =
          `partial template ${msgTarget} ` +
          `(+${this.unloadablePartials.size - 1} more) ` +
          "could not be loaded";
      } else {
        msg = `partial template ${msgTarget} could not be loaded`;
      }
      throw new TemplateTraversalError(`failed visit: ${msg}`);
    }
  }
}
