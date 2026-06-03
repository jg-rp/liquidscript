import { RenderContext } from "./context";
import { DefaultMap } from "./default_map";
import { LiquidError } from "./errors";
import { Filter, Variable, type Traversable } from "./expression";
import { Scope, type Markup } from "./markup";
import type { Template } from "./template";
import { getTokenValue, type Token } from "./token";
import { isArray, isString } from "./type_guards";

/**
 * The location of a variable, tag or filter.
 */
export class Location {
  constructor(
    readonly template: Template,
    readonly token: Token,
  ) {}

  equals(other: Location): boolean {
    return (
      this.template.name === other.template.name && this.token === other.token
    );
  }

  /**
   * Return the line and column number of the given index.
   */
  lineCol(index: number): [number, number] {
    let cumulativeLength = 0;
    let targetLineIndex = -1;

    for (const [i, line] of this.template.lines.entries()) {
      cumulativeLength += line.length;
      if (index < cumulativeLength) {
        targetLineIndex = i;
        break;
      }
    }

    if (targetLineIndex === -1) throw new LiquidError("index is out of bounds");

    const lineNumber = targetLineIndex + 1;
    const line = this.template.lines[targetLineIndex] || "";
    const columnNumber = index - (cumulativeLength - line.length);
    return [lineNumber, columnNumber];
  }

  /**
   * Return line and column number for the start and end index spanning
   * this location.
   */
  span(): [[number, number], [number, number]] {
    return [this.lineCol(this.token.start), this.lineCol(this.token.end)];
  }

  /**
   * Return the substring in `source` at this location.
   */
  value(): string {
    return getTokenValue(this.token, this.template.source);
  }
}

export type Loc = {
  startIndex: number;
  endIndex: number;
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
  value: string;
  templateName: string;
};

export type Segments = Array<number | string | Segments>;

export type Var = Loc & {
  segments: Segments;
  path: string;
};

/**
 * A mapping of variable names to their locations along with any path segments.
 */
export type Vars = Record<string, Var[]>;

/**
 * A mapping of filter or tag names to their locations.
 */
export type Locations = Record<string, Loc[]>;

const RE_PROPERTY = /[\u0080-\uFFFFa-zA-Z_][\u0080-\uFFFFa-zA-Z0-9_-]*/;

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
    const segment = this.segments[0] ?? "";
    if (isArray(segment)) {
      return this.toStringInner(segment);
    }
    return segment.toString();
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

  toObject(): Vars {
    const obj: Vars = {};

    for (const [k, v] of this.data.entries()) {
      const a: Var[] = [];

      for (const sv of v) {
        const [[startLine, startColumn], [endLine, endColumn]] =
          sv.location.span();

        a.push({
          segments: sv.segments,
          path: sv.toString(),
          startIndex: sv.location.token.start,
          endIndex: sv.location.token.end,
          startLine,
          startColumn,
          endLine,
          endColumn,
          value: sv.location.value(),
          templateName: sv.location.template.name,
        });
      }

      obj[k] = a;
    }

    return obj;
  }
}

/**
 * The result of analyzing a template using `Template.analyze()`;
 */
