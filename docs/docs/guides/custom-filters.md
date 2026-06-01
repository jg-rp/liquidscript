# Custom filters

[Filters](../syntax.md#filters) are implemented as JavaScript functions. The first argument passed to a filter function is the result of evaluating the left hand side of the filter expression (everything before the `|`). All other function arguments are the arguments given to the filter by the template author, if any.

In TypeScript, filters have the following type, with `this` bound to a [`FilterContext`](../api/classes/FilterContext.md), giving filter implementations access to the active [render context](../api/classes/RenderContext.md), [template](../api/classes/Template.md) and [environment](../api/classes/Environment.md).

```ts
type Filter = {
  (this: FilterContext, left: unknown, ...args: unknown[]): unknown;
};
```

:::info
All built-in filters are implemented in this way, so have a look in [src/filters/](https://github.com/jg-rp/liquidscript/tree/main/src/filters) for more examples.

When implementing filters, be mindful of our [number wrappers](../data-types-and-drops.md#number-wrapper) and [drop interface](../data-types-and-drops.md#user-defined-types), including HTML-safe string wrappers.
:::

## Add a filter

Add a custom template filter to a [Liquid environment](../environment.md#managing-tags-and-filters) by updating [`Environment.filters`](../api/classes/Environment.md#filters). It's a regular object mapping filter names to filter implementations (functions).

This example adds a `json` filter. Notice that we use the `FilterContext.assertArgs` helper to check that we've received the expected number of arguments. This ensures our filter behaves consistently with all the built-in filters by throwing an `ArgumentError` if there are too many or too few arguments.

```ts
import { Environment, FilterContext } from "liquidscript";

function JSONFilter(this: FilterContext, left: unknown): string {
  this.assertArgs(arguments.length, 1);
  return JSON.stringify(left);
}

const env = new Environment();
env.filters["json"] = JSONFilter;

const template = env.parse("{{ some_object | json }}");

const data = {
  some_object: [{ foo: "bar" }, { foo: "baz" }],
};

template.render(data).then(console.log);
```

```json title="output"
[{ "foo": "bar" }, { "foo": "baz" }]
```

## Replace a filter

Replace an existing filter by updating [`Environment.filters`](../api/classes/Environment.md#filters). It's OK to register the same filter implementation under multiple names.

This example replaces the built-in `slice` filter with one which uses start and end values instead of start and length, and is a bit more forgiving in terms of allowed inputs.

In general, we should always treat filter implementation argument types as `unknown`. You can't trust template authors to apply filters with arguments of the correct type. Helper functions like `FilterContext.toString()` and `FilterContext.toInteger()` provide a consistent way to coerced filter arguments to useable values.

```ts
import { Environment, FilterContext, object } from "liquidscript";

function mySlice(
  this: FilterContext,
  left: unknown,
  start: unknown,
  end?: unknown,
): string | unknown[] {
  this.assertArgs(arguments.length, 2, 3);

  // Make sure the input value is an array or string.
  const left_ = object.isArray(left) ? left : this.toString(left, "");

  // Make sure `start` is a number.
  const start_ = this.toInteger(start);

  // End is optional
  if (end === undefined) return left_.slice(start_);

  // Make sure `end` is a number.
  const end_ = this.toInteger(end);

  return left_.slice(start_, end_);
}

const env = new Environment();
env.filters["slice"] = mySlice;
```
