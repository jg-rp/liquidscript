import {
  Environment,
  LiquidError,
  ObjectLoader,
  type Template,
} from "../dist/liquidscript.esm";
import { LiquidSpecSession } from "./session";
import type {
  CompileParams,
  CompileSuccessResult,
  CompileFailResult,
  RenderParams,
  RenderResult,
} from "./types";

export class LiquidscriptSession extends LiquidSpecSession {
  private templates: Map<string, Template>;
  private nextTemplateId: number = 1;

  constructor() {
    super({
      packageName: "liquidscript",
      packageVersion: "dev",
      debug: false,
    });

    this.templates = new Map();
  }

  override async compile(
    params: CompileParams,
  ): Promise<CompileSuccessResult | CompileFailResult> {
    const id = `${this.nextTemplateId}`;
    this.nextTemplateId += 1;

    try {
      this.templates.set(
        id,
        new Environment({
          loader: new ObjectLoader(params.filesystem || {}),
        }).parse(params.template),
      );

      return {
        template_id: id,
      };
    } catch (err) {
      if (err instanceof LiquidError) {
        return {
          template_id: id,
          error: {
            type: err.constructor.name,
            message: err.message,
            line: -1, // TODO:
          },
        };
      } else {
        return {
          template_id: id,
          error: {
            type: "unexpected",
            message: `${err}`,
            line: -1, // TODO:
          },
        };
      }
    }
  }

  override async render(params: RenderParams): Promise<RenderResult> {
    throw new Error("TODO");
  }
}
