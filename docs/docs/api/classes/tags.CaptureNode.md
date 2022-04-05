---
id: "tags.CaptureNode"
title: "Class: CaptureNode"
sidebar_label: "CaptureNode"
custom_edit_url: null
---

[tags](../namespaces/tags.md).CaptureNode

## Implements

- [`Node`](../interfaces/Node.md)

## Constructors

### constructor

• **new CaptureNode**(`token`, `name`, `block`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`Token`](tokens.Token.md) |
| `name` | `string` |
| `block` | [`BlockNode`](BlockNode.md) |

#### Defined in

[src/builtin/tags/capture.ts:44](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/capture.ts#L44)

## Properties

### block

• `Readonly` **block**: [`BlockNode`](BlockNode.md)

___

### captureOutput

• `Readonly` **captureOutput**: ``true``

Indicates that a node will never produce an output, even if it
has output statement child nodes.

#### Implementation of

[Node](../interfaces/Node.md).[captureOutput](../interfaces/Node.md#captureoutput)

#### Defined in

[src/builtin/tags/capture.ts:43](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/capture.ts#L43)

___

### name

• `Readonly` **name**: `string`

___

### token

• `Readonly` **token**: [`Token`](tokens.Token.md)

The token that started this node. Used to add line and column numbers
to error messages.

#### Implementation of

[Node](../interfaces/Node.md).[token](../interfaces/Node.md#token)

## Methods

### assign

▸ `Protected` **assign**(`context`, `buffer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |
| `buffer` | [`RenderStream`](../interfaces/RenderStream.md) |

#### Returns

`void`

#### Defined in

[src/builtin/tags/capture.ts:50](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/capture.ts#L50)

___

### children

▸ **children**(): [`Node`](../interfaces/Node.md)[]

Return an array of child nodes.

#### Returns

[`Node`](../interfaces/Node.md)[]

#### Implementation of

[Node](../interfaces/Node.md).[children](../interfaces/Node.md#children)

#### Defined in

[src/builtin/tags/capture.ts:68](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/capture.ts#L68)

___

### render

▸ **render**(`context`): `Promise`<`void`\>

Render this not to the given output stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[Node](../interfaces/Node.md).[render](../interfaces/Node.md#render)

#### Defined in

[src/builtin/tags/capture.ts:56](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/capture.ts#L56)

___

### renderSync

▸ **renderSync**(`context`): `void`

A synchronous version of `render`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`void`

#### Implementation of

[Node](../interfaces/Node.md).[renderSync](../interfaces/Node.md#rendersync)

#### Defined in

[src/builtin/tags/capture.ts:62](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/capture.ts#L62)
