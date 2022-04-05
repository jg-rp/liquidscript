---
id: "tags.IncludeTag"
title: "Class: IncludeTag"
sidebar_label: "IncludeTag"
custom_edit_url: null
---

[tags](../namespaces/tags.md).IncludeTag

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new IncludeTag**()

## Properties

### block

• `Readonly` **block**: ``false``

#### Defined in

[src/builtin/tags/include.ts:27](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/include.ts#L27)

___

### name

• `Readonly` **name**: ``"include"``

#### Defined in

[src/builtin/tags/include.ts:28](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/include.ts#L28)

___

### nodeClass

• `Protected` **nodeClass**: typeof [`IncludeNode`](tags.IncludeNode.md) = `IncludeNode`

#### Defined in

[src/builtin/tags/include.ts:29](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/include.ts#L29)

## Methods

### parse

▸ **parse**(`stream`): [`Node`](../interfaces/Node.md)

Create a syntax tree node by parsing tokens from the token
stream.

If implementing a block tag (one with a start and end tag),
the stream should be left with the end tag as its current
token.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`TokenStream`](../interfaces/tokens.TokenStream.md) |

#### Returns

[`Node`](../interfaces/Node.md)

#### Implementation of

[Tag](../interfaces/Tag.md).[parse](../interfaces/Tag.md#parse)

#### Defined in

[src/builtin/tags/include.ts:41](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/include.ts#L41)

___

### parseArgument

▸ `Protected` **parseArgument**(`stream`): [`string`, [`Expression`](../interfaces/Expression.md)]

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`ExpressionTokenStream`](expressions.ExpressionTokenStream.md) |

#### Returns

[`string`, [`Expression`](../interfaces/Expression.md)]

#### Defined in

[src/builtin/tags/include.ts:31](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/include.ts#L31)
