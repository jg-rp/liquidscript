import { Token } from "./token";

// We're manually setting the prototype for each error subclass. See
// https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work

export abstract class LiquidError extends Error {
  constructor(readonly message: string, readonly token: Token) {
    super(message);
    Object.setPrototypeOf(this, LiquidError.prototype);
  }
}

// TODO: review error names
// TODO: Wrap internal errors in user facing error with a token.

export class LiquidSyntaxError extends LiquidError {}
export class NoSuchTagError extends LiquidError {}
export class ContextDepthError extends LiquidError {}

export abstract class InternalLiquidError extends Error {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, InternalLiquidError.prototype);
  }
}

export class InternalKeyError extends InternalLiquidError {}
export class InternalUndefinedError extends InternalLiquidError {}
export class MaxContextDepthError extends InternalLiquidError {}
export class TemplateNotFoundError extends InternalLiquidError {}
export class PushedTooFarError extends InternalLiquidError {}
export class NoSuchFilterError extends InternalLiquidError {}

export class FilterValueError extends InternalLiquidError {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, FilterValueError.prototype);
  }
}

export class FilterArgumentError extends InternalLiquidError {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, FilterArgumentError.prototype);
  }
}

export class LiquidTypeError extends InternalLiquidError {}

export class LiquidInterrupt extends InternalLiquidError {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, LiquidInterrupt.prototype);
  }
}
export class BreakIteration extends LiquidInterrupt {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, BreakIteration.prototype);
  }
}
export class ContinueIteration extends LiquidInterrupt {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, ContinueIteration.prototype);
  }
}
