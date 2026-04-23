import type { RenderContext } from "./context";

export type Filter = {
  (this: FilterContext, left: unknown, ...args: unknown[]): unknown;
};

export type FilterContext = {
  /**
   * The active render context.
   */
  context: RenderContext;

  /**
   * Keyword/named filter arguments. As used by the `default` filter.
   */
  options: { [index: string]: unknown };
};
