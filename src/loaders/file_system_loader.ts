import fsCallback from "fs";
import fs from "fs/promises";
import path from "path";

import type { Environment } from "../environment";
import { TemplateNotFoundError } from "../errors";
import { TemplateLoader, type TemplateSource } from "../loader";
import { isArray } from "../type_guards";
import { LiquidError } from "../errors";

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

  async getSource(env: Environment, name: string): Promise<TemplateSource> {
    const templatePath = await this.resolve(this.withFileExtension(name));
    const source = await fs.readFile(templatePath, { encoding: this.encoding });
    return { source, name: templatePath }; // TODO: name vs path
  }

  getSourceSync(env: Environment, name: string): TemplateSource {
    const templatePath = this.resolveSync(this.withFileExtension(name));
    const source = fsCallback.readFileSync(templatePath, {
      encoding: this.encoding,
    });
    return { source, name: templatePath }; // TODO: name vs path
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
    const p = path.normalize(name);
    for (const sp of this.searchPath) {
      const templatePath = path.join(sp, p);
      // Is someone trying to escape the search path?
      if (!isSubPath(sp, templatePath)) throw new TemplateNotFoundError(name);
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
    const p = path.normalize(name);
    for (const sp of this.searchPath) {
      const templatePath = path.join(sp, p);
      // Is someone trying to escape the search path?
      if (!isSubPath(sp, templatePath)) throw new TemplateNotFoundError(name);
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
 * Return `true` if the given path is a child of `parent`.
 */
function isSubPath(parent: string, dir: string): boolean {
  const relative = path.relative(parent, dir);
  return (
    !!relative.length && !relative.startsWith(".") && !path.isAbsolute(relative)
  );
}
