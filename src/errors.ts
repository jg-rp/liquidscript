import { Token } from "./token";

// We're manually setting the prototype for each error subclass. See
// https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work

/**
 * The base class for all user-facing Liquid errors.
 */
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

/**
 * An error thrown when a template syntax error is found.
 */
export class LiquidSyntaxError extends LiquidError {
  originalMessage: string;
  token: Token;

  constructor(public message: string, token: Token, templateName?: string) {
    super(message, token);
    Object.setPrototypeOf(this, LiquidSyntaxError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LiquidSyntaxError);
    }
    this.name = "LiquidSyntaxError";
    this.originalMessage = message;
    this.message = _message(message, token, templateName);
    this.token = token;
  }

  public withTemplateName(templateName?: string): LiquidSyntaxError {
    return new LiquidSyntaxError(
      this.originalMessage,
      this.token,
      templateName
    );
  }
}

/**
 * An error thrown when a tag or filter are given an argument of an unacceptable type.
 */
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

/**
 * An error thrown when there's a problem with a filter's left value.
 */
export class LiquidFilterValueError extends LiquidError {
  constructor(public message: string, token: Token, templateName?: string) {
    super(message, token, templateName);
    Object.setPrototypeOf(this, LiquidFilterValueError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LiquidFilterValueError);
    }
    this.name = "LiquidFilterValueError";
    this.message = _message(message, token, templateName);
  }
}

/**
 * An error thrown when there's a problem with one or more filter arguments.
 */
export class LiquidFilterArgumentError extends LiquidError {
  constructor(public message: string, token: Token, templateName?: string) {
    super(message, token, templateName);
    Object.setPrototypeOf(this, LiquidFilterArgumentError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LiquidFilterArgumentError);
    }
    this.name = "LiquidFilterArgumentError";
    this.message = _message(message, token, templateName);
  }
}

/**
 * An error thrown when a template contains an unregistered tag.
 */
export class NoSuchTagError extends LiquidError {
  constructor(public message: string, token: Token, templateName?: string) {
    super(message, token);
    Object.setPrototypeOf(this, NoSuchTagError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoSuchTagError);
    }
    this.name = "NoSuchTagError";
    this.message = _message(message, token, templateName);
  }
}

/**
 * An error thrown when a template uses an unregistered filter.
 */
export class NoSuchFilterError extends LiquidError {
  constructor(public message: string, token: Token, templateName?: string) {
    super(message, token);
    Object.setPrototypeOf(this, NoSuchFilterError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoSuchFilterError);
    }
    this.name = "NoSuchFilterError";
    this.message = _message(message, token, templateName);
  }
}

/**
 * An error thrown when a render context is copied or extended too many times.
 */
export class ContextDepthError extends LiquidError {
  constructor(public message: string, token: Token, templateName?: string) {
    super(message, token);
    Object.setPrototypeOf(this, ContextDepthError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ContextDepthError);
    }
    this.name = "ContextDepthError";
    this.message = _message(message, token, templateName);
  }
}

/**
 * An error thrown when a render context's local namespace limit is reached.
 */
export class LocalNamespaceLimitError extends LiquidError {
  constructor(public message: string, token: Token, templateName?: string) {
    super(message, token);
    Object.setPrototypeOf(this, LocalNamespaceLimitError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LocalNamespaceLimitError);
    }
    this.name = "LocalNamespaceLimitError";
    this.message = _message(message, token, templateName);
  }
}

/**
 * An error thrown when the loop iteration limit is reached.
 */
export class LoopIterationLimitError extends LiquidError {
  constructor(public message: string, token: Token, templateName?: string) {
    super(message, token);
    Object.setPrototypeOf(this, LoopIterationLimitError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LoopIterationLimitError);
    }
    this.name = "LoopIterationLimitError";
    this.message = _message(message, token, templateName);
  }
}

/**
 * An error thrown by the {@link StrictUndefined} class.
 */
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

/**
 * An error thrown when a template loader can not locate a template.
 */
export class NoSuchTemplateError extends LiquidError {
  constructor(public message: string, token: Token, templateName?: string) {
    super(message, token);
    Object.setPrototypeOf(this, NoSuchTemplateError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoSuchTemplateError);
    }
    this.name = "NoSuchTemplateError";
    this.message = _message(message, token, templateName);
  }
}

/**
 * An error thrown when a `break` tag appears outside an `if` tag.
 */
export class OrphanedBreakTagError extends LiquidError {
  constructor(public message: string, token: Token, templateName?: string) {
    super(message, token);
    Object.setPrototypeOf(this, OrphanedBreakTagError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, OrphanedBreakTagError);
    }
    this.name = "OrphanedBreakTagError";
    this.message = _message(message, token, templateName);
  }
}

/**
 * An error thrown when a `continue` tag appears outside an `if` tag.
 */
