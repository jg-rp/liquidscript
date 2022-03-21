export const version = "__VERSION__";

export { RenderContext } from "./context";
export type {
  RenderContextOptions,
  ContextPath,
  ContextScope,
} from "./context";

export { Environment } from "./environment";
export type { EnvironmentOptions } from "./environment";

export { BufferedRenderStream } from "./io/output_stream";
export type { RenderStream } from "./io/output_stream";

export { Loader, TemplateSource } from "./loader";
export { Template } from "./template";
export { Undefined, LaxUndefined, StrictUndefined } from "./undefined";

export * from "./builtin";
export * as tokens from "./token";
export * from "./ast";
export * from "./drop";
export * from "./expression";
export * from "./number";
export * from "./parse";
export * from "./range";
export * from "./tag";
export * from "./errors";
export * as object from "./types";
export * as expressions from "./expressions";

// TODO: express interface
