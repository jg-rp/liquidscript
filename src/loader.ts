import type { Namespace, RenderContext } from "./context";
import type { Environment } from "./environment";
import type { Template } from "./template";

/**
 * Template source text and meta data.
 */
export type TemplateSource = {
  /**
   * Template name or identifier.
   */
  name: string;

  /**
   * Template source code.
   */
  source: string;

  /**
   * Additional template global variables.
   */
  overlay?: Namespace;

  /**
   * A function returning `true` if the template is up to date, or
   * `false` if it needs to be loaded again.
   */
  upToDate?: () => Promise<boolean>;

  /**
   * A function returning `true` if the template is up to date, or
   * `false` if it needs to be loaded again.
   */
  upToDateSync?: () => boolean;
};

/**
 * The abstract base class for all template loaders.
 *
 * A template loader is responsible for finding template source text given a
 * name or identifier.
 */
export abstract class TemplateLoader {
  /**
   * Load template source text and meta data.
   *
   * @param env The active template environment.
   * @param name A name or identifier for the target template.
   * @param context The current render context, if one is available.
   * @param options Arbitrary options that can be used to narrow the
   *  template search space.
   */
  abstract getSource(
    env: Environment,
    name: string,
    context?: RenderContext,
    options?: Record<string, unknown>,
  ): Promise<TemplateSource>;

  /**
   * A synchronous version of `getSource`.
   * @see {@link getSource}
   */
  abstract getSourceSync(
    env: Environment,
    name: string,
    context?: RenderContext,
    options?: Record<string, unknown>,
  ): TemplateSource;

  /**
   * Used internally by `Environment.parse()`. Delegates to `getSource`.
   * @see {@link getSource}. Override `load` to implement a caching loader.
   */
  async load(
    env: Environment,
    name: string,
    globals?: Namespace,
    context?: RenderContext,
    options?: Record<string, unknown>,
  ): Promise<Template> {
    const data = await this.getSource(env, name, context, options);
    return env.parse(data.source, globals, {
      name: data.name,
      overlay: data.overlay,
      upToDate: data.upToDate,
      upToDateSync: data.upToDateSync,
    });
  }

  /**
   * A synchronous version of `load`.
   * @see {@link load}
   */
  loadSync(
    env: Environment,
    name: string,
    globals?: Namespace,
    context?: RenderContext,
    options?: Record<string, unknown>,
  ): Template {
    const data = this.getSourceSync(env, name, context, options);
    return env.parse(data.source, globals, {
      name: data.name,
      overlay: data.overlay,
      upToDate: data.upToDate,
      upToDateSync: data.upToDateSync,
    });
  }
}
