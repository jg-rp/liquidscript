---
id: "BooleanExpression"
title: "Class: BooleanExpression"
sidebar_label: "BooleanExpression"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`Expression`](../interfaces/Expression.md)

## Constructors

### constructor

• **new BooleanExpression**(`expression`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | [`Expression`](../interfaces/Expression.md) |

#### Defined in

[src/expression.ts:480](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L480)

## Properties

### expression

• `Readonly` **expression**: [`Expression`](../interfaces/Expression.md)

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

[src/expression.ts:482](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L482)

___

### evaluate

▸ **evaluate**(`context`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`Promise`<`boolean`\>

#### Implementation of

[Expression](../interfaces/Expression.md).[evaluate](../interfaces/Expression.md#evaluate)

#### Defined in

[src/expression.ts:493](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L493)

___

### evaluateSync

▸ **evaluateSync**(`context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`boolean`

#### Implementation of

[Expression](../interfaces/Expression.md).[evaluateSync](../interfaces/Expression.md#evaluatesync)

#### Defined in

[src/expression.ts:497](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L497)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Implementation of

[Expression](../interfaces/Expression.md).[toString](../interfaces/Expression.md#tostring)

#### Defined in

[src/expression.ts:489](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L489)
