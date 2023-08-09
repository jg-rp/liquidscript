import { BlockNode, Node, ChildNode } from "../../ast";
import { RenderContext } from "../../context";
import { Environment } from "../../environment";
import { LiquidSyntaxError } from "../../errors";
import { TOKEN_ILLEGAL, TOKEN_SKIP } from "../../expressions/tokens";
import { RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import {
  TemplateTokenStream,
  Token,
  TokenStream,
  TOKEN_EOF,
  TOKEN_EXPRESSION,
  TOKEN_TAG,
} from "../../token";

const RULES = [
  [
    "LIQUID_EXPR",
    "[ \\t]*(?<preamble>(?<name>#|\\w+)[ \\t]*)(?<expr>.*?)[ \\t\\r]*?(\\n+|$)",
  ],
  [TOKEN_SKIP, "[\\r\\n]+"],
  [TOKEN_ILLEGAL, "."],
];

const RE = new RegExp(RULES.map(([n, p]) => `(?<${n}>${p})`).join("|"), "gs");

interface LiquidExpressionMatch {
  LIQUID_EXPR: string;
  name: string;
  preamble: string;
  expr: string;
}

interface SkipMatch {
  TOKEN_SKIP: string;
}

interface IllegalMatch {
  TOKEN_ILLEGAL: string;
}

type MatchGroups = Readonly<
  Partial<LiquidExpressionMatch & SkipMatch & IllegalMatch>
>;

function isLiquidExpressionMatch(
  match: MatchGroups,
): match is LiquidExpressionMatch {
  return match.LIQUID_EXPR === undefined ? false : true;
}

function isSkipMatch(match: MatchGroups): match is SkipMatch {
  return match.TOKEN_SKIP === undefined ? false : true;
}

function isIllegalMatch(match: MatchGroups): match is IllegalMatch {
  return match.TOKEN_ILLEGAL === undefined ? false : true;
}

function* tokenize(
  expr: string,
  startIndex: number = 1,
  input: string,
): Generator<Token> {
  for (const match of expr.matchAll(RE)) {
    const groups = match.groups as MatchGroups;
    if (isLiquidExpressionMatch(groups)) {
      yield new Token(
        TOKEN_TAG,
        groups.name,
        <number>match.index + startIndex,
        input,
      );

      if (groups.expr)
        yield new Token(
          TOKEN_EXPRESSION,
          groups.expr,
          <number>match.index + startIndex + groups.preamble.length,
          input,
        );
    } else if (isSkipMatch(groups)) {
      continue;
    } else if (isIllegalMatch(groups))
      throw new LiquidSyntaxError(
        `unexpected token '${groups.TOKEN_ILLEGAL}'`,
        new Token(
          TOKEN_ILLEGAL,
          groups.TOKEN_ILLEGAL,
          <number>match.index + startIndex,
          input,
        ),
      );
  }
}

export class LiquidTag implements Tag {
  readonly block = false;
  readonly name: string = "liquid";
  protected nodeClass = LiquidNode;

  parse(stream: TokenStream, environment: Environment): Node {
    const token = stream.next();
    let block: BlockNode;

    if (stream.current.kind === TOKEN_EOF) {
      // Empty liquid tag at end of file.
      block = new BlockNode(stream.current, []);
    } else if (stream.current.kind === TOKEN_TAG) {
      block = environment.parser.parseLiquid(stream);
    } else {
      stream.expect(TOKEN_EXPRESSION);
      const exprStream = new TemplateTokenStream(
        tokenize(
          stream.current.value,
          stream.current.index,
          stream.current.input,
        ),
      );
      block = environment.parser.parseLiquid(exprStream);
    }

    return new this.nodeClass(token, block);
  }
}

export class LiquidNode implements Node {
  constructor(
    readonly token: Token,
    readonly block: BlockNode,
  ) {}

  public async render(
    context: RenderContext,
    out: RenderStream,
  ): Promise<void> {
    await this.block.render(context, out);
  }

  public renderSync(context: RenderContext, out: RenderStream): void {
    this.block.renderSync(context, out);
  }

  children(): ChildNode[] {
    return this.block.children();
  }
}
