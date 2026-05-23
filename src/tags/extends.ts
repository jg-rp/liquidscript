import type { Namespace, RenderContext } from "../context";
import { DefaultMap } from "../default_map";
import { containsSync, dispatch, dispatchSync, Drop } from "../drop";
import {
  ArgumentError,
  RequiredBlockError,
  TemplateInheritanceError,
} from "../errors";
import {
  Name,
  Variable,
  type Expression,
  type KeywordArgument,
} from "../expression";
import { fnv1a32 } from "../fnv";
import type { Block, Markup } from "../markup";
import { type Partial, renderBlock, renderBlockSync, Scope } from "../markup";
import type { OutputBuffer } from "../output";
import type { Parser } from "../parser";
import { Nothing } from "../runtime";
import type { Template } from "../template";
import { T, type Token } from "../token";
import { isString } from "../type_guards";

export const EXTENDS_STACK = Symbol.for("liquid.tags.extends");
export const STOP_RENDER = Symbol.for("liquid.runtime.stop");

export class ExtendsTag implements Markup {
  readonly blank = false;

  readonly tag = "extends";

  constructor(
    readonly token: Token,
    readonly name: Name,
  ) {}

  static parse(token: Token, parser: Parser): ExtendsTag {
    const name = parser.parseName();
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    return new ExtendsTag(token, name);
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    const stacks = context.getRegister(
      EXTENDS_STACK,
      () => new DefaultMap<string, ExtendsStackItem[]>(() => []),
    );

    const baseTemplate = await this.stackBlocks(context, context.template);

    await context.extend(
      {},
      async () => {
        await baseTemplate.renderWithContext(context, buffer);
      },
      baseTemplate,
    );

    stacks.clear();
    context.interrupts.push(STOP_RENDER);
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    const stacks = context.getRegister(
      EXTENDS_STACK,
      () => new DefaultMap<string, ExtendsStackItem[]>(() => []),
    );

    const baseTemplate = this.stackBlocksSync(context, context.template);

    context.extendSync(
      {},
      () => {
        baseTemplate.renderWithContextSync(context, buffer);
      },
      baseTemplate,
    );

    stacks.clear();
    context.interrupts.push(STOP_RENDER);
  }

  async partial(staticContext: RenderContext): Promise<Partial> {
    const template = await staticContext.env.getTemplate(
      this.name.value,
      undefined,
      staticContext,
      { tag: "extends" },
    );

    return {
      template,
      scopeKind: Scope.INHERITED,
      inScope: [],
      key: fnv1a32(this.name.value),
    };
  }

  partialSync(staticContext: RenderContext): Partial {
    const template = staticContext.env.getTemplateSync(
      this.name.value,
      undefined,
      staticContext,
      { tag: "extends" },
    );

    return {
      template,
      scopeKind: Scope.INHERITED,
      inScope: [],
      key: fnv1a32(this.name.value),
    };
  }

  /**
   * Visit all templates in the inheritance chain and build a stack for each
   * `block` tag.
   */
  protected async stackBlocks(
    context: RenderContext,
    template: Template,
  ): Promise<Template> {
    const stacks = context.getRegister(
      EXTENDS_STACK,
      () => new DefaultMap<string, ExtendsStackItem[]>(() => []),
    );

    const seenExtends: Set<string> = new Set();

    const visit = async (template_: Template): Promise<Template | null> => {
      const [extendsNodes, blockNodes] = this.inheritanceNodes(
        context,
        template_,
      );

      const seenBlocks: Set<string> = new Set();

      for (const block of blockNodes) {
        if (seenBlocks.has(block.name.value)) {
          throw new TemplateInheritanceError(
            `duplicate block '${block.name.value}'`,
            block.token,
            template_.source,
            template_.name,
          );
        }

        seenBlocks.add(block.name.value);

        const stack = stacks.get(block.name.value);
        const required = stack.length > 1 && block.required;
        const stackItem = { block, required, template: template_ };
        stack.push(stackItem);
        if (stack.length > 1) {
          (stack[stack.length - 2] as ExtendsStackItem).parent = stackItem;
        }
      }

      if (extendsNodes.length > 1) {
        const node = extendsNodes[0] as ExtendsTag;
        throw new TemplateInheritanceError(
          "too many 'extends' tags",
          node.token,
          template_.source,
          template_.name,
        );
      }

      if (!extendsNodes.length) return null;

      const extendsNode = extendsNodes[0] as ExtendsTag;

      if (seenExtends.has(extendsNode.name.value)) {
        throw new TemplateInheritanceError(
          `circular extends '${extendsNode.name.value}'`,
          extendsNode.token,
          template_.source,
          template_.name,
        );
      }

      seenExtends.add(extendsNode.name.value);

      return await context.env.getTemplate(
        extendsNode.name.value,
        {},
        context,
        { tag: "extends" },
      );
    };

    let nextTemplate = await visit(template);
    let base = nextTemplate;

    while (nextTemplate) {
      nextTemplate = await visit(nextTemplate);
      if (nextTemplate) base = nextTemplate;
    }

    return base as Template;
  }

