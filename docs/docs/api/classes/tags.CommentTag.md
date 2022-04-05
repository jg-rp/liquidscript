---
id: "tags.CommentTag"
title: "Class: CommentTag"
sidebar_label: "CommentTag"
custom_edit_url: null
---

[tags](../namespaces/tags.md).CommentTag

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new CommentTag**()

## Properties

### block

• `Readonly` **block**: ``true``

#### Defined in

[src/builtin/tags/comment.ts:6](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/comment.ts#L6)

___

### end

• `Readonly` **end**: ``"endcomment"``

#### Defined in

[src/builtin/tags/comment.ts:8](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/comment.ts#L8)

___

### name

• `Readonly` **name**: ``"comment"``

#### Defined in

[src/builtin/tags/comment.ts:7](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/comment.ts#L7)

___

### nodeClass

• `Protected` **nodeClass**: typeof [`CommentNode`](tags.CommentNode.md) = `CommentNode`

#### Defined in

[src/builtin/tags/comment.ts:9](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/comment.ts#L9)

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

[src/builtin/tags/comment.ts:11](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/comment.ts#L11)
