---
id: "BufferedRenderStream"
title: "Class: BufferedRenderStream"
sidebar_label: "BufferedRenderStream"
sidebar_position: 0
custom_edit_url: null
---

A [RenderStream](../interfaces/RenderStream.md) implementation that buffers rendered content
in memory.

## Implements

- [`RenderStream`](../interfaces/RenderStream.md)

## Constructors

### constructor

• **new BufferedRenderStream**(`buffer?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buffer` | `string`[] | `[]` |

#### Defined in

[src/io/output_stream.ts:17](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/io/output_stream.ts#L17)

## Methods

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/io/output_stream.ts:23](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/io/output_stream.ts#L23)

___

### write

▸ **write**(`value`): `void`

Write rendered content to the output stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Implementation of

[RenderStream](../interfaces/RenderStream.md).[write](../interfaces/RenderStream.md#write)

#### Defined in

[src/io/output_stream.ts:19](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/io/output_stream.ts#L19)