export class TemplateAnalysis {
  constructor(
    readonly variables: Vars,
    readonly locals: Vars,
    readonly globals: Vars,
    readonly filters: Locations,
    readonly tags: Locations,
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
    template: Template,
    scope: StaticScope,
    justGlobals: boolean = false,
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ) => {
    if (template.name.length && !justGlobals) {
      seen.get(template.name).add(undefined);
    }

    // Update tags
    // Markup with empty `node.tag` is silenced.
    if (!justGlobals && node.tag.length > 0) {
      tags.get(node.tag).push(new Location(template, node.token));
    }

    // Update variables from node.expressions()
    if (node.expressions !== undefined) {
      for (const expr of node.expressions()) {
        analyzeVariables(
          expr,
          template,
          scope,
          globals,
          justGlobals ? new VariableMap() : variables,
          staticContext,
        );

        if (!justGlobals) {
          // Update filters from expr
          for (const [name, span] of extractFilters(
            expr,
            template,
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
          new StaticVariable([name.value], new Location(template, name.token)),
        );
      }
    }

    // Set block scope before descending into child nodes.
    if (node.blockScope !== undefined) {
      scope.push(new Set(node.blockScope().map((n) => n.value)));
    }

    if (node.children !== undefined) {
      for (const child of await node.children(staticContext)) {
        visit(child, template, scope, justGlobals);
      }
    } else if (node.childrenSync !== undefined) {
      // Fall back to sync.
      for (const child of node.childrenSync(staticContext)) {
        visit(child, template, scope, justGlobals);
      }
    }

    if (node.blockScope !== undefined) {
      scope.pop();
    }

    // Descend into partial templates?
    if (options.includePartials && node.partial !== undefined) {
      const partial = await node.partial(staticContext);
      const name = partial.template.name;

      // If we've seen this partial before but with different arguments,
      // we might want to visit it again but only capture globals.
      const justGlobals_ = seen.has(name);

      if (!seen.get(name).has(partial.key)) {
        seen.get(name).add(partial.key);

        const partialScope =
          partial.scopeKind === Scope.ISOLATED
            ? new StaticScope(new Set(partial.inScope.map((n) => n.value)))
            : rootScope.push(new Set(partial.inScope.map((n) => n.value)));

        for (const node of partial.template.nodes) {
          if (!isString(node))
            visit(node, partial.template, partialScope, justGlobals_);
        }

        if (partial.scopeKind !== Scope.ISOLATED) {
          partialScope.pop();
        }
      }
    }
  };

  for (const node of template.nodes) {
    if (!isString(node)) visit(node, template, rootScope);
  }

  return new TemplateAnalysis(
    variables.toObject(),
    locals.toObject(),
    globals.toObject(),
    toLocations(filters),
    toLocations(tags),
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
    template: Template,
    scope: StaticScope,
    justGlobals: boolean = false,
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ) => {
    if (template.name.length && !justGlobals) {
      seen.get(template.name).add(undefined);
    }

    // Update tags
    // Markup with empty `node.tag` is silenced.
    if (!justGlobals && node.tag.length > 0) {
      tags.get(node.tag).push(new Location(template, node.token));
    }

    // Update variables from node.expressions()
    if (node.expressions !== undefined) {
      for (const expr of node.expressions()) {
        analyzeVariables(
          expr,
          template,
          scope,
          globals,
          justGlobals ? new VariableMap() : variables,
          staticContext,
        );

        if (!justGlobals) {
          // Update filters from expr
          for (const [name, span] of extractFilters(
            expr,
            template,
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
          new StaticVariable([name.value], new Location(template, name.token)),
        );
      }
    }

    // Set block scope before descending into child nodes.
    if (node.blockScope !== undefined) {
      scope.push(new Set(node.blockScope().map((n) => n.value)));
    }

    if (node.childrenSync !== undefined) {
      for (const child of node.childrenSync(staticContext)) {
        visit(child, template, scope, justGlobals);
      }
    }

    if (node.blockScope !== undefined) {
      scope.pop();
    }

    // Descend into partial templates?
    if (options.includePartials && node.partialSync !== undefined) {
      const partial = node.partialSync(staticContext);
      const name = partial.template.name;

      // If we've seen this partial before but with different arguments,
      // we might want to visit it again but only capture globals.
      const justGlobals_ = seen.has(name);

      if (!seen.get(name).has(partial.key)) {
        seen.get(name).add(partial.key);

        const partialScope =
          partial.scopeKind === Scope.ISOLATED
            ? new StaticScope(new Set(partial.inScope.map((n) => n.value)))
            : rootScope.push(new Set(partial.inScope.map((n) => n.value)));

        for (const node of partial.template.nodes) {
          if (!isString(node))
            visit(node, partial.template, partialScope, justGlobals_);
        }

        if (partial.scopeKind !== Scope.ISOLATED) {
          partialScope.pop();
        }
      }
    }
  };

  for (const node of template.nodes) {
    if (!isString(node)) visit(node, template, rootScope);
  }

  return new TemplateAnalysis(
    variables.toObject(),
    locals.toObject(),
    globals.toObject(),
    toLocations(filters),
    toLocations(tags),
  );
}

function* extractFilters(
  expression: Traversable,
  template: Template,
  staticContext: RenderContext,
): Iterable<[string, Location]> {
  if (expression instanceof Filter) {
    yield [expression.name.value, new Location(template, expression.span)];
  }

  for (const expr of expression.children(staticContext)) {
    yield* extractFilters(expr, template, staticContext);
  }
}

function analyzeVariables(
  expression: Traversable,
  template: Template,
  scope: StaticScope,
  globals: VariableMap,
  variables: VariableMap,
  staticContext: RenderContext,
): void {
  if (expression instanceof Variable) {
    const v = new StaticVariable(
      segments(expression, template),
      new Location(template, expression.span),
    );

    variables.add(v);

    if (!scope.has(expression.root.toString())) {
      globals.add(v);
    }
  }

  // XXX: This is where we'd handle lambda scoping, or any expression that
  // affects scope.

  for (const expr of expression.children(staticContext)) {
    analyzeVariables(expr, template, scope, globals, variables, staticContext);
  }
}

function segments(variable: Variable, template: Template): Segments {
  const segments_: Segments = [];

  if (variable.root instanceof Variable) {
    segments_.push(segments(variable.root, template));
  } else {
    segments_.push(variable.root.value);
  }

  for (const s of variable.segments) {
    if (s instanceof Variable) {
      segments_.push(segments(s, template));
    } else {
      segments_.push(s.value);
    }
  }

  return segments_;
}

function toLocations(map: DefaultMap<string, Location[]>): Locations {
  const obj: Locations = {};

  for (const [k, v] of map.entries()) {
    const a: Loc[] = [];

    for (const l of v) {
      const [[startLine, startColumn], [endLine, endColumn]] = l.span();

      a.push({
        startIndex: l.token.start,
        endIndex: l.token.end,
        startLine,
        startColumn,
        endLine,
        endColumn,
        value: l.value(),
        templateName: l.template.name,
      });
    }

    obj[k] = a;
  }

  return obj;
}
