# Liquid environments

Template parsing and rendering behavior is configured using an instance of [`Environment`](./api/classes/Environment.md). Once configured, you parse templates with [`Environment.parse()`](./api/classes/Environment.md#parse), [`Environment.getTemplate()`](./api/classes/Environment.md#gettemplate) or [`Environment.getTemplateSync()`](./api/classes/Environment.md#gettemplatesync), all of which return an instance of [`Template`](./api/classes/Template.md).

## The default environment

The [default Liquid environment](./api/variables/DEFAULT_ENVIRONMENT.md) and a new instance of `Environment` constructed without any arguments is equivalent to passing the following [options](./api/type-aliases/EnvironmentOptions.md) object to the `Environment` constructor.

```js
const env = new Environment({
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
  undefinedType: Undefined
})
```

## Managing tags and filters

New instances of [`Environment`](./api/classes/Environment.md) and the [default Liquid environment](./api/variables/DEFAULT_ENVIRONMENT.md) have all standard tags and filters enabled by default. It's OK to manipulate [`Environment.tags`](./api/classes/Environment.md#tags) and [`Environment.filters`](./api/classes/Environment.md#filters) after environment construction, they are regular objects mapping strings to [`Tag`](./api/interfaces/Tag.md) and [`Filter`](./api/type-aliases/Filter.md).

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
const env = new MyEnv()
```

## Managing global variables

Global template variables are those added to a render context by application developers, as opposed to _local_ variables created by template authors with tags such as `{% assign %}` and `{% capture %}`. Globals can come from the following places, in order of highest to lowest priority.

1. The `data` argument to [`render()`](./api/functions/render.md), [`renderSync()`](./api/functions/renderSync.md), [`Environment.render()`](./api/classes/Environment.md#render), [`Environment.renderSync()`](./api/classes//Environment.md#rendersync), [`Template.render()`](./api/classes/Template.md#render) or [`Template.renderSync()`](./api/classes/Template.md#rendersync).
2. "overlay" or "matter" data provided by a [template loader](./api/classes/TemplateLoader.md) and bound to a [`Template`](./api/classes/Template.md) instance. This could be front matter parsed from the beginning of a template source file, or data from a database, for example.
3. The `globals` argument to [`parse()`](./api/functions/parse.md) or [`Environment.parse()`](./api/classes/Environment.md#parse). These variables are pinned to the resulting template.
4. The `globals` option when constructing a new [`Environment`](./api/classes/Environment.md). These variables are pinned to the environment and will be merged into global data for every template rendered from the environment.

Internally we immutably "merge" these [namespaces](./api/type-aliases/Namespace.md) into a single scope using a [`ReadOnlyChainMap`](./api/classes/ReadOnlyChainMap.md). Meaning it's safe to update these namespaces after environment and template construction.

If all of the above sources of global data are being used, we end up with something roughly equivalent to the following at render time.

```js
const locals = Object.create(null); // {% assign %} and {% capture %}
const globals = new ReadOnlyChainMap(renderArgument, frontMatter, parseArgument, environmentOption)
const counters = Object.create(null) // {% increment %} and {% decrement %}
const scope = new ReadOnlyChainMap(locals, globals, counters);
```

You can change the default global scope priority by extending and overriding [`Environment.makeGlobals()`](./api/classes/Environment.md#makeglobals) and/or [`Template.makeGlobals()`](./api/classes/Template.md#makeglobals).

## HTML auto escape

TODO:

## Resource limits

TODO: