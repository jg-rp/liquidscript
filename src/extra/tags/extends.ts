import { ChildNode, Node, BlockNode as TemplateBlock } from "../../ast";
import { DefaultMap } from "../../collections";
import { RenderContext } from "../../context";
import { Expression, StringLiteral } from "../../expression";
import {
  ExpressionTokenStream,
  TOKEN_EOF,
  TOKEN_IDENT,
  TOKEN_STRING,
  parseStringLiteral,
} from "../../expressions";
import { tokenize } from "../../expressions/standard";
import {
  Markup,
  Tag,
  RenderStream,
  Environment,
  Template,
  TemplateInheritanceError,
  LiquidSyntaxError,
  LiquidDispatchableSync,
  liquidDispatchSync,
  InternalKeyError,
  LiquidEnvironmentError,
  StopRender,
  InternalSyntaxError,
} from "../../liquidscript";
import { TOKEN_EXPRESSION, Token, TokenStream } from "../../token";
import { liquidStringify } from "../../types";

const TAG_EXTENDS = "extends";
const TAG_BLOCK = "block";
const TAG_END_BLOCK = "endblock";
const END_BLOCK = new Set([TAG_END_BLOCK, TOKEN_EOF]);
const EXTENDS_REGISTER = Symbol.for("liquid.tags.extends");

export type BlockStackItem = {
  block: BlockNode;
  required: boolean;
  sourceName: string;
  parent?: BlockStackItem;
};

export class BlockDrop implements LiquidDispatchableSync {
  constructor(
    readonly context: RenderContext,
    readonly out: RenderStream,
    readonly name: string,
    readonly parent?: BlockStackItem,
  ) {}

  [liquidDispatchSync](name: string): unknown {
    if (name !== "super") {
      throw new InternalKeyError(`BlockDrop[${name}]`);
    }

    if (this.parent === undefined) {
      return this.context.environment.undefinedFactory("super");
    }

    const buf = this.context.environment.renderStreamFactory(this.out);
    this.context.extendSync(
      {
        block: new BlockDrop(
          this.context,
          buf,
          this.parent.sourceName,
          this.parent.parent,
        ),
      },
      () => this.parent?.block.block.renderSync(this.context, buf),
    );

    return this.context.environment.autoEscape
      ? new Markup(buf.toString())
      : buf.toString();
  }
}

export class BlockTag implements Tag {
  public parse(stream: TokenStream, environment: Environment): Node {
    const token = stream.next();
    stream.expect(TOKEN_EXPRESSION);
    let eStream = new ExpressionTokenStream(
      tokenize(stream.current.value, token.index),
    );
    const blockName = this.parseBlockName(eStream);
    eStream.next();

    let required: boolean;
    if (eStream.current.value === "required") {
      required = true;
      eStream.next();
    } else {
      required = false;
    }

    eStream.expect(TOKEN_EOF);
    stream.next();
    const block = environment.parser.parseBlock(stream, END_BLOCK);
    stream.expectTag(TAG_END_BLOCK);

    // Named end block?
    if (stream.peek.kind === TOKEN_EXPRESSION) {
      stream.next();
      eStream = new ExpressionTokenStream(
        tokenize(stream.current.value, stream.current.index),
      );
      const endBlockName = this.parseBlockName(eStream);
      eStream.next();
      eStream.expect(TOKEN_EOF);

      if (!endBlockName.equals(blockName)) {
        throw new TemplateInheritanceError(
          `expected endblock for '${blockName}', found '${endBlockName}'`,
          stream.current,
        );
      }
    }

    return new BlockNode(token, blockName, block, required);
  }

  protected parseBlockName(eStream: ExpressionTokenStream): StringLiteral {
    if (
      eStream.current.kind === TOKEN_IDENT ||
      eStream.current.kind === TOKEN_STRING
    ) {
      return new StringLiteral(eStream.current.value);
    }
    throw new LiquidSyntaxError(
      `invalid identifier '${eStream.current.value}' for '${TAG_BLOCK}'`,
      eStream.current,
    );
  }
}

export class ExtendsTag implements Tag {
  readonly block = false;
  readonly name: string = TAG_EXTENDS;
  protected nodeClass = ExtendsNode;

  public parse(stream: TokenStream): Node {
    const token = stream.next();
    stream.expect(TOKEN_EXPRESSION);
    const eStream = new ExpressionTokenStream(
      tokenize(stream.current.value, token.index),
    );
    const parentTemplateName = parseStringLiteral(eStream);
    eStream.next();
    eStream.expect(TOKEN_EOF);
    return new ExtendsNode(token, parentTemplateName);
  }
}

export class BlockNode implements Node {
  readonly expression: Expression;
  readonly name: string;
  constructor(
    readonly token: Token,
    name: StringLiteral,
    readonly block: TemplateBlock,
    readonly required: boolean,
  ) {
    this.expression = name;
    this.name = liquidStringify(name.value);
  }

