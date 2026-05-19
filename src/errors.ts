import type { RenderContext } from "./context";
import type { Token } from "./token";

export interface Diagnostic {
  span: Token;
  source: string;
  templateName: string;
  context?: RenderContext;
  code?: string; // Unused
  hint?: string; // Unused
}

export function formatDetailedMessage(err: DiagnosticError): string {
  const d = err.diagnostic;
  const lines = d.source.split(/\r?\n/);
  const [line, column] = lineCol(d.span.start, lines);
  const lineText = lines[line - 1] ?? "";
  const pointer =
    " ".repeat(column - 1) + "^".repeat(Math.max(d.span.end - d.span.start, 1));

  const location = d.templateName.length
    ? `${d.templateName}:${line}:${column}`
    : `${line}:${column}`;

  let out = "";

  if (d.code) {
    out += `[${d.code}] `;
  }

  out += `${err.label}: ${err.message}\n`;
  out += ` --> ${location}\n`;
  out += `  |\n`;
  out += `${String(line).padStart(2)} | ${lineText}\n`;
  out += `  | ${pointer}\n`;

  if (d.hint) {
    out += `  |\n`;
    out += `  = hint: ${d.hint}\n`;
  }

  return out;
}

export function lineCol(index: number, lines: string[]): [number, number] {
  let cumulativeLength = 0;
  let targetLineIndex = -1;

  for (const [i, line] of lines.entries()) {
    cumulativeLength += line.length;
    if (index < cumulativeLength) {
      targetLineIndex = i;
      break;
    }
  }

  if (targetLineIndex === -1) throw new LiquidError("index is out of bounds");

  const lineNumber = targetLineIndex + 1;
  const line = lines[targetLineIndex] || "";
  const columnNumber = index - (cumulativeLength - line.length);
  return [lineNumber, columnNumber];
}

export class LiquidError extends Error {
  constructor(override message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class DiagnosticError extends LiquidError {
  constructor(
    message: string,
    readonly diagnostic: Diagnostic,
  ) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, new.target);
    this.stack = undefined;
  }

  render(): string {
    return formatDetailedMessage(this);
  }

  get label(): string {
    return "error";
  }
}

export class DetailedLiquidError extends DiagnosticError {
  constructor(
    message: string,
    readonly span: Token,
    readonly source: string,
    readonly templateName: string,
  ) {
    super(message, { span, source, templateName });
  }
}

export class TemplateSyntaxError extends DetailedLiquidError {
  override get label(): string {
    return "syntax error";
  }
}
export class UnknownFilterError extends DetailedLiquidError {
  override get label(): string {
    return "unknown filter";
  }
}
export class DisabledTagError extends DetailedLiquidError {}

export class ArgumentError extends DetailedLiquidError {
  override get label(): string {
    return "argument error";
  }
}

export class TemplateTypeError extends DetailedLiquidError {
  override get label(): string {
    return "type error";
  }
}

export class UndefinedVariableError extends DetailedLiquidError {
  override get label(): string {
    return "name error";
  }
}

export class NoSuchTemplateError extends DetailedLiquidError {
  override get label(): string {
    return "template not found";
  }
}

export class TemplateNotFoundError extends LiquidError {}
export class ResourceLimitError extends LiquidError {}
export class ContextDepthError extends ResourceLimitError {}
