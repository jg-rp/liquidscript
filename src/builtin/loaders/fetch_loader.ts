import { TemplateNotFoundError } from "../../errors";
import { Loader, TemplateSource } from "../../loader";

type RequestCache =
  | "default"
  | "force-cache"
  | "no-cache"
  | "no-store"
  | "only-if-cached"
  | "reload";

type RequestCredentials = "include" | "omit" | "same-origin";

type RequestMode = "same-origin" | "cors" | "navigate" | "no-cors";

type HeadersInit = string[][] | Record<string, string> | Headers;

declare let Headers: {
  prototype: Headers;
  new (init?: HeadersInit): Headers;
};

type init = {
  cache: RequestCache;
  credentials: RequestCredentials;
  headers: Headers;
  method: "GET" | "POST";
  mode: RequestMode;
};

/**
 * Options for the `FetchLoader` template loader.
 */
export type FetchLoaderOptions = {
  /**
   * A string indicating requests will interact with the browser's
   * HTTP cache. Defaults to `"default"`.
   */
  cache?: RequestCache;

  /**
   * Include or exclude credentials when requesting template sources.
   * Defaults to `"same-origin"`.
   */
  credentials?: RequestCredentials;

  /**
   * Headers to include in each request.
   */
  headers?: Headers;

  /**
   * Request mode. Defaults to `"cors"`.
   */
  mode?: RequestMode;
};

/**
 * A template loader that fetches templates using the Fetch API.
 *
 * This is an async only loader. Expect an error when using this
 * loader with `getSourceSync()` and `Environment.getTemplateSync()`.
 *
 * This loader treats the response body as text that is the template
 * source code. You might need to write a custom loader to handle
 * JSON responses, for example.
 */
export class FetchLoader extends Loader {
  readonly baseURL: string;
  #init: init;

  /**
   * The `FetchLoader` constructor. Creates a new `FetchLoader`.
   *
   * @param baseURL - The base URL from which to fetch templates
   * from.
   * @param options - Loader options. Most of which are passed
   * through to the Fetch API's `Request` constructor.
   */
  constructor(baseURL: string, options: FetchLoaderOptions = {}) {
    super();
    this.baseURL = baseURL;
    this.#init = {
      cache: options.cache ?? "default",
      credentials: options.credentials ?? "same-origin",
      headers: options.headers ?? new Headers(),
      method: "GET",
      mode: options.mode ?? "cors",
    };
  }

  async getSource(name: string): Promise<TemplateSource> {
    const url = `${this.baseURL}/${name}`;
    const request = new Request(url, this.#init);
    const response = await fetch(request);
    if (!response.ok)
      throw new TemplateNotFoundError(`${url} (${response.status})`);
    return new TemplateSource(await response.text(), name);
  }

  getSourceSync(): TemplateSource {
    throw new Error(
      "synchronous loading is not available when using FetchLoader",
    );
  }
}