  async render(context: RenderContext, out: RenderStream): Promise<void> {
    const blockStack = <BlockStackItem[]>(
      context.getRegister(EXTENDS_REGISTER).get(this.name)
    );

    if (blockStack === undefined || !blockStack.length) {
      // This base template is being rendered directly.
      if (this.required) {
        throw new TemplateInheritanceError(
          `block '${this.name}' must be overridden`,
          this.token,
        );
      }
      await context.extend(
        { block: new BlockDrop(context, out, this.name) },
        async () => await this.block.render(context, out),
      );
      return;
    }

    const stackItem = blockStack[0];

    if (stackItem.required) {
      throw new TemplateInheritanceError(
        `block '${this.name}' must be overridden`,
        this.token,
        stackItem.sourceName,
      );
    }

    const ctx = context.copy(
      { block: new BlockDrop(context, out, this.name, stackItem.parent) },
      [],
      true,
      true,
    );

    await stackItem.block.block.render(ctx, out);
  }

  renderSync(context: RenderContext, out: RenderStream): void {
    const blockStack = <BlockStackItem[]>(
      context.getRegister(EXTENDS_REGISTER).get(this.name)
    );

    if (blockStack === undefined || !blockStack.length) {
      // This base template is being rendered directly.
      if (this.required) {
        throw new TemplateInheritanceError(
          `block '${this.name}' must be overridden`,
          this.token,
        );
      }
      context.extendSync(
        { block: new BlockDrop(context, out, this.name) },
        () => this.block.renderSync(context, out),
      );
      return;
    }

    const stackItem = blockStack[0];

    if (stackItem.required) {
      throw new TemplateInheritanceError(
        `block '${this.name}' must be overridden`,
        this.token,
        stackItem.sourceName,
      );
    }

    const ctx = context.copy(
      { block: new BlockDrop(context, out, this.name, stackItem.parent) },
      [],
      true,
      true,
    );

    stackItem.block.block.renderSync(ctx, out);
  }

  children(): ChildNode[] {
    return [
      { token: this.token, expression: this.expression },
      { token: this.token, node: this.block, blockScope: ["block"] },
    ];
  }
}

export class ExtendsNode implements Node {
  protected static tag = TAG_EXTENDS;
  constructor(
    readonly token: Token,
    readonly name: StringLiteral,
  ) {}

  async render(context: RenderContext, out: RenderStream): Promise<void> {
    if (context.template === undefined) {
      const msg =
        "the 'extends' tag requires the current render context to keep a " +
        "reference to its template as Context.template";
      throw new LiquidEnvironmentError(msg, this.token);
    }

    const baseTemplate = await buildBlockStacks(
      context,
      context.template,
      liquidStringify(this.name.evaluateSync(context)),
      TAG_EXTENDS,
    );

    await baseTemplate.renderWithContext(context, out);
    context.getRegister(EXTENDS_REGISTER).clear();
    throw new StopRender("stop");
  }

  renderSync(context: RenderContext, out: RenderStream): void {
    if (context.template === undefined) {
      const msg =
        "the 'extends' tag requires the current render context to keep a " +
        "reference to its template as Context.template";
      throw new LiquidEnvironmentError(msg, this.token);
    }

    const baseTemplate = buildBlockStacksSync(
      context,
      context.template,
      liquidStringify(this.name.evaluateSync(context)),
      TAG_EXTENDS,
    );

    baseTemplate.renderWithContextSync(context, out);
    context.getRegister(EXTENDS_REGISTER).clear();
    throw new StopRender("stop");
  }

  children(): ChildNode[] {
    return [
      {
        token: this.token,
        expression: this.name,
        loadMode: "extends",
        loadContext: { tag: ExtendsNode.tag },
      },
    ];
  }
}

/**
 * Build a stack for each `{% block %}` in the inheritance chain.
 *
 * @param context - A render context to build the block stacks in.
 * @param template - A leaf template with an _extends_ tag.
 * @param parentName - The name of the immediate parent template.
 * @param tag - The name of the "extends" tag, if it is overridden.
 */
async function buildBlockStacks(
  context: RenderContext,
  template: Template,
  parentName: string,
  tag: string = TAG_EXTENDS,
): Promise<Template> {
  context.registers.set(
    EXTENDS_REGISTER,
    new DefaultMap<string, BlockStackItem[]>(Array),
  );

  // Guard against recursive _extends_.
  const seen = new Set<string>();

  let stacked = stackBlocks(context, template);
  let parent = await context.getTemplate(parentName, { tag });

  if (stacked.extendsNode === undefined) {
    throw new InternalSyntaxError(
      `expected an '${tag}' node (${parentName}, ${template.name})`,
    );
  }

  seen.add(liquidStringify(stacked.extendsNode.name.evaluateSync(context)));
  stacked = stackBlocks(context, parent);

  let parentTemplateName: string | undefined = undefined;
  if (stacked.extendsNode) {
    parentTemplateName = liquidStringify(
      stacked.extendsNode.name.evaluateSync(context),
    );
    if (seen.has(parentTemplateName)) {
      throw new TemplateInheritanceError(
        `circular extends '${parentTemplateName}'`,
        stacked.extendsNode.token,
      );
    }
    seen.add(parentTemplateName);
  }

  while (parentTemplateName) {
    parent = await context.getTemplate(parentTemplateName, { tag });
    stacked = stackBlocks(context, parent);
    if (stacked.extendsNode) {
      parentTemplateName = liquidStringify(
        stacked.extendsNode.name.evaluateSync(context),
      );
      if (seen.has(parentTemplateName)) {
        throw new TemplateInheritanceError(
          `circular extends '${parentTemplateName}'`,
          stacked.extendsNode.token,
        );
      }
      seen.add(parentTemplateName);
    } else {
      parentTemplateName = undefined;
    }
  }

  return parent;
}

