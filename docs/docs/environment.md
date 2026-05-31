---
sidebar_label: Configuration
---

# Liquid environments

Template parsing and rendering behavior is configured using an instance of [`Environment`](./api/classes/Environment.md). Once configured, parse templates with [`Environment.parse()`](./api/classes/Environment.md#parse), [`Environment.getTemplate()`](./api/classes/Environment.md#gettemplate) or [`Environment.getTemplateSync()`](./api/classes/Environment.md#gettemplatesync), all of which return an instance of [`Template`](./api/classes/Template.md).

An `Environment` is where you'd register custom [filters](./syntax.md#filters) or [tags](./syntax.md#tags), or define variables that should be available to all templates, for example.

## The default environment

The [default Liquid environment](./api/variables/DEFAULT_ENVIRONMENT.md) and new instances of `Environment` constructed without any arguments is equivalent to passing the following [options](./api/type-aliases/EnvironmentOptions.md) object to the `Environment` constructor.

```js
const liquid = new Environment({
  autoEscape: false,
  globals: {},
  loader: new MapLoader(),
  maxAssignScore: undefined,
  maxAssignScoreCumulative: undefined,
  maxContextDepth: 30,
  maxRenderScore: undefined,
  maxRenderScoreCumulative: undefined,
  maxRenderSize: undefined,
  strictFilters: true,
  undefinedType: Undefined,
});
```

Top-level convenience functions [`parse()`](./api/functions/parse.md), [`render()`](./api/functions/render.md) and [`renderSync()`](./api/functions/renderSync.md) always use the default environment.

## Managing tags and filters

New instances of [`Environment`](./api/classes/Environment.md) and the [default Liquid environment](./api/variables/DEFAULT_ENVIRONMENT.md) have all standard tags and filters enabled by default. [`Environment.tags`](./api/classes/Environment.md#tags) and [`Environment.filters`](./api/classes/Environment.md#filters) are regular objects mapping strings to [`Tag`](./api/interfaces/Tag.md) and [`Filter`](./api/type-aliases/Filter.md), respectively. You can add, remove or replace tags in an environment by updating these mappings after environment construction.

```js
import { Environment } from "liquidscript";

const env = new Environment();
delete env.tags["include"];
```

Alternatively, you can extend `Environment` and override [`setupTags()`](./api/classes/Environment.md#setuptags) and/or [`setupFilters()`](./api/classes/Environment.md#setupfilters).

```js
import { Environment } from "liquidscript";

class MyEnv extends Environment {
  setupFilters() {
    super.setupFilters();
    delete this.filters["base64_decode"];
    delete this.filters["base64_encode"];
    delete this.filters["base64_url_safe_decode"];
    delete this.filters["base64_url_safe_encode"];
  }
}

const env = new MyEnv();
```

## Managing global variables

Global template variables are those added by application developers, as opposed to _local_ variables created by template authors with tags such as `{% assign %}` and `{% capture %}`. Globals can come from the following places, in order of highest to lowest priority.

1. The `data` argument to [`render()`](./api/functions/render.md), [`renderSync()`](./api/functions/renderSync.md), [`Environment.render()`](./api/classes/Environment.md#render), [`Environment.renderSync()`](./api/classes//Environment.md#rendersync), [`Template.render()`](./api/classes/Template.md#render) or [`Template.renderSync()`](./api/classes/Template.md#rendersync).
2. "overlay" or "matter" data provided by a [template loader](./api/classes/TemplateLoader.md) and bound to a [`Template`](./api/classes/Template.md) instance. This could be front matter parsed from the beginning of a template source file, or data from a database, for example.
3. The `globals` argument to [`parse()`](./api/functions/parse.md) or [`Environment.parse()`](./api/classes/Environment.md#parse). These variables are pinned to the resulting template.
4. The `globals` option when constructing a new [`Environment`](./api/classes/Environment.md). These variables are pinned to the environment and will be merged into other global data for every template rendered from the environment.

Internally we immutably "merge" these [namespaces](./api/type-aliases/Namespace.md) into a single scope using a [`ReadOnlyChainMap`](./api/classes/ReadOnlyChainMap.md). Meaning it's safe to update these namespaces after environment and template construction.

If all of the above sources of global data are being used, we end up with something roughly equivalent to the following at render time.

```js
const locals = Object.create(null); // {% assign %} and {% capture %}
const globals = new ReadOnlyChainMap(
  renderArgument,
  frontMatter,
  parseArgument,
  environmentOption,
);
const counters = Object.create(null); // {% increment %} and {% decrement %}
const scope = new ReadOnlyChainMap(locals, globals, counters);
```

You can change the default global scope priority by extending and overriding [`Environment.makeGlobals()`](./api/classes/Environment.md#makeglobals) and/or [`Template.makeGlobals()`](./api/classes/Template.md#makeglobals).

## HTML auto escape

When the `autoEscape` [option](./api/type-aliases/EnvironmentOptions.md) is set to `true`, all rendered context variables are automatically escaped to produce HTML-safe output. This protects against injection attacks by escaping characters that could be interpreted as HTML when inserted into a page.

Autoescaping replaces the following characters with their HTML-safe equivalents:

- `&` -> `&amp;`
- `<` -> `&lt;`
- `>` -> `&gt;`
- `'` -> `&#39;`
- `"` -> `&#34;`

This escaping is equivalent to applying the [`escape` filter](./reference/filters.md#escape) to every variable, unless the variable is explicitly marked as safe.

:::note

Auto escape and the [`escape`](./reference/filters.md#escape) filter do **not** make strings safe for use in JavaScript, including in `<script>` blocks, inline event handler attributes (e.g. `onerror`), or other JavaScript contexts. For those cases, see the [`escapejs`](./reference/filters.md#escapejs) filter instead.

:::

### HTML safe strings

You can explicitly mark a string a _safe_ by wrapping it in an instance of [`HTMLSafeString`](./api/classes/HTMLSafeString.md). Safe strings are not escaped prior to output (either they are trusted or have already been escaped).

```js
import { Environment, HTMLSafeString } from "liquidscript";

const liquid = new Environment({ autoEscape: true });
const template = liquid.parse("<p>Hello, {{ you }}</p>");

// Without HTMLSafeString
template.render({ you: "<em>World!</em>" }).then(console.log);

// With HTMLSafeString
template
  .render({ you: new HTMLSafeString("<em>World!</em>") })
  .then(console.log);
```

```html title="output"
<p>Hello, &lt;em&gt;World!&lt;/em&gt;</p>
<p>Hello, <em>World!</em></p>
```

User-defined types ([drops](./data-types-and-drops.md)) can implement [`toHTMLSafeString`](./api/variables/toHTMLSafeString.md) and [`toHTMLSafeStringSync`](./api/variables/toHTMLSafeStringSync.md) to render their string representation without HTML escaping.

```js
import {
  Drop,
  Environment,
  toHTMLSafeStringSync,
  toLiquidSync,
} from "liquidscript";

const liquid = new Environment({ autoEscape: true });
const template = liquid.parse("<p>Hello, {{ you }}</p>");

class SomeObject extends Drop {
  [toLiquidSync]() {
    return "<em>World!</em>";
  }
}

class SomeSafeObject extends Drop {
  [toLiquidSync]() {
    return "<em>World!</em>";
  }

  [toHTMLSafeStringSync]() {
    return "<em>World!</em>";
  }
}

// Without toHTMLSafeStringSync
template.render({ you: new SomeObject() }).then(console.log);

// With toHTMLSafeStringSync
template.render({ you: new SomeSafeObject() }).then(console.log);
```

```html title="output"
<p>Hello, &lt;em&gt;World!&lt;/em&gt;</p>
<p>Hello, <em>World!</em></p>
```

## Resource limits

For deployments where template authors are untrusted, you can set limits on some resources to avoid malicious templates from consuming too much memory or too many CPU cycles. If any limit is exceeded, a [`ResourceLimitError`](./api/classes/ResourceLimitError.md) is thrown.

:::note

The following "scores" are non-specific measures of usage modelled on Shopify/liquid resource limits.

These numbers are for illustration purposes. You'll need to do a bit of trial and error to find the limits that work best for you.

:::

```js
const env = new Environment({
  // Maximum of 2000 "bytes" assigned with the assign/capture tags per template
  // or partial template.
  maxAssignScore: 2000,

  // Maximum of 10,000 "bytes" assigned with the assign/capture tags for the
  // root template and all partial templates combined.
  maxAssignScoreCumulative: 10000,

  // Maximum nesting of 30 `for` loops and/or `render` tags, for example.
  maxContextDepth: 30,

  // Maximum of 1000 nodes (text and markup in the template syntax tree) rendered
  // per template.
  maxRenderScore: 1000,

  // Maximum of 5000 nodes (text and markup in the template syntax tree) rendered
  // for the root template and any rendered partial templates combined.
  maxRenderScoreCumulative: 5000,

  // Maximum of 15,000 bytes written to the output buffer.
  maxRenderSize: 15000,
});
```

## What's next?

Read about configuring [template loaders](./loaders.md) and handling [undefined variables](./undefined.md).
