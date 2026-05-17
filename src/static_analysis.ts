import { RenderContext } from "./context";
import { DefaultMap } from "./default_map";
import { LiquidError } from "./errors";
import { Filter, Variable, type Traversable } from "./expression";
import { Scope, type Markup } from "./markup";
import { OutputStatement } from "./tags";
import type { Template } from "./template";
import { getTokenValue, type Token } from "./token";
import { isArray, isString } from "./type_guards";

/**
 * The location of a variable, tag or filter.
 */
export class Location {
  constructor(
    readonly templateName: string,
    readonly token: Token,
  ) {}

  equals(other: Location): boolean {
    return (
      this.templateName === other.templateName && this.token === other.token
    );
  }

  /**
   * Return the line and column number of the given index.
   */
  lineCol(source: string, index: number): [number, number] {
    const lines = source.match(/[^\r\n]+(?:\r?\n|\r|$)/g);
    if (!lines) throw new LiquidError("index is out of bounds");

    let cumulativeLength = 0;
    let targetLineIndex = -1;

    for (const [index, line] of lines.entries()) {
      cumulativeLength += line.length;
      if (index < cumulativeLength) {
        targetLineIndex = index;
        break;
      }
    }

    if (targetLineIndex === -1) throw new LiquidError("index is out of bounds");

    const lineNumber = targetLineIndex + 1;
    const line = lines[targetLineIndex] || "";
    const columnNumber = index - (cumulativeLength - line.length);
    return [lineNumber, columnNumber];
  }

  /**
   * Return line and column number for the start and end index spanning
   * this location.
   */
  span(source: string): [[number, number], [number, number]] {
    return [
      this.lineCol(source, this.token.start),
      this.lineCol(source, this.token.end),
    ];
  }

  /**
   * Return the substring in `source` at this location.
   */
  value(source: string): string {
    return getTokenValue(this.token, source);
  }
}

const RE_PROPERTY = /[\u0080-\uFFFFa-zA-Z_][\u0080-\uFFFFa-zA-Z0-9_-]*/;
export type Segments = Array<number | string | Segments>;

/**
 * A variable as a sequence of segments and its location.
 */
export class StaticVariable {
  constructor(
    readonly segments: Segments,
    readonly location: Location,
  ) {}

  /**
   * Variables with the same segments compare equal, regardless of span.
   */
  equals(other: StaticVariable): boolean {
    return this.segments === other.segments;
  }

  root(): string {
    return this.segments[0]?.toString() ?? "";
  }

  toString(): string {
    return this.toStringInner(this.segments);
  }

  private toStringInner(segments: Segments): string {
    const [head, ...rest] = segments;
    return (
      head +
      rest
        .map((segment) => {
          if (isArray(segment)) return `[${this.toStringInner(segment)}]`;
          if (isString(segment) && segment.match(RE_PROPERTY))
            return `.${segment}`;
          return `[${segment}]`;
        })
        .join("")
    );
  }
}

class StaticScope {
  readonly stack: Array<Set<string>>;

  constructor(readonly globals: Set<string>) {
    this.stack = [globals];
  }

  /**
   * Add a name to the root/template scope.
   */
  add(name: string): void {
    this.stack[0]?.add(name);
  }

  has(key: string): boolean {
    for (const scope of this.stack) {
      if (scope.has(key)) return true;
    }
    return false;
  }

  pop(): Set<string> | undefined {
    return this.stack.pop();
  }

  push(scope: Set<string>): StaticScope {
    this.stack.push(scope);
    return this;
  }
}

class VariableMap {
  readonly data: Map<string, StaticVariable[]> = new Map();

  add(key: StaticVariable): void {
    this.get(key)?.push(key);
  }

  get(key: StaticVariable): StaticVariable[] | undefined {
    const k = key.root();
    if (!this.data.has(k)) this.data.set(k, []);
    return this.data.get(k);
  }
}

/**
 * The result of analyzing a template using `Template.analyze()`;
 */
export class TemplateAnalysis {
  constructor(
    readonly variables: Map<string, StaticVariable[]>,
    readonly locals: Map<string, StaticVariable[]>,
    readonly globals: Map<string, StaticVariable[]>,
    readonly filters: Map<string, Location[]>,
    readonly tags: Map<string, Location[]>,
  ) {}
}

export type AnalysisOptions = {
  includePartials: boolean;
};

