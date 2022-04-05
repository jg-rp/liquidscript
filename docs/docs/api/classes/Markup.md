---
id: "Markup"
title: "Class: Markup"
sidebar_label: "Markup"
sidebar_position: 0
custom_edit_url: null
---

A string wrapper that is safe to output as HTML, either because it
has already been escaped or is considered safe without escaping.

## Implements

- [`LiquidHTMLable`](../interfaces/LiquidHTMLable.md)
- [`LiquidStringable`](../interfaces/LiquidStringable.md)

## Constructors

### constructor

• **new Markup**(`s`)

`Markup` constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | Escaped or safe markup text. |

#### Defined in

[src/builtin/drops/markup.ts:21](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/markup.ts#L21)

## Properties

### #s

• `Private` **#s**: `string`

#### Defined in

[src/builtin/drops/markup.ts:15](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/markup.ts#L15)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

#### Returns

`string`

#### Defined in

[src/builtin/drops/markup.ts:48](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/markup.ts#L48)

## Methods

### [toLiquidHtml]

▸ **[toLiquidHtml]**(): `string`

#### Returns

`string`

#### Implementation of

[LiquidHTMLable](../interfaces/LiquidHTMLable.md).[[toLiquidHtml]](../interfaces/LiquidHTMLable.md#[toliquidhtml])

#### Defined in

[src/builtin/drops/markup.ts:56](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/markup.ts#L56)

___

### [toLiquidString]

▸ **[toLiquidString]**(): `string`

#### Returns

`string`

#### Implementation of

[LiquidStringable](../interfaces/LiquidStringable.md).[[toLiquidString]](../interfaces/LiquidStringable.md#[toliquidstring])

#### Defined in

[src/builtin/drops/markup.ts:60](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/markup.ts#L60)

___

### [toPrimitive]

▸ **[toPrimitive]**(`hint`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hint` | `string` |

#### Returns

``null`` \| `string`

#### Defined in

[src/builtin/drops/markup.ts:52](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/markup.ts#L52)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/builtin/drops/markup.ts:64](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/markup.ts#L64)

___

### escape

▸ `Static` **escape**(`value`): [`Markup`](Markup.md)

A `Markup` factory function that will escape the input value if it is
not already `Markup`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | Any value. If it's already `Markup`, it will be returned unchanged. Otherwise it will be converted to a string and escaped. |

#### Returns

[`Markup`](Markup.md)

A string representation of the input value after HTML-escaping.

#### Defined in

[src/builtin/drops/markup.ts:43](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/markup.ts#L43)

___

### from

▸ `Static` **from**(`s`): [`Markup`](Markup.md)

A `Markup` factory function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` \| [`Markup`](Markup.md) | Escaped or safe markup text. |

#### Returns

[`Markup`](Markup.md)

The input string inside a `Markup` wrapper.

#### Defined in

[src/builtin/drops/markup.ts:31](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/markup.ts#L31)
