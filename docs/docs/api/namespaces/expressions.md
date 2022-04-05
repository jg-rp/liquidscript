---
id: "expressions"
title: "Namespace: expressions"
sidebar_label: "expressions"
sidebar_position: 0
custom_edit_url: null
---

## Namespaces

- [boolean](expressions.boolean.md)
- [filtered](expressions.filtered.md)
- [include](expressions.include.md)
- [loop](expressions.loop.md)

## Classes

- [ExpressionTokenStream](../classes/expressions.ExpressionTokenStream.md)

## Variables

### ASSIGN\_IDENTIFIER\_PATTERN

• `Const` **ASSIGN\_IDENTIFIER\_PATTERN**: ``"[a-zA-Z_][\\w\\-]*"``

#### Defined in

[src/expressions/common.ts:51](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/common.ts#L51)

___

### IDENTIFIER\_PATTERN

• `Const` **IDENTIFIER\_PATTERN**: ``"[a-zA-Z_][\\w\\-]*\\??"``

#### Defined in

[src/expressions/common.ts:48](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/common.ts#L48)

___

### IDENT\_INDEX\_PATTERN

• `Const` **IDENT\_INDEX\_PATTERN**: `string`

#### Defined in

[src/expressions/common.ts:60](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/common.ts#L60)

___

### IDENT\_STRING\_PATTERN

• `Const` **IDENT\_STRING\_PATTERN**: `string`

#### Defined in

[src/expressions/common.ts:54](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/common.ts#L54)

___

### IDENT\_TOKENS

• `Const` **IDENT\_TOKENS**: `Set`<`string`\>

#### Defined in

[src/expressions/common.ts:100](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/common.ts#L100)

___

### OPERATORS

• `Const` **OPERATORS**: `Map`<`string`, `string`\>

#### Defined in

[src/expressions/tokens.ts:60](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L60)

___

### REVERSE\_OPERATORS

• `Const` **REVERSE\_OPERATORS**: `Map`<`string`, `string`\>

#### Defined in

[src/expressions/tokens.ts:80](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L80)

___

### STRING\_PATTERN

• `Const` **STRING\_PATTERN**: `string`

#### Defined in

[src/expressions/common.ts:63](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/common.ts#L63)

___

### TOKEN\_AND

• `Const` **TOKEN\_AND**: ``"and"``

#### Defined in

[src/expressions/tokens.ts:47](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L47)

___

### TOKEN\_AS

• `Const` **TOKEN\_AS**: ``"as"``

#### Defined in

[src/expressions/tokens.ts:29](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L29)

___

### TOKEN\_ASSIGN

• `Const` **TOKEN\_ASSIGN**: ``"TOKEN_ASSIGN"``

#### Defined in

[src/expressions/tokens.ts:44](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L44)

___

### TOKEN\_BLANK

• `Const` **TOKEN\_BLANK**: ``"blank"``

#### Defined in

[src/expressions/tokens.ts:26](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L26)

___

### TOKEN\_BY

• `Const` **TOKEN\_BY**: ``"by"``

#### Defined in

[src/expressions/tokens.ts:30](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L30)

___

### TOKEN\_COLON

• `Const` **TOKEN\_COLON**: ``"TOKEN_COLON"``

#### Defined in

[src/expressions/tokens.ts:40](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L40)

___

### TOKEN\_COLS

• `Const` **TOKEN\_COLS**: ``"cols"``

#### Defined in

[src/expressions/tokens.ts:37](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L37)

___

### TOKEN\_COMMA

• `Const` **TOKEN\_COMMA**: ``"TOKEN_COMMA"``

#### Defined in

[src/expressions/tokens.ts:41](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L41)

___

### TOKEN\_CONTAINS

• `Const` **TOKEN\_CONTAINS**: ``"contains"``

#### Defined in

[src/expressions/tokens.ts:31](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L31)

___

### TOKEN\_CONTINUE

• `Const` **TOKEN\_CONTINUE**: ``"continue"``

#### Defined in

[src/expressions/tokens.ts:36](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L36)

___

### TOKEN\_DOT

• `Const` **TOKEN\_DOT**: ``"TOKEN_DOT"``

#### Defined in

[src/expressions/tokens.ts:12](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L12)

___

### TOKEN\_EMPTY

• `Const` **TOKEN\_EMPTY**: ``"empty"``

#### Defined in

[src/expressions/tokens.ts:23](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L23)

___

### TOKEN\_EOF

• `Const` **TOKEN\_EOF**: ``"TOKEN_EOF"``

#### Defined in

[src/expressions/tokens.ts:21](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L21)

___

### TOKEN\_EQ

• `Const` **TOKEN\_EQ**: ``"TOKEN_EQ"``

#### Defined in

[src/expressions/tokens.ts:51](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L51)

___

### TOKEN\_FALSE

• `Const` **TOKEN\_FALSE**: ``"false"``

#### Defined in

[src/expressions/tokens.ts:8](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L8)

___

### TOKEN\_FLOAT

• `Const` **TOKEN\_FLOAT**: ``"TOKEN_FLOAT"``

#### Defined in

[src/expressions/tokens.ts:16](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L16)

___

### TOKEN\_FOR

• `Const` **TOKEN\_FOR**: ``"for"``

#### Defined in

[src/expressions/tokens.ts:28](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L28)

___

### TOKEN\_GE

• `Const` **TOKEN\_GE**: ``"TOKEN_GE"``

#### Defined in

[src/expressions/tokens.ts:57](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L57)

___

### TOKEN\_GT

• `Const` **TOKEN\_GT**: ``"TOKEN_GT"``

#### Defined in

[src/expressions/tokens.ts:55](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L55)

___

### TOKEN\_IDENT

• `Const` **TOKEN\_IDENT**: ``"TOKEN_IDENT"``

#### Defined in

[src/expressions/tokens.ts:9](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L9)

___

### TOKEN\_IDENT\_INDEX

• `Const` **TOKEN\_IDENT\_INDEX**: ``"TOKEN_IDENT_INDEX"``

#### Defined in

[src/expressions/tokens.ts:10](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L10)

___

### TOKEN\_IDENT\_STRING

• `Const` **TOKEN\_IDENT\_STRING**: ``"TOKEN_IDENT_STRING"``

#### Defined in

[src/expressions/tokens.ts:11](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L11)

___

### TOKEN\_ILLEGAL

• `Const` **TOKEN\_ILLEGAL**: ``"TOKEN_ILLEGAL"``

#### Defined in

[src/expressions/tokens.ts:5](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L5)

___

### TOKEN\_IN

• `Const` **TOKEN\_IN**: ``"in"``

#### Defined in

[src/expressions/tokens.ts:32](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L32)

___

### TOKEN\_INTEGER

• `Const` **TOKEN\_INTEGER**: ``"TOKEN_INTEGER"``

#### Defined in

[src/expressions/tokens.ts:15](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L15)

___

### TOKEN\_LBRACKET

• `Const` **TOKEN\_LBRACKET**: ``"TOKEN_LBRACKET"``

#### Defined in

[src/expressions/tokens.ts:13](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L13)

___

### TOKEN\_LE

• `Const` **TOKEN\_LE**: ``"TOKEN_LE"``

#### Defined in

[src/expressions/tokens.ts:56](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L56)

___

### TOKEN\_LG

• `Const` **TOKEN\_LG**: ``"TOKEN_LG"``

#### Defined in

[src/expressions/tokens.ts:53](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L53)

___

### TOKEN\_LIMIT

• `Const` **TOKEN\_LIMIT**: ``"limit"``

#### Defined in

[src/expressions/tokens.ts:33](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L33)

___

### TOKEN\_LPAREN

• `Const` **TOKEN\_LPAREN**: ``"TOKEN_LPAREN"``

#### Defined in

[src/expressions/tokens.ts:17](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L17)

___

### TOKEN\_LT

• `Const` **TOKEN\_LT**: ``"TOKEN_LT"``

#### Defined in

[src/expressions/tokens.ts:54](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L54)

___

### TOKEN\_NE

• `Const` **TOKEN\_NE**: ``"TOKEN_NE"``

#### Defined in

[src/expressions/tokens.ts:52](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L52)

___

### TOKEN\_NEWLINE

• `Const` **TOKEN\_NEWLINE**: ``"TOKEN_NEWLINE"``

#### Defined in

[src/expressions/tokens.ts:22](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L22)

___

### TOKEN\_NIL

• `Const` **TOKEN\_NIL**: ``"nil"``

#### Defined in

[src/expressions/tokens.ts:24](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L24)

___

### TOKEN\_NULL

• `Const` **TOKEN\_NULL**: ``"null"``

#### Defined in

[src/expressions/tokens.ts:25](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L25)

___

### TOKEN\_OFFSET

• `Const` **TOKEN\_OFFSET**: ``"offset"``

#### Defined in

[src/expressions/tokens.ts:34](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L34)

___

### TOKEN\_OP

• `Const` **TOKEN\_OP**: ``"TOKEN_OP"``

#### Defined in

[src/expressions/tokens.ts:59](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L59)

___

### TOKEN\_OR

• `Const` **TOKEN\_OR**: ``"or"``

#### Defined in

[src/expressions/tokens.ts:48](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L48)

___

### TOKEN\_PIPE

• `Const` **TOKEN\_PIPE**: ``"TOKEN_PIPE"``

#### Defined in

[src/expressions/tokens.ts:39](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L39)

___

### TOKEN\_RANGE

• `Const` **TOKEN\_RANGE**: ``"TOKEN_RANGE"``

#### Defined in

[src/expressions/tokens.ts:19](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L19)

___

### TOKEN\_RBRACKET

• `Const` **TOKEN\_RBRACKET**: ``"TOKEN_RBRACKET"``

#### Defined in

[src/expressions/tokens.ts:14](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L14)

___

### TOKEN\_REVERSED

• `Const` **TOKEN\_REVERSED**: ``"reversed"``

#### Defined in

[src/expressions/tokens.ts:35](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L35)

___

### TOKEN\_RPAREN

• `Const` **TOKEN\_RPAREN**: ``"TOKEN_RPAREN"``

#### Defined in

[src/expressions/tokens.ts:18](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L18)

___

### TOKEN\_SKIP

• `Const` **TOKEN\_SKIP**: ``"TOKEN_SKIP"``

#### Defined in

[src/expressions/tokens.ts:4](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L4)

___

### TOKEN\_STRING

• `Const` **TOKEN\_STRING**: ``"TOKEN_STRING"``

#### Defined in

[src/expressions/tokens.ts:20](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L20)

___

### TOKEN\_TRUE

• `Const` **TOKEN\_TRUE**: ``"true"``

#### Defined in

[src/expressions/tokens.ts:7](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L7)

___

### TOKEN\_WITH

• `Const` **TOKEN\_WITH**: ``"with"``

#### Defined in

[src/expressions/tokens.ts:27](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L27)

## Functions

### makeParseRange

▸ **makeParseRange**(`parseObj`): (`stream`: [`ExpressionTokenStream`](../classes/expressions.ExpressionTokenStream.md)) => [`RangeLiteral`](../classes/RangeLiteral.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parseObj` | (`stream`: [`ExpressionTokenStream`](../classes/expressions.ExpressionTokenStream.md)) => [`Expression`](../interfaces/Expression.md) |

#### Returns

`fn`

▸ (`stream`): [`RangeLiteral`](../classes/RangeLiteral.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`ExpressionTokenStream`](../classes/expressions.ExpressionTokenStream.md) |

##### Returns

[`RangeLiteral`](../classes/RangeLiteral.md)

#### Defined in

[src/expressions/common.ts:194](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/common.ts#L194)

___

### parseBlank

▸ **parseBlank**(): [`Blank`](../classes/Blank.md)

#### Returns

[`Blank`](../classes/Blank.md)

#### Defined in

[src/expressions/common.ts:80](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/common.ts#L80)

___

### parseBoolean

▸ **parseBoolean**(`stream`): [`BooleanLiteral`](../classes/BooleanLiteral.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`ExpressionTokenStream`](../classes/expressions.ExpressionTokenStream.md) |

#### Returns

[`BooleanLiteral`](../classes/BooleanLiteral.md)

#### Defined in

[src/expressions/common.ts:68](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/common.ts#L68)

___

### parseEmpty

▸ **parseEmpty**(): [`Empty`](../classes/Empty.md)

#### Returns

[`Empty`](../classes/Empty.md)

#### Defined in

[src/expressions/common.ts:76](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/common.ts#L76)

___

### parseFloatLiteral

▸ **parseFloatLiteral**(`stream`): [`FloatLiteral`](../classes/FloatLiteral.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`ExpressionTokenStream`](../classes/expressions.ExpressionTokenStream.md) |

#### Returns

[`FloatLiteral`](../classes/FloatLiteral.md)

#### Defined in

[src/expressions/common.ts:96](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/common.ts#L96)

___

### parseIdentifier

▸ **parseIdentifier**(`stream`): [`Identifier`](../classes/Identifier.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`ExpressionTokenStream`](../classes/expressions.ExpressionTokenStream.md) |

#### Returns

[`Identifier`](../classes/Identifier.md)

#### Defined in

[src/expressions/common.ts:107](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/common.ts#L107)

___

### parseIntegerLiteral

▸ **parseIntegerLiteral**(`stream`): [`IntegerLiteral`](../classes/IntegerLiteral.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`ExpressionTokenStream`](../classes/expressions.ExpressionTokenStream.md) |

#### Returns

[`IntegerLiteral`](../classes/IntegerLiteral.md)

#### Defined in

[src/expressions/common.ts:90](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/common.ts#L90)

___

### parseNil

▸ **parseNil**(): [`Nil`](../classes/Nil.md)

#### Returns

[`Nil`](../classes/Nil.md)

#### Defined in

[src/expressions/common.ts:72](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/common.ts#L72)

___

### parseStringLiteral

▸ **parseStringLiteral**(`stream`): [`StringLiteral`](../classes/StringLiteral.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`ExpressionTokenStream`](../classes/expressions.ExpressionTokenStream.md) |

#### Returns

[`StringLiteral`](../classes/StringLiteral.md)

#### Defined in

[src/expressions/common.ts:84](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/common.ts#L84)

___

### parseStringOrIdentifier

▸ **parseStringOrIdentifier**(`stream`): [`StringLiteral`](../classes/StringLiteral.md) \| [`Identifier`](../classes/Identifier.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`ExpressionTokenStream`](../classes/expressions.ExpressionTokenStream.md) |

#### Returns

[`StringLiteral`](../classes/StringLiteral.md) \| [`Identifier`](../classes/Identifier.md)

#### Defined in

[src/expressions/common.ts:148](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/common.ts#L148)

___

### parseUnchainedIdentifier

▸ **parseUnchainedIdentifier**(`stream`): [`Identifier`](../classes/Identifier.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`ExpressionTokenStream`](../classes/expressions.ExpressionTokenStream.md) |

#### Returns

[`Identifier`](../classes/Identifier.md)

#### Defined in

[src/expressions/common.ts:179](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/common.ts#L179)

___

### reverseOperatorLookup

▸ **reverseOperatorLookup**(`kind`): `string`

Return the operator that matches the given token kind, or the
input kind if it's not an operator token.

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind` | `string` |

#### Returns

`string`

#### Defined in

[src/expressions/tokens.ts:159](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L159)
