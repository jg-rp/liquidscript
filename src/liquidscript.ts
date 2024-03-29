export const version = "__VERSION__";

export { RenderContext } from "./context";
export type { RenderContextOptions, ContextPath } from "./context";
export * from "./chain_object";

export type { ContextScope } from "./types";

export { Environment } from "./environment";
export type { EnvironmentOptions, TemplateContext } from "./environment";

export { BufferedRenderStream } from "./io/output_stream";
export type { RenderStream } from "./io/output_stream";

export { Loader, TemplateSource } from "./loader";
export { Template } from "./template";
export type {
  TemplateAnalysis,
  TemplateAnalysisOptions,
  VariableRefs,
  VariableLocation,
  VariableLocations,
} from "./static_analysis";
export {
  Undefined,
  LaxUndefined,
  StrictUndefined,
  FalsyStrictUndefined,
} from "./undefined";

export { Markup } from "./builtin/drops/markup";

export * from "./builtin";
export * as tokens from "./token";
export * from "./ast";
export * from "./cache";
export * from "./drop";
export * from "./expression";
export * from "./filter";
export * from "./number";
export * from "./parse";
export * from "./range";
export * from "./tag";
export * from "./errors";
export * as object from "./types";
export * as expressions from "./expressions";
export * as extra from "./extra";

// TODO: express interface
