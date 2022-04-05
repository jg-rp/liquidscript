---
id: "tags.UnlessNode"
title: "Class: UnlessNode"
sidebar_label: "UnlessNode"
custom_edit_url: null
---

[tags](../namespaces/tags.md).UnlessNode

## Implements

- [`Node`](../interfaces/Node.md)

## Constructors

### constructor

• **new UnlessNode**(`token`, `condition`, `consequence`, `conditionalAlternatives`, `alternative?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`Token`](tokens.Token.md) |
| `condition` | [`Expression`](../interfaces/Expression.md) |
| `consequence` | [`BlockNode`](BlockNode.md) |
| `conditionalAlternatives` | `ConditionalAlternative`[] |
| `alternative?` | [`BlockNode`](BlockNode.md) |

#### Defined in

[src/builtin/tags/unless.ts:89](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/unless.ts#L89)

## Properties

### forceOutput

• **forceOutput**: `boolean` = `false`

Indicates that nodes that do automatic whitespace suppression
should output this node regardless of its contents.

#### Implementation of

[Node](../interfaces/Node.md).[forceOutput](../interfaces/Node.md#forceoutput)

#### Defined in

[src/builtin/tags/unless.ts:88](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/unless.ts#L88)

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

[src/builtin/tags/unless.ts:156](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/unless.ts#L156)

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

[src/builtin/tags/unless.ts:99](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/unless.ts#L99)

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

[src/builtin/tags/unless.ts:129](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/unless.ts#L129)
