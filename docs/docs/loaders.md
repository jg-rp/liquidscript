# Template loaders

A template loader is a class inheriting from [`TemplateLoader`](./api/classes/TemplateLoader.md). It is responsible for finding template source text given a name or identifier, and will be called upon whenever you call [`Environment.getTemplate()`](./api/classes/Environment.md#gettemplate) or [`Environment.getTemplateSync()`](./api/classes/Environment.md#gettemplatesync), or by tags such as `{% render %}` and `{% include %}`. When a template can not be found, a [`TemplateNotFoundError`](./api/classes/TemplateNotFoundError.md) or [`NoSuchTemplateError`](./api/classes/NoSuchTemplateError.md) is thrown.

Every [Liquid environment](./environment.md) has exactly one configured template loader, the default of which is an empty [`MapLoader`](./api/classes/MapLoader.md), meaning `getTemplate()`, `{% render %}` and `{% include %}` always throw an error.

:::info

Both `NoSuchTemplateError` and `TemplateNotFoundError` inherit from `LiquidError`. The former is a detailed error including diagnostic information about where in the parent template `{% render %}`, `{% include %}` or `{% extends %}` was called. `NoSuchTemplateError` is the error thrown when calling [`Template.render()`](./api/classes/Template.md#render) or similar.

The latter does not include diagnostic information. It is thrown by template loaders and surfaces when there is no parent template available, like when calling [`Environment.getTemplate()`](./api/classes/Environment.md#gettemplate) directly.

:::

To use one of the built-in template loaders described here, pass an instance of it as the `loader` option when constructing your Liquid environment.

## Built-in loaders

### `MapLoader`

[`MapLoader`](./api/classes/MapLoader.md) is a template loader that stores template source code in a [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) mapping strings to strings. The map's keys are template names and it's values are template source code.

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

TODO:

### `ChoiceLoader`

TODO:

### `FetchLoader`

TODO: