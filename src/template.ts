import {
  Context,
  ContextGlobals,
  ContextScope,
  isContextScope,
  DefaultContext,
  ReadOnlyChainMap,
} from "./context";
import { Environment } from "./environment";
import { Root } from "./ast";
import { DefaultOutputStream, RenderStream } from "./io/output_stream";
import {
  InternalLiquidError,
  LiquidError,
  LiquidInterrupt,
  LiquidSyntaxError,
} from "./errors";

export interface TemplateI {
  render(globals?: ContextGlobals): Promise<string>;
  renderWithContext(
    context: Context,
    out: RenderStream,
    blockScope: boolean,
    partial: boolean
  ): Promise<void>;
}

// TODO: upToDate

export class Template implements TemplateI {
  private environment: Environment;
  readonly tree: Root;
  readonly name: string;
  readonly globals: ContextScope;
  readonly matter: ContextScope;

  constructor(
    environment: Environment,
    tree: Root,
    name: string,
    globals?: ContextGlobals,
    matter?: ContextGlobals
  ) {
    this.environment = environment;
    this.tree = tree;
    this.name = name;
    this.globals =
      globals === undefined
        ? new Map<string, unknown>()
        : this.mapLike(globals);
    this.matter =
      matter === undefined ? new Map<string, unknown>() : this.mapLike(matter);
  }

  // TODO: Move current constructor to a factory function and make the
  // constructor equivalent to `fromString`.

  async render(globals: ContextGlobals = {}): Promise<string> {
    const context = new DefaultContext(
      this.environment,
      this.makeGlobals(globals),
      this.name
    );
    const outputStream = new DefaultOutputStream();
    await this.renderWithContext(context, outputStream);
    return outputStream.toString();
  }

  async renderWithContext(
    context: Context,
    outputStream: RenderStream,
    blockScope: boolean = false,
    partial: boolean = false
  ): Promise<void> {
    for (const node of this.tree.statements) {
      try {
        await node.render(context, outputStream);
      } catch (error) {
        if (error instanceof LiquidInterrupt) {
          if (!partial || blockScope) {
            this.environment.error(
              new LiquidSyntaxError(`unexpected ${error}`, node.token)
            );
          } else {
            throw error;
          }
        } else if (error instanceof InternalLiquidError) {
          this.environment.error(error.withToken(node.token, this.name));
        } else if (error instanceof LiquidError) {
          this.environment.error(error);
        } else {
          throw error;
        }
      }
    }
  }

  protected makeGlobals(templateGlobals: ContextGlobals): ContextScope {
    return new ReadOnlyChainMap(
      this.mapLike(templateGlobals),
      this.matter,
      this.globals
    );
  }

  protected mapLike(obj: ContextGlobals): ContextScope {
    if (isContextScope(obj)) return obj;
    return new Map<string, unknown>(Object.keys(obj).map((k) => [k, obj[k]]));
  }
}
