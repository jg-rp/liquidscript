import type { RenderContext } from "./context";
import type { Token } from "./token";

export type Filter = {
  (this: FilterContext, left: unknown, ...args: unknown[]): unknown;
};

export type FilterContext = {
  /**
   * The active render context.
   */
  context: RenderContext;

  /**
   * A span into the source string covering the filter.
   */
  span: Token;

  /**
   * Keyword/named filter arguments. As used by the `default` filter.
   */
  options: { [index: string]: unknown };
};