export class OrphanedContinueTagError extends LiquidError {
  constructor(public message: string, token: Token, templateName?: string) {
    super(message, token);
    Object.setPrototypeOf(this, OrphanedContinueTagError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, OrphanedContinueTagError);
    }
    this.name = "OrphanedContinueTagError";
    this.message = _message(message, token, templateName);
  }
}

/**
 * An error thrown when tag is used in a render context where such tags are
 * disabled.
 */
export class DisabledTagError extends LiquidError {
  constructor(public message: string, token: Token, templateName?: string) {
    super(message, token);
    Object.setPrototypeOf(this, DisabledTagError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DisabledTagError);
    }
    this.name = "DisabledTagError";
    this.message = _message(message, token, templateName);
  }
}

/**
 * The base class for all internal Liquid errors.
 */
export abstract class InternalLiquidError extends Error {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, InternalLiquidError.prototype);
  }

  abstract withToken(token: Token, templateName?: string): LiquidError;
}

/**
 * An error thrown when someone tries to set a property on an {@link ObjectChain}.
 */
export class ReadOnlyObjectChainError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, ReadOnlyObjectChainError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new LiquidError(this.message, token, templateName);
  }
}

/**
 * An error thrown when a render context can not resolve a variable name and path.
 */
export class InternalKeyError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, InternalKeyError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new LiquidUndefinedError(this.message, token, templateName);
  }
}

/**
 * An error thrown by a Liquid {@link Drop} dispatch method if a name does not exist.
 */
export class LiquidKeyError extends InternalKeyError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, LiquidKeyError.prototype);
  }
}

/**
 * An error thrown by the {@link StrictUndefined} type.
 */
export class InternalUndefinedError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, InternalUndefinedError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new LiquidUndefinedError(this.message, token, templateName);
  }
}

/**
 * An error thrown when a render context is copied or extended too many times.
 */
export class MaxContextDepthError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, MaxContextDepthError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new ContextDepthError(this.message, token, templateName);
  }
}

/**
 * An error thrown when a render context's local namespace exceeds its limit.
 */
export class MaxLocalNamespaceLimitError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, MaxLocalNamespaceLimitError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new LocalNamespaceLimitError(this.message, token, templateName);
  }
}

/**
 * An error thrown when the loop iteration limit is reached.
 */
export class MaxLoopIterationLimitError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, MaxLoopIterationLimitError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new LoopIterationLimitError(this.message, token, templateName);
  }
}

/**
 * An error thrown when a template loader can not locate a template.
 */
export class TemplateNotFoundError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, TemplateNotFoundError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new NoSuchTemplateError(this.message, token, templateName);
  }
}

/**
 * An error thrown by an {@link ExpressionTokenStream} if too many tokens are
 * pushed back onto the stream.
 */
export class PushedTooFarError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, PushedTooFarError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new LiquidError(this.message, token, templateName);
  }
}

/**
 * An error thrown when a template uses an unregistered filter.
 */
export class FilterNotFoundError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, FilterNotFoundError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new NoSuchFilterError(this.message, token, templateName);
  }
}

/**
 * An error thrown when there's a problem with a filter's left value.
 */
export class FilterValueError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, FilterValueError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new LiquidFilterValueError(this.message, token, templateName);
  }
}

/**
 * An error thrown when there's a problem with one or more filter arguments.
 */
export class FilterArgumentError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, FilterArgumentError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new LiquidFilterArgumentError(this.message, token, templateName);
  }
}

/**
 * An error thrown when a tag or filter are given an argument of an unacceptable type.
 */
export class InternalTypeError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, InternalTypeError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new LiquidTypeError(this.message, token, templateName);
  }
}

export class InternalSyntaxError extends InternalLiquidError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, InternalSyntaxError.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new LiquidSyntaxError(this.message, token, templateName);
  }
}

export abstract class LiquidInterrupt extends Error {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, LiquidInterrupt.prototype);
  }
}

/**
 * An error thrown to indicate a Liquid for loop should be broken.
 */
export class BreakIteration extends LiquidInterrupt {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BreakIteration.prototype);
  }

  public withToken(token: Token, templateName?: string): LiquidError {
    return new OrphanedBreakTagError(this.message, token, templateName);
  }
}

/**
 * An error thrown to indicate a Liquid for loop should continue to the next iteration.
 */
export class ContinueIteration extends LiquidInterrupt {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, ContinueIteration.prototype);
  }
  public withToken(token: Token, templateName?: string): LiquidError {
    return new OrphanedContinueTagError(this.message, token, templateName);
  }
}

function _message(
  message: string,
  token: Token,
  templateName?: string
): string {
  return `${message} (${templateName || "<string>"}:${token.lineNumber()})`;
}

/**
 * An error thrown during static template analysis. Indicates a `Node` or `Expression`
 * could not be visited.
 */
export class TemplateTraversalError extends Error {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, TemplateTraversalError.prototype);
  }
}
