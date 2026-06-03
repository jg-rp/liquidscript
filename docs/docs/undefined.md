# Undefined variables

At render time, if a template variable or path to a variable can not be resolved to a value, an instance of [`Undefined`](./api/classes/Undefined.md) is used in its place. We can control undefined variable rendering behavior through the [`undefinedType`](./api/type-aliases/EnvironmentOptions.md#undefinedtype) option when constructing a new [Liquid environment](./environment.md).

## Default undefined

The default [`Undefined`](./api/classes/Undefined.md) type is silent. It renders to the empty string, is falsy when tested for truthiness, and yields an empty iterable when looped over with the `{% for %}` tag.

```liquid-html
Hello {{ nosuchthing }}
{% for thing in nosuchthing %}
    {{ thing }}
{% endfor %}
```

```plain title="output"
Hello



```

## Strict undefined

The [`StrictUndefined`](./api/classes/StrictUndefined.md) type throws an [`UndefinedVariableError`](./api/classes/UndefinedVariableError.md) in all contexts, even when tested for truthiness with the `{% if %}` tag.

```js
import { Environment, StrictUndefined } from "liquidscript";

const liquid = new Environment({ undefinedType: StrictUndefined });
const template = liquid.parse("{{ nosuchthing }}");

template.render().then(console.log);
// UndefinedVariableError: 'nosuchthing' is undefined
```

Note that `UndefinedVariableError` inherits from [`DetailedLiquidError`](./api/classes/DetailedLiquidError.md), giving us the opportunity to capture or output useful diagnostic information.

```js
import {
  DetailedLiquidError,
  Environment,
  StrictUndefined,
} from "liquidscript";

const liquid = new Environment({ undefinedType: StrictUndefined });

const template = liquid.parse(
  "{% if nosuchthing %}TRUE{% else %}FALSE{% endif %}",
);

(async () => {
  try {
    await template.render();
  } catch (err) {
    if (err instanceof DetailedLiquidError) {
      console.error(err.render());
    } else {
      throw err;
    }
  }
})();
```

```plain title="output"
name error: 'nosuchthing' is undefined
  -> 1:6
  |
1 | {% if nosuchthing %}TRUE{% else %}FALSE{% endif %}
  |       ^^^^^^^^^^^ 'nosuchthing' is undefined

```

## Falsy strict undefined

The [`FalsyStrictUndefined`](./api/classes/FalsyStrictUndefined.md) type is similar to `StrictUndefined`, but can be tested for truthiness and equality without throwing an exception.

```js
import {
  DetailedLiquidError,
  Environment,
  FalsyStrictUndefined,
} from "liquidscript";

const liquid = new Environment({ undefinedType: FalsyStrictUndefined });

const template = liquid.parse(
  "{% if nosuchthing %}TRUE{% else %}FALSE{% endif %}",
);

(async () => {
  try {
    console.log(await template.render());
  } catch (err) {
    if (err instanceof DetailedLiquidError) {
      console.error(err.render());
    } else {
      throw err;
    }
  }
})();
```

```plain title="output"
FALSE
```

## Customizing undefined variable behavior

All of the built-in `Undefined` types are implemented as [drops](./data-types-and-drops.md#user-defined-types) and are accessed exclusively through the drop API. This means you can inherit from [`Undefined`](./api/classes/Undefined.md) and override any drop methods to customize undefined variable behavior.
