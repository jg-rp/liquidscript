---
id: "tags.OutputStatement"
title: "Class: OutputStatement"
sidebar_label: "OutputStatement"
custom_edit_url: null
---

[tags](../namespaces/tags.md).OutputStatement

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new OutputStatement**()

## Properties

### block

• `Readonly` **block**: ``false``

#### Defined in

[src/builtin/tags/statement.ts:13](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/statement.ts#L13)

___

### name

• `Readonly` **name**: ``"statement"``

#### Defined in

[src/builtin/tags/statement.ts:14](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/statement.ts#L14)

___

### nodeClass

• `Protected` **nodeClass**: typeof [`OutputStatementNode`](tags.OutputStatementNode.md) = `OutputStatementNode`

#### Defined in

[src/builtin/tags/statement.ts:15](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/statement.ts#L15)

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

[src/builtin/tags/statement.ts:17](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/statement.ts#L17)
