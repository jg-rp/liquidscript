import type { TemplateSource } from "../dist/liquidscript";
import path from "path";
import {
  Environment,
  LiquidError,
  ObjectLoader,
  TemplateNotFoundError,
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

class CustomObjectLoader extends ObjectLoader {
  override getSourceSync(env: Environment, name: string): TemplateSource {
    const source = this.obj[this.withFileExtension(name)];
    if (source) return { source, name };
    throw new TemplateNotFoundError(name);
  }

  withFileExtension(name: string): string {
    return path.extname(name) ? name : name + ".liquid";
  }
}

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
          loader: new CustomObjectLoader(params.filesystem || {}),
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
            line: -1,
          },
        };
      } else {
        return {
          template_id: id,
          error: {
            type: "unexpected",
            message: `${err}`,
            line: -1,
          },
        };
      }
    }
  }

  override async render(params: RenderParams): Promise<RenderResult> {
    const template = this.templates.get(params.template_id);

    if (!template) {
      return {
        output: "",
        errors: [
          {
            type: "render_error",
            message: `unknown template id ${params.template_id}`,
            line: -1,
          },
        ],
      };
    }

    try {
      return {
        output: template?.renderSync(params.environment || {}),
        errors: [],
      };
    } catch (err) {
      if (err instanceof LiquidError) {
        return {
          output: "",
          errors: [
            {
              type: err.constructor.name,
              message: err.message,
              line: -1,
            },
          ],
        };
      } else {
        return {
          output: "",
          errors: [
            {
              type: "unexpected",
              message: `${err}`,
              line: -1,
            },
          ],
        };
      }
    }
  }
}
