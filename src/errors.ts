import { Token } from "./token";

export abstract class LiquidError extends Error {
  constructor(readonly message: string, readonly token: Token) {
    super(message);
  }
}

// TODO: review error names
// TODO: Wrap internal errors in user facing error with a token.

export class LiquidSyntaxError extends LiquidError {}
export class NoSuchTagError extends LiquidError {}
export class ContextDepthError extends LiquidError {}

export abstract class InternalLiquidError extends Error {}

export class InternalKeyError extends InternalLiquidError {}
export class InternalUndefinedError extends InternalLiquidError {}
export class MaxContextDepthError extends InternalLiquidError {}
export class TemplateNotFoundError extends InternalLiquidError {}
export class PushedTooFarError extends InternalLiquidError {}
export class NoSuchFilterError extends InternalLiquidError {}
export class FilterValueError extends InternalLiquidError {}

export class LiquidInterrupt extends InternalLiquidError {}
export class BreakIteration extends LiquidInterrupt {}
export class ContinueIteration extends LiquidInterrupt {}
