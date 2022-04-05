---
id: "BlockNode"
title: "Class: BlockNode"
sidebar_label: "BlockNode"
sidebar_position: 0
custom_edit_url: null
---

A block of abstract syntax tree nodes.

## Implements

- [`Node`](../interfaces/Node.md)

## Constructors

### constructor

• **new BlockNode**(`token`, `nodes?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `token` | [`Token`](tokens.Token.md) | `undefined` |
| `nodes` | [`Node`](../interfaces/Node.md)[] | `[]` |

#### Defined in

[src/ast.ts:56](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/ast.ts#L56)

## Properties

### nodes

• **nodes**: [`Node`](../interfaces/Node.md)[] = `[]`

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

[src/ast.ts:93](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/ast.ts#L93)

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

[src/ast.ts:58](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/ast.ts#L58)

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

[src/ast.ts:79](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/ast.ts#L79)
