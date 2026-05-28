import type { Environment } from "../environment";
import { TemplateNotFoundError } from "../errors";
import { TemplateLoader, type TemplateSource } from "../loader";

/**
 * A loader that uses an Object of strings to store template source text.
 */
export class ObjectLoader extends TemplateLoader {
  #obj: Record<string, string>;

  constructor(obj?: Record<string, string>) {
    super();
    this.#obj = obj ?? Object.create(null);
  }

  async getSource(env: Environment, name: string): Promise<TemplateSource> {
    return this.getSourceSync(env, name);
  }

  getSourceSync(env: Environment, name: string): TemplateSource {
    const source = this.#obj[name];
    if (source !== undefined) return { source, name };
    throw new TemplateNotFoundError(name);
  }
}
