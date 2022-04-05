# Render Context

The result of rendering a template depends on the [context](/docs/api/classes/RenderContext) in which it is rendered. That is, available variables and their values, and options set on the bound [Environment](/docs/api/classes/Environment).

Template _global_ variables are those added to a render context by application developers. From a template author's perspective, _globals_ are read-only and are available to all templates, including those rendered with the `render` tag.

_Local_ variables are those defined by template authors using `{% assign %}` and `{% capture %}`. Local variables can mask names defined in the global namespace, but never change them.

Named counters created with [`{% increment %}`](../language/tags#increment) and [`{% decrement %}`](../language/tags#decrement) have their own namespace. Outside of an `increment` or `decrement` tag, Liquid will look in the counters namespace last, after _locals_ and _globals_.

## Environment Globals

You can add _global_ variables to an [Environment](../api/classes/Environment) using the [`globals`](/docs/api/modules#environmentoptions) option. Environment globals are automatically added to the render context of every [Template](../api/classes/Template) created from that environment.

```js
import { Environment } from "liquidscript";

const env = new Environment({ globals: { site_name: "My Site" } });
const source = `
<html>
  <head>
    <title>{{ site_name }}</title>
  </head>
</html>
`;

const template = env.fromString(source);
console.log(template.renderSync());
```

```html title="output"
<html>
  <head>
    <title>My Site</title>
  </head>
</html>
```

## Template Globals

Similar to [Environment Globals](#environment-globals), you can pin global template variables to a [Template](../api/classes/Template). Globals set on a template will be merged with any set on its environment and added to the render context automatically.

If environment and template globals have conflicting names, template variables will take priority over environment variables.

```js
import { Environment } from "liquidscript";

const env = new Environment({ globals: { site_name: "My Site" } });
const source = `
<html>
  <head>
    <title>{{ site_name }} - {{ page.name }}</title>
  </head>
</html>
`;

// The second argument is an optional name for the template.
const template = env.fromString(source, "some_template.liquid", {
  page: { name: "Blog" },
});

console.log(template.renderSync());
```

```html title="output"
<html>
  <head>
    <title>My Site - Blog</title>
  </head>
</html>
```

## Render Arguments

Properties from the object passes to [`Template.render()`](../api/classes/Template#render) and [`Template.renderSync()`](../api/classes/Template#rendersync) are also added to the _global_ namespace, although, unlike environment and template globals, they do not persist between calls to `render()`.

`render()` keyword arguments take priority over environment and template globals.

```js
import { Environment } from "liquidscript";

const env = new Environment({ globals: { site_name: "My Site" } });
const source = `
<html>
  <head>
    <title>{{ site_name }} - {{ page.name }}</title>
  </head>
  <body>
    <p>Hello, {{ user.name }}</p>
  </body>
</html>
`;

// The second argument is an optional name for the template.
const template = env.fromString(source, "some_template.liquid", {
  page: { name: "Blog" },
});

console.log(template.renderSync({ user: { name: "Sally" } }));
```

```html title="output"
<html>
  <head>
    <title>My Site - Blog</title>
  </head>
  <body>
    <p>Hello, Sally</p>
  </body>
</html>
```

## Matter

Matter variables are those that are added to a [template](../api/classes/Template) by a [loader](loading-templates). They could be from a [front matter loader](../guides/custom-loaders#front-matter-loader) or extra meta data from a [database loader](../guides/custom-loaders#async-database-loader).

These, too, are merged into the _global_ namespace, taking priority over template globals, but not `render()` keyword arguments.