export async function analyze(
  template: Template,
  options: AnalysisOptions,
): Promise<TemplateAnalysis> {
  const variables = new VariableMap();
  const globals = new VariableMap();
  const locals = new VariableMap();

  const filters = new DefaultMap<string, Location[]>(Array);
  const tags = new DefaultMap<string, Location[]>(Array);

  const templateScope = new Set<string>();
  const rootScope = new StaticScope(templateScope);
  const staticContext = new RenderContext(template, {});

  /**
   * Names of partial templates that have already been analyzed.
   * Keys are hashes of partial template name and its arguments. If we've
   * visited a template before but with different arguments, later visits
   * only record global variables so as not to double count locals, filters
   * and tags.
   */
  const seen = new DefaultMap<string, Set<number | undefined>>(() => new Set());

  const visit = async (
    node: Markup,
    templateName: string,
    scope: StaticScope,
    justGlobals: boolean = false,
  ) => {
    if (templateName.length && !justGlobals) {
      seen.get(templateName).add(undefined);
    }

    // Update tags
    if (!(node instanceof OutputStatement)) {
      tags.get(node.tag).push(new Location(templateName, node.token));
    }

    // Update variables from node.expressions()
    if (node.expressions !== undefined) {
      for (const expr of node.expressions()) {
        analyzeVariables(
          expr,
          templateName,
          scope,
          globals,
          justGlobals ? new VariableMap() : variables,
          staticContext,
        );

        if (!justGlobals) {
          // Update filters from expr
          for (const [name, span] of extractFilters(
            expr,
            templateName,
            staticContext,
          )) {
            filters.get(name).push(span);
          }
        }
      }
    }

    // Update the template scope from node.templateScope()
    if (node.templateScope !== undefined) {
      for (const name of node.templateScope()) {
        scope.add(name.value);
        locals.add(
          new StaticVariable(
            [name.value],
            new Location(templateName, name.token),
          ),
        );
      }
    }

    // Descend into partial templates
    if (node.partialScope !== undefined) {
      const partial = node.partialScope();
      const name = isString(partial.name)
        ? partial.name
        : `${partial.name.evaluateSync(staticContext)}`;

      // If we've seen this partial before but with different arguments,
      // we might want to visit it again but only capture globals.
      const justGlobals_ = seen.has(name);

      if (seen.get(name).has(partial.key)) {
        // We've visited this partial template before with the same arguments.
        return;
      }

      seen.get(name).add(partial.key);

      const partialScope =
        partial.scopeKind === Scope.ISOLATED
          ? new StaticScope(new Set(partial.inScope.map((n) => n.value)))
          : rootScope.push(new Set(partial.inScope.map((n) => n.value)));

      if (node.children !== undefined) {
        for (const child of await node.children(
          staticContext,
          options.includePartials,
        )) {
          visit(child, name, partialScope, justGlobals_);
        }
      } else if (node.childrenSync !== undefined) {
        // Fall back to sync.
        for (const child of node.childrenSync(
          staticContext,
          options.includePartials,
        )) {
          visit(child, name, partialScope, justGlobals_);
        }
      }

      partialScope.pop();
    } else {
      if (node.blockScope !== undefined) {
        scope.push(new Set(node.blockScope().map((n) => n.value)));
      }

      if (node.children !== undefined) {
        for (const child of await node.children(
          staticContext,
          options.includePartials,
        )) {
          visit(child, templateName, scope, justGlobals);
        }
      } else if (node.childrenSync !== undefined) {
        // Fall back to sync.
        for (const child of node.childrenSync(
          staticContext,
          options.includePartials,
        )) {
          visit(child, templateName, scope, justGlobals);
        }
      }

      scope.pop();
    }
  };

  for (const node of template.nodes) {
    if (!isString(node)) visit(node, template.name, rootScope);
  }

  return new TemplateAnalysis(
    variables.data,
    locals.data,
    globals.data,
    filters,
    tags,
  );
}

