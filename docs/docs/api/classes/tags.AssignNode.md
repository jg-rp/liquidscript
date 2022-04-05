---
id: "tags.AssignNode"
title: "Class: AssignNode"
sidebar_label: "AssignNode"
custom_edit_url: null
---

[tags](../namespaces/tags.md).AssignNode

## Implements

- [`Node`](../interfaces/Node.md)

## Constructors

### constructor

• **new AssignNode**(`token`, `name`, `expression`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`Token`](tokens.Token.md) |
| `name` | `string` |
| `expression` | [`Expression`](../interfaces/Expression.md) |

#### Defined in

[src/builtin/tags/assign.ts:35](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/assign.ts#L35)

## Properties

### expression

• `Readonly` **expression**: [`Expression`](../interfaces/Expression.md)

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

### children

▸ **children**(): [`Node`](../interfaces/Node.md)[]

Return an array of child nodes.

#### Returns

[`Node`](../interfaces/Node.md)[]

#### Implementation of

[Node](../interfaces/Node.md).[children](../interfaces/Node.md#children)

#### Defined in

[src/builtin/tags/assign.ts:54](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/assign.ts#L54)

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

[src/builtin/tags/assign.ts:41](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/assign.ts#L41)

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

[src/builtin/tags/assign.ts:50](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/assign.ts#L50)
