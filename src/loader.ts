import { RenderContext, ContextScope } from "./context";
import { Environment } from "./environment";
import { TemplateNotFoundError } from "./errors";
import { Template } from "./template";

// TODO: caching loader

// TODO: choice loader
// TODO: file system loader
// TODO: web loader?

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

export abstract class Loader {
  /**
   * Override `getSource` to implement a custom loader.
   * @param name - The name or identifier of a template.
   * @param renderContext - The active render context, if there is one.
   * @param loaderContext - Additional context. By convention, tags that load
   * templates should add a `tag` property to the loader context containing
   * the tag's name.
   * @throws `TemplateNotFoundError` if the template can not be found.
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
   * @see {@link getSource}
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

/**
 * A loader that uses a Map of strings to store template template source Text.
 */
export class MapLoader extends Loader {
  private _map: Map<string, string>;

  constructor(private map?: Map<string, string>) {
    super();
    this._map = map === undefined ? new Map<string, string>() : map;
  }

  public async getSource(name: string): Promise<TemplateSource> {
    return this.getSourceSync(name);
  }

  public getSourceSync(name: string): TemplateSource {
    const source = this._map.get(name);
    if (source !== undefined) return new TemplateSource(source, name);
    throw new TemplateNotFoundError(name);
  }
}
/**
 * A loader that uses an Object of strings to store template template source Text.
 */
export class ObjectLoader extends Loader {
  private _obj: { [index: string]: string };

  constructor(private obj?: { [index: string]: string }) {
    super();
    this._obj = obj === undefined ? {} : obj;
  }

  public async getSource(name: string): Promise<TemplateSource> {
    return this.getSourceSync(name);
  }

  public getSourceSync(name: string): TemplateSource {
    const source = this._obj[name];
    if (source !== undefined) return new TemplateSource(source, name);
    throw new TemplateNotFoundError(name);
  }
}
