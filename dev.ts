import path from "path";

import {
  Environment,
  CachingNodeFileSystemLoader,
  type TemplateSource,
  RenderContext,
} from "./src/liquidscript";

class SnippetLoader extends CachingNodeFileSystemLoader {
  override async getSource(
    env: Environment,
    name: string,
    context?: RenderContext,
    options?: Record<string, unknown>,
  ): Promise<TemplateSource> {
    const tag = options?.tag;

    if (tag === "include" || tag === "render") {
      // Prepend "snippets" to name.
      return await super.getSource(
        env,
        path.join("snippets/", name),
        context,
        options,
      );
    }

    return await super.getSource(env, name, context, options);
  }

  override getSourceSync(
    env: Environment,
    name: string,
    context?: RenderContext,
    options?: Record<string, unknown>,
  ): TemplateSource {
    const tag = options?.tag;

    if (tag === "include" || tag === "render") {
      // Prepend "snippets" to name.
      return super.getSourceSync(
        env,
        path.join("snippets/", name),
        context,
        options,
      );
    }

    return super.getSourceSync(env, name, context, options);
  }
}
