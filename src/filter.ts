import { Context } from "./context";

export type FilterContext = {
  context: Context;
  options: { [index: string]: unknown };
};

export type Filter = {
  (left: unknown, ...args: unknown[]): unknown;
};
