---
id: "tags.ContinueTag"
title: "Class: ContinueTag"
sidebar_label: "ContinueTag"
custom_edit_url: null
---

[tags](../namespaces/tags.md).ContinueTag

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new ContinueTag**()

## Properties

### block

• `Readonly` **block**: ``false``

#### Defined in

[src/builtin/tags/for.ts:31](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L31)

___

### name

• `Readonly` **name**: ``"continue"``

#### Defined in

[src/builtin/tags/for.ts:30](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L30)

## Methods

### parse

▸ **parse**(`stream`): [`ContinueNode`](tags.ContinueNode.md)

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

[`ContinueNode`](tags.ContinueNode.md)

#### Implementation of

[Tag](../interfaces/Tag.md).[parse](../interfaces/Tag.md#parse)

#### Defined in

[src/builtin/tags/for.ts:33](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L33)
