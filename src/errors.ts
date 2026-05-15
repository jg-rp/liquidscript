import type { Token } from "./token";

export class LiquidError extends Error {
  constructor(override readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "LiquidError";
  }
}

export class TemplateError extends LiquidError {
  constructor(
    override readonly message: string,
    readonly token: Token,
    readonly source: string,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "TemplateError";
    // TODO: this.message = withErrorContext(message, token);
  }
}

export class TemplateSyntaxError extends TemplateError {
  constructor(
    override readonly message: string,
    override readonly token: Token,
    override readonly source: string,
  ) {
    super(message, token, source);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "TemplateSyntaxError";
    // TODO: this.message = withErrorContext(message, token);
  }
}

export class UnknownFilterError extends TemplateError {
  constructor(
    override readonly message: string,
    override readonly token: Token,
    override readonly source: string,
  ) {
    super(message, token, source);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "UnknownFilterError";
    // TODO: this.message = withErrorContext(message, token);
  }
}

export class DisabledTagError extends TemplateError {
  constructor(
    override readonly message: string,
    override readonly token: Token,
    override readonly source: string,
  ) {
    super(message, token, source);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "DisabledTagError";
    // TODO: this.message = withErrorContext(message, token);
  }
}

export class ArgumentError extends TemplateError {
  constructor(
    override readonly message: string,
    override readonly token: Token,
    override readonly source: string,
  ) {
    super(message, token, source);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "ArgumentError";
    // TODO: this.message = withErrorContext(message, token);
  }
}

export class TemplateTypeError extends TemplateError {
  constructor(
    override readonly message: string,
    override readonly token: Token,
    override readonly source: string,
  ) {
    super(message, token, source);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "TemplateTypeError";
    // TODO: this.message = withErrorContext(message, token);
  }
}

export class UndefinedVariableError extends TemplateError {
  constructor(
    override readonly message: string,
    override readonly token: Token,
    override readonly source: string,
  ) {
    super(message, token, source);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "UndefinedVariableError";
    // TODO: this.message = withErrorContext(message, token);
  }
}

export class NoSuchTemplateError extends TemplateError {
  constructor(
    override readonly message: string,
    override readonly token: Token,
    override readonly source: string,
  ) {
    super(message, token, source);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "NoSuchTemplateError";
    // TODO: this.message = withErrorContext(message, token);
  }
}

export class TemplateNotFoundError extends LiquidError {
  constructor(override readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "TemplateNotFoundError";
  }
}

export class ResourceLimitError extends LiquidError {
  constructor(override readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "ResourceLimitError";
  }
}

export class ContextDepthError extends ResourceLimitError {
  constructor(override readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "ContextDepthError";
  }
}
