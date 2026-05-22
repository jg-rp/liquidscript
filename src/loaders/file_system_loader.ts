import fsCallback from "fs";
import fs from "fs/promises";
import path from "path";

import type { Environment } from "../environment";
import { TemplateNotFoundError } from "../errors";
import { TemplateLoader, type TemplateSource } from "../loader";
import { isArray } from "../type_guards";
import { LiquidError } from "../errors";
import { LRUCache } from "../cache";
import type { Template } from "../template";
import type { Namespace, RenderContext } from "../context";

/**
 * Options for a file system template loader in the NodeJS runtime.
 */
export type NodeFileSystemLoaderOptions = {
  /**
   * The encoding to use when reading from a template file. All template
   * files in the search path are assumed to have the same encoding. Defaults
   * to utf8.
   */
  encoding?: BufferEncoding;

  /**
   * A default file extension to apply if none is given. For example, to allow
   * template authors to write `{% include 'page' %}` instead of
   * `{% include 'page.liquid' %}`, set `fileExtension` to `'.liquid'`.
   * Defaults to the empty string.
   */
  fileExtension?: string;
};

/**
 * Options for a caching file system template loader in the NodeJS runtime.
 */
export type CachingNodeFileSystemLoaderOptions = NodeFileSystemLoaderOptions & {
  /**
   * When `true`, if a template has been cached, it will be reloaded
   * automatically if it has been modified since it was last loaded.
   * Defaults to `true`
   */
  autoReload?: boolean;

  /**
   * The maximum number of templates to cache. Defaults to 300.
   */
  cacheSize?: number;
};

export class NodeFileSystemLoader extends TemplateLoader {
  readonly encoding: BufferEncoding;
  readonly fileExtension: string;
  readonly searchPath: string[];

  constructor(
    searchPath: string | string[],
    { encoding = "utf8", fileExtension = "" }: NodeFileSystemLoaderOptions = {},
  ) {
    super();
    this.searchPath = isArray(searchPath) ? searchPath : [searchPath];
    this.encoding = encoding;
    this.fileExtension = fileExtension;

    if (process.env.RUNTIME === "browser") {
      throw new LiquidError(
        "NodeFileSystemLoader is not available in browser runtime",
      );
    }
  }

  static async upToDate(templatePath: string, mtime: number): Promise<boolean> {
    try {
      const stat = await fs.stat(templatePath);
      return stat.mtimeMs === mtime;
    } catch {
      return false;
    }
  }

  static upToDateSync(templatePath: string, mtime: number): boolean {
    console.log("!!", templatePath, mtime);
    try {
      return fsCallback.statSync(templatePath).mtimeMs === mtime;
    } catch {
      return false;
    }
  }

  override async getSource(
    env: Environment,
    name: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context?: RenderContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options?: Record<string, unknown>,
  ): Promise<TemplateSource> {
    const [templatePath, mtime] = await this.resolve(
      this.withFileExtension(name),
    );

    const source = await fs.readFile(templatePath, { encoding: this.encoding });

    return {
      source,
      name: templatePath,
      upToDate: () => NodeFileSystemLoader.upToDate(templatePath, mtime),
      upToDateSync: () =>
        NodeFileSystemLoader.upToDateSync(templatePath, mtime),
    };
  }

  override getSourceSync(
    env: Environment,
    name: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context?: RenderContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options?: Record<string, unknown>,
  ): TemplateSource {
    const [templatePath, mtime] = this.resolveSync(
      this.withFileExtension(name),
    );

    const source = fsCallback.readFileSync(templatePath, {
      encoding: this.encoding,
    });

    return {
      source,
      name: templatePath,
      upToDate: () => NodeFileSystemLoader.upToDate(templatePath, mtime),
      upToDateSync: () =>
        NodeFileSystemLoader.upToDateSync(templatePath, mtime),
    };
  }

