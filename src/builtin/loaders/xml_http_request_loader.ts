import { TemplateNotFoundError } from "../../errors";
import { Loader, TemplateSource } from "../../loader";

export type XMLHttpRequestLoaderOptions = {
  /**
   * Indicates if the loader should bust the browser's cache by
   * appending the current timestamp to each URL as a query string
   * parameter.
   */
  bustBrowserCache?: boolean;
};

/**
 * A template loader that uses XMLHttpRequest to fetch templates.
 */
export class XMLHttpRequestLoader extends Loader {
  readonly baseURL: string;
  readonly bustBrowserCache: boolean;

  /**
   * The `XMLHttpRequestLoader` constructor.
   *
   * @param baseURL - The base URL from which to fetch templates from.
   * @param options - Loader options.
   */
  constructor(baseURL: string, options: XMLHttpRequestLoaderOptions = {}) {
    super();
    this.baseURL = baseURL;
    this.bustBrowserCache = options.bustBrowserCache ?? true;
  }

  async getSource(name: string): Promise<TemplateSource> {
    const url = this.url(name);
    const request = await this.fetch(url);

    if (request.status === 0 || request.status === 200) {
      return new TemplateSource(request.responseText, name);
    }

    throw new TemplateNotFoundError(`${url} (${request.status})`);
  }

  getSourceSync(name: string): TemplateSource {
    const url = this.url(name);
    const request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();

    if (request.status === 0 || request.status === 200) {
      return new TemplateSource(request.responseText, name);
    }

    throw new TemplateNotFoundError(`${url} (${request.status})`);
  }

  protected url(name: string): string {
    const url = this.baseURL + "/" + name;
    if (this.bustBrowserCache) {
      return (
        url +
        (url.indexOf("?") === -1 ? "?" : "&") +
        "s=" +
        new Date().getTime()
      );
    }
    return url;
  }

  protected fetch(url: string): Promise<XMLHttpRequest> {
    return new Promise((resolve) => {
      const request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.onload = () => resolve(request);
      request.send();
    });
  }
}
