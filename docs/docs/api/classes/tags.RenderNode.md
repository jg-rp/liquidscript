---
id: "tags.RenderNode"
title: "Class: RenderNode"
sidebar_label: "RenderNode"
custom_edit_url: null
---

[tags](../namespaces/tags.md).RenderNode

## Implements

- [`Node`](../interfaces/Node.md)

## Constructors

### constructor

• **new RenderNode**(`token`, `templateName`, `bindLoop`, `bindName?`, `alias?`, `args?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`Token`](tokens.Token.md) |
| `templateName` | [`StringLiteral`](StringLiteral.md) \| [`Identifier`](Identifier.md) |
| `bindLoop` | `boolean` |
| `bindName?` | [`Identifier`](Identifier.md) |
| `alias?` | `string` |
| `args` | `Object` |

#### Defined in

[src/builtin/tags/render.ts:122](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/render.ts#L122)

## Properties

### alias

• `Optional` `Readonly` **alias**: `string`

___

### args

• `Readonly` **args**: `Object` = `{}`

#### Index signature

▪ [index: `string`]: [`Expression`](../interfaces/Expression.md)

___

### bindLoop

• `Readonly` **bindLoop**: `boolean`

___

### bindName

• `Optional` `Readonly` **bindName**: [`Identifier`](Identifier.md)

___

### tag

• `Protected` **tag**: `string` = `"render"`

#### Defined in

[src/builtin/tags/render.ts:120](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/render.ts#L120)

___

### templateName

• `Readonly` **templateName**: [`StringLiteral`](StringLiteral.md) \| [`Identifier`](Identifier.md)

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

[src/builtin/tags/render.ts:215](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/render.ts#L215)

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

[src/builtin/tags/render.ts:131](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/render.ts#L131)

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

[src/builtin/tags/render.ts:174](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/render.ts#L174)
