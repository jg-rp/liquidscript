---
id: "tags.CycleNode"
title: "Class: CycleNode"
sidebar_label: "CycleNode"
custom_edit_url: null
---

[tags](../namespaces/tags.md).CycleNode

## Implements

- [`Node`](../interfaces/Node.md)

## Constructors

### constructor

• **new CycleNode**(`token`, `args`, `group?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`Token`](tokens.Token.md) |
| `args` | [`Expression`](../interfaces/Expression.md)[] |
| `group?` | [`Expression`](../interfaces/Expression.md) |

#### Defined in

[src/builtin/tags/cycle.ts:47](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/cycle.ts#L47)

## Properties

### args

• `Readonly` **args**: [`Expression`](../interfaces/Expression.md)[]

___

### group

• `Optional` `Readonly` **group**: [`Expression`](../interfaces/Expression.md)

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

[src/builtin/tags/cycle.ts:87](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/cycle.ts#L87)

___

### cycle

▸ `Protected` **cycle**(`context`, `out`, `groupName`, `args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |
| `out` | [`RenderStream`](../interfaces/RenderStream.md) |
| `groupName` | `unknown` |
| `args` | `unknown`[] |

#### Returns

`void`

#### Defined in

[src/builtin/tags/cycle.ts:53](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/cycle.ts#L53)

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

[src/builtin/tags/cycle.ts:66](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/cycle.ts#L66)

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

[src/builtin/tags/cycle.ts:81](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/cycle.ts#L81)
