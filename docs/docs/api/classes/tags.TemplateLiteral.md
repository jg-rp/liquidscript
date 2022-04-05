---
id: "tags.TemplateLiteral"
title: "Class: TemplateLiteral"
sidebar_label: "TemplateLiteral"
custom_edit_url: null
---

[tags](../namespaces/tags.md).TemplateLiteral

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new TemplateLiteral**()

## Properties

### block

• `Readonly` **block**: ``false``

#### Defined in

[src/builtin/tags/literal.ts:8](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/literal.ts#L8)

___

### name

• `Readonly` **name**: ``"literal"``

#### Defined in

[src/builtin/tags/literal.ts:9](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/literal.ts#L9)

___

### nodeClass

• `Protected` **nodeClass**: typeof [`LiteralNode`](tags.LiteralNode.md) = `LiteralNode`

#### Defined in

[src/builtin/tags/literal.ts:10](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/literal.ts#L10)

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

[src/builtin/tags/literal.ts:12](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/literal.ts#L12)
