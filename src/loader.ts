import { RenderContext, ContextScope } from "./context";
import { Environment } from "./environment";
import { Template } from "./template";

/**
 * Represents a Liquid template's source code and additional meta data.
 */
export class TemplateSource {
  constructor(
    /**
     * The template's source code.
     */
    readonly source: string,

    /**
     * A name or identifier for the template.
     */
    readonly name: string,

    /**
     * Additional template globals.
     */
    readonly matter?: ContextScope,

    /**
     * A function that returns `true` if the template is up to date, or
     * `false` if it needs to be loaded again.
     */
    readonly uptoDate?: () => Promise<boolean>,

    /**
     * A function that returns `true` if the template is up to date, or
     * `false` if it needs to be loaded again.
     */
    readonly uptoDateSync?: () => boolean
  ) {}
}

/**
 * The base class for all template loaders.
 */
export abstract class Loader {
  /**
   * Override `getSource` to implement a custom loader.
   * @param name - The name or identifier of a template.
   * @param renderContext - The active render context, if there is one.
   * @param loaderContext - Additional context. By convention, tags that load
   * templates should add a `tag` property to the loader context containing
   * the tag's name.
   * @returns The source, with any meta data, for the template identified by
   * the given name
   * @throws {@link TemplateNotFoundError}
   * Thrown if the template can not be found.
   */
  abstract getSource(
    name: string,
    renderContext?: RenderContext,
    loaderContext?: { [index: string]: unknown }
  ): Promise<TemplateSource>;

  /**
   * A synchronous version of `getSource`.
   * @see {@link getSource}
   */
  abstract getSourceSync(
    name: string,
    renderContext?: RenderContext,
    loaderContext?: { [index: string]: unknown }
  ): TemplateSource;

  /**
   * Used internally by `Environment.getTemplate()`. Delegates to `getSource`.
   * @see {@link getSource}. Override `load` to implement a caching loader.
   */
  public async load(
    name: string,
    environment: Environment,
    context?: RenderContext,
    globals?: ContextScope,
    loaderContext?: { [index: string]: unknown }
  ): Promise<Template> {
    const source = await this.getSource(name, context, loaderContext);
    return environment.fromString(source.source, name, globals);
  }

  /**
   * A synchronous version of `load`.
   * @see {@link load}
   */
  public loadSync(
    name: string,
    environment: Environment,
    context?: RenderContext,
    globals?: ContextScope,
    loaderContext?: { [index: string]: unknown }
  ): Template {
    const source = this.getSourceSync(name, context, loaderContext);
    return environment.fromString(source.source, name, globals);
  }
}
