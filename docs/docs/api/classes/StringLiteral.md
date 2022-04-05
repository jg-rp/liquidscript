---
id: "StringLiteral"
title: "Class: StringLiteral"
sidebar_label: "StringLiteral"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Literal`](Literal.md)<`string` \| [`Markup`](Markup.md)\>

  ↳ **`StringLiteral`**

## Constructors

### constructor

• **new StringLiteral**(`value`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| [`Markup`](Markup.md) |

#### Inherited from

[Literal](Literal.md).[constructor](Literal.md#constructor)

#### Defined in

[src/expression.ts:131](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L131)

## Properties

### value

• `Readonly` **value**: `string` \| [`Markup`](Markup.md)

#### Inherited from

[Literal](Literal.md).[value](Literal.md#value)

## Methods

### equals

▸ **equals**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `unknown` |

#### Returns

`boolean`

#### Overrides

[Literal](Literal.md).[equals](Literal.md#equals)

#### Defined in

[src/expression.ts:174](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L174)

___

### evaluate

▸ **evaluate**(`context`): `Promise`<`string` \| [`Markup`](Markup.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`Promise`<`string` \| [`Markup`](Markup.md)\>

#### Overrides

[Literal](Literal.md).[evaluate](Literal.md#evaluate)

#### Defined in

[src/expression.ts:162](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L162)

___

### evaluateSync

▸ **evaluateSync**(`context`): `string` \| [`Markup`](Markup.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`string` \| [`Markup`](Markup.md)

#### Overrides

[Literal](Literal.md).[evaluateSync](Literal.md#evaluatesync)

#### Defined in

[src/expression.ts:168](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L168)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Inherited from

[Literal](Literal.md).[toString](Literal.md#tostring)

#### Defined in

[src/expression.ts:147](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L147)
