---
id: "tags.ForNode"
title: "Class: ForNode"
sidebar_label: "ForNode"
custom_edit_url: null
---

[tags](../namespaces/tags.md).ForNode

## Implements

- [`Node`](../interfaces/Node.md)

## Constructors

### constructor

• **new ForNode**(`token`, `expression`, `block`, `default_?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`Token`](tokens.Token.md) |
| `expression` | [`LoopExpression`](LoopExpression.md) |
| `block` | [`BlockNode`](BlockNode.md) |
| `default_?` | [`BlockNode`](BlockNode.md) |

#### Defined in

[src/builtin/tags/for.ts:109](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L109)

## Properties

### block

• `Readonly` **block**: [`BlockNode`](BlockNode.md)

___

### default\_

• `Optional` `Readonly` **default\_**: [`BlockNode`](BlockNode.md)

___

### expression

• `Readonly` **expression**: [`LoopExpression`](LoopExpression.md)

___

### forceOutput

• **forceOutput**: `boolean` = `false`

Indicates that nodes that do automatic whitespace suppression
should output this node regardless of its contents.

#### Implementation of

[Node](../interfaces/Node.md).[forceOutput](../interfaces/Node.md#forceoutput)

#### Defined in

[src/builtin/tags/for.ts:108](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L108)

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

[src/builtin/tags/for.ts:221](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L221)

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

[src/builtin/tags/for.ts:118](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L118)

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

[src/builtin/tags/for.ts:173](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L173)
