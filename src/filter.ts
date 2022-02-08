import { Context } from "./context";

export type FilterContext = { context: Context };

export type Filter = {
  (left: unknown, ...args: unknown[]): unknown;
};
