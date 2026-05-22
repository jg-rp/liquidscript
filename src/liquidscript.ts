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

export const DEFAULT_ENVIRONMENT = new Environment();

export function parse(source: string) {
  return DEFAULT_ENVIRONMENT.parse(source);
}

export async function render(
  source: string,
  data?: { [index: string]: unknown },
): Promise<string> {
  return await DEFAULT_ENVIRONMENT.render(source, data);
}

export function renderSync(
  source: string,
  data?: { [index: string]: unknown },
): string {
  return DEFAULT_ENVIRONMENT.renderSync(source, data);
}
