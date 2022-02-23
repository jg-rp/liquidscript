import { Token } from "./token";

// We're manually setting the prototype for each error subclass. See
// https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work

export class LiquidError extends Error {
  constructor(public message: string, token: Token, templateName?: string) {
    super(message);
    Object.setPrototypeOf(this, LiquidError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LiquidError);
    }
    this.name = "LiquidError";
    this.message = _message(message, token, templateName);
  }
}

// TODO: review error names

export class LiquidSyntaxError extends LiquidError {
  constructor(public message: string, token: Token) {
    super(message, token);
    Object.setPrototypeOf(this, LiquidSyntaxError.prototype);
  }
}

export class LiquidTypeError extends LiquidError {
  constructor(public message: string, token: Token, templateName?: string) {
    super(message, token);
    Object.setPrototypeOf(this, LiquidTypeError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LiquidTypeError);
    }
    this.name = "LiquidTypeError";
    this.message = _message(message, token, templateName);
  }
}

export class LiquidFilterValueError extends LiquidError {
  constructor(public message: string, token: Token) {
    super(message, token);
    Object.setPrototypeOf(this, LiquidFilterValueError.prototype);
  }
}

export class LiquidFilterArgumentError extends LiquidError {
  constructor(public message: string, token: Token) {
    super(message, token);
    Object.setPrototypeOf(this, LiquidFilterArgumentError.prototype);
  }
}

export class NoSuchTagError extends LiquidError {
  constructor(public message: string, token: Token) {
    super(message, token);
    Object.setPrototypeOf(this, NoSuchTagError.prototype);
  }
}

export class NoSuchFilterError extends LiquidError {
  constructor(public message: string, token: Token) {
    super(message, token);
    Object.setPrototypeOf(this, NoSuchFilterError.prototype);
  }
}

export class ContextDepthError extends LiquidError {
  constructor(public message: string, token: Token) {
    super(message, token);
    Object.setPrototypeOf(this, ContextDepthError.prototype);
  }
}

export class LiquidUndefinedError extends LiquidError {
  constructor(public message: string, token: Token, templateName?: string) {
    super(message, token);
    Object.setPrototypeOf(this, LiquidUndefinedError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LiquidUndefinedError);
    }
    this.name = "LiquidUndefinedError";
    this.message = _message(`'${message}' is undefined`, token, templateName);
  }
}

export class NoSuchTemplateError extends LiquidError {
  constructor(public message: string, token: Token) {
    super(message, token);
    Object.setPrototypeOf(this, NoSuchTemplateError.prototype);
  }
}

export class OrphanedBreakTagError extends LiquidError {
  constructor(public message: string, token: Token) {
    super(message, token);
    Object.setPrototypeOf(this, OrphanedBreakTagError.prototype);
  }
}

export class OrphanedContinueTagError extends LiquidError {
  constructor(public message: string, token: Token) {
    super(message, token);
    Object.setPrototypeOf(this, OrphanedContinueTagError.prototype);
  }
}

export abstract class InternalLiquidError extends Error {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, InternalLiquidError.prototype);
  }

  abstract withToken(token: Token, templateName?: string): LiquidError;
}

export class InternalKeyError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, InternalKeyError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new LiquidUndefinedError(this.message, token);
  }
}

export class InternalUndefinedError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, InternalUndefinedError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new LiquidUndefinedError(this.message, token, templateName);
  }
}

export class MaxContextDepthError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, MaxContextDepthError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new ContextDepthError(this.message, token);
  }
}

export class TemplateNotFoundError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, TemplateNotFoundError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new NoSuchTemplateError(this.message, token);
  }
}

export class PushedTooFarError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, PushedTooFarError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new LiquidError(this.message, token);
  }
}

export class FilterNotFoundError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, FilterNotFoundError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new NoSuchFilterError(this.message, token);
  }
}

export class FilterValueError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, FilterValueError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new LiquidFilterValueError(this.message, token);
  }
}

export class FilterArgumentError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, FilterArgumentError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new LiquidFilterArgumentError(this.message, token);
  }
}

export class InternalTypeError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, InternalTypeError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new LiquidTypeError(this.message, token, templateName);
  }
}

export abstract class LiquidInterrupt extends Error {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, LiquidInterrupt.prototype);
  }
}

export class BreakIteration extends LiquidInterrupt {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BreakIteration.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new OrphanedBreakTagError(this.message, token);
  }
}

export class ContinueIteration extends LiquidInterrupt {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, ContinueIteration.prototype);
  }
  public withToken(token: Token, templateName?: string): LiquidError {
    return new OrphanedContinueTagError(this.message, token);
  }
}

function _message(
  message: string,
  token: Token,
  templateName?: string
): string {
  return `${message} (${templateName || "unknown"}:${token.lineNumber()})`;
}
