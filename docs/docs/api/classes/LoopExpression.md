---
id: "LoopExpression"
title: "Class: LoopExpression"
sidebar_label: "LoopExpression"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`Expression`](../interfaces/Expression.md)

## Constructors

### constructor

• **new LoopExpression**(`name`, `iterable`, `limit?`, `offset?`, `cols?`, `reversed?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `iterable` | [`RangeLiteral`](RangeLiteral.md) \| [`Identifier`](Identifier.md) | `undefined` |
| `limit?` | [`LoopArgument`](../modules.md#loopargument) | `undefined` |
| `offset?` | [`LoopArgument`](../modules.md#loopargument) | `undefined` |
| `cols?` | [`LoopArgument`](../modules.md#loopargument) | `undefined` |
| `reversed` | `boolean` | `false` |

#### Defined in

[src/expression.ts:510](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L510)

## Properties

### cols

• `Optional` `Readonly` **cols**: [`LoopArgument`](../modules.md#loopargument)

___

### iterable

• `Readonly` **iterable**: [`RangeLiteral`](RangeLiteral.md) \| [`Identifier`](Identifier.md)

___

### limit

• `Optional` `Readonly` **limit**: [`LoopArgument`](../modules.md#loopargument)

___

### name

• `Readonly` **name**: `string`

___

### offset

• `Optional` `Readonly` **offset**: [`LoopArgument`](../modules.md#loopargument)

___

### reversed

• `Readonly` **reversed**: `boolean` = `false`

## Methods

### drop

▸ `Protected` **drop**(`it`, `n`): `Generator`<`unknown`, `any`, `unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `it` | `Iterator`<`unknown`, `any`, `undefined`\> |
| `n` | `number` |

#### Returns

`Generator`<`unknown`, `any`, `unknown`\>

#### Defined in

[src/expression.ts:555](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L555)

___

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

[src/expression.ts:519](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L519)

___

### evaluate

▸ **evaluate**(`context`): `Promise`<[`Iterator`<`unknown`, `any`, `undefined`\>, `number`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`Promise`<[`Iterator`<`unknown`, `any`, `undefined`\>, `number`]\>

#### Implementation of

[Expression](../interfaces/Expression.md).[evaluate](../interfaces/Expression.md#evaluate)

#### Defined in

[src/expression.ts:617](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L617)

___

### evaluateSync

▸ **evaluateSync**(`context`): [`Iterator`<`unknown`, `any`, `undefined`\>, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

[`Iterator`<`unknown`, `any`, `undefined`\>, `number`]

#### Implementation of

[Expression](../interfaces/Expression.md).[evaluateSync](../interfaces/Expression.md#evaluatesync)

#### Defined in

[src/expression.ts:630](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L630)

___

### limitAndOffset

▸ `Protected` **limitAndOffset**(`context`, `it`, `length`, `limit`, `offset`): [`Iterator`<`unknown`, `any`, `undefined`\>, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |
| `it` | `Iterable`<`unknown`\> |
| `length` | `number` |
| `limit` | `unknown` |
| `offset` | `unknown` |

#### Returns

[`Iterator`<`unknown`, `any`, `undefined`\>, `number`]

#### Defined in

[src/expression.ts:568](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L568)

___

### take

▸ `Protected` **take**(`it`, `n`): `Generator`<`unknown`, `any`, `unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `it` | `Iterator`<`unknown`, `any`, `undefined`\> |
| `n` | `number` |

#### Returns

`Generator`<`unknown`, `any`, `unknown`\>

#### Defined in

[src/expression.ts:564](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L564)

___

### toIter

▸ `Protected` **toIter**(`obj`): [`Iterable`<`unknown`\>, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `unknown` |

#### Returns

[`Iterable`<`unknown`\>, `number`]

#### Defined in

[src/expression.ts:540](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L540)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Implementation of

[Expression](../interfaces/Expression.md).[toString](../interfaces/Expression.md#tostring)

#### Defined in

[src/expression.ts:531](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L531)
