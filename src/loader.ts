import { Context, ContextGlobals } from "./context";
import { Environment } from "./environment";
import { TemplateNotFoundError } from "./errors";
import { TemplateI } from "./template";

export class TemplateSource {
  readonly matter: ContextGlobals;

  constructor(
    readonly source: string,
    readonly name: string,
    matter?: ContextGlobals
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

  public async load(
    name: string,
    environment: Environment,
    context?: Context,
    globals?: ContextGlobals,
    loaderContext?: { [index: string]: unknown }
  ): Promise<TemplateI> {
    const source = await this.getSource(name, context, loaderContext);
    return environment.fromString(source.source, name, globals);
  }
}

export class MapLoader extends Loader {
  private _map: Map<string, string>;

  constructor(private map?: Map<string, string>) {
    super();
    this._map = map === undefined ? new Map<string, string>() : map;
  }
  async getSource(name: string): Promise<TemplateSource> {
    const source = this._map.get(name);
    if (source !== undefined) return new TemplateSource(source, name);
    throw new TemplateNotFoundError(name);
  }
}
