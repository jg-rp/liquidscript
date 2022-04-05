---
id: "FloatLiteral"
title: "Class: FloatLiteral"
sidebar_label: "FloatLiteral"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Literal`](Literal.md)<[`Float`](Float.md)\>

  ↳ **`FloatLiteral`**

## Constructors

### constructor

• **new FloatLiteral**(`value`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Float`](Float.md) |

#### Inherited from

[Literal](Literal.md).[constructor](Literal.md#constructor)

#### Defined in

[src/expression.ts:131](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L131)

## Properties

### value

• `Readonly` **value**: [`Float`](Float.md)

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

[src/expression.ts:190](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L190)

___

### evaluate

▸ **evaluate**(`context`): `Promise`<[`Float`](Float.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`Promise`<[`Float`](Float.md)\>

#### Inherited from

[Literal](Literal.md).[evaluate](Literal.md#evaluate)

#### Defined in

[src/expression.ts:134](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L134)

___

### evaluateSync

▸ **evaluateSync**(`context`): [`Float`](Float.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

[`Float`](Float.md)

#### Inherited from

[Literal](Literal.md).[evaluateSync](Literal.md#evaluatesync)

#### Defined in

[src/expression.ts:139](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L139)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Overrides

[Literal](Literal.md).[toString](Literal.md#tostring)

#### Defined in

[src/expression.ts:194](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L194)