  protected stackBlocksSync(
    context: RenderContext,
    template: Template,
  ): Template {
    const stacks = context.getRegister(
      EXTENDS_STACK,
      () => new DefaultMap<string, ExtendsStackItem[]>(() => []),
    );

    const seenExtends: Set<string> = new Set();

    const visit = (template_: Template): Template | null => {
      const [extendsNodes, blockNodes] = this.inheritanceNodes(
        context,
        template_,
      );

      const seenBlocks: Set<string> = new Set();

      for (const block of blockNodes) {
        if (seenBlocks.has(block.name.value)) {
          throw new TemplateInheritanceError(
            `duplicate block '${block.name.value}'`,
            block.token,
            template_.source,
            template_.name,
          );
        }

        seenBlocks.add(block.name.value);

        const stack = stacks.get(block.name.value);
        const required = stack.length > 1 && block.required;
        const stackItem = { block, required, template: template_ };
        stack.push(stackItem);
        if (stack.length > 1) {
          (stack[stack.length - 2] as ExtendsStackItem).parent = stackItem;
        }
      }

      if (extendsNodes.length > 1) {
        const node = extendsNodes[0] as ExtendsTag;
        throw new TemplateInheritanceError(
          "too many 'extends' tags",
          node.token,
          template_.source,
          template_.name,
        );
      }

      if (!extendsNodes.length) return null;

      const extendsNode = extendsNodes[0] as ExtendsTag;

      if (seenExtends.has(extendsNode.name.value)) {
        throw new TemplateInheritanceError(
          `circular extends '${extendsNode.name.value}'`,
          extendsNode.token,
          template_.source,
          template_.name,
        );
      }

      seenExtends.add(extendsNode.name.value);

      return context.env.getTemplateSync(extendsNode.name.value, {}, context, {
        tag: "extends",
      });
    };

    let nextTemplate = visit(template);
    let base = nextTemplate;

    while (nextTemplate) {
      nextTemplate = visit(nextTemplate);
      if (nextTemplate) base = nextTemplate;
    }

    return base as Template;
  }

  protected inheritanceNodes(
    context: RenderContext,
    template: Template,
  ): [ExtendsTag[], BlockTag[]] {
    const extendsNodes: ExtendsTag[] = [];
    const blockNodes: BlockTag[] = [];

    const visit = (node: Markup) => {
      if (node instanceof ExtendsTag) {
        extendsNodes.push(node);
      } else if (node instanceof BlockTag) {
        blockNodes.push(node);
      }

      if (node.childrenSync !== undefined) {
        for (const child of node.childrenSync(context)) {
          visit(child);
        }
      }
    };

    for (const node of template.nodes) {
      if (!isString(node)) {
        visit(node);
      }
    }

    return [extendsNodes, blockNodes];
  }
}

const END_BLOCK = new Set(["endblock"]);

export class BlockTag implements Markup {
  readonly blank = false;

  readonly tag = "block";

  constructor(
    readonly token: Token,
    readonly name: Name,
    readonly block: Block,
    readonly required: boolean,
  ) {}

  static parse(token: Token, parser: Parser): BlockTag {
    const name = parser.parseName();
    const required = this.unpackArgs(parser, parser.parseArguments(true));
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    const block = parser.parseBlock(END_BLOCK);
    parser.eatEmptyTag("endblock");
    return new BlockTag(token, name, block, required);
  }

