---
id: "tags.IfChangedTag"
title: "Class: IfChangedTag"
sidebar_label: "IfChangedTag"
custom_edit_url: null
---

[tags](../namespaces/tags.md).IfChangedTag

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new IfChangedTag**()

## Properties

### block

• `Readonly` **block**: ``true``

#### Defined in

[src/builtin/tags/ifchanged.ts:12](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/ifchanged.ts#L12)

___

### name

• `Readonly` **name**: ``"ifchanged"``

#### Defined in

[src/builtin/tags/ifchanged.ts:11](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/ifchanged.ts#L11)

___

### nodeClass

• `Protected` **nodeClass**: typeof [`IfChangedNode`](tags.IfChangedNode.md) = `IfChangedNode`

#### Defined in

[src/builtin/tags/ifchanged.ts:13](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/ifchanged.ts#L13)

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

[src/builtin/tags/ifchanged.ts:15](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/ifchanged.ts#L15)
