---
id: "RenderStream"
title: "Interface: RenderStream"
sidebar_label: "RenderStream"
sidebar_position: 0
custom_edit_url: null
---

An object to which a [Tag](Tag.md) can write its rendered content to.

## Implemented by

- [`BufferedRenderStream`](../classes/BufferedRenderStream.md)

## Methods

### write

▸ **write**(`value`): `void`

Write rendered content to the output stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Template output text. |

#### Returns

`void`

#### Defined in

[src/io/output_stream.ts:9](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/io/output_stream.ts#L9)
