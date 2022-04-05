---
id: "tags.UnlessTag"
title: "Class: UnlessTag"
sidebar_label: "UnlessTag"
custom_edit_url: null
---

[tags](../namespaces/tags.md).UnlessTag

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new UnlessTag**()

## Properties

### block

• `Readonly` **block**: ``true``

#### Defined in

[src/builtin/tags/unless.ts:31](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/unless.ts#L31)

___

### end

• `Readonly` **end**: ``"endunless"``

#### Defined in

[src/builtin/tags/unless.ts:33](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/unless.ts#L33)

___

### name

• `Readonly` **name**: ``"unless"``

#### Defined in

[src/builtin/tags/unless.ts:32](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/unless.ts#L32)

___

### nodeClass

• `Protected` **nodeClass**: typeof [`UnlessNode`](tags.UnlessNode.md) = `UnlessNode`

#### Defined in

[src/builtin/tags/unless.ts:34](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/unless.ts#L34)

## Methods

### parse

▸ **parse**(`stream`, `environment`): [`Node`](../interfaces/Node.md)

Create a syntax tree node by parsing tokens from the token
stream.

If implementing a block tag (one with a start and end tag),
the stream should be left with the end tag as its current
token.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`TokenStream`](../interfaces/tokens.TokenStream.md) |
| `environment` | [`Environment`](Environment.md) |

#### Returns

[`Node`](../interfaces/Node.md)

#### Implementation of

[Tag](../interfaces/Tag.md).[parse](../interfaces/Tag.md#parse)

#### Defined in

[src/builtin/tags/unless.ts:41](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/unless.ts#L41)

___

### parseExpression

▸ `Protected` **parseExpression**(`stream`): [`Expression`](../interfaces/Expression.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`TokenStream`](../interfaces/tokens.TokenStream.md) |

#### Returns

[`Expression`](../interfaces/Expression.md)

#### Defined in

[src/builtin/tags/unless.ts:36](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/unless.ts#L36)
