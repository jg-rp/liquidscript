import { RenderContext, type Namespace } from "./context";
import { Environment } from "./environment";

export { ReadOnlyChainMap } from "./chain_map";
export { type Namespace } from "./context";
export * from "./drop";
export { HTMLSafeString } from "./drops/html_safe";
export {
  FalsyStrictUndefined,
  StrictUndefined,
  Undefined,
} from "./drops/undefined";
export { type EnvironmentOptions, type TemplateMeta } from "./environment";
export * from "./errors";
export { type Filter, type FilterContext } from "./filter";
export { TemplateLoader, type TemplateSource } from "./loader";
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
} from "./loaders";
export {
  renderBlock,
  renderBlockSync,
  type Block,
  type Markup,
  type Node,
  type Tag,
} from "./markup";
export { Float, Integer, LiquidNumber } from "./number";
export { Template } from "./template";
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
export async function render(
  source: string,
  data?: Record<string, unknown>,
): Promise<string> {
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
export function renderSync(
  source: string,
  data?: Record<string, unknown>,
): string {
  return DEFAULT_ENVIRONMENT.renderSync(source, data);
}
