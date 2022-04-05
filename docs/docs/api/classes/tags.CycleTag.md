---
id: "tags.CycleTag"
title: "Class: CycleTag"
sidebar_label: "CycleTag"
custom_edit_url: null
---

[tags](../namespaces/tags.md).CycleTag

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new CycleTag**()

## Properties

### block

• `Readonly` **block**: ``false``

#### Defined in

[src/builtin/tags/cycle.ts:20](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/cycle.ts#L20)

___

### nodeClass

• `Protected` **nodeClass**: typeof [`CycleNode`](tags.CycleNode.md) = `CycleNode`

#### Defined in

[src/builtin/tags/cycle.ts:21](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/cycle.ts#L21)

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

[src/builtin/tags/cycle.ts:23](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/cycle.ts#L23)
