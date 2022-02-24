import { Context, ContextScope } from "./context";
import { Environment } from "./environment";
import { TemplateNotFoundError } from "./errors";
import { Template } from "./template";

export class TemplateSource {
  readonly matter: ContextScope;

  constructor(
    readonly source: string,
    readonly name: string,
    matter?: ContextScope
  ) {
    this.matter = matter === undefined ? {} : matter;
  }
}

export abstract class Loader {
  abstract getSource(
    name: string,
    renderContext?: Context,
    loaderContext?: { [index: string]: unknown }
  ): Promise<TemplateSource>;

  abstract getSourceSync(
    name: string,
    renderContext?: Context,
    loaderContext?: { [index: string]: unknown }
  ): TemplateSource;

  public async load(
    name: string,
    environment: Environment,
    context?: Context,
    globals?: ContextScope,
    loaderContext?: { [index: string]: unknown }
  ): Promise<Template> {
    const source = await this.getSource(name, context, loaderContext);
    return environment.fromString(source.source, name, globals);
  }

  public loadSync(
    name: string,
    environment: Environment,
    context?: Context,
    globals?: ContextScope,
    loaderContext?: { [index: string]: unknown }
  ): Template {
    const source = this.getSourceSync(name, context, loaderContext);
    return environment.fromString(source.source, name, globals);
  }
}

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
