---
id: "tags.BreakTag"
title: "Class: BreakTag"
sidebar_label: "BreakTag"
custom_edit_url: null
---

[tags](../namespaces/tags.md).BreakTag

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new BreakTag**()

## Properties

### block

• `Readonly` **block**: ``false``

#### Defined in

[src/builtin/tags/for.ts:22](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L22)

___

### name

• `Readonly` **name**: ``"break"``

#### Defined in

[src/builtin/tags/for.ts:21](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L21)

## Methods

### parse

▸ **parse**(`stream`): [`BreakNode`](tags.BreakNode.md)

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

[`BreakNode`](tags.BreakNode.md)

#### Implementation of

[Tag](../interfaces/Tag.md).[parse](../interfaces/Tag.md#parse)

#### Defined in

[src/builtin/tags/for.ts:24](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L24)
