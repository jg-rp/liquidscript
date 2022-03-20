import { TemplateNotFoundError } from "../../errors";
import { Loader, TemplateSource } from "../../loader";

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
