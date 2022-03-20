import fsCallback from "fs";
import fs from "fs/promises";
import path from "path";

import { LRUCache } from "../../cache";
import { ContextScope, RenderContext } from "../../context";
import { Environment } from "../../environment";
import { TemplateNotFoundError } from "../../errors";
import { Loader, TemplateSource } from "../../loader";
import { Template } from "../../template";
import { isArray } from "../../types";

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

/**
 * A template loader that reads templates from a file system when deployed
 * to the NodeJS runtime.
 */
export class NodeFileSystemLoader extends Loader {
  readonly encoding: BufferEncoding;
  readonly fileExtension: string;
  readonly searchPath: string[];

  /**
   *
   * @param searchPath - A path, or array of paths, to search for templates.
   * @param options - Loader options.
   */
  constructor(
    searchPath: string | string[],
    { encoding = "utf8", fileExtension = "" }: NodeFileSystemLoaderOptions = {}
  ) {
    super();
    this.searchPath = isArray(searchPath) ? searchPath : [searchPath];
    this.encoding = encoding;
    this.fileExtension = fileExtension;
  }

  public async getSource(name: string): Promise<TemplateSource> {
    const templatePath = await this.resolve(this.withFileExtension(name));
    const source = await fs.readFile(templatePath, { encoding: this.encoding });
    return new TemplateSource(source, templatePath);
  }

  public getSourceSync(name: string): TemplateSource {
    const templatePath = this.resolveSync(this.withFileExtension(name));
    const source = fsCallback.readFileSync(templatePath, {
      encoding: this.encoding,
    });
    return new TemplateSource(source, templatePath);
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
  protected async resolve(name: string): Promise<string> {
    if (name.startsWith(".")) throw new TemplateNotFoundError(name);
    const p = path.normalize(name);
    for (const sp of this.searchPath) {
      const templatePath = path.join(sp, p);
      try {
        const stat = await fs.stat(templatePath);
        if (stat.isFile()) return templatePath;
      } catch {
        continue;
      }
    }
    throw new TemplateNotFoundError(name);
  }

  /**
   * A synchronous version of {@link resolve}.
   */
  protected resolveSync(name: string): string {
    if (name.startsWith(".")) throw new TemplateNotFoundError(name);
    const p = path.normalize(name);
    for (const sp of this.searchPath) {
      const templatePath = path.join(sp, p);
      try {
        const stat = fsCallback.statSync(templatePath);
        if (stat.isFile()) return templatePath;
      } catch {
        continue;
      }
    }
    throw new TemplateNotFoundError(name);
  }
}

/**
 * A template loader that caches templates read from a file system.
 */
export class CachingNodeFileSystemLoader extends Loader {
  readonly autoReload: boolean;
  readonly cacheSize: number;
  readonly encoding: BufferEncoding;
  readonly fileExtension: string;
  readonly searchPath: string[];
  #cache: LRUCache<string, Template>;

  /**
   *
   * @param searchPath
   * @param options
   */
  constructor(
    searchPath: string | string[],
    {
      autoReload = true,
      cacheSize = 300,
      encoding = "utf8",
      fileExtension = "",
    }: CachingNodeFileSystemLoaderOptions = {}
  ) {
    super();
    this.searchPath = isArray(searchPath) ? searchPath : [searchPath];
    this.encoding = encoding;
    this.autoReload = autoReload;
    this.cacheSize = this.autoReload ? Math.max(cacheSize, 0) : 0;
    this.fileExtension = fileExtension;
    this.#cache = new LRUCache(cacheSize);
  }

  /**
   *
   * @param templatePath
   * @param mtime
   * @returns
   */
  static async upToDate(templatePath: string, mtime: number): Promise<boolean> {
    try {
      const stat = await fs.stat(templatePath);
      return stat.mtimeMs === mtime;
    } catch {
      return false;
    }
  }

  /**
   *
   * @param templatePath
   * @param mtime
   * @returns
   */
  static upToDateSync(templatePath: string, mtime: number): boolean {
    try {
      return fsCallback.statSync(templatePath).mtimeMs === mtime;
    } catch {
      return false;
    }
  }

  public async getSource(name: string): Promise<TemplateSource> {
    const [templatePath, mtime] = await this.resolve(
      this.withFileExtension(name)
    );
    const source = await fs.readFile(templatePath, { encoding: this.encoding });

    if (this.autoReload) {
      return new TemplateSource(source, templatePath, undefined, () => {
        return CachingNodeFileSystemLoader.upToDate(templatePath, mtime);
      });
    } else {
      return new TemplateSource(source, templatePath);
    }
  }

  public getSourceSync(name: string): TemplateSource {
    const [templatePath, mtime] = this.resolveSync(
      this.withFileExtension(name)
    );
    const source = fsCallback.readFileSync(templatePath, {
      encoding: this.encoding,
    });

    if (this.autoReload) {
      return new TemplateSource(
        source,
        templatePath,
        undefined,
        undefined,
        () => CachingNodeFileSystemLoader.upToDateSync(templatePath, mtime)
      );
    } else {
      return new TemplateSource(source, templatePath);
    }
  }

  public async load(
    name: string,
    environment: Environment,
    context?: RenderContext,
    globals?: ContextScope
  ): Promise<Template> {
    const cached = this.#cache.get(name);
    if (!cached || (this.autoReload && !(await cached.isUpToDate()))) {
      const source = await this.getSource(name);
      const template = environment.fromString(
        source.source,
        name,
        globals,
        source.matter,
        source.uptoDate,
        source.uptoDateSync
      );
      this.#cache.set(name, template);
      return template;
    }
    return cached.withGlobals(globals);
  }

  public loadSync(
    name: string,
    environment: Environment,
    context?: RenderContext,
    globals?: ContextScope
  ): Template {
    const cached = this.#cache.get(name);
    if (!cached || (this.autoReload && !cached.isUpToDateSync())) {
      const source = this.getSourceSync(name);
      const template = environment.fromString(
        source.source,
        name,
        globals,
        source.matter,
        source.uptoDate,
        source.uptoDateSync
      );
      this.#cache.set(name, template);
      return template;
    }
    return cached.withGlobals(globals);
  }

  /**
   *
   * @param name
   * @returns
   */
  protected withFileExtension(name: string): string {
    if (this.fileExtension.length)
      return path.extname(name) ? name : name + this.fileExtension;
    return name;
  }

  /**
   *
   * @param name
   * @returns
   */
  protected async resolve(name: string): Promise<[string, number]> {
    if (name.startsWith(".")) throw new TemplateNotFoundError(name);
    const p = path.normalize(name);
    for (const sp of this.searchPath) {
      const templatePath = path.join(sp, p);
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
   *
   * @param name
   * @returns
   */
  protected resolveSync(name: string): [string, number] {
    if (name.startsWith(".")) throw new TemplateNotFoundError(name);
    const p = path.normalize(name);
    for (const sp of this.searchPath) {
      const templatePath = path.join(sp, p);
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
