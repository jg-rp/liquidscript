---
id: "InfixExpression"
title: "Class: InfixExpression"
sidebar_label: "InfixExpression"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`Expression`](../interfaces/Expression.md)

## Constructors

### constructor

• **new InfixExpression**(`left`, `operator`, `right`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `left` | [`Expression`](../interfaces/Expression.md) |
| `operator` | `string` |
| `right` | [`Expression`](../interfaces/Expression.md) |

#### Defined in

[src/expression.ts:439](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L439)

## Properties

### left

• `Readonly` **left**: [`Expression`](../interfaces/Expression.md)

___

### operator

• `Readonly` **operator**: `string`

___

### right

• `Readonly` **right**: [`Expression`](../interfaces/Expression.md)

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

[src/expression.ts:445](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L445)

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

[src/expression.ts:458](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L458)

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

[src/expression.ts:470](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L470)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Implementation of

[Expression](../interfaces/Expression.md).[toString](../interfaces/Expression.md#tostring)

#### Defined in

[src/expression.ts:454](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L454)
