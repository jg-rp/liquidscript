import type { Namespace, RenderContext } from "../context";
import type { Environment } from "../environment";
import { TemplateNotFoundError } from "../errors";
import { TemplateLoader, type TemplateSource } from "../loader";
import type { Template } from "../template";

/**
 * A template loader that will try each of an array of loaders until
 * a template is found, or throw a `TemplateNotFoundError` if none of
 * the loaders could find the template.
 */
export class ChoiceLoader extends TemplateLoader {
  constructor(readonly loaders: TemplateLoader[]) {
    super();
  }

  override getSource(): Promise<TemplateSource> {
    throw new Error("method not implemented.");
  }

  override getSourceSync(): TemplateSource {
    throw new Error("method not implemented.");
  }

  override async load(
    env: Environment,
    name: string,
    globals?: Namespace,
    context?: RenderContext,
    options?: Record<string, unknown>,
  ): Promise<Template> {
    for (const loader of this.loaders) {
      try {
        return await loader.load(env, name, globals, context, options);
      } catch (err) {
        if (err instanceof TemplateNotFoundError) {
          continue;
        }
      }
    }

    throw new TemplateNotFoundError(name);
  }

  override loadSync(
    env: Environment,
    name: string,
    globals?: Namespace,
    context?: RenderContext,
    options?: Record<string, unknown>,
  ): Template {
    for (const loader of this.loaders) {
      try {
        return loader.loadSync(env, name, globals, context, options);
      } catch (err) {
        if (err instanceof TemplateNotFoundError) {
          continue;
        }
      }
    }

    throw new TemplateNotFoundError(name);
  }
}
