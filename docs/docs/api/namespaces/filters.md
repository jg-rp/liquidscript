---
id: "filters"
title: "Namespace: filters"
sidebar_label: "filters"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### abs

▸ **abs**(`this`, `left`): [`NumberT`](../modules.md#numbert)

Return the absolute value of a number. Given a value that can't be cast to
an integer or float, `0` will be returned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. If it can't be converted to a number, zero will be used instead. |

#### Returns

[`NumberT`](../modules.md#numbert)

- The absolute value of the input argument.

#### Defined in

[src/builtin/filters/math.ts:15](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/math.ts#L15)

___

### append

▸ **append**(`this`, `left`, `other`): `string` \| [`Markup`](../classes/Markup.md)

Return the input value concatenated with the argument value.

If either the input value or argument are not a string, they will be
coerced to a string before concatenation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |
| `other` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string` \| [`Markup`](../classes/Markup.md)

The input value concatenated with the argument value.

#### Defined in

[src/builtin/filters/string.ts:20](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L20)

___

### atLeast

▸ **atLeast**(`this`, `left`, `arg`): [`NumberT`](../modules.md#numbert)

Return the maximum of the filter's input value and its argument. If either
input value or argument are string representations of an integer or float,
they will be cast to an integer or float prior to comparison.

If either input value or argument can not be cast to an integer or float,
`0` will be used instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. If it can't be converted to a number, zero will be used instead. |
| `arg` | `unknown` | Any value. If it can't be converted to a number, zero will be used instead. |

#### Returns

[`NumberT`](../modules.md#numbert)

The maximum of the input value and the argument value.

#### Defined in

[src/builtin/filters/math.ts:36](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/math.ts#L36)

___

### atMost

▸ **atMost**(`this`, `left`, `arg`): [`NumberT`](../modules.md#numbert)

Return the minimum of the filter's input value and its argument. If either
input value or argument are string representations of an integer or float,
they will be cast to an integer or float prior to comparison.

If either input value or argument can not be cast to an integer or float,
`0` will be used instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. If it can't be converted to a number, zero will be used instead. |
| `arg` | `unknown` | Any value. If it can't be converted to a number, zero will be used instead. |

#### Returns

[`NumberT`](../modules.md#numbert)

The minimum of the input value and the argument value.

#### Defined in

[src/builtin/filters/math.ts:61](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/math.ts#L61)

___

### base64Decode

▸ **base64Decode**(`this`, `left`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) |
| `left` | `unknown` |

#### Returns

`string`

#### Defined in

[src/builtin/filters/node_base64.ts:10](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/node_base64.ts#L10)

___

### base64Encode

▸ **base64Encode**(`this`, `left`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) |
| `left` | `unknown` |

#### Returns

`string`

#### Defined in

[src/builtin/filters/node_base64.ts:5](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/node_base64.ts#L5)

___

### base64UrlSafeDecode

▸ **base64UrlSafeDecode**(`this`, `left`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) |
| `left` | `unknown` |

#### Returns

`string`

#### Defined in

[src/builtin/filters/node_base64.ts:35](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/node_base64.ts#L35)

___

### base64UrlSafeEncode

▸ **base64UrlSafeEncode**(`this`, `left`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) |
| `left` | `unknown` |

#### Returns

`string`

#### Defined in

[src/builtin/filters/node_base64.ts:23](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/node_base64.ts#L23)

___

### capitalize

▸ **capitalize**(`this`, `left`): `string` \| [`Markup`](../classes/Markup.md)

Return the input string with the first character in upper case and the rest
lowercase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string` \| [`Markup`](../classes/Markup.md)

The input string with the first character in upper case and the rest
lowercase.

#### Defined in

[src/builtin/filters/string.ts:51](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L51)

___

### ceil

▸ **ceil**(`this`, `left`): [`NumberT`](../modules.md#numbert)

Round the input value up to the nearest whole number. The input value will
be converted to a number if it is not an integer or float.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. If it can't be converted to a number, zero will be used instead. |

#### Returns

[`NumberT`](../modules.md#numbert)

The input value rounded up to the nearest whole number.

#### Defined in

[src/builtin/filters/math.ts:80](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/math.ts#L80)

___

### compact

▸ **compact**(`this`, `left`, `prop?`): `unknown`[]

Remove `null` and `undefined` values from an array-like object. If given, the
argument should be the name of a property that exists on each object in the
array-like sequence.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. |
| `prop?` | `unknown` | The name of a property to check for `null` or `undefined` values. Each object in the input iterable should have this property. |

#### Returns

`unknown`[]

- A new array with `null` and `undefined` values removed.

#### Defined in

[src/builtin/filters/array.ts:111](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/array.ts#L111)

___

### concat

▸ **concat**(`this`, `left`, `arg`): `unknown`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | - |
| `arg` | `unknown` |  |

#### Returns

`unknown`[]

#### Defined in

[src/builtin/filters/array.ts:134](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/array.ts#L134)

___

### date

▸ **date**(`this`, `left`, `format`): `string`

Format a date according to the given format string. If the input is not a
date it will be converted to a string and parsed using one of the common
date representation standards.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | The date to be formatted. |
| `format` | `unknown` | A format string. |

#### Returns

`string`

A string representation of the input date according to the given
format string.

#### Defined in

[src/builtin/filters/misc.ts:126](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/misc.ts#L126)

___

### default\_

▸ **default_**(`this`, `left`, `_default?`): `unknown`

Return a default value if the input is nil, false or empty.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | `undefined` | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | `undefined` | Any value. |
| `_default` | `unknown` | `""` | Optional default value. Defaults to an empty string. |

#### Returns

`unknown`

The default value if the input is nil, false or empty.

#### Defined in

[src/builtin/filters/misc.ts:45](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/misc.ts#L45)

___

### dividedBy

▸ **dividedBy**(`this`, `left`, `divisor`): [`NumberT`](../modules.md#numbert)

Divide the input value by the argument value, rounded down to the nearest
whole number if the divisor is an integer.

**`throws`** [FilterArgumentError](../classes/FilterArgumentError.md)
Thrown if the divisor is zero or can't be converted to a number.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. If it can't be converted to a number, zero will be used instead. |
| `divisor` | `unknown` | Any value. If it can't be converted to a number an exception will be raised. |

#### Returns

[`NumberT`](../modules.md#numbert)

The input value divided by the argument value.

#### Defined in

[src/builtin/filters/math.ts:99](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/math.ts#L99)

___

### downcase

▸ **downcase**(`this`, `left`): `string` \| [`Markup`](../classes/Markup.md)

Return the input string with all characters in lowercase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string` \| [`Markup`](../classes/Markup.md)

The input string with all characters in lowercase.

#### Defined in

[src/builtin/filters/string.ts:73](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L73)

___

### escape

▸ **escape**(`this`, `left`): `string` \| [`Markup`](../classes/Markup.md)

Return the input string with `&`, `<`, `>`, `"`, `'`, and "\`" replaced with
HTML escape codes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string` \| [`Markup`](../classes/Markup.md)

The input string with `&`, `<`, `>`, `"`, `'`, and "\`" replaced
with HTML escape codes.

#### Defined in

[src/builtin/filters/string.ts:90](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L90)

___

### escapeOnce

▸ **escapeOnce**(`this`, `left`): `string` \| [`Markup`](../classes/Markup.md)

Return the input string with `&`, `<`, `>`, `"`, `'`, and "\`" replaced with
HTML escape codes while preserving existing escape sequences.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string` \| [`Markup`](../classes/Markup.md)

The input string with `&`, `<`, `>`, `"`, `'`, and "\`" replaced
with HTML escape codes while preserving existing escape sequences.

#### Defined in

[src/builtin/filters/string.ts:107](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L107)

___

### first

▸ **first**(`this`, `left`): `unknown`

Return the first item of the input sequence. The input could be array-like
or a mapping, but not a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. |

#### Returns

`unknown`

The first item in the input iterable, or `null` if the input value
is not iterable, or `undefined` if the iterable is empty.

#### Defined in

[src/builtin/filters/array.ts:66](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/array.ts#L66)

___

### floor

▸ **floor**(`this`, `left`): [`NumberT`](../modules.md#numbert)

Round the input value down to the nearest whole number. The input value will
be converted to a number if it is not an integer or float.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. If it can't be converted to a number, zero will be used instead. |

#### Returns

[`NumberT`](../modules.md#numbert)

The input value rounded down to the nearest whole number.

#### Defined in

[src/builtin/filters/math.ts:120](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/math.ts#L120)

___

### join

▸ **join**(`this`, `left`, `separator?`): `string` \| [`Markup`](../classes/Markup.md)

Concatenate items in an array-like object into a single string, separated by
a separator string.

If the input value is not array-like, it will be coerced to one. If input
array items are not strings, they will be converted to strings before joining.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. If it's not iterable, a new array will be used with the value as its first and only item. |
| `separator?` | `unknown` | A string to be used to separate input items in the output string. Defaults to a single space. |

#### Returns

`string` \| [`Markup`](../classes/Markup.md)

Items in the input array, concatenated together and separated by
the given separator.

#### Defined in

[src/builtin/filters/array.ts:39](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/array.ts#L39)

___

### last

▸ **last**(`this`, `left`): `unknown`

Return the last item of the input sequence. The input could be array-like,
but not a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. |

#### Returns

`unknown`

The last item in the input iterable, or `null` if the input value
is not iterable.

#### Defined in

[src/builtin/filters/array.ts:88](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/array.ts#L88)

___

### lstrip

▸ **lstrip**(`this`, `left`): `string` \| [`Markup`](../classes/Markup.md)

Return the input string with all leading whitespace removed. If the input is
not a string, it will be converted to a string before stripping whitespace.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string` \| [`Markup`](../classes/Markup.md)

The input string with all leading whitespace removed

#### Defined in

[src/builtin/filters/string.ts:126](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L126)

___

### map

▸ **map**(`this`, `left`, `key`): `unknown`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | - |
| `key` | `unknown` |  |

#### Returns

`unknown`[]

#### Defined in

[src/builtin/filters/array.ts:155](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/array.ts#L155)

___

### minus

▸ **minus**(`this`, `left`, `right`): [`NumberT`](../modules.md#numbert)

Subtract the argument value from the input value. If either the input or
argument are not a number, they will be convert to a number. If that
conversion fails, `0` is used instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | -Any value. If it can't be converted to a number, zero will be used instead. |
| `right` | `unknown` | Any value. If it can't be converted to a number, zero will be used instead. |

#### Returns

[`NumberT`](../modules.md#numbert)

The result of subtracting the argument value from the input value.

#### Defined in

[src/builtin/filters/math.ts:138](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/math.ts#L138)

___

### modulo

▸ **modulo**(`this`, `left`, `right`): [`NumberT`](../modules.md#numbert)

Return the remainder from the division of the input value by the argument
value.

**`throws`** [FilterArgumentError](../classes/FilterArgumentError.md)
Thrown if the argument is zero or can't be converted to a number.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. If it can't be converted to a number, zero will be used instead. |
| `right` | `unknown` | Any value. If it can't be converted to a number an exception will be raised. |

#### Returns

[`NumberT`](../modules.md#numbert)

the remainder from the division of the input value by the argument
value.

#### Defined in

[src/builtin/filters/math.ts:162](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/math.ts#L162)

___

### newlineToBr

▸ **newlineToBr**(`this`, `left`): `string` \| [`Markup`](../classes/Markup.md)

Return the input string with `\n` and `\r\n` replaced with `<br />\n`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string` \| [`Markup`](../classes/Markup.md)

The input string with `\n` and `\r\n` replaced with `<br />\n`.

#### Defined in

[src/builtin/filters/string.ts:140](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L140)

___

### plus

▸ **plus**(`this`, `left`, `right`): [`NumberT`](../modules.md#numbert)

Add one number to another. If either the input or argument are not a number,
they will be to convert to a number. If that conversion fails, `0` is used
instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. If it can't be converted to a number, zero will be used instead. |
| `right` | `unknown` | Any value. If it can't be converted to a number, zero will be used instead. |

#### Returns

[`NumberT`](../modules.md#numbert)

The result of adding the input value to the argument value.

#### Defined in

[src/builtin/filters/math.ts:187](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/math.ts#L187)

___

### prepend

▸ **prepend**(`this`, `left`, `other`): `string` \| [`Markup`](../classes/Markup.md)

Return the argument value concatenated with the input value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |
| `other` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string` \| [`Markup`](../classes/Markup.md)

The argument value concatenated with the input value.

#### Defined in

[src/builtin/filters/string.ts:161](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L161)

___

### remove

▸ **remove**(`this`, `left`, `subString`): `string` \| [`Markup`](../classes/Markup.md)

Return the input value with all occurrences of the argument substring
removed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |
| `subString` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string` \| [`Markup`](../classes/Markup.md)

The input value with all occurrences of the argument substring
removed.

#### Defined in

[src/builtin/filters/string.ts:194](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L194)

___

### removeFirst

▸ **removeFirst**(`this`, `left`, `subString`): `string` \| [`Markup`](../classes/Markup.md)

Return the input value with the first occurrence of the argument string
removed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |
| `subString` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string` \| [`Markup`](../classes/Markup.md)

The input value with the first occurrence of the argument string
removed.

#### Defined in

[src/builtin/filters/string.ts:227](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L227)

___

### removeLast

▸ **removeLast**(`this`, `left`, `arg`): `string` \| [`Markup`](../classes/Markup.md)

Return the input value with the last occurrence of the argument string
removed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |
| `arg` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string` \| [`Markup`](../classes/Markup.md)

The input value with the last occurrence of the argument string
removed.

#### Defined in

[src/builtin/filters/string.ts:256](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L256)

___

### replace

▸ **replace**(`this`, `left`, `subString`, `newSubString?`): `string` \| [`Markup`](../classes/Markup.md)

Return the input string with all occurrences of the first argument replaced
with the second argument.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |
| `subString` | `unknown` | Any value. Will be coerced to a string if it's not one already. |
| `newSubString?` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string` \| [`Markup`](../classes/Markup.md)

The input string with all occurrences of the first argument
replaced with the second argument.

#### Defined in

[src/builtin/filters/string.ts:300](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L300)

___

### replaceFirst

▸ **replaceFirst**(`this`, `left`, `subString`, `newSubString?`): `string` \| [`Markup`](../classes/Markup.md)

Return the input string with the first occurrence of the first argument
replaced with the second argument.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |
| `subString` | `unknown` | Any value. Will be coerced to a string if it's not one already. |
| `newSubString?` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string` \| [`Markup`](../classes/Markup.md)

The input string with the first occurrence of the first argument
replaced with the second argument.

#### Defined in

[src/builtin/filters/string.ts:334](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L334)

___

### replaceLast

▸ **replaceLast**(`this`, `left`, `subString`, `newSubString`): `string` \| [`Markup`](../classes/Markup.md)

Return the input string with the last occurrence of the first argument
replaced with the second argument.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |
| `subString` | `unknown` | Any value. Will be coerced to a string if it's not one already. |
| `newSubString` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string` \| [`Markup`](../classes/Markup.md)

The input string with the last occurrence of the first argument
replaced with the second argument.

#### Defined in

[src/builtin/filters/string.ts:368](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L368)

___

### reverse

▸ **reverse**(`this`, `left`): `unknown`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | - |

#### Returns

`unknown`[]

#### Defined in

[src/builtin/filters/array.ts:174](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/array.ts#L174)

___

### round

▸ **round**(`this`, `left`, `decimalPlaces?`): [`NumberT`](../modules.md#numbert)

Return the input number rounded to the given number of decimal places.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. If it can't be converted to a number, zero will be used instead. |
| `decimalPlaces?` | `unknown` | Any value. If it can't be converted to a number, zero will be used instead. Defaults to `0`. |

#### Returns

[`NumberT`](../modules.md#numbert)

The input number rounded to the given number of decimal places

#### Defined in

[src/builtin/filters/math.ts:207](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/math.ts#L207)

___

### rstrip

▸ **rstrip**(`this`, `left`): `string` \| [`Markup`](../classes/Markup.md)

Return the input string with all trailing whitespace removed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string` \| [`Markup`](../classes/Markup.md)

The input string with all trailing whitespace removed.

#### Defined in

[src/builtin/filters/string.ts:465](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L465)

___

### size

▸ **size**(`this`, `left`): `number`

Return the length of an array or string. If the input is an object or map,
returns the number of keys.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. |

#### Returns

`number`

The size of an object or `0` if a size can not be determined.

#### Defined in

[src/builtin/filters/misc.ts:27](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/misc.ts#L27)

___

### slice

▸ **slice**(`this`, `left`, `offset`, `length?`): `string` \| `unknown`[] \| [`Markup`](../classes/Markup.md)

Return a substring or subsequence of the input value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. If its not an array or string, it will be converted to a string. |
| `offset` | `unknown` | Start of the subsequence in number of items or characters. |
| `length?` | `unknown` | The maximum number of items or characters in the resulting sequence. |

#### Returns

`string` \| `unknown`[] \| [`Markup`](../classes/Markup.md)

A substring for subsequence.

#### Defined in

[src/builtin/filters/misc.ts:169](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/misc.ts#L169)

___

### sort

▸ **sort**(`this`, `left`, `key?`): `unknown`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | - |
| `key?` | `unknown` |  |

#### Returns

`unknown`[]

#### Defined in

[src/builtin/filters/array.ts:187](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/array.ts#L187)

___

### sortNatural

▸ **sortNatural**(`this`, `left`, `key?`): `unknown`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | - |
| `key?` | `unknown` |  |

#### Returns

`unknown`[]

#### Defined in

[src/builtin/filters/array.ts:210](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/array.ts#L210)

___

### split

▸ **split**(`this`, `left`, `subString`): `string`[] \| [`Markup`](../classes/Markup.md)[]

Return an array of strings that are the input string split on the filter's
argument string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |
| `subString` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string`[] \| [`Markup`](../classes/Markup.md)[]

An array of strings that are the input string split on the filter's
argument string.

#### Defined in

[src/builtin/filters/string.ts:434](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L434)

___

### strip

▸ **strip**(`this`, `left`): `string` \| [`Markup`](../classes/Markup.md)

Return the input string with all leading and trailing whitespace removed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string` \| [`Markup`](../classes/Markup.md)

The input string with all leading and trailing whitespace removed.

#### Defined in

[src/builtin/filters/string.ts:451](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L451)

___

### stripHtml

▸ **stripHtml**(`this`, `left`): `string`

Return the input string with all HTML tags removed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string`

The input string with all HTML tags removed.

#### Defined in

[src/builtin/filters/string.ts:489](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L489)

___

### stripNewlines

▸ **stripNewlines**(`this`, `left`): `string` \| [`Markup`](../classes/Markup.md)

Return the input string with `\n` and `\r\n` removed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string` \| [`Markup`](../classes/Markup.md)

The input string with `\n` and `\r\n` removed.

#### Defined in

[src/builtin/filters/string.ts:504](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L504)

___

### times

▸ **times**(`this`, `left`, `right`): [`NumberT`](../modules.md#numbert)

Return the product of the input number and the argument number. If either
the input or argument are not a number, they will be convert to a number. If
that conversion fails, `0` is used instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. If it can't be converted to a number, zero will be used instead. |
| `right` | `unknown` | Any value. If it can't be converted to a number, zero will be used instead. |

#### Returns

[`NumberT`](../modules.md#numbert)

The product of the input number and the argument number

#### Defined in

[src/builtin/filters/math.ts:233](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/math.ts#L233)

___

### truncate

▸ **truncate**(`this`, `left`, `length?`, `end?`): `string`

Return a truncated version of the input string. The first argument, length,
defaults to `50`. The second argument defaults to an ellipsis (`...`).

If the length of the input string is less than the given length (first
argument), the input string will be truncated to `length` minus the length
of the second argument, with the second argument appended.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | `undefined` | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | `undefined` | Any value. Will be coerced to a string if it's not one already. |
| `length` | `unknown` | `50` | Any value. If it can't be converted to a number, zero will be used instead. Defaults to `50`. |
| `end` | `unknown` | `"..."` | Any value. Will be coerced to a string if it's not one already. Defaults to `...`. |

#### Returns

`string`

A truncated version of the input string.

#### Defined in

[src/builtin/filters/string.ts:531](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L531)

___

### truncateWords

▸ **truncateWords**(`this`, `left`, `wordCount?`, `end?`): `string`

Return the input string truncated to the specified number of words, with
the second argument appended. The number of words (first argument) defaults
to `15`. The second argument defaults to an ellipsis (`...`).

If the input string already has fewer than the given number of words, it is
returned unchanged.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | `undefined` | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | `undefined` | Any value. Will be coerced to a string if it's not one already. |
| `wordCount` | `unknown` | `15` | Any value. If it can't be converted to a number, zero will be used instead. Defaults to `15`. |
| `end` | `unknown` | `"..."` | Any value. Will be coerced to a string if it's not one already. Defaults to `...`. |

#### Returns

`string`

The input string truncated to the specified number of words.

#### Defined in

[src/builtin/filters/string.ts:571](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L571)

___

### uniq

▸ **uniq**(`this`, `left`, `prop?`): `unknown`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | - |
| `prop?` | `unknown` |  |

#### Returns

`unknown`[]

#### Defined in

[src/builtin/filters/array.ts:233](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/array.ts#L233)

___

### upcase

▸ **upcase**(`this`, `left`): `string` \| [`Markup`](../classes/Markup.md)

Return the input string with all characters in uppercase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string` \| [`Markup`](../classes/Markup.md)

The input string with all characters in uppercase.

#### Defined in

[src/builtin/filters/string.ts:415](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L415)

___

### urlDecode

▸ **urlDecode**(`this`, `left`): `string`

Return the input string with `%xx` escapes replaced with their single-
character equivalents. Also replaces `'+'` with `' '`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string`

The input string with `%xx` escapes replaced with their single-
character equivalents.

#### Defined in

[src/builtin/filters/string.ts:628](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L628)

___

### urlEncode

▸ **urlEncode**(`this`, `left`): `string`

Return the input string with URL reserved characters percent-escaped. Also
replaces `' '` with `'+'`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | Any value. Will be coerced to a string if it's not one already. |

#### Returns

`string`

The input string with URL reserved characters percent-escaped.

#### Defined in

[src/builtin/filters/string.ts:613](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/string.ts#L613)

___

### where

▸ **where**(`this`, `left`, `prop`, `value?`): `unknown`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`FilterContext`](../modules.md#filtercontext) | An object containing a reference to the active render context and any keyword/named arguments. |
| `left` | `unknown` | - |
| `prop` | `unknown` |  |
| `value?` | `unknown` |  |

#### Returns

`unknown`[]

#### Defined in

[src/builtin/filters/array.ts:270](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/filters/array.ts#L270)
