---
id: "tags.LiteralNode"
title: "Class: LiteralNode"
sidebar_label: "LiteralNode"
custom_edit_url: null
---

[tags](../namespaces/tags.md).LiteralNode

## Implements

- [`Node`](../interfaces/Node.md)

## Constructors

### constructor

• **new LiteralNode**(`token`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`Token`](tokens.Token.md) |

#### Defined in

[src/builtin/tags/literal.ts:18](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/literal.ts#L18)

## Properties

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

[src/builtin/tags/literal.ts:28](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/literal.ts#L28)

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

[src/builtin/tags/literal.ts:20](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/literal.ts#L20)

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

[src/builtin/tags/literal.ts:24](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/literal.ts#L24)
