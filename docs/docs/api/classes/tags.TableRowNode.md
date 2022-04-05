---
id: "tags.TableRowNode"
title: "Class: TableRowNode"
sidebar_label: "TableRowNode"
custom_edit_url: null
---

[tags](../namespaces/tags.md).TableRowNode

## Implements

- [`Node`](../interfaces/Node.md)

## Constructors

### constructor

• **new TableRowNode**(`token`, `expression`, `block`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`Token`](tokens.Token.md) |
| `expression` | [`LoopExpression`](LoopExpression.md) |
| `block` | [`BlockNode`](BlockNode.md) |

#### Defined in

[src/builtin/tags/tablerow.ts:38](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/tablerow.ts#L38)

## Properties

### block

• `Readonly` **block**: [`BlockNode`](BlockNode.md)

___

### expression

• `Readonly` **expression**: [`LoopExpression`](LoopExpression.md)

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

[src/builtin/tags/tablerow.ts:125](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/tablerow.ts#L125)

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

[src/builtin/tags/tablerow.ts:44](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/tablerow.ts#L44)

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

[src/builtin/tags/tablerow.ts:86](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/tablerow.ts#L86)
