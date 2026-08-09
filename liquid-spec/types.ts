export type RequestId = string | number | null;

export type Request = {
  jsonrpc: "2.0";
  id?: RequestId;
  method: string;
  params?: unknown;
};

export type Response = {
  jsonrpc: "2.0";
  id: RequestId;
  result: unknown;
};

export type ErrorResponse = {
  jsonrpc: "2.0";
  id: RequestId;
  error: {
    code: number;
    message: string;
    data?: unknown;
  };
};

export type Message = Response | ErrorResponse;
export type Handler = (params: unknown) => Promise<unknown> | unknown;

export type InitializeParams = {
  version: string;
};

export type InitializeResult = {
  version: string;
  implementation: string;
  liquid_version: string;
  features: string[];
};

export type CompileParams = {
  template: string;
  options?: {
    error_mode: "strict2" | "strict" | "lax" | "raise" | "warn";
    line_numbers: boolean;
  };
  filesystem?: Record<string, string>;
};

export type CompileSuccessResult = {
  template_id: string;
};

export type CompileFailResult = {
  template_id: string;
  error: {
    type: string;
    message: string;
    line: number;
  };
};

export type RenderParams = {
  template_id: string;
  environment?: Record<string, unknown>;
  options?: { strict_errors: boolean };
  frozen_time?: string;
};

export type RenderResult = {
  output?: string;
  errors: RenderError[];
};

export type RenderError = {
  type: string;
  message: string;
  line: number;
};

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isObject(value: unknown): value is object {
  const _type = typeof value;
  return (value !== null && _type === "object") || _type === "function"
    ? true
    : false;
}

export function hasStringKey(
  value: unknown,
  key: string,
): value is { [key: string]: unknown } {
  return isObject(value) && Object.hasOwn(value, key);
}

export function isInitializeParams(obj: unknown): obj is InitializeParams {
  return hasStringKey(obj, "version") && isString(obj.version);
}

export function isCompileParams(obj: unknown): obj is CompileParams {
  return hasStringKey(obj, "template") && isString(obj.template);
}

export function isRenderParams(obj: unknown): obj is RenderParams {
  return hasStringKey(obj, "template_id") && isString(obj.template_id);
}

export function isQuitParams(obj: unknown): obj is null {
  return obj === null;
}
