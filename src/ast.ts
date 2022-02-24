import { Context } from "./context";
import { InternalLiquidError } from "./errors";
import { RenderStream } from "./io/output_stream";
import { Token } from "./token";

export interface Node {
  readonly token: Token;
  render(context: Context, out: RenderStream): Promise<void>;
  renderSync(context: Context, out: RenderStream): void;
  branches(): Node[];
}

export class Root {
  public statements: Node[] = [];
}

export class BlockNode implements Node {
  constructor(readonly token: Token, public statements: Node[] = []) {}

  public async render(context: Context, out: RenderStream): Promise<void> {
    for (const statement of this.statements) {
      try {
        await statement.render(context, out);
      } catch (error) {
        if (error instanceof InternalLiquidError) {
          throw error.withToken(statement.token, context.templateName);
        }
        throw error;
      }
    }
  }

  public renderSync(context: Context, out: RenderStream): void {
    for (const statement of this.statements) {
      try {
        statement.renderSync(context, out);
      } catch (error) {
        if (error instanceof InternalLiquidError) {
          throw error.withToken(statement.token, context.templateName);
        }
        throw error;
      }
    }
  }

  public branches(): Node[] {
    return this.statements;
  }
}
