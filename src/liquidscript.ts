export { Environment } from "./environment";
export type { EnvironmentOptions } from "./environment";
export { Template } from "./template";
export { RenderContext } from "./context";
export { Loader, MapLoader, ObjectLoader, TemplateSource } from "./loader";
export { LaxUndefined, StrictUndefined } from "./undefined";

// TODO: export all tags
// TODO: export all filters
// TODO: export utilities
export * as tokens from "./token";

// XXX: think about export api
export * from "./errors";
export * as object from "./types";

import { ExpressionTokenStream } from "./expressions/tokens";
import { parseIdentifier, parseIntegerLiteral } from "./expressions/common";
import { tokenize as tokenizeFilteredExpression } from "./expressions/filtered/lex";
import { RE as RE_FILTERED_EXPRESSION } from "./expressions/filtered/lex";
import * as expressionTokens from "./expressions/tokens";

export const expressions = {
  ExpressionTokenStream,
  parseIdentifier,
  parseIntegerLiteral,
  tokenizeFilteredExpression,
  tokens: expressionTokens,
  RE_FILTERED_EXPRESSION,
};
