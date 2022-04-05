---
id: "tags.IfTag"
title: "Class: IfTag"
sidebar_label: "IfTag"
custom_edit_url: null
---

[tags](../namespaces/tags.md).IfTag

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new IfTag**()

## Properties

### block

• `Readonly` **block**: ``true``

#### Defined in

[src/builtin/tags/if.ts:31](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/if.ts#L31)

___

### end

• `Readonly` **end**: ``"endif"``

#### Defined in

[src/builtin/tags/if.ts:33](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/if.ts#L33)

___

### name

• `Readonly` **name**: ``"if"``

#### Defined in

[src/builtin/tags/if.ts:32](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/if.ts#L32)

___

### nodeClass

• `Protected` **nodeClass**: typeof [`IfNode`](tags.IfNode.md) = `IfNode`

#### Defined in

[src/builtin/tags/if.ts:34](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/if.ts#L34)

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

[src/builtin/tags/if.ts:41](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/if.ts#L41)

___

### parseExpression

▸ `Protected` **parseExpression**(`stream`): [`BooleanExpression`](BooleanExpression.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`TokenStream`](../interfaces/tokens.TokenStream.md) |

#### Returns

[`BooleanExpression`](BooleanExpression.md)

#### Defined in

[src/builtin/tags/if.ts:36](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/if.ts#L36)
