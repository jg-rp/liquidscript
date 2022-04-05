---
id: "tags.DecrementTag"
title: "Class: DecrementTag"
sidebar_label: "DecrementTag"
custom_edit_url: null
---

[tags](../namespaces/tags.md).DecrementTag

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new DecrementTag**()

## Properties

### block

• `Readonly` **block**: ``false``

#### Defined in

[src/builtin/tags/decrement.ts:11](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/decrement.ts#L11)

___

### name

• `Readonly` **name**: ``"decrement"``

#### Defined in

[src/builtin/tags/decrement.ts:12](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/decrement.ts#L12)

___

### nodeClass

• `Protected` **nodeClass**: typeof [`DecrementNode`](tags.DecrementNode.md) = `DecrementNode`

#### Defined in

[src/builtin/tags/decrement.ts:13](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/decrement.ts#L13)

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

[src/builtin/tags/decrement.ts:15](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/decrement.ts#L15)
