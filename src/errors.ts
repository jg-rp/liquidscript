import type { Token } from "./token";

export class TemplateError extends Error {
  constructor(
    override readonly message: string,
    readonly token: Token,
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
  ) {
    super(message, token);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "TemplateSyntaxError";
    // TODO: this.message = withErrorContext(message, token);
  }
}

export class UnknownFilterError extends TemplateError {
  constructor(
    override readonly message: string,
    override readonly token: Token,
  ) {
    super(message, token);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "UnknownFilterError";
    // TODO: this.message = withErrorContext(message, token);
  }
}
