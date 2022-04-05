---
id: "tags.CaptureTag"
title: "Class: CaptureTag"
sidebar_label: "CaptureTag"
custom_edit_url: null
---

[tags](../namespaces/tags.md).CaptureTag

## Implements

- [`Tag`](../interfaces/Tag.md)

## Constructors

### constructor

• **new CaptureTag**()

## Properties

### block

• `Readonly` **block**: ``true``

#### Defined in

[src/builtin/tags/capture.ts:17](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/capture.ts#L17)

___

### end

• `Readonly` **end**: ``"endcapture"``

#### Defined in

[src/builtin/tags/capture.ts:19](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/capture.ts#L19)

___

### name

• `Readonly` **name**: ``"capture"``

#### Defined in

[src/builtin/tags/capture.ts:18](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/capture.ts#L18)

___

### nodeClass

• `Protected` **nodeClass**: typeof [`CaptureNode`](tags.CaptureNode.md) = `CaptureNode`

#### Defined in

[src/builtin/tags/capture.ts:20](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/capture.ts#L20)

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

[src/builtin/tags/capture.ts:22](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/capture.ts#L22)
