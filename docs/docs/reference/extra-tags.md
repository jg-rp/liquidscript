# Extra tags

The tags described on this page are **not** enabled by default. You'll need to explicitly register them with your [Liquid environment](../environment.md).

If we were to register all extra tags, it would look like this.

```js
import { Environment, tags } from "./src/liquidscript";

const env = new Environment();
env.tags["block"] = tags.BlockTag;
env.tags["extends"] = tags.ExtendsTag;
env.tags["with"] = tags.WithTag;
```

Or by extending `Environment` and overriding `setupTags()`.

```js
class MyEnv extends Environment {
  override setupTags(): void {
    super.setupTags();
    this.tags["block"] = tags.BlockTag;
    this.tags["extends"] = tags.ExtendsTag;
    this.tags["with"] = tags.WithTag;
  }
}

const env_ = new MyEnv();
```

## extends

```
{% extends <template name> %}
```

Together with the [`block`](#block) tag, the `extends` tag allows you to inherit from parent templates and define blocks that can be overridden by child templates.

In this example, `page.html` inherits from `base.html` and overrides the `content` block. As `page.html` does not define a `footer` block, the footer from `base.html` is used.

```liquid2 title="base.html"
<body>
  <div id="content">{% block content required %}{% endblock %}</div>
  <div id="footer">{% block footer %}Default footer{% endblock %}</div>
</body>
```

```liquid2 title="page.html"
{% extends 'base.html' %}
{% block content %}Hello, {{ you }}!{% endblock %}
```

### block

```
{% block <name> [required] %} <Liquid markup> {% endblock [<name>] %}
```

Every `block` tag must have a name that is unique to the template. If the optional `required` argument is given, the block must be overridden by a child template, otherwise a `RequiredBlockError` will be thrown.

```liquid2
<body>
  <div id="content">
    {% block content %}
      {% block title %}
        <h1>Some Title</h1>
      {% endblock title %}
    {% endblock content %}
  </div>
  <div id="footer">
    {% block footer %}
      Default footer
    {% endblock footer %}
  </div>
</body>
```

#### Super blocks

A `block` object is available inside every `{% block %}` tag. It has just one property, `super`. If a `{% block %}` is overriding a parent block, `{{ block.super }}` will render the parent's implementation of that block.

In this example we use `{{ block.super }}` in the `footer` block to output the base template's footer with a year appended to it.

```liquid2 title="base"
<head>
  {% block head %}{% endblock %}
<head>
<body>
  <div id="content">{% block content required %}{% endblock %}</div>
  <div id="footer">{% block footer %}Default footer{% endblock %}</div>
</body>
```

```liquid2 title="child"
{% extends "base" %}
{% block content %}Hello, World!{% endblock %}
{% block footer %}{{ block.super }} - 2025{% endblock %}
```

```html title="output"
<body>
  <div id="content">Hello, World!</div>
  <div id="footer">Default footer - 2025</div>
</body>
```

## with

```
{% with <identifier>: <expression> [, <identifier>: <expression> ... ] %}
  <liquid markup>
{% endwith %}
```

The `with` tag extends the template namespace with block scoped variables. These variables have the potential to shadow global variables or preceding variables assigned with `{% assign %}` and `{% capture %}`.

```liquid2
{% with p: collection.products.first %}
  {{ p.title }}
{% endwith %}

{% with a: 1, b: 3.4 %}
  {{ a }} + {{ b }} = {{ a | plus: b }}
{% endwith %}
```
