---
id: "tags.TableRowTag"
title: "Class: TableRowTag"
sidebar_label: "TableRowTag"
custom_edit_url: null
---

[tags](../namespaces/tags.md).TableRowTag

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new TableRowTag**()

## Properties

### block

• `Readonly` **block**: ``true``

#### Defined in

[src/builtin/tags/tablerow.ts:19](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/tablerow.ts#L19)

___

### end

• `Readonly` **end**: ``"endtablerow"``

#### Defined in

[src/builtin/tags/tablerow.ts:21](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/tablerow.ts#L21)

___

### name

• `Readonly` **name**: ``"tablerow"``

#### Defined in

[src/builtin/tags/tablerow.ts:20](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/tablerow.ts#L20)

___

### nodeClass

• `Protected` **nodeClass**: typeof [`TableRowNode`](tags.TableRowNode.md) = `TableRowNode`

#### Defined in

[src/builtin/tags/tablerow.ts:22](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/tablerow.ts#L22)

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

[src/builtin/tags/tablerow.ts:24](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/tablerow.ts#L24)
