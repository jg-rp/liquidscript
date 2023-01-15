import { ChildNode, Node } from "../../ast";
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
import { isUndefined, liquidStringify } from "../../types";

export const Cycles = Symbol.for("liquid.tags.cycles");
export const UndefinedCycleGroup = Symbol.for("liquid.tags.cycles.undefined");

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
    const cycles = context.getRegister(Cycles);
    let key: symbol | string;
    if (groupName === undefined) {
      key = args.toString();
    } else if (isUndefined(groupName)) {
      key = UndefinedCycleGroup;
    } else {
      key = groupName?.toString() || "";
    }

    let index = <number>(cycles.has(key) ? cycles.get(key) : 0);

    if (index < args.length) {
      out.write(liquidStringify(args[index]));
    }

    index = index + 1;
    if (index >= args.length) {
      index = 0;
    }
    cycles.set(key, index % args.length);
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

  public children(): ChildNode[] {
    const _children: Array<ChildNode> = [];

    if (this.group) {
      _children.push({
        token: this.token,
        expression: this.group,
      });
    }

    for (const arg of this.args) {
      _children.push({
        token: this.token,
        expression: arg,
      });
    }

    return _children;
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
