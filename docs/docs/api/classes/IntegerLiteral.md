---
id: "IntegerLiteral"
title: "Class: IntegerLiteral"
sidebar_label: "IntegerLiteral"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Literal`](Literal.md)<[`Integer`](Integer.md)\>

  ↳ **`IntegerLiteral`**

## Constructors

### constructor

• **new IntegerLiteral**(`value`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Integer`](Integer.md) |

#### Inherited from

[Literal](Literal.md).[constructor](Literal.md#constructor)

#### Defined in

[src/expression.ts:131](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L131)

## Properties

### value

• `Readonly` **value**: [`Integer`](Integer.md)

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

[src/expression.ts:180](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L180)

___

### evaluate

▸ **evaluate**(`context`): `Promise`<[`Integer`](Integer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`Promise`<[`Integer`](Integer.md)\>

#### Inherited from

[Literal](Literal.md).[evaluate](Literal.md#evaluate)

#### Defined in

[src/expression.ts:134](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L134)

___

### evaluateSync

▸ **evaluateSync**(`context`): [`Integer`](Integer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

[`Integer`](Integer.md)

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

[src/expression.ts:184](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L184)
