---
id: "ExpressionFilter"
title: "Class: ExpressionFilter"
sidebar_label: "ExpressionFilter"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new ExpressionFilter**(`name`, `args?`, `kwargs?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `args` | [`Expression`](../interfaces/Expression.md)[] | `[]` |
| `kwargs` | `Map`<`string`, [`Expression`](../interfaces/Expression.md)\> | `undefined` |

#### Defined in

[src/expression.ts:309](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L309)

## Properties

### name

• `Readonly` **name**: `string`

## Methods

### evalArgs

▸ **evalArgs**(`context`): `Promise`<`unknown`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`Promise`<`unknown`[]\>

#### Defined in

[src/expression.ts:326](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L326)

___

### evalArgsSync

▸ **evalArgsSync**(`context`): `unknown`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`unknown`[]

#### Defined in

[src/expression.ts:349](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L349)

___

### evalKeywordArgs

▸ **evalKeywordArgs**(`context`): `Promise`<{ `[index: string]`: `unknown`;  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`Promise`<{ `[index: string]`: `unknown`;  }\>

#### Defined in

[src/expression.ts:336](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L336)

___

### evalKeywordArgsSync

▸ **evalKeywordArgsSync**(`context`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`Object`

#### Defined in

[src/expression.ts:353](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L353)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/expression.ts:315](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L315)
