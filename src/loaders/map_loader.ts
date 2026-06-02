import type { Environment } from "../environment";
import { TemplateNotFoundError } from "../errors";
import { TemplateLoader, type TemplateSource } from "../loader";

/**
 * A template loader that uses a Map of strings to store template source text.
 */
export class MapLoader extends TemplateLoader {
  #map: Map<string, string>;

  constructor(entries?: Iterable<[string, string]>) {
    super();
    this.#map = new Map(entries);
  }

  async getSource(env: Environment, name: string): Promise<TemplateSource> {
    return this.getSourceSync(env, name);
  }

  getSourceSync(env: Environment, name: string): TemplateSource {
    const source = this.#map.get(name);
    if (source !== undefined) return { source, name };
    throw new TemplateNotFoundError(name);
  }
}
