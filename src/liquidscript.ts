import { Environment } from "./environment";

export { type Namespace } from "./context";
export { type EnvironmentOptions, type TemplateMeta } from "./environment";
export { DetailedLiquidError, LiquidError } from "./errors";
export {
  CachingNodeFileSystemLoader,
  FetchLoader,
  MapLoader,
  NodeFileSystemLoader,
  ObjectLoader,
} from "./loaders";
export { Template } from "./template";
export { Environment };

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
 * @returns A new {@link Template}, ready to be rendered.
 */
export function parse(source: string) {
  return DEFAULT_ENVIRONMENT.parse(source);
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
