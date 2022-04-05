---
id: "tags.RenderTag"
title: "Class: RenderTag"
sidebar_label: "RenderTag"
custom_edit_url: null
---

[tags](../namespaces/tags.md).RenderTag

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new RenderTag**()

## Properties

### block

• `Readonly` **block**: ``false``

#### Defined in

[src/builtin/tags/render.ts:29](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/render.ts#L29)

___

### name

• `Readonly` **name**: ``"render"``

#### Defined in

[src/builtin/tags/render.ts:30](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/render.ts#L30)

___

### nodeClass

• `Protected` **nodeClass**: typeof [`RenderNode`](tags.RenderNode.md) = `RenderNode`

#### Defined in

[src/builtin/tags/render.ts:31](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/render.ts#L31)

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

[src/builtin/tags/render.ts:43](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/render.ts#L43)

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

[src/builtin/tags/render.ts:33](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/render.ts#L33)
