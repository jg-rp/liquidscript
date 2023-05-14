import { TemplateNotFoundError } from "../../errors";
import { Loader, TemplateSource } from "../../loader";

/**
 * A loader that uses a Map of strings to store template source Text.
 */
export class MapLoader extends Loader {
  #templateMap: Map<string, string>;

  constructor(map?: Map<string, string>) {
    super();
    this.#templateMap = map === undefined ? new Map<string, string>() : map;
  }

  public async getSource(name: string): Promise<TemplateSource> {
    return this.getSourceSync(name);
  }

  public getSourceSync(name: string): TemplateSource {
    const source = this.#templateMap.get(name);
    if (source === undefined) throw new TemplateNotFoundError(name);
    return new TemplateSource(source, name);
  }
}
