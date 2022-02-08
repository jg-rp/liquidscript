import { Context } from "./context";
import { RenderStream } from "./io/output_stream";
import { Token } from "./token";

// TODO: render Promise<void>?

export interface Node {
  readonly token: Token;
  render(context: Context, out: RenderStream): Promise<boolean>;
  children(): Node[];
}

export class Root {
  public statements: Node[] = [];
}

export class BlockNode implements Node {
  constructor(readonly token: Token, public statements: Node[] = []) {}

  public async render(context: Context, out: RenderStream): Promise<boolean> {
    let output = false;
    for (const statement of this.statements) {
      output = (await statement.render(context, out)) || output;
    }
    return output;
  }

  public children(): Node[] {
    return this.statements;
  }
}