function buildBlockStacksSync(
  context: RenderContext,
  template: Template,
  parentName: string,
  tag: string = TAG_EXTENDS,
): Template {
  context.registers.set(
    EXTENDS_REGISTER,
    new DefaultMap<string, BlockStackItem[]>(Array),
  );

  // Guard against recursive _extends_.
  const seen = new Set<string>();

  let stacked = stackBlocks(context, template);
  let parent = context.getTemplateSync(parentName, { tag });

  if (stacked.extendsNode === undefined) {
    throw new InternalSyntaxError(`expected an '${tag}' node`);
  }

  seen.add(liquidStringify(stacked.extendsNode.name.evaluateSync(context)));
  stacked = stackBlocks(context, parent);

  let parentTemplateName: string | undefined = undefined;
  if (stacked.extendsNode) {
    parentTemplateName = liquidStringify(
      stacked.extendsNode.name.evaluateSync(context),
    );
    if (seen.has(parentTemplateName)) {
      throw new TemplateInheritanceError(
        `circular extends '${parentTemplateName}'`,
        stacked.extendsNode.token,
      );
    }
    seen.add(parentTemplateName);
  }

  while (parentTemplateName) {
    parent = context.getTemplateSync(parentTemplateName, { tag });
    stacked = stackBlocks(context, parent);
    if (stacked.extendsNode) {
      parentTemplateName = liquidStringify(
        stacked.extendsNode.name.evaluateSync(context),
      );
      if (seen.has(parentTemplateName)) {
        throw new TemplateInheritanceError(
          `circular extends '${parentTemplateName}'`,
          stacked.extendsNode.token,
        );
      }
      seen.add(parentTemplateName);
    } else {
      parentTemplateName = undefined;
    }
  }

  return parent;
}

type InheritanceNodes = {
  extendsNodes: ExtendsNode[];
  blockNodes: BlockNode[];
};

function findInheritanceNodes(template: Template): InheritanceNodes {
  const extendsNodes: ExtendsNode[] = [];
  const blockNodes: BlockNode[] = [];
  for (const node of template.tree.nodes) {
    visitNode(node, extendsNodes, blockNodes);
  }
  return { extendsNodes, blockNodes };
}

function visitNode(
  node: Node,
  extendsNodes: ExtendsNode[],
  blockNodes: BlockNode[],
) {
  if (node instanceof BlockNode) {
    blockNodes.push(node);
  } else if (node instanceof ExtendsNode) {
    extendsNodes.push(node);
  }

  if (node.children) {
    for (const child of node.children()) {
      if (child.node) {
        visitNode(child.node, extendsNodes, blockNodes);
      }
    }
  }
}

export type StackedBlocks = {
  extendsNode?: ExtendsNode;
  blockNodes: BlockNode[];
};

export function stackBlocks(
  context: RenderContext,
  template: Template,
): StackedBlocks {
  const { extendsNodes, blockNodes }: InheritanceNodes =
    findInheritanceNodes(template);

  if (extendsNodes.length > 1) {
    throw new TemplateInheritanceError(
      "too many 'extends' tags",
      extendsNodes[1].token,
    );
  }

  const seenBlockNames = new Set<string>();
  for (const block of blockNodes) {
    if (seenBlockNames.has(block.name)) {
      throw new TemplateInheritanceError(
        `duplicate block '${block.name}'`,
        block.token,
      );
    }
    seenBlockNames.add(block.name);
  }

  storeBlocks(context, blockNodes, template.name);
  return extendsNodes.length > 0
    ? { extendsNode: extendsNodes[0], blockNodes }
    : { extendsNode: undefined, blockNodes };
}

/**
 * Push block nodes onto stacks held in the render context register.
 */
function storeBlocks(
  context: RenderContext,
  blocks: BlockNode[],
  sourceName: string,
) {
  const blockStacks = <DefaultMap<string | Markup, BlockStackItem[]>>(
    context.getRegister(EXTENDS_REGISTER)
  );

  let stack: BlockStackItem[];

  for (const block of blocks) {
    stack = blockStacks.get(block.name);
    stack.push({
      block,
      required: stack.length && !block.required ? false : block.required,
      sourceName,
    });

    if (stack.length > 1) {
      stack[stack.length - 2].parent = stack[stack.length - 1];
    }
  }
}
