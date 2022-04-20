import { Node } from "../../ast";
import { RenderContext } from "../../context";
import { LiquidSyntaxError } from "../../errors";
import { Expression } from "../../expression";
import { parseStringOrIdentifier } from "../../expressions/common";
import { tokenize } from "../../expressions/filtered/lex";
import { parseObject } from "../../expressions/filtered/parse";
import {
  ExpressionTokenStream,
  TOKEN_COLON,
  TOKEN_COMMA,
} from "../../expressions/tokens";
import { RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_EOF, TOKEN_EXPRESSION } from "../../token";

export const Cycles = Symbol.for("liquid.tags.cycles");

export class CycleTag implements Tag {
  readonly block = false;
  readonly name: string = "cycle";
  protected nodeClass = CycleNode;

  public parse(stream: TokenStream): Node {
    const token = stream.next();
    stream.expect(TOKEN_EXPRESSION);

    const tokens = tokenize(stream.current.value, token.index);
    let groupName: Expression | undefined = undefined;

    const parts = Array.from(splitAtFirstColon(tokens));
    if (parts.length === 2)
      groupName = parseStringOrIdentifier(
        new ExpressionTokenStream(parts[0].values())
      );

    return new this.nodeClass(
      token,
      Array.from(
        parseArgs(new ExpressionTokenStream(parts[parts.length - 1].values()))
      ),
      groupName
    );
  }
}

export class CycleNode implements Node {
  constructor(
    readonly token: Token,
    readonly args: Expression[],
    readonly group?: Expression
  ) {}

  protected cycle(
    context: RenderContext,
    out: RenderStream,
    groupName: unknown,
    args: unknown[]
  ): void {
    const key = [groupName, args].toString();
    const cycles = context.getRegister(Cycles);
    const index = <number>(cycles.has(key) ? cycles.get(key) : 0);
    out.write(`${args[index]}`);
    cycles.set(key, (index + 1) % args.length);
  }

  public async render(
    context: RenderContext,
    out: RenderStream
  ): Promise<void> {
    const groupName = this.group
      ? await this.group.evaluate(context)
      : undefined;

    const args = await Promise.all(
      this.args.map((arg) => arg.evaluate(context))
    );

    this.cycle(context, out, groupName, args);
  }

  public renderSync(context: RenderContext, out: RenderStream): void {
    const groupName = this.group ? this.group.evaluateSync(context) : undefined;
    const args = this.args.map((arg) => arg.evaluateSync(context));
    this.cycle(context, out, groupName, args);
  }
}

function* parseArgs(stream: ExpressionTokenStream): Generator<Expression> {
  while (stream.current.kind !== TOKEN_EOF) {
    yield parseObject(stream);
    stream.next();

    switch (stream.current.kind) {
      case TOKEN_COMMA:
        stream.next();
        break;
      case TOKEN_EOF:
        return;
      default:
        throw new LiquidSyntaxError(
          `expected a comma separated list of arguments, found ${stream.current.kind}`,
          stream.current
        );
    }
  }
}

/**
 *
 * @param tokens
 * @yields
 * @returns
 */
function* splitAtFirstColon(
  tokens: IterableIterator<Token>
): Generator<Token[]> {
  const buf: Token[] = [];
  for (const token of tokens) {
    if (token.kind === TOKEN_COLON) {
      yield buf;
      yield Array.from(tokens);
      return;
    }
    buf.push(token);
  }
  yield buf;
}
