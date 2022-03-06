import { BlockNode, Node } from "../../ast";
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
  ["LIQUID_EXPR", "[ \\t]*(?<name>\\w+)[ \\t]*(?<expr>.*?)[ \\t\\r]*?(\\n+|$)"],
  [TOKEN_SKIP, "[\\r\\n]+"],
  [TOKEN_ILLEGAL, "."],
];

const RE = new RegExp(RULES.map(([n, p]) => `(?<${n}>${p})`).join("|"), "gs");

interface LiquidExpressionMatch {
  LIQUID_EXPR: string;
  name: string;
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
  match: MatchGroups
): match is LiquidExpressionMatch {
  return match.LIQUID_EXPR === undefined ? false : true;
}

function isSkipMatch(match: MatchGroups): match is SkipMatch {
  return match.TOKEN_SKIP === undefined ? false : true;
}

function isIllegalMatch(match: MatchGroups): match is IllegalMatch {
  return match.TOKEN_ILLEGAL === undefined ? false : true;
}

function* tokenize(source: string, startIndex: number = 1): Generator<Token> {
  for (const match of source.matchAll(RE)) {
    const groups = match.groups as MatchGroups;
    if (isLiquidExpressionMatch(groups)) {
      yield new Token(
        TOKEN_TAG,
        groups.name,
        <number>match.index + startIndex,
        source
      );

      if (groups.expr)
        yield new Token(
          TOKEN_EXPRESSION,
          groups.expr,
          <number>match.index + startIndex,
          source
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
          source
        )
      );
  }
}

export class LiquidTag implements Tag {
  readonly block = false;
  readonly name = "liquid";
  private endBlock = new Set<string>();

  parse(stream: TokenStream, environment: Environment): LiquidNode {
    const token = stream.next();

    if (stream.current.kind === TOKEN_EOF) {
      // Empty liquid tag at end of file.
      return new LiquidNode(token, new BlockNode(stream.current, []));
    }

    stream.expect(TOKEN_EXPRESSION);
    const exprStream = new TemplateTokenStream(
      tokenize(stream.current.value, stream.current.index)
    );

    const block = environment.parser.parseBlock(exprStream, this.endBlock);
    return new LiquidNode(token, block);
  }
}

export class LiquidNode implements Node {
  constructor(readonly token: Token, readonly block: BlockNode) {}

  public async render(
    context: RenderContext,
    out: RenderStream
  ): Promise<void> {
    await this.block.render(context, out);
  }

  public renderSync(context: RenderContext, out: RenderStream): void {
    this.block.renderSync(context, out);
  }

  children(): Node[] {
    return [];
  }
}
