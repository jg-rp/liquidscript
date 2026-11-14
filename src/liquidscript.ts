import { RenderContext, type Namespace } from "./context.js";
import { Environment } from "./environment.js";

export { ReadOnlyChainMap } from "./chain_map.js";
export { type Namespace } from "./context.js";
export * from "./drop.js";
export { HTMLSafeString } from "./drops/html_safe.js";
export { FalsyStrictUndefined, StrictUndefined, Undefined } from "./drops/undefined.js";
export { type EnvironmentOptions, type TemplateMeta } from "./environment.js";
export * from "./errors.js";
export * as expression from "./expression.js";
export { FilterContext, type Filter } from "./filter.js";
export { TemplateLoader, type TemplateSource } from "./loader.js";
export {
  CachingNodeFileSystemLoader,
  ChoiceLoader,
  FetchLoader,
  MapLoader,
  NodeFileSystemLoader,
  ObjectLoader,
  type CachingNodeFileSystemLoaderOptions,
  type FetchLoaderOptions,
  type NodeFileSystemLoaderOptions,
} from "./loaders/index.js";
export {
  renderBlock,
  renderBlockSync,
  type Block,
  type Markup,
  type Node,
  type Tag,
} from "./markup.js";
export { Float, Integer, LiquidNumber } from "./number.js";
export { type OutputBuffer } from "./output.js";
export { Parser } from "./parser.js";
export * from "./static_analysis.js";
export * as tags from "./tags/index.js";
export { Template } from "./template.js";
export { T, type Token, type TokenKind } from "./token.js";
export * as object from "./type_guards.js";
export { Environment, RenderContext };

/**
 * The default Liquid environment including all standard tags and filters, and
 * an empty {@link MapLoader}.
 *
 * It's OK to update `DEFAULT_ENVIRONMENT` with a new template loader or
 * different tags and filters, for example, so later calls to convenience
 * functions {@link parse} and {@link render} use the desired configuration.
 */
export const DEFAULT_ENVIRONMENT = new Environment();

/**
 * Parse Liquid template `source` using the default environment.
 *
 * @param source Template source code.
 * @param globals Variables to pin to the resulting template.
 * @returns A new {@link Template}, ready to be rendered.
 */
export function parse(source: string, globals?: Namespace) {
  return DEFAULT_ENVIRONMENT.parse(source, globals);
}

/**
 * Parse and render Liquid template `source` using the default Liquid
 * environment.
 *
 * @param source Template source code.
 * @param data A map of variable names to values. These variables will be
 *  available for template authors to use in Liquid expressions.
 * @returns The result of rendering `source` with data from `data`.
 */
export async function render(source: string, data?: Record<string, unknown>): Promise<string> {
  return await DEFAULT_ENVIRONMENT.render(source, data);
}

/**
 * Parse and render Liquid template `source` using the default Liquid
 * environment.
 *
 * @param source Template source code.
 * @param data A map of variable names to values. These variables will be
 *  available for template authors to use in Liquid expressions.
 * @returns The result of rendering `source` with data from `data`.
 */
export function renderSync(source: string, data?: Record<string, unknown>): string {
  return DEFAULT_ENVIRONMENT.renderSync(source, data);
}
