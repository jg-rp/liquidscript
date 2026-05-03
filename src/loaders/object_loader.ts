import type { Environment } from "../environment";
import { TemplateNotFoundError } from "../errors";
import { TemplateLoader, type TemplateSource } from "../loader";

/**
 * A loader that uses an Object of strings to store template source text.
 */
export class ObjectLoader extends TemplateLoader {
  #obj: { [index: string]: string };

  constructor(obj?: { [index: string]: string }) {
    super();
    this.#obj = obj ?? {};
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
