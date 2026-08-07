/* eslint-disable @typescript-eslint/no-explicit-any */
import * as readline from "node:readline";

import type {
  ErrorResponse,
  Handler,
  Message,
  Response,
  Request,
  RequestId,
} from "./types";

type PendingResponse = {
  resolve: (value: unknown) => void;
  reject: (reason: Error) => void;
  timer?: NodeJS.Timeout;
};

export type ServiceOptions = {
  /** Enable raw NDJSON incoming message logging to stderr */
  debug?: boolean;
};

/**
 * Bidirectional JSON-RPC conversation over stdin/stdout.
 */
export class JSONRPCService {
  private methods = new Map<string, Handler>();
  private pending = new Map<RequestId, PendingResponse>();
  private nextRequestId = 1;
  private isRunning = false;
  debug: boolean;

  constructor(options: ServiceOptions = {}) {
    this.debug = options.debug ?? false;
  }

  registerMethod<T>(
    name: string,
    guard: (params: unknown) => params is T,
    handler: (params: T) => Promise<unknown> | unknown,
  ): void {
    this.methods.set(name, async (params: unknown) => {
      if (!guard(params)) {
        this.sendError(
          null,
          -32602,
          `Invalid params payload for method '${name}'`,
        );
        return;
      }

      return handler(params);
    });
  }

  async listen(): Promise<void> {
    this.isRunning = true;

    const rl = readline.createInterface({
      input: process.stdin,
      terminal: false,
    });

    rl.on("close", () => this.stop());
    process.on("SIGINT", () => this.stop());
    process.on("SIGTERM", () => this.stop());

    try {
      for await (const line of rl) {
        if (!this.isRunning) break;
        const trimmed = line.trim();
        if (!trimmed) continue;

        // Log incoming payload in tagged NDJSON format for test extraction
        if (this.debug) {
          let parsedPayload: unknown = trimmed;
          try {
            parsedPayload = JSON.parse(trimmed);
          } catch {
            // Keep as raw string if it's malformed JSON
          }

          this.writeStderr({
            level: "debug",
            tag: "incoming_payload",
            payload: parsedPayload,
          });
        }

        this.handleRawLine(trimmed);
      }
    } catch (err) {
      this.logError("Fatal stdin read error", err);
    } finally {
      this.cleanup();
    }
  }

  sendRequest<T = unknown>(
    method: string,
    params?: unknown,
    timeoutMs = 5000,
  ): Promise<T> {
    const id = this.nextRequestId++;

    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        const errMsg = `RPC Request '${method}' (id: ${id}) timed out after ${timeoutMs}ms`;
        this.logError(errMsg, { method, id }, "timeout");
        reject(new Error(errMsg));
      }, timeoutMs);

      this.pending.set(id, {
        resolve: resolve as (val: unknown) => void,
        reject,
        timer,
      });

      const payload: Request = {
        jsonrpc: "2.0",
        id,
        method,
        params,
      };

      this.send(payload);
    });
  }

  sendResponse(id: RequestId, result: unknown): void {
    const payload: Response = {
      jsonrpc: "2.0",
      id,
      result,
    };
    this.send(payload);
  }

  sendError(
    id: RequestId,
    code: number,
    message: string,
    data?: unknown,
  ): void {
    this.logError(
      `Outgoing RPC Error (${code}): ${message}`,
      { id, code, data },
      "rpc_error",
    );

    const payload: ErrorResponse = {
      jsonrpc: "2.0",
      id,
      error: { code, message, data },
    };
    this.send(payload);
  }

  private send(msg: unknown): void {
    const serialized = JSON.stringify(msg) + "\n";
    process.stdout.write(serialized);
  }

  private handleRawLine(line: string): void {
    let payload: any;

    try {
      payload = JSON.parse(line);
    } catch (err) {
      this.sendError(null, -32700, `Parse error: ${err}`);
      return;
    }

    if (Array.isArray(payload)) {
      payload.forEach((msg) => this.routeMessage(msg));
    } else {
      this.routeMessage(payload);
    }
  }

  private routeMessage(msg: any): void {
    if (typeof msg.method === "string") {
      this.handleIncomingRequest(msg as Request);
      return;
    }

    if (
      msg.id !== undefined &&
      (msg.result !== undefined || msg.error !== undefined)
    ) {
      this.handleIncomingResponse(msg as Message);
      return;
    }

    this.sendError(msg.id ?? null, -32600, "Invalid Request structure");
  }

  private async handleIncomingRequest(req: Request): Promise<void> {
    const handler = this.methods.get(req.method);

    if (!handler) {
      if (req.id !== undefined) {
        this.sendError(req.id, -32601, `Method not found: ${req.method}`);
      } else {
        this.logError(
          `Unhandled notification method: ${req.method}`,
          { method: req.method },
          "unhandled_notification",
        );
      }
      return;
    }

    try {
      const result = await handler(req.params);

      if (req.id !== undefined && result) {
        this.sendResponse(req.id, result);
      }
    } catch (err: any) {
      const errorMsg = err["message"] || "Internal handler error";
      if (req.id !== undefined) {
        this.sendError(req.id, -32000, errorMsg, err);
      } else {
        this.logError(
          `Handler exception on notification '${req.method}'`,
          err,
          "handler_exception",
        );
      }
    }
  }

  private handleIncomingResponse(res: Message): void {
    if (res.id === null) return;

    const pendingReq = this.pending.get(res.id);
    if (!pendingReq) return;

    this.pending.delete(res.id);
    if (pendingReq.timer) clearTimeout(pendingReq.timer);

    if ("error" in res) {
      this.logError(
        `Peer Error (${res.error.code}) for request ${res.id}: ${res.error.message}`,
        res.error,
        "peer_error",
      );
      pendingReq.reject(
        new Error(`RPC Error (${res.error.code}): ${res.error.message}`),
      );
    } else {
      pendingReq.resolve(res.result);
    }
  }

  stop(): void {
    this.isRunning = false;
  }

  private cleanup(): void {
    for (const [id, pendingReq] of this.pending) {
      if (pendingReq.timer) clearTimeout(pendingReq.timer);
      const err = new Error("Session closed before response was received");
      this.logError(
        `Cancelling pending request ${id}`,
        { id },
        "session_cleanup",
      );
      pendingReq.reject(err);
    }
    this.pending.clear();
  }

  /** Write NDJSON to process.stderr */
  logError(message: string, details?: unknown, tag = "error"): void {
    this.writeStderr({
      level: "error",
      tag,
      message,
      details:
        details instanceof Error
          ? {
              name: details.name,
              message: details.message,
              stack: details.stack,
            }
          : details,
    });
  }

  private writeStderr(entry: Record<string, unknown>): void {
    const logObject = {
      timestamp: new Date().toISOString(),
      ...entry,
    };
    process.stderr.write(JSON.stringify(logObject) + "\n");
  }
}
