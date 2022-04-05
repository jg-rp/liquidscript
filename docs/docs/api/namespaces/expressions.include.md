---
id: "expressions.include"
title: "Namespace: include"
sidebar_label: "include"
custom_edit_url: null
---

[expressions](expressions.md).include

## Variables

### RE

• `Const` **RE**: `RegExp`

#### Defined in

[src/expressions/include/lex.ts:72](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/include/lex.ts#L72)

___

### RULES

• `Const` **RULES**: `string`[][]

#### Defined in

[src/expressions/include/lex.ts:40](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/include/lex.ts#L40)

## Functions

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

[src/expressions/include/lex.ts:243](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/include/lex.ts#L243)
