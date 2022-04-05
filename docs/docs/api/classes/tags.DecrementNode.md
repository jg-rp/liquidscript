---
id: "tags.DecrementNode"
title: "Class: DecrementNode"
sidebar_label: "DecrementNode"
custom_edit_url: null
---

[tags](../namespaces/tags.md).DecrementNode

## Implements

- [`Node`](../interfaces/Node.md)

## Constructors

### constructor

• **new DecrementNode**(`token`, `identifier`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`Token`](tokens.Token.md) |
| `identifier` | `string` |

#### Defined in

[src/builtin/tags/decrement.ts:28](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/decrement.ts#L28)

## Properties

### identifier

• `Readonly` **identifier**: `string`

___

### token

• `Readonly` **token**: [`Token`](tokens.Token.md)

The token that started this node. Used to add line and column numbers
to error messages.

#### Implementation of

[Node](../interfaces/Node.md).[token](../interfaces/Node.md#token)

## Methods

### children

▸ **children**(): [`Node`](../interfaces/Node.md)[]

Return an array of child nodes.

#### Returns

[`Node`](../interfaces/Node.md)[]

#### Implementation of

[Node](../interfaces/Node.md).[children](../interfaces/Node.md#children)

#### Defined in

[src/builtin/tags/decrement.ts:45](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/decrement.ts#L45)

___

### render

▸ **render**(`context`, `out`): `Promise`<`void`\>

Render this not to the given output stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |
| `out` | [`RenderStream`](../interfaces/RenderStream.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[Node](../interfaces/Node.md).[render](../interfaces/Node.md#render)

#### Defined in

[src/builtin/tags/decrement.ts:30](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/decrement.ts#L30)

___

### renderSync

▸ **renderSync**(`context`, `out`): `void`

A synchronous version of `render`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |
| `out` | [`RenderStream`](../interfaces/RenderStream.md) |

#### Returns

`void`

#### Implementation of

[Node](../interfaces/Node.md).[renderSync](../interfaces/Node.md#rendersync)

#### Defined in

[src/builtin/tags/decrement.ts:37](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/decrement.ts#L37)
