import { BlockNode, ChildNode, Node } from "../../ast";
import { RenderContext } from "../../context";
import { Environment } from "../../environment";
import {
  ArgumentList,
  parseCallArguments,
  parseMacroArguments,
} from "../../expressions/arguments";
import { chainObjects } from "../../chain_object";
import { Expression, NIL } from "../../expression";
import { RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_EXPRESSION } from "../../token";
import { isUndefined } from "../../types";
import { Undefined } from "../../undefined";

const TAG_ENDMACRO = "endmacro";
const END_MACRO_BLOCK = new Set([TAG_ENDMACRO]);

export const Macros = Symbol.for("liquid.tags.macros");

export type Macro = {
  args: ArgumentList;
  block: BlockNode;
};

export type BoundArgs = {
  args: { [index: string]: Expression };
  excessArgs: Expression[];
  excessKeywordArgs: { [index: string]: Expression };
};

export type ExcessArgs = {
  kwargs: { [index: string]: unknown };
  args: unknown[];
};

export class MacroTag implements Tag {
  protected nodeClass = MacroNode;

  public parse(stream: TokenStream, environment: Environment): Node {
    const token = stream.next();
    stream.expect(TOKEN_EXPRESSION);
    const [name, args] = parseMacroArguments(
      stream.current.value,
      stream.current.index,
    );
    stream.next();
    const block = environment.parser.parseBlock(stream, END_MACRO_BLOCK, token);
    return new this.nodeClass(token, name, args, block);
  }
}

export class CallTag implements Tag {
  readonly block = false;
  protected nodeClass = CallNode;

  public parse(stream: TokenStream): Node {
    const token = stream.next();
    stream.expect(TOKEN_EXPRESSION);
    const [name, _args] = parseCallArguments(
      stream.current.value,
      stream.current.index,
    );

    const args: Expression[] = [];
    const kwargs: ArgumentList = [];

    for (const [k, v] of _args) {
      if (k === "") {
        args.push(v);
      } else {
        kwargs.push([k, v]);
      }
    }

    return new this.nodeClass(token, name, args, kwargs);
  }
}

export class MacroNode implements Node {
  constructor(
    readonly token: Token,
    readonly name: string,
    readonly args: ArgumentList,
    readonly block: BlockNode,
  ) {}

  public async render(context: RenderContext): Promise<void> {
    this.renderSync(context);
  }

  public renderSync(context: RenderContext): void {
    const macros = context.getRegister(Macros);
    macros.set(this.name, { args: this.args, block: this.block });
  }

  public children(): ChildNode[] {
    const blockScope = this.args.map((arg) => arg[0]);
    const _children: ChildNode[] = [
      { token: this.token, node: this.block, blockScope },
    ];
    for (const [_, v] of this.args) {
      if (v !== NIL) {
        _children.push({ token: this.token, expression: v });
      }
    }
    return _children;
  }
}

export class CallNode implements Node {
  protected disabledTags = ["include", "render"];

  constructor(
    readonly token: Token,
    readonly name: string,
    readonly args: Expression[],
    readonly kwargs: ArgumentList,
  ) {}

  public async render(
    context: RenderContext,
    out: RenderStream,
  ): Promise<void> {
    const macro = this.getMacro(context);
    if (isUndefined(macro)) {
      macro.poke();
      return;
    }
    macro.block.renderSync(await this.makeContext(context, macro), out);
  }

  public renderSync(context: RenderContext, out: RenderStream): void {
    const macro = this.getMacro(context);
    if (isUndefined(macro)) {
      macro.poke();
      return;
    }
    macro.block.renderSync(this.makeContextSync(context, macro), out);
  }

  public children(): ChildNode[] {
    const _children = this.kwargs.map((arg) => ({
      token: this.token,
      expression: arg[1],
    }));
    for (const expr of this.args) {
      _children.push({ token: this.token, expression: expr });
    }
    return _children;
  }

  protected bindArgs(macro: Macro): BoundArgs {
    const args = Object.fromEntries(macro.args);
    const macroKeys = Object.keys(args);
    const keySet = new Set(macroKeys);

    // Bind positional arguments to names.
    const excessArgs: Expression[] = [];
    const keysLength = macroKeys.length;
    const argsLength = this.args.length;
    const nArgs = Math.max(keysLength, argsLength);
    for (let i = 0; i < nArgs; i++) {
      if (i >= keysLength) {
        excessArgs.push(this.args[i]);
        continue;
      }
      if (i >= argsLength) {
        break;
      }
      args[macroKeys[i]] = this.args[i];
    }

    // Update default and/or missing arguments with keyword arguments.
    const excessKeywordArgs: { [index: string]: Expression } = {};
    for (const [key, expr] of this.kwargs) {
      if (keySet.has(key)) {
        args[key] = expr;
      } else {
        excessKeywordArgs[key] = expr;
      }
    }

    return { args, excessArgs, excessKeywordArgs };
  }

  protected async makeContext(
    context: RenderContext,
    macro: Macro,
  ): Promise<RenderContext> {
    const { args, excessArgs, excessKeywordArgs } = this.bindArgs(macro);

    // Evaluate excess arguments.
    const excess: ExcessArgs = {
      kwargs: {},
      args: [],
    };
    for (const [key, expr] of Object.entries(excessKeywordArgs)) {
      excess["kwargs"][key] = await expr.evaluate(context);
    }
    for (const expr of excessArgs) {
      excess["args"].push(await expr.evaluate(context));
    }

    // Evaluate arguments.
    const boundArgs: { [index: string]: unknown } = {};
    for (const [key, expr] of Object.entries(args)) {
      if (NIL.equals(expr)) {
        boundArgs[key] = context.environment.undefinedFactory(key);
      } else {
        boundArgs[key] = await expr.evaluate(context);
      }
    }

    return context.copy(
      chainObjects(boundArgs, excess),
      this.disabledTags,
      true,
    );
  }

  protected makeContextSync(
    context: RenderContext,
    macro: Macro,
  ): RenderContext {
    const { args, excessArgs, excessKeywordArgs } = this.bindArgs(macro);

    // Evaluate excess arguments.
    const excess: ExcessArgs = {
      kwargs: {},
      args: [],
    };
    for (const [key, expr] of Object.entries(excessKeywordArgs)) {
      excess["kwargs"][key] = expr.evaluateSync(context);
    }
    for (const expr of excessArgs) {
      excess["args"].push(expr.evaluateSync(context));
    }

    // Evaluate arguments.
    const boundArgs: { [index: string]: unknown } = {};
    for (const [key, expr] of Object.entries(args)) {
      if (NIL.equals(expr)) {
        boundArgs[key] = context.environment.undefinedFactory(key);
      } else {
        boundArgs[key] = expr.evaluateSync(context);
      }
    }

    return context.copy(
      chainObjects(boundArgs, excess),
      this.disabledTags,
      true,
    );
  }

  protected getMacro(context: RenderContext): Macro | Undefined {
    const macros = context.getRegister(Macros);
    const macro = macros.get(this.name);
    if (macro === undefined) {
      return context.environment.undefinedFactory(this.name);
    }
    return macro as Macro;
  }
}
