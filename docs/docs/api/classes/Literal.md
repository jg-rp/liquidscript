---
id: "Literal"
title: "Class: Literal<T>"
sidebar_label: "Literal"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- **`Literal`**

  ↳ [`BooleanLiteral`](BooleanLiteral.md)

  ↳ [`StringLiteral`](StringLiteral.md)

  ↳ [`IntegerLiteral`](IntegerLiteral.md)

  ↳ [`FloatLiteral`](FloatLiteral.md)

  ↳ [`IdentifierPathElement`](IdentifierPathElement.md)

## Implements

- [`Expression`](../interfaces/Expression.md)

## Constructors

### constructor

• **new Literal**<`T`\>(`value`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Defined in

[src/expression.ts:131](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L131)

## Properties

### value

• `Readonly` **value**: `T`

## Methods

### equals

▸ **equals**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `unknown` |

#### Returns

`boolean`

#### Implementation of

[Expression](../interfaces/Expression.md).[equals](../interfaces/Expression.md#equals)

#### Defined in

[src/expression.ts:143](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L143)

___

### evaluate

▸ **evaluate**(`context`): `Promise`<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`Promise`<`T`\>

#### Implementation of

[Expression](../interfaces/Expression.md).[evaluate](../interfaces/Expression.md#evaluate)

#### Defined in

[src/expression.ts:134](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L134)

___

### evaluateSync

▸ **evaluateSync**(`context`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`T`

#### Implementation of

[Expression](../interfaces/Expression.md).[evaluateSync](../interfaces/Expression.md#evaluatesync)

#### Defined in

[src/expression.ts:139](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L139)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Implementation of

[Expression](../interfaces/Expression.md).[toString](../interfaces/Expression.md#tostring)

#### Defined in

[src/expression.ts:147](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L147)
