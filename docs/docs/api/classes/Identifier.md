---
id: "Identifier"
title: "Class: Identifier"
sidebar_label: "Identifier"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`Expression`](../interfaces/Expression.md)

## Constructors

### constructor

• **new Identifier**(`root`, `path`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | `string` |
| `path` | [`IdentifierPath`](../modules.md#identifierpath) |

#### Defined in

[src/expression.ts:250](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L250)

## Properties

### path

• `Readonly` **path**: [`IdentifierPath`](../modules.md#identifierpath)

___

### root

• `Readonly` **root**: `string`

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

[src/expression.ts:252](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L252)

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

[src/expression.ts:264](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L264)

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

[src/expression.ts:287](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L287)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Implementation of

[Expression](../interfaces/Expression.md).[toString](../interfaces/Expression.md#tostring)

#### Defined in

[src/expression.ts:256](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L256)
