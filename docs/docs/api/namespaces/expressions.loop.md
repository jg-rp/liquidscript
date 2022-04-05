---
id: "expressions.loop"
title: "Namespace: loop"
sidebar_label: "loop"
custom_edit_url: null
---

[expressions](expressions.md).loop

## Variables

### TOKEN\_MAP

• `Const` **TOKEN\_MAP**: `Map`<`string`, `parseFunc`\>

#### Defined in

[src/expressions/loop/parse.ts:48](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/loop/parse.ts#L48)

## Functions

### parse

▸ **parse**(`expr`, `lineNumber?`): [`LoopExpression`](../classes/LoopExpression.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `expr` | `string` | `undefined` |
| `lineNumber` | `number` | `0` |

#### Returns

[`LoopExpression`](../classes/LoopExpression.md)

#### Defined in

[src/expressions/loop/parse.ts:90](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/loop/parse.ts#L90)

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

[src/expressions/loop/lex.ts:220](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/loop/lex.ts#L220)
