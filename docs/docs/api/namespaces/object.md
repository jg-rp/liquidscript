---
id: "object"
title: "Namespace: object"
sidebar_label: "object"
sidebar_position: 0
custom_edit_url: null
---

## Type aliases

### LiquidArrayLike

Ƭ **LiquidArrayLike**: `unknown`[]

#### Defined in

[src/types.ts:131](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/types.ts#L131)

## Functions

### isArray

▸ **isArray**(`value`): value is unknown[]

A type predicate for the Array object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | Any value |

#### Returns

value is unknown[]

`true` if the value is an array.

#### Defined in

[src/types.ts:28](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/types.ts#L28)

___

### isComparable

▸ **isComparable**(`value`): value is string \| number \| NumberT

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is string \| number \| NumberT

#### Defined in

[src/types.ts:92](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/types.ts#L92)

___

### isFunction

▸ **isFunction**(`value`): value is CallableFunction

A type predicate for Function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | Any value |

#### Returns

value is CallableFunction

`true` if the value is a function.

#### Defined in

[src/types.ts:49](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/types.ts#L49)

___

### isIterable

▸ **isIterable**(`value`): value is Iterable<unknown\>

A type predicate for the Iterable interface.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | Any value |

#### Returns

value is Iterable<unknown\>

`true` if the value is iterable.

#### Defined in

[src/types.ts:118](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/types.ts#L118)

___

### isLiquidArrayLike

▸ **isLiquidArrayLike**(`value`): value is LiquidArrayLike

A type predicate for objects that a considered array-like in Liquid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | Any value |

#### Returns

value is LiquidArrayLike

`true` if the value is considered array-like, `false` otherwise.

#### Defined in

[src/types.ts:138](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/types.ts#L138)

___

### isNumber

▸ **isNumber**(`value`): value is number \| NumberT

A type predicate for a primitive number or the wrapped, Liquid number type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | Any value |

#### Returns

value is number \| NumberT

`true` if the value is a number or `NumberT`.

#### Defined in

[src/types.ts:70](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/types.ts#L70)

___

### isObject

▸ **isObject**(`value`): value is object

A type predicate for Object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | Any value |

#### Returns

value is object

`true` if the value is an object.

#### Defined in

[src/types.ts:37](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/types.ts#L37)

___

### isPrimitiveInteger

▸ **isPrimitiveInteger**(`value`): value is number

A type predicate for a primitive number that is an integer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | Any value |

#### Returns

value is number

`true` if the value is a primitive number and is an integer.

#### Defined in

[src/types.ts:88](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/types.ts#L88)

___

### isPrimitiveNumber

▸ **isPrimitiveNumber**(`value`): value is number

A type predicate for the number primitive.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | Any value |

#### Returns

value is number

`true` if the value is a primitive number.

#### Defined in

[src/types.ts:79](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/types.ts#L79)

___

### isPropertyKey

▸ **isPropertyKey**(`value`): value is PropertyKey

A type predicate for an object property key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | Any value |

#### Returns

value is PropertyKey

`true` if the value is a string, number or symbol.

#### Defined in

[src/types.ts:58](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/types.ts#L58)

___

### isString

▸ **isString**(`value`): value is string

A type predicate for the primitive string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | Any value |

#### Returns

value is string

`true` if the value is a primitive string.

#### Defined in

[src/types.ts:10](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/types.ts#L10)

___

### isSymbol

▸ **isSymbol**(`value`): value is symbol

A type predicate for the primitive Symbol.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | Any value |

#### Returns

value is symbol

`true` if the value is a symbol.

#### Defined in

[src/types.ts:19](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/types.ts#L19)

___

### isUndefined

▸ **isUndefined**(`value`): value is Undefined

A type predicate for `undefined` or Liquid's undefined wrapper.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | Any value |

#### Returns

value is Undefined

`true` if the value is `undefined` or a subclass of `Undefined`.

#### Defined in

[src/types.ts:127](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/types.ts#L127)

___

### liquidStringify

▸ **liquidStringify**(`value`): `string`

Stringify a value following Liquid semantics.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | Any value |

#### Returns

`string`

A Liquid string representation of the value.

#### Defined in

[src/types.ts:103](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/types.ts#L103)
