import type { Token } from "./token";

export class TemplateError extends Error {
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
