import { BlockNode, ChildNode, Node, Root } from "./ast";
import {
  chainObjects,
  chainPop,
  chainPush,
  Missing,
  ObjectChain,
} from "./chain_object";
import { DefaultMap } from "./collections";
import {
  InternalSyntaxError,
  TemplateNotFoundError,
  StopRender,
  TemplateInheritanceError,
  TemplateTraversalError,
} from "./errors";
import {
  Expression,
  FilteredExpression,
  Identifier,
  Literal,
  StringLiteral,
} from "./expression";
import { ContextScope, liquidStringify } from "./types";
import { Template } from "./template";
import { RenderContext, EXTENDS_REGISTER } from "./context";
import {
  BlockStackItem,
  StackedBlocks,
  stackBlocks,
  BlockNode as InheritanceBlockNode,
} from "./extra/tags/extends";
import { TOKEN_TAG } from "./token";

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
 * A mapping of template, tag or filter names to their locations.
 */
export type RefMap = DefaultMap<string, VariableLocations>;

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

  /**
   * Filters found during static analysis.
   */
  filters: VariableRefs;

  /**
   * Tags found during static analysis.
   */
  tags: VariableRefs;
};

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

type ExpressionRefs = {
  variables: string[];
  filters: string[];
};

export class TemplateVariableCounter {
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
  readonly emptyContext: RenderContext;
  readonly filters: RefMap;
  readonly tags: RefMap;

