import { JSONRPCService } from "./service";
import {
  isCompileParams,
  isInitializeParams,
  isQuitParams,
  isRenderParams,
  type CompileFailResult,
  type CompileParams,
  type CompileSuccessResult,
  type InitializeParams,
  type InitializeResult,
  type RenderParams,
  type RenderResult,
} from "./types";

export type SessionOptions = {
  packageName: string;
  packageVersion: string;
  debug?: boolean;
};

export abstract class LiquidSpecSession {
  packageName: string;
  packageVersion: string;

  protected service: JSONRPCService;

  constructor(options: SessionOptions) {
    this.packageName = options.packageName;
    this.packageVersion = options.packageVersion;

    this.service = new JSONRPCService({ debug: options.debug ?? false });

    this.service.registerMethod(
      "initialize",
      isInitializeParams,
      this.initialize.bind(this),
    );

    this.service.registerMethod(
      "compile",
      isCompileParams,
      this.compile.bind(this),
    );

    this.service.registerMethod(
      "render",
      isRenderParams,
      this.render.bind(this),
    );

    this.service.registerMethod("quit", isQuitParams, this.quit.bind(this));
  }

  async listen(): Promise<void> {
    await this.service.listen();
  }

  async initialize(params: InitializeParams): Promise<InitializeResult> {
    return {
      version: params.version,
      implementation: this.packageName,
      liquid_version: this.packageVersion,
      features: [], // Ignoring this for now.
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async quit(params: unknown): Promise<void> {
    this.service.stop();
  }

  abstract compile(
    params: CompileParams,
  ): Promise<CompileSuccessResult | CompileFailResult>;

  abstract render(params: RenderParams): Promise<RenderResult>;
}
