# HTML Auto-Escape

LiquidScript offers HTML auto-escaping. Where context variables are automatically escaped on output. Disabled by default, enable it by setting the [Environment](../api/classes/Environment.md) or [Template.fromString()](../api/classes/Template.md#fromstring) `autoEscape` option to `true`.

```js
import { Environment } from "liquidscript";

const env = new Environment({ autoEscape: true });
const template = env.fromString("<p>Hello, {{ you }}</p>");
console.log(
  template.renderSync({ you: '</p><script>alert("XSS!");</script>' })
);
```

```html title="output"
<p>Hello, &lt;/p&gt;&lt;script&gt;alert(&#34;XSS!&#34;);&lt;/script&gt;</p>
```

## Markup

Mark a string as "safe" by wrapping it in a [`Markup`](../api/classes/Markup.md) object.

```js
import { Environment, Markup } from "liquidscript";

const env = new Environment({ autoEscape: true });
const template = env.fromString("<p>Hello, {{ you }}</p>");
console.log(template.renderSync({ you: new Markup("<em>World!</em>") }));
```

```html title=output
<p>Hello, <em>World</em></p>
```

In general, if a filter manipulates a `Markup` wrapped string in an "unsafe" way, the resulting string will be escaped on output.

## toLiquidHtml

When HTML auto-escaping is enabled, if an object implements a [`toLiquidHtml`](./objects-and-drops.md#drop-protocol) method, LiquidScript will use the string returned from `[toLiquidHtml]()` instead of `[toLiquidString]()` and `toString()` on output.

```js
import { Environment, Markup, toLiquidHtml } from "liquidscript";

class SomeObj {
  toString() {
    return "<em>World</em>";
  }
}

class OtherObj {
  [toLiquidHtml]() {
    return "<em>World</em>";
  }
}

const env = new Environment({ autoEscape: true });
const template = env.fromString("<p>Hello, {{ you }}</p>");
console.log(template.renderSync({ you: new SomeObj() }));
console.log(template.renderSync({ you: new OtherObj() }));
```

```html title=output
<p>Hello, &lt;em&gt;World&lt;/em&gt;</p>
<p>Hello, <em>World</em></p>
```
