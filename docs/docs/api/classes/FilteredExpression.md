---
id: "FilteredExpression"
title: "Class: FilteredExpression"
sidebar_label: "FilteredExpression"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`Expression`](../interfaces/Expression.md)

## Constructors

### constructor

• **new FilteredExpression**(`expression`, `filters?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `expression` | [`Expression`](../interfaces/Expression.md) | `undefined` |
| `filters` | [`ExpressionFilter`](ExpressionFilter.md)[] | `[]` |

#### Defined in

[src/expression.ts:365](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L365)

## Properties

### expression

• `Readonly` **expression**: [`Expression`](../interfaces/Expression.md)

___

### filters

• `Readonly` **filters**: [`ExpressionFilter`](ExpressionFilter.md)[] = `[]`

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

[src/expression.ts:370](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L370)

___

### evaluate

▸ **evaluate**(`context`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`Promise`<`unknown`\>

#### Implementation of

[Expression](../interfaces/Expression.md).[evaluate](../interfaces/Expression.md#evaluate)

#### Defined in

[src/expression.ts:384](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L384)

___

### evaluateSync

▸ **evaluateSync**(`context`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`unknown`

#### Implementation of

[Expression](../interfaces/Expression.md).[evaluateSync](../interfaces/Expression.md#evaluatesync)

#### Defined in

[src/expression.ts:412](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L412)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Implementation of

[Expression](../interfaces/Expression.md).[toString](../interfaces/Expression.md#tostring)

#### Defined in

[src/expression.ts:378](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L378)
