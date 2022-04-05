---
id: "tags.CaseTag"
title: "Class: CaseTag"
sidebar_label: "CaseTag"
custom_edit_url: null
---

[tags](../namespaces/tags.md).CaseTag

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new CaseTag**()

## Properties

### block

• `Readonly` **block**: ``true``

#### Defined in

[src/builtin/tags/case.ts:30](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/case.ts#L30)

___

### end

• `Readonly` **end**: ``"endcase"``

#### Defined in

[src/builtin/tags/case.ts:32](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/case.ts#L32)

___

### name

• `Readonly` **name**: ``"case"``

#### Defined in

[src/builtin/tags/case.ts:31](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/case.ts#L31)

___

### nodeClass

• `Protected` **nodeClass**: typeof [`CaseNode`](tags.CaseNode.md) = `CaseNode`

#### Defined in

[src/builtin/tags/case.ts:33](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/case.ts#L33)

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

[src/builtin/tags/case.ts:44](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/case.ts#L44)

___

### parseExpression

▸ `Protected` **parseExpression**(`_when`, `obj`, `stream`): [`BooleanExpression`](BooleanExpression.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_when` | `string` |
| `obj` | `string` |
| `stream` | [`TokenStream`](../interfaces/tokens.TokenStream.md) |

#### Returns

[`BooleanExpression`](BooleanExpression.md)

#### Defined in

[src/builtin/tags/case.ts:35](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/case.ts#L35)
