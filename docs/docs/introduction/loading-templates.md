# Loading Templates

You can load templates from a file system or database, for example, by creating an [Environment](/docs/api/classes/Environment) and configuring a template _loader_. You'd also need a loader if you want to use the built-in [include](../language/tags#include) or [render](../language/tags#render) tags.

[`Environment.getTemplate()`](/docs/api/classes/Environment#gettemplate) and [`Environment.getTemplateSync()`](/docs/api/classes/Environment#gettemplatesync) accept a template name and return a [`Template`](/docs/api/classes/Template) that is bound to the environment, ready to be rendered. The configured loader is responsible for interpreting template names. In the case of a [`NodeFileSystemLoader`](/docs/api/classes/NodeFileSystemLoader), the name would be a file name, relative to the loader's search path.

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

By default, every [Environment](/docs/api/classes/Environment) is created with an empty [`MapLoader`](/docs/api/classes/MapLoader). Specify an alternative template loader using the `loader` option.

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
| [`MapLoader`](/docs/api/classes/MapLoader)       | A template loader that uses a Map of string names to template source code strings.              |
| [`ObjectLoader`](/docs/api/classes/ObjectLoader) | A template loader that uses a plain object to map string names to template source code string.  |
| [`ChoiceLoader`](/docs/api/classes/ChoiceLoader) | A template loader that will try each of an array of loaders until a matching template is found. |

### Node.js

| Loader                                                                         | Description                                                                         |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| [`NodeFileSystemLoader`](/docs/api/classes/NodeFileSystemLoader)               | A template loader that reads templates from a file system using Node's `fs` module. |
| [`CachingNodeFileSystemLoader`](/docs/api/classes/CachingNodeFileSystemLoader) | A template loader that caches templates read from a file system.                    |

### Browser

| Loader                                                           | Description                                                                                                                       |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [`FetchLoader`](/docs/api/classes/FetchLoader)                   | A template loader that fetches templates using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).       |
| [`XMLHttpRequestLoader`](/docs/api/classes/XMLHttpRequestLoader) | A template loader that uses [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) to fetch templates. |