  protected static RE_SPLIT_IDENT = /(\.|\[)/;

  constructor(
    protected template: Template,
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
    this.emptyContext = new RenderContext(this.template.environment);

    this.templateLocals =
      templateLocals ?? new DefaultMap<string, VariableLocations>(Array);

    this.templateGlobals = new DefaultMap<string, VariableLocations>(Array);
    this.variables = new DefaultMap<string, VariableLocations>(Array);
    this.failedVisits = new DefaultMap<string, VariableLocations>(Array);
    this.unloadablePartials = new DefaultMap<string, VariableLocations>(Array);
    this.filters = new DefaultMap<string, VariableLocations>(Array);
    this.tags = new DefaultMap<string, VariableLocations>(Array);
  }

  public async analyze(): Promise<TemplateVariableCounter> {
    for (const node of this.template.tree.nodes) {
      try {
        await this._analyze(node);
      } catch (error) {
        if (error instanceof StopRender) {
          break;
        }
        throw error;
      }
    }
    this._raiseForFailures();
    return this;
  }

  public analyzeSync(): TemplateVariableCounter {
    for (const node of this.template.tree.nodes) {
      try {
        this._analyzeSync(node);
      } catch (error) {
        if (error instanceof StopRender) {
          break;
        }
        throw error;
      }
    }
    this._raiseForFailures();
    return this;
  }

  protected async _analyze(root: Node): Promise<void> {
    this.countTag(root);
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
      this._analyzeExpression(child);
      await this._expressionHook(child);
      this._updateTemplateScope(child);

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
          case "extends":
            await this._analyzeTemplateInheritanceChain(child, this.template);
            throw new StopRender("stop static analysis");
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

  protected _analyzeSync(root: Node): void {
    this.countTag(root);
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
      this._analyzeExpression(child);
      this._expressionHookSync(child);
      this._updateTemplateScope(child);

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
          case "extends":
            this._analyzeTemplateInheritanceChainSync(child, this.template);
            throw new StopRender("stop static analysis");
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

  private _analyzeExpression(child: ChildNode): void {
    if (!child.expression) return;
    if (!child.expression.children) {
      // This expression does not define a children method.
      const name = child.expression.constructor.name;
      this.failedVisits.get(name).push({
        templateName: this.templateName,
        lineNumber: child.token.lineNumber(),
      });
    }

    const refs = this._updateExpressionRefs(child.expression);

    for (const ref of refs.variables) {
      this.variables.get(ref).push({
        templateName: this.templateName,
        lineNumber: child.token.lineNumber(),
      });
    }

    // Check refs that are not in scope or in the local namespace before
    // pushing the next block scope. This should highlight names that are
    // expected to be "global"
    for (const ref of refs.variables) {
      const _ref = ref.split(TemplateVariableCounter.RE_SPLIT_IDENT, 1)[0];
      if (this.scope[_ref] === Missing && !this.templateLocals.has(_ref)) {
        this.templateGlobals.get(ref).push({
          templateName: this.templateName,
          lineNumber: child.token.lineNumber(),
        });
      }
    }

    for (const ref of refs.filters) {
      this.filters.get(ref).push({
        templateName: this.templateName,
        lineNumber: child.token.lineNumber(),
      });
    }
  }

  private _updateTemplateScope(child: ChildNode): void {
    if (child.templateScope) {
      for (const name of child.templateScope) {
        this.templateLocals.get(name).push({
          templateName: this.templateName,
          lineNumber: child.token.lineNumber(),
        });
      }
    }
  }

  private _updateExpressionRefs(expression: Expression): ExpressionRefs {
    const refs: ExpressionRefs = { variables: [], filters: [] };

    if (expression instanceof Identifier) {
      refs.variables.push(expression.toString());
    } else if (expression instanceof FilteredExpression) {
      refs.filters.push(...expression.filters.map((f) => f.name));
    }

    if (expression.children) {
      for (const expr of expression.children()) {
        for (const child of this._updateExpressionRefs(expr).variables) {
          refs.variables.push(child);
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

    let template: Template;

    try {
      template = await this._getTemplate(
        templateName,
        loadContext,
        this.templateName,
        child,
      );
    } catch (error) {
      if (error instanceof TemplateNotFoundError) return;
      throw error;
    }

    const refs = await new TemplateVariableCounter(template, {
      followPartials: this.followPartials,
      scope: this.scope,
      templateLocals: this.templateLocals,
      partials: this.partials,
    }).analyze();

    this._updateReferenceCounters(refs);
  }

  private _analyzeIncludeSync(child: ChildNode): void {
    const { templateName, loadContext } = this._includeContext(child);
    if (templateName === undefined || loadContext === undefined) {
      return;
    }

    let template: Template;

    try {
      template = this._getTemplateSync(
        templateName,
        loadContext,
        this.templateName,
        child,
      );
    } catch (error) {
      if (error instanceof TemplateNotFoundError) return;
      throw error;
    }

    const refs = new TemplateVariableCounter(template, {
      followPartials: this.followPartials,
      scope: this.scope,
      templateLocals: this.templateLocals,
      partials: this.partials,
    }).analyzeSync();

    this._updateReferenceCounters(refs);
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

    let template: Template;

    try {
      template = await this._getTemplate(
        templateName,
        loadContext,
        this.templateName,
        child,
      );
    } catch (error) {
      if (error instanceof TemplateNotFoundError) return;
      throw error;
    }

    // Partial templates rendered in "render" mode do not share the parent template
    // local namespace. We do not pass the current block scope stack to "rendered"
    // templates either.
    const scope = chainObjects();
    if (child.blockScope) {
      scope[chainPush](
        Object.fromEntries(child.blockScope.map((val) => [val, undefined])),
      );
    }

    const refs = await new TemplateVariableCounter(template, {
      followPartials: this.followPartials,
      scope,
      partials: this.partials,
    }).analyze();

    this._updateReferenceCounters(refs);
  }

  private _analyzeRenderSync(child: ChildNode): void {
    const { templateName, loadContext } = this._renderContext(child);
    if (templateName === undefined || loadContext === undefined) {
      return;
    }

    let template: Template;

    try {
      template = this._getTemplateSync(
        templateName,
        loadContext,
        this.templateName,
        child,
      );
    } catch (error) {
      if (error instanceof TemplateNotFoundError) return;
      throw error;
    }

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
    }).analyzeSync();

    this._updateReferenceCounters(refs);
  }

  private async _analyzeTemplateInheritanceChain(
    node: ChildNode,
    template: Template,
  ): Promise<void> {
    const { templateName, loadContext } = this._renderContext(node);
    if (templateName === undefined || loadContext === undefined) {
      return;
    }

    const stackContext = this.emptyContext.copy({}, [], false, false, template);
    stackContext.registers.set(
      EXTENDS_REGISTER,
      new DefaultMap<string, BlockStackItem[]>(Array),
    );

    // Guard against recursive `extends`.
    const seen = new Set<string>();

    // Add blocks from the leaf template tot he stack context.
    let stacked = this._stackBlocks(stackContext, template, false);
    if (stacked.extendsNode === undefined) {
      throw new InternalSyntaxError(`expected an 'extends' node`);
    }

    seen.add(liquidStringify(stacked.extendsNode.name));
    let parent: Template | undefined;

    try {
      parent = await this._getTemplate(
        templateName,
        loadContext,
        this.templateName,
        node,
      );
    } catch (error) {
      if (error instanceof TemplateNotFoundError) return;
      throw error;
    }

    stacked = this._stackBlocks(stackContext, parent);
    let parentTemplateName: string | undefined = this._extend(stacked, seen);

    while (parentTemplateName) {
      try {
        parent = await this._getTemplate(
          parentTemplateName,
          loadContext,
          this.templateName,
          node,
        );
      } catch (error) {
        if (error instanceof TemplateNotFoundError) return;
        throw error;
      }
      stacked = this._stackBlocks(stackContext, parent);
      parentTemplateName = this._extend(stacked, seen);
    }

    const refs = await new InheritanceChainCounter(
      parent,
      stackContext,
      undefined,
      {
        followPartials: this.followPartials,
        scope: chainObjects({ block: undefined }, this.scope),
        templateLocals: this.templateLocals,
        raiseForFailures: this.raiseForFailures,
        partials: this.partials,
      },
    ).analyze();

    this._updateReferenceCounters(refs);
  }

  private _analyzeTemplateInheritanceChainSync(
    node: ChildNode,
    template: Template,
  ): void {
    const { templateName, loadContext } = this._renderContext(node);
    if (templateName === undefined || loadContext === undefined) {
      return;
    }

    const stackContext = this.emptyContext.copy({}, [], false, false, template);
    stackContext.registers.set(
      EXTENDS_REGISTER,
      new DefaultMap<string, BlockStackItem[]>(Array),
    );

    // Guard against recursive `extends`.
    const seen = new Set<string>();

    // Add blocks from the leaf template tot he stack context.
    let stacked = this._stackBlocks(stackContext, template, false);
    if (stacked.extendsNode === undefined) {
      throw new InternalSyntaxError(`expected an 'extends' node`);
    }

    seen.add(liquidStringify(stacked.extendsNode.name));
    let parent: Template;

    try {
      parent = this._getTemplateSync(
        templateName,
        loadContext,
        this.templateName,
        node,
      );
    } catch (error) {
      if (error instanceof TemplateNotFoundError) return;
      throw error;
    }

    stacked = this._stackBlocks(stackContext, parent);
    let parentTemplateName: string | undefined = this._extend(stacked, seen);

    while (parentTemplateName) {
      try {
        parent = this._getTemplateSync(
          parentTemplateName,
          loadContext,
          this.templateName,
          node,
        );
      } catch (error) {
        if (error instanceof TemplateNotFoundError) return;
        throw error;
      }
      stacked = this._stackBlocks(stackContext, parent);
      parentTemplateName = this._extend(stacked, seen);
    }

    const refs = new InheritanceChainCounter(parent, stackContext, undefined, {
      followPartials: this.followPartials,
      scope: chainObjects({ block: undefined }, this.scope),
      templateLocals: this.templateLocals,
      raiseForFailures: this.raiseForFailures,
      partials: this.partials,
    }).analyzeSync();

    this._updateReferenceCounters(refs);
  }

  private _extend(
    _stacked: StackedBlocks,
    seen: Set<string>,
  ): string | undefined {
    if (_stacked.extendsNode !== undefined) {
      const _parentTemplateName = liquidStringify(_stacked.extendsNode.name);
      if (seen.has(_parentTemplateName)) {
        throw new TemplateInheritanceError(
          `circular extends '${_parentTemplateName}'`,
          _stacked.extendsNode.token,
        );
      }
      seen.add(_parentTemplateName);
      return _parentTemplateName;
    }
    return undefined;
  }

  private _stackBlocks(
    stackContext: RenderContext,
    template: Template,
    countTags: boolean = true,
  ): StackedBlocks {
    const stacked = stackBlocks(stackContext, template);
    if (countTags && stacked.extendsNode) {
      const token = stacked.extendsNode.token;
      this.tags
        .get(token.value)
        .push({ templateName: template.name, lineNumber: token.lineNumber() });
    }

    for (const node of stacked.blockNodes) {
      const token = node.token;
      this.tags
        .get(token.value)
        .push({ templateName: template.name, lineNumber: token.lineNumber() });
    }

    return stacked;
  }

  private async _getTemplate(
    name: string,
    loaderContext: { [index: string]: unknown },
    parentName: string,
    parentNode: ChildNode,
  ): Promise<Template> {
    try {
      return await this.emptyContext.getTemplate(name, loaderContext);
    } catch (error) {
      if (error instanceof TemplateNotFoundError) {
        this.unloadablePartials.get(name).push({
          templateName: parentName,
          lineNumber: parentNode.token.lineNumber(),
        });
      }
      throw error;
    }
  }

  private _getTemplateSync(
    name: string,
    loaderContext: { [index: string]: unknown },
    parentName: string,
    parentNode: ChildNode,
  ): Template {
    try {
      return this.emptyContext.getTemplateSync(name, loaderContext);
    } catch (error) {
      if (error instanceof TemplateNotFoundError) {
        this.unloadablePartials.get(name).push({
          templateName: parentName,
          lineNumber: parentNode.token.lineNumber(),
        });
      }
      throw error;
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

  protected countTag(node: Node): void {
    if (!(node instanceof BlockNode) && node.token.kind === TOKEN_TAG) {
      this.tags.get(node.token.value).push({
        templateName: this.templateName,
        lineNumber: node.token.lineNumber(),
      });
    }
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  protected _updateReferenceCounters(refs: TemplateVariableCounter): void {
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

    for (const [_name, _refs] of refs.filters.entries()) {
      for (const location of _refs) {
        this.filters.get(_name).push(location);
      }
    }

    for (const [_name, _refs] of refs.tags.entries()) {
      for (const location of _refs) {
        this.tags.get(_name).push(location);
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected async _expressionHook(child: ChildNode): Promise<void> {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _expressionHookSync(child: ChildNode): void {}
}

class InheritanceChainCounter extends TemplateVariableCounter {
  constructor(
    readonly baseTemplate: Template,
    readonly stackContext: RenderContext,
    readonly parentBlockStackItem: BlockStackItem | undefined,
    {
      followPartials,
      raiseForFailures,
      scope,
      templateLocals,
      partials,
    }: TemplateVariableCounterOptions,
  ) {
    super(baseTemplate, {
      followPartials,
      raiseForFailures,
      scope,
      templateLocals,
      partials,
    });
  }

  protected async _analyze(root: Node): Promise<void> {
    if (root instanceof InheritanceBlockNode) {
      return await this._analyzeBlock(root);
    }
    return await super._analyze(root);
  }

  protected _analyzeSync(root: Node): void {
    if (root instanceof InheritanceBlockNode) {
      return this._analyzeBlockSync(root);
    }
    return super._analyzeSync(root);
  }

  protected async _expressionHook(child: ChildNode): Promise<void> {
    if (
      !child.expression ||
      !this.parentBlockStackItem ||
      !this._containsSuper(child.expression)
    )
      return;

    const template = this._makeTemplate(this.parentBlockStackItem);
    const scope = Object.fromEntries(
      Array.from(this.templateLocals.keys()).map((s) => [
        s.split(InheritanceChainCounter.RE_SPLIT_IDENT, 1)[0],
        undefined,
      ]),
    );

    const refs = await new InheritanceChainCounter(
      template,
      this.stackContext,
      undefined,
      {
        followPartials: this.followPartials,
        scope: chainObjects({ block: undefined }, this.scope, scope),
        raiseForFailures: this.raiseForFailures,
        partials: this.partials,
      },
    ).analyze();

    this._updateReferenceCounters(refs);
  }

  protected _expressionHookSync(child: ChildNode): void {
    if (
      !child.expression ||
      !this.parentBlockStackItem ||
      !this._containsSuper(child.expression)
    )
      return;

    const template = this._makeTemplate(this.parentBlockStackItem);
    const scope = Object.fromEntries(
      Array.from(this.templateLocals.keys()).map((s) => [
        s.split(InheritanceChainCounter.RE_SPLIT_IDENT, 1)[0],
        undefined,
      ]),
    );

    const refs = new InheritanceChainCounter(
      template,
      this.stackContext,
      undefined,
      {
        followPartials: this.followPartials,
        scope: chainObjects({ block: undefined }, this.scope, scope),
        raiseForFailures: this.raiseForFailures,
        partials: this.partials,
      },
    ).analyzeSync();

    this._updateReferenceCounters(refs);
  }

  private _containsSuper(expression: Expression): boolean {
    if (
      expression instanceof Identifier &&
      expression.toString() === "block.super"
    )
      return true;

    if (
      expression instanceof FilteredExpression &&
      expression.expression instanceof Identifier &&
      expression.expression.toString() === "block.super"
    )
      return true;

    if (expression.children) {
      for (const expr of expression.children()) {
        if (this._containsSuper(expr)) return true;
      }
    }

    return false;
  }

  private async _analyzeBlock(block: InheritanceBlockNode): Promise<void> {
    const blockStacks = this.stackContext.getRegister(EXTENDS_REGISTER) as Map<
      string,
      BlockStackItem[]
    >;

    const _blockStackItems = blockStacks.get(block.name);
    if (!_blockStackItems) return;
    const blockStackItem = _blockStackItems[0];
    const template = this._makeTemplate(blockStackItem);
    const scope = Object.fromEntries(
      Array.from(this.templateLocals.keys()).map((s) => [
        s.split(InheritanceChainCounter.RE_SPLIT_IDENT, 1)[0],
        undefined,
      ]),
    );

    const refs = await new InheritanceChainCounter(
      template,
      this.stackContext,
      blockStackItem.parent,
      {
        followPartials: this.followPartials,
        scope: chainObjects({ block: undefined }, this.scope, scope),
        raiseForFailures: this.raiseForFailures,
        partials: this.partials,
      },
    ).analyze();

    this._updateReferenceCounters(refs);
  }

  private _analyzeBlockSync(block: InheritanceBlockNode): void {
    const blockStacks = this.stackContext.getRegister(EXTENDS_REGISTER) as Map<
      string,
      BlockStackItem[]
    >;

    const _blockStackItems = blockStacks.get(block.name);
    if (!_blockStackItems) return;
    const blockStackItem = _blockStackItems[0];
    const template = this._makeTemplate(blockStackItem);
    const scope = Object.fromEntries(
      Array.from(this.templateLocals.keys()).map((s) => [
        s.split(InheritanceChainCounter.RE_SPLIT_IDENT, 1)[0],
        undefined,
      ]),
    );

    const refs = new InheritanceChainCounter(
      template,
      this.stackContext,
      blockStackItem.parent,
      {
        followPartials: this.followPartials,
        scope: chainObjects({ block: undefined }, this.scope, scope),
        raiseForFailures: this.raiseForFailures,
        partials: this.partials,
      },
    ).analyzeSync();

    this._updateReferenceCounters(refs);
  }

  private _makeTemplate(item: BlockStackItem): Template {
    const parseTree = new Root();
    parseTree.nodes.push(...item.block.block.nodes);
    return new Template(
      this.template.environment,
      parseTree,
      {},
      {
        name: item.sourceName,
      },
    );
  }
}