  /**
   * Append the default file extension if the given template name does
   * not have one.
   * @param name - A template file name relative to one of the paths in the
   * current search path.
   * @returns The argument name with the default file extension, if it did
   * not already have one.
   */
  protected withFileExtension(name: string): string {
    if (this.fileExtension.length)
      return path.extname(name) ? name : name + this.fileExtension;
    return name;
  }

  /**
   * Find the path to the template file with the given name.
   * @param name - A template file name relative to one of the paths in the
   * current search path.
   * @returns The template file name joined with the first path in the
   * configured search path that is a file.
   * @throws {@link TemplateNotFoundError}
   * If a file with the given name can not be found.
   */
  protected async resolve(name: string): Promise<[string, number]> {
    const p = path.normalize(name);
    for (const sp of this.searchPath) {
      const templatePath = path.join(sp, p);
      // Is someone trying to escape the search path?
      if (!isSubPath(sp, templatePath)) throw new TemplateNotFoundError(name);
      try {
        const stat = await fs.stat(templatePath);
        if (stat.isFile()) return [templatePath, stat.mtimeMs];
      } catch {
        continue;
      }
    }
    throw new TemplateNotFoundError(name);
  }

  /**
   * A synchronous version of {@link resolve}.
   */
  protected resolveSync(name: string): [string, number] {
    const p = path.normalize(name);
    for (const sp of this.searchPath) {
      const templatePath = path.join(sp, p);
      // Is someone trying to escape the search path?
      if (!isSubPath(sp, templatePath)) throw new TemplateNotFoundError(name);
      try {
        const stat = fsCallback.statSync(templatePath);
        if (stat.isFile()) return [templatePath, stat.mtimeMs];
      } catch {
        continue;
      }
    }
    throw new TemplateNotFoundError(name);
  }
}

/**
 * Return `true` if the given path is a child of `parent`.
 */
function isSubPath(parent: string, dir: string): boolean {
  const relative = path.relative(parent, dir);
  return (
    !!relative.length && !relative.startsWith(".") && !path.isAbsolute(relative)
  );
}

/**
 * A template loader that caches templates read from a file system.
 */
export class CachingNodeFileSystemLoader extends NodeFileSystemLoader {
  readonly autoReload: boolean;
  readonly cacheSize: number;
  #cache: LRUCache<string, Template>;

  /**
   * @param searchPath - A path or array of paths to search for templates.
   */
  constructor(
    searchPath: string | string[],
    options?: CachingNodeFileSystemLoaderOptions,
  ) {
    super(searchPath, {
      encoding: options?.encoding ?? "utf8",
      fileExtension: options?.fileExtension ?? "",
    });
    this.autoReload = options?.autoReload ?? true;
    this.cacheSize = this.autoReload
      ? Math.max(options?.cacheSize ?? 300, 0)
      : 0;
    this.#cache = new LRUCache(this.cacheSize);
  }

  override async load(
    env: Environment,
    name: string,
    globals?: Namespace,
    context?: RenderContext,
    options?: Record<string, unknown>,
  ): Promise<Template> {
    const cached = this.#cache.get(name);

    if (!cached || (this.autoReload && !(await cached.upToDate()))) {
      const data = await this.getSource(env, name, context, options);
      const template = env.parse(data.source, globals, {
        name: data.name,
        overlay: data.overlay,
        upToDate: data.upToDate,
        upToDateSync: data.upToDateSync,
      });

      this.#cache.set(name, template);
      return template;
    }

    return cached.withGlobals(globals);
  }

  override loadSync(
    env: Environment,
    name: string,
    globals?: Namespace,
    context?: RenderContext,
    options?: Record<string, unknown>,
  ): Template {
    const cached = this.#cache.get(name);

    if (!cached || (this.autoReload && !cached.upToDateSync())) {
      const data = this.getSourceSync(env, name, context, options);
      const template = env.parse(data.source, globals, {
        name: data.name,
        overlay: data.overlay,
        upToDate: data.upToDate,
        upToDateSync: data.upToDateSync,
      });

      this.#cache.set(name, template);
      return template;
    }

    return cached.withGlobals(globals);
  }
}
