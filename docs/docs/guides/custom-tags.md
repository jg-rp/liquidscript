# Custom tags

Liquid [tags](../syntax.md#tags) are implemented through the [`Tag`](../api/interfaces/Tag.md) interface.

```ts
interface Tag {
  parse(token: Token, parser: Parser): Markup;
}
```

In practice we usually implement `Tag` as a static method on the class implementing [`Markup`](../api/interfaces/Markup.md).

:::info
All built-in tags are implemented in this way, so have a look in [src/tags/](https://github.com/jg-rp/liquidscript/tree/main/src/tags) for more examples.
:::

## Example tag

This example implements the `with` tag, which allows template authors to define block scoped variables. `{% with %}` is a _block tag_. It has a start tag, an end tag (`{% endwith %}`), and Liquid markup in between.

```liquid-html
{% with <identifier>: <object> [, <identifier>: <object> ... ] %}
  <text|markup> ...
{% endwith %}
```

Template text, markup and expressions are exposed as a single token stream, accessed through a [`Parser`](../api/classes/Parser.md). A tag's static `parse` method is responsible for asserting and consuming markup delimiters and whitespace control.

### Tag implementation

```ts
import {
  type Block,
  Environment,
  expression,
  type Markup,
  type Namespace,
  type OutputBuffer,
  Parser,
  renderBlock,
  renderBlockSync,
  RenderContext,
  T,
  type Token,
} from "liquidscript";

const END_WITH_BLOCK = new Set(["endwith"]);

export class WithTag implements Markup {
  readonly blank = false;
  readonly tag = "with";

  constructor(
    readonly token: Token,
    readonly args: expression.KeywordArgument[],
    readonly block: Block,
  ) {}

  static parse(token: Token, parser: Parser): WithTag {
    if (parser.kind() === T.COMMA) {
      // Leading commas are OK.
      parser.next();
    }

    const args = parser.parseKeywordArguments(true);

    if (parser.kind() === T.COMMA) {
      // Trailing commas are OK.
      parser.next();
    }

    parser.carryWhitespaceControl();
    parser.eat(T.TAG_END);
    const block = parser.parseBlock(END_WITH_BLOCK);
    parser.eatEmptyTag("endwith");
    return new WithTag(token, args, block);
  }

  async render(context: RenderContext, buffer: OutputBuffer): Promise<void> {
    const namespace: Namespace = Object.create(null);

    for (const arg of this.args) {
      namespace[arg.name.value] = await arg.expr.evaluate(context);
    }

    await context.extend(namespace, async () => {
      await renderBlock(this.block, context, buffer);
    });
  }

  renderSync(context: RenderContext, buffer: OutputBuffer): void {
    const namespace: Namespace = Object.create(null);

    for (const arg of this.args) {
      namespace[arg.name.value] = arg.expr.evaluateSync(context);
    }

    context.extendSync(namespace, () => {
      renderBlockSync(this.block, context, buffer);
    });
  }
}
```

### Usage

Once we have our tag implementation, we need to register it with a [Liquid environment](../environment.md#managing-tags-and-filters).

```ts
// ... continued from above
const env = new Environment();
env.tags["with"] = WithTag;
```
