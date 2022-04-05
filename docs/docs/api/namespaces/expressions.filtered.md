---
id: "expressions.filtered"
title: "Namespace: filtered"
sidebar_label: "filtered"
custom_edit_url: null
---

[expressions](expressions.md).filtered

## Variables

### RE

• `Const` **RE**: `RegExp`

#### Defined in

[src/expressions/filtered/lex.ts:68](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/filtered/lex.ts#L68)

___

### RULES

• `Const` **RULES**: `string`[][]

#### Defined in

[src/expressions/filtered/lex.ts:38](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/filtered/lex.ts#L38)

___

### TOKEN\_MAP

• `Const` **TOKEN\_MAP**: `Map`<`string`, `parseFunc`\>

#### Defined in

[src/expressions/filtered/parse.ts:41](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/filtered/parse.ts#L41)

## Functions

### parse

▸ **parse**(`expr`, `lineNumber?`): [`FilteredExpression`](../classes/FilteredExpression.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `expr` | `string` | `undefined` |
| `lineNumber` | `number` | `1` |

#### Returns

[`FilteredExpression`](../classes/FilteredExpression.md)

#### Defined in

[src/expressions/filtered/parse.ts:138](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/filtered/parse.ts#L138)

___

### parseObject

▸ **parseObject**(`stream`): [`Expression`](../interfaces/Expression.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`ExpressionTokenStream`](../classes/expressions.ExpressionTokenStream.md) |

#### Returns

[`Expression`](../interfaces/Expression.md)

#### Defined in

[src/expressions/filtered/parse.ts:54](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/filtered/parse.ts#L54)

___

### tokenize

▸ **tokenize**(`source`, `startIndex?`): `Generator`<[`Token`](../classes/tokens.Token.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `source` | `string` | `undefined` |
| `startIndex` | `number` | `0` |

#### Returns

`Generator`<[`Token`](../classes/tokens.Token.md)\>

#### Defined in

[src/expressions/filtered/lex.ts:243](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/filtered/lex.ts#L243)
