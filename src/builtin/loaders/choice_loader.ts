import { RenderContext } from "../../context";
import { Environment } from "../../environment";
import { TemplateNotFoundError } from "../../errors";
import { Loader, TemplateSource } from "../../loader";
import { Template } from "../../template";
import { ContextScope } from "../../types";

/**
 * A template loader that will try each of an array of loaders until
 * a template is found, or throw a `TemplateNotFoundError` if none of
 * the loaders could find the template.
 */
export class ChoiceLoader extends Loader {
  /**
   *
   * @param loaders
   */
  constructor(readonly loaders: Loader[]) {
    super();
  }

  public getSource(): Promise<TemplateSource> {
    // We're overriding `Loader.load` and delegating to a sub-loader
    // implementation of `getSource`.
    throw new Error("Method not implemented.");
  }
  public getSourceSync(): TemplateSource {
    // We're overriding `Loader.loadSync` and delegating to a sub-loader
    // implementation of `getSourceSync`.
    throw new Error("Method not implemented.");
  }

  public async load(
    name: string,
    environment: Environment,
    context?: RenderContext,
    globals?: ContextScope,
    loaderContext?: { [index: string]: unknown }
  ): Promise<Template> {
    for (const loader of this.loaders) {
      try {
        return await loader.load(
          name,
          environment,
          context,
          globals,
          loaderContext
        );
      } catch (err) {
        if (err instanceof TemplateNotFoundError) {
          continue;
        }
      }
    }
    throw new TemplateNotFoundError(name);
  }

  public loadSync(
    name: string,
    environment: Environment,
    context?: RenderContext,
    globals?: ContextScope,
    loaderContext?: { [index: string]: unknown }
  ): Template {
    for (const loader of this.loaders) {
      try {
        return loader.loadSync(
          name,
          environment,
          context,
          globals,
          loaderContext
        );
      } catch (err) {
        if (err instanceof TemplateNotFoundError) {
          continue;
        }
      }
    }
    throw new TemplateNotFoundError(name);
  }
}
