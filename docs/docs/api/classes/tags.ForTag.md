---
id: "tags.ForTag"
title: "Class: ForTag"
sidebar_label: "ForTag"
custom_edit_url: null
---

[tags](../namespaces/tags.md).ForTag

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new ForTag**()

## Properties

### block

• `Readonly` **block**: ``true``

#### Defined in

[src/builtin/tags/for.ts:40](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L40)

___

### end

• `Readonly` **end**: ``"endfor"``

#### Defined in

[src/builtin/tags/for.ts:41](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L41)

___

### name

• `Readonly` **name**: ``"for"``

#### Defined in

[src/builtin/tags/for.ts:39](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L39)

___

### nodeClass

• `Protected` **nodeClass**: typeof [`ForNode`](tags.ForNode.md) = `ForNode`

#### Defined in

[src/builtin/tags/for.ts:42](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L42)

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

[src/builtin/tags/for.ts:44](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L44)
