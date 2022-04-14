# Loading Templates

You can load templates from a file system or database, for example, by creating an [Environment](../api/classes/Environment.md) and configuring a template _loader_. You'd also need a loader if you want to use the built-in [include](../language/tags.md#include) or [render](../language/tags.md#render) tags.

[`Environment.getTemplate()`](../api/classes/Environment.md#gettemplate) and [`Environment.getTemplateSync()`](../api/classes/Environment.md#gettemplatesync) accept a template name and return a [`Template`](../api/classes/Template.md) that is bound to the environment, ready to be rendered. The configured loader is responsible for interpreting template names. In the case of a [`NodeFileSystemLoader`](../api/classes/NodeFileSystemLoader.md), the name would be a file name, relative to the loader's search path.

This example assumes a folder called `templates` exists in the current working directory, and that template files `index.html` and `some-list.html` exist within it.

```html title="templates/index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>{{ page_title }}</title>
  </head>
  <body>
    <h1>{{ heading }}</h1>
    {% render 'some-list.html' with people %}
  </body>
</html>
```

```html title="templates/some-list.html"
<ul>
  {% for person in people %}
  <li>{{ person.name }}</li>
  {% endfor %}
</ul>
```

By default, every [Environment](../api/classes/Environment.md) is created with an empty [`MapLoader`](../api/classes/MapLoader.md). Specify an alternative template loader using the `loader` option.

```js
import { Environment, NodeFileSystemLoader } from "liquidscript";

const env = new Environment({
  loader: new NodeFileSystemLoader("./templates/", {
    fileExtension: ".liquid",
  }),
});

const template = env.getTemplateSync("index.html");
const result = template.renderSync({
  heading: "Some List",
  page_title: "Awesome Title",
  people: [{ name: "John" }, { name: "Sally" }],
});

console.log(result);
```

```html title="Output"
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Awesome Title</title>
  </head>
  <body>
    <h1>Some List</h1>
    <ul>
      <li>John</li>
      <li>Sally</li>
    </ul>
  </body>
</html>
```

## Built-In Template Loaders

LiquidScript includes some generic templates loaders, and some that are specific to Node.js or the web browser.

### Generic

| Loader                                           | Description                                                                                     |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| [`MapLoader`](../api/classes/MapLoader.md)       | A template loader that uses a Map of string names to template source code strings.              |
| [`ObjectLoader`](../api/classes/ObjectLoader.md) | A template loader that uses a plain object to map string names to template source code string.  |
| [`ChoiceLoader`](../api/classes/ChoiceLoader.md) | A template loader that will try each of an array of loaders until a matching template is found. |

### Node.js

| Loader                                                                         | Description                                                                         |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| [`NodeFileSystemLoader`](../api/classes/NodeFileSystemLoader.md)               | A template loader that reads templates from a file system using Node's `fs` module. |
| [`CachingNodeFileSystemLoader`](../api/classes/CachingNodeFileSystemLoader.md) | A template loader that caches templates read from a file system.                    |

### Browser

| Loader                                                           | Description                                                                                                                       |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [`FetchLoader`](../api/classes/FetchLoader.md)                   | A template loader that fetches templates using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).       |
| [`XMLHttpRequestLoader`](../api/classes/XMLHttpRequestLoader.md) | A template loader that uses [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) to fetch templates. |
