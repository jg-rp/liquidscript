---
id: "tags.IncrementTag"
title: "Class: IncrementTag"
sidebar_label: "IncrementTag"
custom_edit_url: null
---

[tags](../namespaces/tags.md).IncrementTag

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new IncrementTag**()

## Properties

### block

• `Readonly` **block**: ``false``

#### Defined in

[src/builtin/tags/increment.ts:11](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/increment.ts#L11)

___

### name

• `Readonly` **name**: ``"increment"``

#### Defined in

[src/builtin/tags/increment.ts:12](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/increment.ts#L12)

___

### nodeClass

• `Protected` **nodeClass**: typeof [`IncrementNode`](tags.IncrementNode.md) = `IncrementNode`

#### Defined in

[src/builtin/tags/increment.ts:13](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/increment.ts#L13)

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

[src/builtin/tags/increment.ts:15](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/increment.ts#L15)
