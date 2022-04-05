---
id: "tags.EchoTag"
title: "Class: EchoTag"
sidebar_label: "EchoTag"
custom_edit_url: null
---

[tags](../namespaces/tags.md).EchoTag

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new EchoTag**()

## Properties

### block

• `Readonly` **block**: ``false``

#### Defined in

[src/builtin/tags/echo.ts:9](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/echo.ts#L9)

___

### name

• `Readonly` **name**: ``"echo"``

#### Defined in

[src/builtin/tags/echo.ts:10](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/echo.ts#L10)

___

### nodeClass

• `Protected` **nodeClass**: typeof [`EchoNode`](tags.EchoNode.md) = `EchoNode`

#### Defined in

[src/builtin/tags/echo.ts:11](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/echo.ts#L11)

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

[src/builtin/tags/echo.ts:13](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/echo.ts#L13)
