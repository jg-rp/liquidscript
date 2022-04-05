---
id: "Expression"
title: "Interface: Expression"
sidebar_label: "Expression"
sidebar_position: 0
custom_edit_url: null
---

## Implemented by

- [`Blank`](../classes/Blank.md)
- [`BooleanExpression`](../classes/BooleanExpression.md)
- [`Continue`](../classes/Continue.md)
- [`Empty`](../classes/Empty.md)
- [`FilteredExpression`](../classes/FilteredExpression.md)
- [`Identifier`](../classes/Identifier.md)
- [`InfixExpression`](../classes/InfixExpression.md)
- [`Literal`](../classes/Literal.md)
- [`LoopExpression`](../classes/LoopExpression.md)
- [`Nil`](../classes/Nil.md)
- [`RangeLiteral`](../classes/RangeLiteral.md)

## Methods

### equals

▸ **equals**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `unknown` |

#### Returns

`boolean`

#### Defined in

[src/expression.ts:27](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L27)

___

### evaluate

▸ **evaluate**(`context`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](../classes/RenderContext.md) |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/expression.ts:25](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L25)

___

### evaluateSync

▸ **evaluateSync**(`context`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](../classes/RenderContext.md) |

#### Returns

`unknown`

#### Defined in

[src/expression.ts:26](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L26)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/expression.ts:28](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L28)
