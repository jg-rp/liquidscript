import { Context } from "./context";
import { RenderStream } from "./io/output_stream";
import { Token } from "./token";

// TODO: render Promise<void>?

export interface Node {
  readonly token: Token;
  render(context: Context, out: RenderStream): Promise<void>;
  branches(): Node[];
}

export class Root {
  public statements: Node[] = [];
}

export class BlockNode implements Node {
  constructor(readonly token: Token, public statements: Node[] = []) {}

  public async render(context: Context, out: RenderStream): Promise<void> {
    for (const statement of this.statements) {
      await statement.render(context, out);
    }
  }

  public branches(): Node[] {
    return this.statements;
  }
}
