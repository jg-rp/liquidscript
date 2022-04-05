---
id: "expressions.boolean"
title: "Namespace: boolean"
sidebar_label: "boolean"
custom_edit_url: null
---

[expressions](expressions.md).boolean

## Variables

### TOKEN\_MAP

• `Const` **TOKEN\_MAP**: `Map`<`string`, `parseFunc`\>

#### Defined in

[src/expressions/boolean/parse.ts:68](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/boolean/parse.ts#L68)

## Functions

### parse

▸ **parse**(`expr`, `lineNumber?`): [`BooleanExpression`](../classes/BooleanExpression.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `expr` | `string` | `undefined` |
| `lineNumber` | `number` | `1` |

#### Returns

[`BooleanExpression`](../classes/BooleanExpression.md)

#### Defined in

[src/expressions/boolean/parse.ts:139](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/boolean/parse.ts#L139)

___

### parseInfixExpression

▸ **parseInfixExpression**(`stream`, `left`): [`InfixExpression`](../classes/InfixExpression.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`ExpressionTokenStream`](../classes/expressions.ExpressionTokenStream.md) |
| `left` | [`Expression`](../interfaces/Expression.md) |

#### Returns

[`InfixExpression`](../classes/InfixExpression.md)

#### Defined in

[src/expressions/boolean/parse.ts:95](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/boolean/parse.ts#L95)

___

### parseObject

▸ **parseObject**(`stream`, `precedence?`): [`Expression`](../interfaces/Expression.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `stream` | [`ExpressionTokenStream`](../classes/expressions.ExpressionTokenStream.md) | `undefined` |
| `precedence` | `number` | `PRECEDENCE_LOWEST` |

#### Returns

[`Expression`](../interfaces/Expression.md)

#### Defined in

[src/expressions/boolean/parse.ts:111](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/boolean/parse.ts#L111)

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

[src/expressions/boolean/lex.ts:230](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/boolean/lex.ts#L230)