export function analyzeSync(
  template: Template,
  options: AnalysisOptions,
): TemplateAnalysis {
  const variables = new VariableMap();
  const globals = new VariableMap();
  const locals = new VariableMap();

  const filters = new DefaultMap<string, Location[]>(Array);
  const tags = new DefaultMap<string, Location[]>(Array);

  const templateScope = new Set<string>();
  const rootScope = new StaticScope(templateScope);
  const staticContext = new RenderContext(template, {});

  /**
   * Names of partial templates that have already been analyzed.
   * Keys are hashes of partial template name and its arguments. If we've
   * visited a template before but with different arguments, later visits
   * only record global variables so as not to double count locals, filters
   * and tags.
   */
  const seen = new DefaultMap<string, Set<number | undefined>>(() => new Set());

  const visit = (
    node: Markup,
    templateName: string,
    scope: StaticScope,
    justGlobals: boolean = false,
  ) => {
    if (templateName.length && !justGlobals) {
      seen.get(templateName).add(undefined);
    }

    // Update tags
    if (!(node instanceof OutputStatement)) {
      tags.get(node.tag).push(new Location(templateName, node.token));
    }

    // Update variables from node.expressions()
    if (node.expressions !== undefined) {
      for (const expr of node.expressions()) {
        analyzeVariables(
          expr,
          templateName,
          scope,
          globals,
          justGlobals ? new VariableMap() : variables,
          staticContext,
        );

        if (!justGlobals) {
          // Update filters from expr
          for (const [name, span] of extractFilters(
            expr,
            templateName,
            staticContext,
          )) {
            filters.get(name).push(span);
          }
        }
      }
    }

    // Update the template scope from node.templateScope()
    if (node.templateScope !== undefined) {
      for (const name of node.templateScope()) {
        scope.add(name.value);
        locals.add(
          new StaticVariable(
            [name.value],
            new Location(templateName, name.token),
          ),
        );
      }
    }

    // Descend into partial templates
    if (node.partialScope !== undefined) {
      const partial = node.partialScope();
      const name = isString(partial.name)
        ? partial.name
        : `${partial.name.evaluateSync(staticContext)}`;

      // If we've seen this partial before but with different arguments,
      // we might want to visit it again but only capture globals.
      const justGlobals_ = seen.has(name);

      if (seen.get(name).has(partial.key)) {
        // We've visited this partial template before with the same arguments.
        return;
      }

      seen.get(name).add(partial.key);

      const partialScope =
        partial.scopeKind === Scope.ISOLATED
          ? new StaticScope(new Set(partial.inScope.map((n) => n.value)))
          : rootScope.push(new Set(partial.inScope.map((n) => n.value)));

      if (node.childrenSync !== undefined) {
        for (const child of node.childrenSync(
          staticContext,
          options.includePartials,
        )) {
          visit(child, name, partialScope, justGlobals_);
        }
      }

      partialScope.pop();
    } else {
      if (node.blockScope !== undefined) {
        scope.push(new Set(node.blockScope().map((n) => n.value)));
      }

      if (node.childrenSync !== undefined) {
        for (const child of node.childrenSync(
          staticContext,
          options.includePartials,
        )) {
          visit(child, templateName, scope, justGlobals);
        }
      }

      scope.pop();
    }
  };

  for (const node of template.nodes) {
    if (!isString(node)) visit(node, template.name, rootScope);
  }

  return new TemplateAnalysis(
    variables.data,
    locals.data,
    globals.data,
    filters,
    tags,
  );
}

function* extractFilters(
  expression: Traversable,
  templateName: string,
  staticContext: RenderContext,
): Iterable<[string, Location]> {
  if (expression instanceof Filter) {
    yield [expression.name.value, new Location(templateName, expression.span)];
  }

  for (const expr of expression.children(staticContext)) {
    yield* extractFilters(expr, templateName, staticContext);
  }
}

function analyzeVariables(
  expression: Traversable,
  templateName: string,
  scope: StaticScope,
  globals: VariableMap,
  variables: VariableMap,
  staticContext: RenderContext,
): void {
  if (expression instanceof Variable) {
    const v = new StaticVariable(
      segments(expression, templateName),
      new Location(templateName, expression.span),
    );

    variables.add(v);

    if (!scope.has(expression.root.toString())) {
      globals.add(v);
    }
  }

  // XXX: This is where we'd handle lambda scoping, or any expression that
  // affects scope.

  for (const expr of expression.children(staticContext)) {
    analyzeVariables(
      expr,
      templateName,
      scope,
      globals,
      variables,
      staticContext,
    );
  }
}

function segments(variable: Variable, templateName: string): Segments {
  const segments_: Segments = [];

  if (variable.root instanceof Variable) {
    segments_.push(segments(variable.root, templateName));
  } else {
    segments_.push(variable.root.value);
  }

  for (const s of variable.segments) {
    if (s instanceof Variable) {
      segments_.push(segments(s, templateName));
    } else {
      segments_.push(s.value);
    }
  }

  return segments_;
}
