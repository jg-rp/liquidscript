import type { RenderContext } from "../context";
import { DefaultMap } from "../default_map";
import { Variable, type Expression } from "../expression";
import type { Markup } from "../markup";
import type { OutputBuffer } from "../output";
import type { Parser } from "../parser";
import { T, type Token } from "../token";

const CYCLES = Symbol.for("liquid.tags.cycle");

export class CycleTag implements Markup {
  // eslint-disable-next-line sonarjs/public-static-readonly
  static #nextId = 1;

  readonly blank = false;

  private staticKey: string = "";

  readonly tag = "cycle";

  constructor(
    readonly token: Token,
    readonly items: Expression[],
    readonly group?: Expression,
  ) {
    if (!group) {
      // This mimics Shopify/liquid by giving every Variable a unique ID.
      this.staticKey = items
        .map((item) =>
          item instanceof Variable ? `${item}:${CycleTag.#nextId++}` : item,
        )
        .toString();
    }
  }

  static parse(token: Token, parser: Parser): Markup {
    let group: Expression | undefined = undefined;
    const items: Expression[] = [];
    const first = parser.parseExpression();

    if (parser.kind() === T.COLON) {
      group = first;
      parser.next();
    } else {
      items.push(first);
    }

    if (parser.kind() === T.COMMA) {
      parser.next();
    }

    items.push(...parser.parsePositionalArguments());
    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);

    return new CycleTag(token, items, group);
  }

  expressions(): Expression[] {
    if (this.group) {
      return [this.group, ...this.items];
    }

    return this.items;
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    const cycles = context.getRegister(
      CYCLES,
      () => new DefaultMap<string, number>(() => 0),
    );

    const key = this.group
      ? context.env.toString(
          await this.group.evaluate(context),
          context,
          this.group.span,
        )
      : this.staticKey;

    let index = cycles.get(key);
    const expr = this.items[index] as Expression;

    if (expr) {
      buffer.push(
        context.env.toString(await expr.evaluate(context), context, expr.span),
      );
    }

    index += 1;
    if (index >= this.items.length) {
      index = 0;
    }

    cycles.set(key, index);
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    const cycles = context.getRegister(
      CYCLES,
      () => new DefaultMap<string, number>(() => 0),
    );

    const key = this.group
      ? context.env.toString(
          this.group.evaluateSync(context),
          context,
          this.group.span,
        )
      : this.staticKey;

    let index = cycles.get(key);
    const expr = this.items[index];

    if (expr) {
      buffer.push(
        context.env.toString(expr.evaluateSync(context), context, expr.span),
      );
    }

    index += 1;
    if (index >= this.items.length) {
      index = 0;
    }

    cycles.set(key, index);
  }
}
