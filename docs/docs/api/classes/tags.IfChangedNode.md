---
id: "tags.IfChangedNode"
title: "Class: IfChangedNode"
sidebar_label: "IfChangedNode"
custom_edit_url: null
---

[tags](../namespaces/tags.md).IfChangedNode

## Implements

- [`Node`](../interfaces/Node.md)

## Constructors

### constructor

• **new IfChangedNode**(`token`, `block`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`Token`](tokens.Token.md) |
| `block` | [`BlockNode`](BlockNode.md) |

#### Defined in

[src/builtin/tags/ifchanged.ts:25](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/ifchanged.ts#L25)

## Properties

### block

• `Readonly` **block**: [`BlockNode`](BlockNode.md)

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

[src/builtin/tags/ifchanged.ts:56](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/ifchanged.ts#L56)

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

[src/builtin/tags/ifchanged.ts:27](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/ifchanged.ts#L27)

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

[src/builtin/tags/ifchanged.ts:43](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/ifchanged.ts#L43)
