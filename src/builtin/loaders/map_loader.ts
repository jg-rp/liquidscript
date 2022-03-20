import { TemplateNotFoundError } from "../../errors";
import { Loader, TemplateSource } from "../../loader";

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
