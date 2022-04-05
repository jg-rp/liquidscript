---
id: "RangeLiteral"
title: "Class: RangeLiteral"
sidebar_label: "RangeLiteral"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`Expression`](../interfaces/Expression.md)

## Constructors

### constructor

• **new RangeLiteral**(`start`, `stop`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `start` | [`Expression`](../interfaces/Expression.md) |
| `stop` | [`Expression`](../interfaces/Expression.md) |

#### Defined in

[src/expression.ts:200](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L200)

## Properties

### start

• `Readonly` **start**: [`Expression`](../interfaces/Expression.md)

___

### stop

• `Readonly` **stop**: [`Expression`](../interfaces/Expression.md)

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

[src/expression.ts:228](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L228)

___

### evaluate

▸ **evaluate**(`context`): `Promise`<[`Range`](Range.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`Promise`<[`Range`](Range.md)\>

#### Implementation of

[Expression](../interfaces/Expression.md).[evaluate](../interfaces/Expression.md#evaluate)

#### Defined in

[src/expression.ts:202](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L202)

___

### evaluateSync

▸ **evaluateSync**(`context`): [`Range`](Range.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

[`Range`](Range.md)

#### Implementation of

[Expression](../interfaces/Expression.md).[evaluateSync](../interfaces/Expression.md#evaluatesync)

#### Defined in

[src/expression.ts:219](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L219)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Implementation of

[Expression](../interfaces/Expression.md).[toString](../interfaces/Expression.md#tostring)

#### Defined in

[src/expression.ts:236](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L236)
