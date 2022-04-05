# Undefined

LiquidScript does not have a "lax" mode like some Liquid engines, but we can control what happens if a template author attempts to use an undefined variable or filter.

## Undefined Variables

When rendering a Liquid template, if a variable name can not be resolved, an instance of [`Undefined`](/docs/api/classes/Undefined) is used instead. We can customize template rendering behavior supplying an `Undefined` factory function to the [`Environment`](/docs/api/classes/environment) constructor or [`Template.fromString()`](/docs/api/classes/Template#fromstring).

```javascript
import { Environment, StrictUndefined } from "liquidsscript";

const env = new Environment({ undefinedFactory: StrictUndefined.from });
env.fromString("{{ nosuchthing }}").renderSync();
// LiquidUndefinedError: 'nosuchthing' is undefined (<string>:1)
```

Built-in `Undefined` types are [`LaxUndefined`](/docs/api/classes/LaxUndefined) (the default) and [`StrictUndefined`](/docs/api/classes/StrictUndefined).

### Default Undefined

All operations on the default `Undefined` type are silently ignored and, when rendered, it produces an empty string. For example, you can access properties and iterate an undefined variable without error.

```liquid title="template"
Hello {{ nosuchthing }}
{% for thing in nosuchthing %}
    {{ thing }}
{% endfor %}
```

```plain title="output"
Hello



```

### Strict Undefined

Given [`StrictUndefined.from`](/docs/api/classes/StrictUndefined#from) as the `undefinedFactory` option to an environment or `Template.fromString()`, any operation on an undefined variable will raise a `LiquidUndefinedError`.

```javascript
import { Environment, StrictUndefined } from "liquidscript";

const env = new Environment({ undefinedFactory: StrictUndefined.from });
env.fromString("{{ nosuchthing }}").renderSync();
// LiquidUndefinedError: 'nosuchthing' is undefined (<string>:1)
```

Note that the "standard" `default` filter does not handle undefined values the [way you might expect](https://github.com/Shopify/liquid/issues/1404). The following example will raise an UndefinedError if username is undefined.

```liquid
Hello {{ username | default: "user" }}
```

Similarly, standard `{% if %}` expressions do not allow you to detect undefined values. See [Shopify Liquid issue #1034](https://github.com/Shopify/liquid/issues/1034).

## Undefined Filters

By default, attempts to use an undefined filter will raise a `NoSuchFilterError`.

```javascript
import { Environment } from "liquidscript";

const env = new Environment();
env.fromString("{{ 'hello' | camel_case }}").renderSync();
// NoSuchFilterError: unknown filter camel_case (<string>:1)
```

Set the `strictFilters` option on the `Environment` constructor or `Template.fromString` to `false`, and undefined filters will be silently ignored.

```javascript
import { Environment } from "liquidscript";

const env = new Environment({ strictFilters: false });
console.log(env.fromString("{{ 'hello' | camel_case }}").renderSync());
// hello
```
