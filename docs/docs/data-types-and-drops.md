# Data types

This page describes how we map Liquid data types to JavaScript, and how to define your own objects that play nicely with Liquid tags, filters and operators.

## Primitive types

In "standard" Liquid, primitive literals are _Boolean_, _Null_, _Integer_, _Float_, _String_ and _Range_. Internally, LiquidScript maps these Liquid literals to JavaScript types as follows:

| Primitive literal | JavaScript type                       | Example Liquid literal |
| ----------------- | ------------------------------------- | ---------------------- |
| Boolean           | boolean                               | `true` or `false`      |
| Null              | null                                  | `null` or `nil`        |
| Integer           | [`Integer`](./api/classes/Integer.md) | `123`, `0`, `-7`       |
| Float             | [`Float`](./api/classes/Float.md)     | `1.23`, `0.1`          |
| String            | string                                | `"Hello"` or `'Hello'` |
| Range             |                                       | `(1..5)` or `(x..y)`   |

Although there is no literal syntax for creating arrays or objects (aka _Hash_), many Liquid tags and filters operate on or expect arrays and objects, and standard variable path notation is designed to traverse nested arrays and objects.

:::note
Liquid has _weak typing_. Anywhere a particular type is expected, Liquid with automatically try to convert a value to the required type.
:::

## Number wrapper

Unlike JavaScript's `number` type, Liquid has distinct integer and float types. The type of a number literal effects the result of some math filters and the number's string representation when output. Additionally, math filters exclusively perform decimal arithmetic, not floating point arithmetic.

For these reasons, LiquidScript stores all literal numbers as instances of [`LiquidNumber`](./api/classes/LiquidNumber.md), and coerces JavaScript numbers to `LiquidNumber` when given as inputs to tags and filters.

## User defined types

A _drop_ is a developer-defined type that plays nicely with Liquid tags, filters and/or operators. Drops are often used to implement lazy data retrieval or dynamic logic depending on the active render context.

All drops extend [`Drop`](./api/classes/Drop.md) and override one or more methods. The base drop is _falsy_, is an empty iterable, is equal to nothing and renders as an empty string.

:::note

All default async methods delegate to their sync equivalents. So, if you don't need to perform IO in your drop, you can safely implement sync methods only.

:::

Each overridable method is a symbol according to the following table. Refer to the [Drop API](./api/classes/Drop.md) for details of arguments passed to each method.

| Methods                                                                                | Description                                                                                                                 |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `[toLiquid]`, `[toLiquidSync]`                                                         | Coerce the drop to a primitive Liquid type given a [context hint](./api/type-aliases/ContextHint.md).                       |
| `[toHTMLSafeString]`, `[toHTMLSafeStringSync]`                                         | Returns an HTML-safe string (it's either trusted or already escaped) that will not be escaped when `autoEscape` is enabled. |
| `[dispatch]` and `[dispatchSync]`                                                      | The method called when Liquid attempts to resolve an otherwise undefined property name against a drop.                      |
| `[isInvocable]`                                                                        | Return `true` if the argument string is the name of a method that Liquid is allowed to call.                                |
| `[length]`, `[slice]`, `[sliceSync]`, `[Symbol.asyncIterator]` and `[Symbol.iterator]` | These methods make up the (possibly lazy) _iterator_ protocol for use with the built-in `{% for %}` tag.                    |
| `[equals]`, `[contains]`, `[containsSync]`, `[lessThan]` and `[lessThanSync]`          | These methods allow for drops to be compared to primitives and other drops using operators such as `=`, `<` and `contains`. |