  static unpackArgs(
    parser: Parser,
    args: Array<Expression | KeywordArgument>,
  ): boolean {
    let required = false;

    for (const arg of args) {
      if (
        arg instanceof Variable &&
        arg.root instanceof Name &&
        arg.root.value === "required" &&
        arg.segments.length === 0
      ) {
        required = true;
      } else {
        throw new ArgumentError(
          "unexpected argument",
          arg.token,
          parser.source,
          parser.templateName,
        );
      }
    }

    return required;
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    const stacks = context.getRegister(
      EXTENDS_STACK,
      () => new DefaultMap<string, ExtendsStackItem[]>(() => []),
    );

    const stack = stacks.get(this.name.value);

    if (stack.length === 0) {
      // This is a base block being rendered directly.
      if (this.required) {
        throw new RequiredBlockError(
          `block '${this.name.value}' is required`,
          this.name.token,
          context.template.source,
          context.template.name,
        );
      }

      await context.extend(
        { block: new BlockDrop(this.name.value) },
        async () => await renderBlock(this.block, context, buffer),
      );

      return;
    }

    const { block, required, template, parent } = stack[0] as ExtendsStackItem;

    if (required) {
      throw new RequiredBlockError(
        `block '${this.name.value}' is required`,
        this.name.token,
        context.template.source,
        context.template.name,
      );
    }

    const namespace: Namespace = Object.create(null);
    namespace["block"] = new BlockDrop(this.name.value, parent);

    const blockContext = context.copy(namespace, {
      blockScope: true,
      template,
    });

    await renderBlock(block.block, blockContext, buffer);
    context.renderScoreCumulative += blockContext.renderScore;
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    const stacks = context.getRegister(
      EXTENDS_STACK,
      () => new DefaultMap<string, ExtendsStackItem[]>(() => []),
    );

    const stack = stacks.get(this.name.value);

    if (stack.length === 0) {
      // This is a base block being rendered directly.
      if (this.required) {
        throw new RequiredBlockError(
          `block '${this.name.value}' is required`,
          this.name.token,
          context.template.source,
          context.template.name,
        );
      }

      context.extendSync({ block: new BlockDrop(this.name.value) }, () =>
        renderBlockSync(this.block, context, buffer),
      );

      return;
    }

    const { block, required, template, parent } = stack[0] as ExtendsStackItem;

    if (required) {
      throw new RequiredBlockError(
        `block '${this.name.value}' is required`,
        this.name.token,
        context.template.source,
        context.template.name,
      );
    }

    const namespace: Namespace = Object.create(null);
    namespace["block"] = new BlockDrop(this.name.value, parent);

    const blockContext = context.copy(namespace, {
      blockScope: true,
      template,
    });

    renderBlockSync(block.block, blockContext, buffer);
    context.renderScoreCumulative += blockContext.renderScore;
  }

  async children(staticContext: RenderContext): Promise<Markup[]> {
    return this.childrenSync(staticContext);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  childrenSync(staticContext: RenderContext): Markup[] {
    return this.block.filter((node) => !isString(node)) as Markup[];
  }

  blockScope(): Name[] {
    return [new Name(this.token, "block")];
  }
}

class BlockDrop extends Drop {
  constructor(
    readonly name: string,
    readonly parent?: ExtendsStackItem,
  ) {
    super();
  }

  override [containsSync](obj: unknown): boolean {
    return obj === "super";
  }

  override async [dispatch](
    name: string,
    context: RenderContext,
  ): Promise<unknown> {
    if (name !== "super") {
      return Nothing;
    }

    if (this.parent === undefined) {
      return Nothing;
    }

    const buffer = context.env.bufferFactory();
    const namespace: Namespace = Object.create(null);
    namespace["block"] = new BlockDrop(
      this.parent.template.name,
      this.parent.parent,
    );

    await context.extend(namespace, async () => {
      await renderBlock(
        (this.parent as ExtendsStackItem).block.block,
        context,
        buffer,
      );
    });

    return buffer.join("");
  }

  override [dispatchSync](name: string, context: RenderContext): unknown {
    if (name !== "super") {
      return Nothing;
    }

    if (this.parent === undefined) {
      return Nothing;
    }

    const buffer = context.env.bufferFactory();
    const namespace: Namespace = Object.create(null);
    namespace["block"] = new BlockDrop(
      this.parent.template.name,
      this.parent.parent,
    );

    context.extendSync(namespace, () => {
      renderBlockSync(
        (this.parent as ExtendsStackItem).block.block,
        context,
        buffer,
      );
    });

    return buffer.join("");
  }

  override toString(): string {
    return `BlockDrop(${this.name})`;
  }
}

type ExtendsStackItem = {
  block: BlockTag;
  required: boolean;
  template: Template;
  parent?: ExtendsStackItem;
};
