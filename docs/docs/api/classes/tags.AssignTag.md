---
id: "tags.AssignTag"
title: "Class: AssignTag"
sidebar_label: "AssignTag"
custom_edit_url: null
---

[tags](../namespaces/tags.md).AssignTag

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new AssignTag**()

## Properties

### block

• `Readonly` **block**: ``false``

#### Defined in

[src/builtin/tags/assign.ts:14](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/assign.ts#L14)

___

### name

• `Readonly` **name**: ``"assign"``

#### Defined in

[src/builtin/tags/assign.ts:15](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/assign.ts#L15)

___

### nodeClass

• `Protected` **nodeClass**: typeof [`AssignNode`](tags.AssignNode.md) = `AssignNode`

#### Defined in

[src/builtin/tags/assign.ts:16](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/assign.ts#L16)

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

[src/builtin/tags/assign.ts:18](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/assign.ts#L18)
