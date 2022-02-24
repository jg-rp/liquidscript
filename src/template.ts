import { ContextScope, Context } from "./context";
import { Environment } from "./environment";
import { Node, Root } from "./ast";
import { DefaultOutputStream, RenderStream } from "./io/output_stream";
import {
  InternalLiquidError,
  LiquidError,
  LiquidInterrupt,
  LiquidSyntaxError,
} from "./errors";
import { chainObjects } from "./chainObject";

// TODO: upToDate

export class Template {
  private environment: Environment;
  readonly tree: Root;
  readonly name: string;
  readonly globals: ContextScope;
  readonly matter: ContextScope;

  constructor(
    environment: Environment,
    tree: Root,
    name: string,
    globals?: ContextScope,
    matter?: ContextScope
  ) {
    this.environment = environment;
    this.tree = tree;
    this.name = name;
    this.globals = globals === undefined ? {} : globals;
    this.matter = matter === undefined ? {} : matter;
  }

  // TODO: Move current constructor to a factory function and make the
  // constructor equivalent to `fromString`.

  public async render(globals: ContextScope = {}): Promise<string> {
    const context = new Context(
      this.environment,
      this.makeGlobals(globals),
      this.name
    );
    const outputStream = new DefaultOutputStream();
    await this.renderWithContext(context, outputStream);
    return outputStream.toString();
  }

  public renderSync(globals: ContextScope = {}): string {
    const context = new Context(
      this.environment,
      this.makeGlobals(globals),
      this.name
    );
    const outputStream = new DefaultOutputStream();
    this.renderWithContextSync(context, outputStream);
    return outputStream.toString();
  }

  protected handleError(
    error: unknown,
    node: Node,
    blockScope: boolean,
    partial: boolean
  ): void {
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

  public async renderWithContext(
    context: Context,
    outputStream: RenderStream,
    blockScope: boolean = false,
    partial: boolean = false
  ): Promise<void> {
    for (const node of this.tree.statements) {
      try {
        await node.render(context, outputStream);
      } catch (error) {
        this.handleError(error, node, blockScope, partial);
      }
    }
  }

  public renderWithContextSync(
    context: Context,
    outputStream: RenderStream,
    blockScope: boolean = false,
    partial: boolean = false
  ): void {
    for (const node of this.tree.statements) {
      try {
        node.renderSync(context, outputStream);
      } catch (error) {
        this.handleError(error, node, blockScope, partial);
      }
    }
  }

  protected makeGlobals(templateGlobals: ContextScope): ContextScope {
    return chainObjects(templateGlobals, this.matter, this.globals);
  }
}
