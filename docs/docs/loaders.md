# Template loaders

A template loader is responsible for finding template source text given a name or identifier, and will be called upon whenever you call [`Environment.getTemplate()`](./api/classes/Environment.md#gettemplate) or [`Environment.getTemplateSync()`](./api/classes/Environment.md#gettemplatesync), or by tags such as `{% render %}` and `{% include %}`. When a template can not be found, a [`TemplateNotFoundError`](./api/classes/TemplateNotFoundError.md) or [`NoSuchTemplateError`](./api/classes/NoSuchTemplateError.md) is thrown.

Every [Liquid environment](./environment.md) has exactly one configured template loader, the default of which is an empty [`MapLoader`](./api/classes/MapLoader.md), meaning `getTemplate()`, `{% render %}` and `{% include %}` will always throw an error.

:::info

Both `NoSuchTemplateError` and `TemplateNotFoundError` inherit from `LiquidError`. The former is a detailed error including diagnostic information about where in the parent template `{% render %}`, `{% include %}` or `{% extends %}` was called. `NoSuchTemplateError` is the error thrown when calling [`Template.render()`](./api/classes/Template.md#render) or similar.

The latter does not include diagnostic information. It is thrown by template loaders and surfaces when there is no parent template available, like when calling [`Environment.getTemplate()`](./api/classes/Environment.md#gettemplate) directly.

:::

## Built-in loaders

To use one of the built-in template loaders described here, pass an instance of it as the `loader` option when constructing your Liquid environment.

### `MapLoader`

[`MapLoader`](./api/classes/MapLoader.md) is a template loader that stores template source code in a [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), mapping strings to strings. The map's keys are template names and it's values are template source code.

```js
import { Environment, MapLoader } from "liquidscript";

const loader = new MapLoader([
  ["index", "This is the index. {% render 'section' %}"],
  ["section", "Hi!"],
]);

const liquid = new Environment({ loader });
const template = liquid.getTemplateSync("index");

template.render().then(console.log);
// This is the index. Hi!
```

### `ObjectLoader`

[`ObjectLoader`](./api/classes/ObjectLoader.md) is a template loader that stores template source code in a plain old JavaScript object. Object properties are template names and values are template source code.

:::note

When using `ObjectLoader` in a production setting, beware of exposing properties from the object prototype. You could instantiate the object passed to the `ObjectLoader` constructor with `Object.create(null)`, or use `MapLoader` instead.

:::

```js
import { Environment, ObjectLoader } from "liquidscript";

const loader = new ObjectLoader({
  index: "This is the index. {% render 'section' %}",
  section: "Hi!",
});

const liquid = new Environment({ loader });
const template = liquid.getTemplateSync("index");

template.render().then(console.log);
// This is the index. Hi!
```

### `NodeFileSystemLoader`

[`NodeFileSystemLoader`](./api/classes/NodeFileSystemLoader.md) is a template loader that reads template source text from files on a file system using the Node.js `fs` API.

:::note

`NodeFileSystemLoader` and `CachingNodeFileSystemLoader` are tested on Node.js and Bun. You should expect a [`LiquidError`](./api/classes/LiquidError.md) when constructing a `NodeFileSystemLoader` in a browser runtime where `fs` is not available.

:::

The fist argument to `NodeFileSystemLoader` is a path or array of paths to search for files containing template source code. The `fileExtension` [option](./api/type-aliases/NodeFileSystemLoaderOptions.md) is a default file extension appended to the template name if it does not already have an extension.


```js
import { Environment, NodeFileSystemLoader } from "liquidscript";

const liquid = new Environment({
  loader: new NodeFileSystemLoader("./templates/", {
    fileExtension: ".liquid",
  }),
});

// Look for `index.liquid` in the `templates` folder relative to the current
// working directory.
const template = liquid.getTemplateSync("index");
```

### `CachingNodeFileSystemLoader`

[`CachingNodeFileSystemLoader`](./api/classes/CachingNodeFileSystemLoader.md) is similar to [`NodeFileSystemLoader`](#nodefilesystemloader), but caches parsed templates in an in-memory, least recently used (LRU) cache. The default cache size is 300 templates.

```js
import { Environment, CachingNodeFileSystemLoader } from "liquidscript";

const liquid = new Environment({
  loader: new CachingNodeFileSystemLoader("./templates/", {
    fileExtension: ".liquid",
    cacheSize: 500,
    autoReload: true,
  }),
});

// Look for `index.liquid` in the `templates` folder relative to the current
// working directory.
const template = liquid.getTemplateSync("index");

const theSameTemplate = liquid.getTemplateSync("index");
```

### `ChoiceLoader`

[`ChoiceLoader`](./api/classes/ChoiceLoader.md) is a template loader that delegates to other template loaders. Given a list of template loader instances, `ChoiceLoader` will try each in turn until a template is found.

```js
import {
  Environment,
  CachingNodeFileSystemLoader,
  ChoiceLoader,
  MapLoader,
} from "liquidscript";

const fallbackLoader = new MapLoader([
  ["layout", "A default layout {% include content %}"],
]);

const dynamicLoader = new CachingNodeFileSystemLoader("./templates/", {
  fileExtension: ".liquid",
  cacheSize: 500,
  autoReload: true,
});

const liquid = new Environment({
  loader: new ChoiceLoader([dynamicLoader, fallbackLoader]),
});

// Look for `layout.liquid` first, fallback to the map loader if it does not
// exist.
const template = liquid.getTemplateSync("layout");
```

### `FetchLoader`

[`FetchLoader`](./api/classes/FetchLoader.md) is a template loader that uses the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to load templates over a network. It treats response body text a template source code, and serves as a starting point for anyone wishing to implement a custom template loader that needs to parse a JSON formatted response body, for example. 

:::note

`FetchLoader` is async only. Expect a `LiquidError` when using `FetchLoader` in a synchronous context.

:::

```js
import { Environment, FetchLoader } from "liquidscript";

const liquid = new Environment({
  loader: new FetchLoader("https://example.com/templates/"),
});

(async () => {
  // Request template source code from https://example.com/templates/index
  const template = await liquid.getTemplate("index");
})();

```

## Custom loaders

You are encouraged to write you own template loaders to read templates from a database or process front-matter, for example. Simply extend [`TemplateLoader`](./api/classes/TemplateLoader.md) and implement `getSource()` and `getSourceSync()`. Both return a [`TemplateSource`](./api/type-aliases/TemplateSource.md) object containing template source text an template meta data.

This example implements a simple front matter loader, which reads data from the start of a file, and template source text from the rest. We inherit from `CachingFileSystemLoader` and assume [`yaml`](https://www.npmjs.com/package/yaml) is installed.

```ts
import { parse as parseYAML } from "yaml";

import {
  Environment,
  CachingNodeFileSystemLoader,
  type TemplateSource,
} from "liquidscript";

const RE_FRONT_MATTER = /^\s*---\s*(.*?)\s*---\s*/s;

class FrontMatterLoader extends CachingNodeFileSystemLoader {
  override async getSource(
    env: Environment,
    name: string,
  ): Promise<TemplateSource> {
    const templateSource = await super.getSource(env, name);
    const match = RE_FRONT_MATTER.exec(templateSource.source);

    if (match) {
      // TODO: YAML error handling and validation.
      templateSource.overlay = parseYAML(match[1]);
      templateSource.source = templateSource.source.slice(match[0].length);
    }

    return templateSource;
  }

  override getSourceSync(env: Environment, name: string): TemplateSource {
    const templateSource = super.getSourceSync(env, name);
    const match = RE_FRONT_MATTER.exec(templateSource.source);

    if (match) {
      // TODO: YAML error handling and validation.
      templateSource.overlay = parseYAML(match[1]);
      templateSource.source = templateSource.source.slice(match[0].length);
    }

    return templateSource;
  }
}
```


### Load context

Sometimes a template's name alone is not enough to identify the correct source text. For such cases, [`getSource()`](./api/classes/TemplateLoader.md#getsource) and [`getSourceSync()`](./api/classes/TemplateLoader.md#getsourcesync) accept optional `context` and `options` objects to help narrow the template search space.

`context` will be set to the current [render context](./api/classes/RenderContext.md), if one is available. `context` will always be `undefined` when calling [`Environment.getTemplate()`](./api/classes/Environment.md#gettemplate) directly, as a render context does not yet exist.

`options` is an arbitrary mapping of strings to unknown values. You can use this to bootstrap the loading sequence at parse time by passing `options` to `Environment.getTemplate()`.

By convention, built-in tags that load partial templates - `{% include %}`, `{% render %}` and `{% extends %}` - set `options.tag` to the tag name (`"include"`, `"render"` and `"extends"`, respectively), so you know what is tying to load a template. We can use this convention to mimic Shopify's "snippets" convention, where `{% include %}` and `{% render %}` implicitly look in a `snippets` subfolder.

```ts
import path from "path";

import {
  Environment,
  CachingNodeFileSystemLoader,
  type TemplateSource,
  RenderContext,
} from "liquidscript";

class SnippetLoader extends CachingNodeFileSystemLoader {
  override async getSource(
    env: Environment,
    name: string,
    context?: RenderContext,
    options?: Record<string, unknown>,
  ): Promise<TemplateSource> {
    const tag = options?.tag;

    if (tag === "include" || tag === "render") {
      // Prepend "snippets" to name.
      return await super.getSource(
        env,
        path.join("snippets/", name),
        context,
        options,
      );
    }

    return await super.getSource(env, name, context, options);
  }

  override getSourceSync(
    env: Environment,
    name: string,
    context?: RenderContext,
    options?: Record<string, unknown>,
  ): TemplateSource {
    const tag = options?.tag;

    if (tag === "include" || tag === "render") {
      // Prepend "snippets" to name.
      return super.getSourceSync(
        env,
        path.join("snippets/", name),
        context,
        options,
      );
    }

    return super.getSourceSync(env, name, context, options);
  }
}
```

### Caching loaders

The recommended way to implement template loader caching is to override [`load()`](./api/classes/TemplateLoader.md#load) and [`loadSync()`](./api/classes/TemplateLoader.md#loadsync). These methods delegate to `getSource()` and `getSourceSync()`, providing a convenient hook.

See the implementation of [`CachingNodeFileSystemLoader`](./api/classes/CachingNodeFileSystemLoader.md) for an example.
