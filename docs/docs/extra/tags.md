# Extra Tags

This page documents extra tags available in LiquidScript. These tags are not part of standard Liquid and are not registered automatically with each new LiquidScript environment.

## if (not)

**_New in version 1.1.0_**

A drop-in replacement for the standard [`if`](../language/tags.md#if) tag that supports logical `not` and grouping with parentheses. Please see [the tag reference](../language/tags.md#expressions) for a description of the standard `if` expression.

```
{% if <expression> %}
  <literal,statement,tag> ...
  [ {% elsif <expression> %} <literal,statement,tag> ... [ {% elsif <expression> %} ... ]]
  [ {% else %} <literal,statement,tag> ... ]
{% endif %}
```

Register `liquidscript.extra.tags.IfNotTag` with an [`Environment`](../api/classes/Environment.md) to make it available to templates rendered from that environment.

```javascript
import { Environment, extra } from "liquidscript";

const env = new Environment();
env.addTag("if", new extra.tags.IfNotTag());
```

`and` and `or` operators in Liquid are right associative. Where `true and false and false or true` is equivalent to `(true and (false and (false or true)))`, evaluating to `false`. JavaScript, on the other hand, would parse an equivalent expression as `(((true && false) && false) || true)`, evaluating to `true`.

This implementation of `if` maintains that right associativity so that any standard `if` expression will behave the same, with or without non-standard `if`. Only when `not` or parentheses are used will behavior deviate from the standard.

```liquid title="example.liquid"
{% if ((user.privileged and not user.blocked) or user.is_admin) %}
  Hello, {{ user.name }}!
{% else %}
  User is blocked.
{% endif %}
```

## inline if / else

**_New in version 1.7.0_**

Drop-in replacements for the standard output statement, [`assign`](../language/tags.md#assign) tag, and [`echo`](../language/tags.md#echo) tag that support inline `if`/`else` expressions. You can find a BNF-like description of the inline conditional expression in [this gist](https://gist.github.com/jg-rp/e2dc4da9e5033e087e46016008a9d91c#file-inline_if_expression-bnf).

Register one or more of `ConditionalOutputStatement`, `ConditionalAssignTag` amd `ConditionalEchoTag` from `liquidscript.extra.tags` with an [`Environment`](../api/classes/Environment.md) to make them available to templates rendered from that environment.

```javascript
import { Environment, extra } from "liquidscript";

const env = new Environment();
env.addTag("statement", new extra.tags.ConditionalOutputStatement());
env.addTag("assign", new extra.tags.ConditionalAssignTag());
env.addTag("echo", new extra.tags.ConditionalEchoTag());
```

Inline `if`/`else` expressions are designed to be backwards compatible with standard filtered expressions. As long as there are no template variables called `if` or `else` within a filtered expression, standard output statements, `assign` tags and `echo` tags will behave the same.

In this example, if `user.logged_in` is false or undefined (see [Falsy Undefined](../introduction/undefined.md#falsy-undefined)), `please log in` will be output.

```liquid
{{ user.name if user.logged_in else 'please log in' }}
```

The `else` part of an inline expression is optional, defaulting to [undefined](../introduction/undefined.md).

```liquid title="template"
{{ 'hello user' if user.logged_in }}!
```

```plain title="output"
!
```

Inline conditional expressions are evaluated lazily. If the condition is falsy, the leading object is not evaluated. Equally, if the condition is truthy, any expression following `else` will not be evaluated.

### With Filters

Filters can appear before an inline `if` expression.

```liquid title="template"
{{ 'hello user' | capitalize if user.logged_in else 'please log in' }}
```

Or after an inline `if` expression. In which case filters will only be applied to the `else` clause.

```liquid title="template"
{% assign param = 'hello user' if user.logged_in else 'please log in' | url_encode %}
```

Or both.

```liquid title="template"
{{% assign param = 'hello user' | capitalize if user.logged_in else 'please log in' | url_encode %}
```

Use a double pipe (`||`) to start any filters you want to apply regardless of which branch is taken. Subsequent "tail filters" should be separated by a single pipe (`|`).

```liquid title="template"
{{% assign name =
  user.nickname | downcase
  if user.has_nickname
  else user.last_name | capitalize
  || prepend: user.title | strip
%}
```

## macro / call

**_New in version 1.7.0_**

```plain
{% macro <identifier,string> [[,] [ <object>, ... ] [ <identifier>: <object>, ... ]] %}
```

```plain
{% call <identifier,string> [[,] [ <object>, ... ] [ <identifier>: <object>, ... ]] %}
```

Define parameterized Liquid snippets using the `macro` tag and call them using the `call` tag.

Using the `macro` tag is like defining a function. Its parameter list defines arguments, possibly with default values. A `macro` tag's block has its own scope including its arguments and template global variables, just like the `render` tag.

Note that argument defaults are bound late. They are evaluated when a `call` expression is evaluated, not when the macro is defined.

Register and instance `liquidscript.extra.tags.CallTag` and `liquidscript.extra.tags.MacroTag` with an [`Environment`](../api/classes/Environment.md) to make them available to templates rendered from that environment.

```javascript
import { Environment, extra } from "liquidscript";

const env = new Environment();
env.addTag("call", new extra.tags.CallTag());
env.addTag("macro", new extra.tags.MacroTag());
```

This example defines a `price` macro, then calls it twice with different arguments.

```liquid
{% macro 'price' product, on_sale: false %}
  <div class="price-wrapper">
  {% if on_sale %}
    <p>Was {{ product.regular_price | prepend: '$' }}</p>
    <p>Now {{ product.price | prepend: '$' }}</p>
  {% else %}
    <p>{{ product.price | prepend: '$' }}</p>
  {% endif %}
  </div>
{% endmacro %}

{% call 'price' products[0], on_sale: true %}
{% call 'price' products[1] %}
```

```html title="output"
<div class="price-wrapper">
  <p>Was $5.99</p>
  <p>Now $4.99</p>
</div>

<div class="price-wrapper">
  <p>$12.00</p>
</div>
```

### Excess Arguments

Excess arguments passed to `call` are collected into `args` and `kwargs`.

```liquid title="template"
{% macro 'foo' %}
  {% for arg in args %}
    - {{ arg }}
  {% endfor %}

  {% for arg in kwargs %}
    - {{ arg.0 }} => {{ arg.1 }}
  {% endfor %}
{% endmacro %}

{% call 'foo' 42, 43, 99, a: 3.14, b: 2.71828 %}
```

```plain title="output"
- 42
- 43
- 99

- a => 3.14
- b => 2.71828
```

## with

Extend the current scope for the duration of the `with` block. Useful for aliasing long or nested variable names. Also useful for caching the result of a drop's methods, if the drop does not perform its own caching.

```plain
{% with <identifier>: <object> [, <identifier>: object ... ] %}
  <literal,statement,tag> ...
{% endwith %}
```

Register `liquidscript.extra.tags.WithTag` with an [`Environment`](../api/classes/Environment.md) to make it available to templates rendered from that environment.

```javascript
import { Environment, extra } from "liquidscript";

const env = new Environment();
env.addTag("with", new extra.tags.WithTag());
```

This implementation keeps template variables set inside the with block, using `assign` or `capture`, alive after the block has been rendered.

```liquid title="example.liquid"
{% with product: collection.products.first %}
  {{- product.title -}}
{% endwith %}
```
