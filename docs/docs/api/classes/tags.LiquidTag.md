---
id: "tags.LiquidTag"
title: "Class: LiquidTag"
sidebar_label: "LiquidTag"
custom_edit_url: null
---

[tags](../namespaces/tags.md).LiquidTag

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new LiquidTag**()

## Properties

### block

• `Readonly` **block**: ``false``

#### Defined in

[src/builtin/tags/liquid.ts:99](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/liquid.ts#L99)

___

### name

• `Readonly` **name**: ``"liquid"``

#### Defined in

[src/builtin/tags/liquid.ts:100](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/liquid.ts#L100)

___

### nodeClass

• `Protected` **nodeClass**: typeof [`LiquidNode`](tags.LiquidNode.md) = `LiquidNode`

#### Defined in

[src/builtin/tags/liquid.ts:101](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/liquid.ts#L101)

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

[src/builtin/tags/liquid.ts:103](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/liquid.ts#L103)
