---
id: "tags.CaseNode"
title: "Class: CaseNode"
sidebar_label: "CaseNode"
custom_edit_url: null
---

[tags](../namespaces/tags.md).CaseNode

## Implements

- [`Node`](../interfaces/Node.md)

## Constructors

### constructor

• **new CaseNode**(`token`, `whens`, `default_?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`Token`](tokens.Token.md) |
| `whens` | `ConditionalAlternative`[] |
| `default_?` | [`BlockNode`](BlockNode.md) |

#### Defined in

[src/builtin/tags/case.ts:93](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/case.ts#L93)

## Properties

### default\_

• `Optional` `Readonly` **default\_**: [`BlockNode`](BlockNode.md)

___

### forceOutput

• **forceOutput**: `boolean` = `false`

Indicates that nodes that do automatic whitespace suppression
should output this node regardless of its contents.

#### Implementation of

[Node](../interfaces/Node.md).[forceOutput](../interfaces/Node.md#forceoutput)

#### Defined in

[src/builtin/tags/case.ts:92](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/case.ts#L92)

___

### token

• `Readonly` **token**: [`Token`](tokens.Token.md)

The token that started this node. Used to add line and column numbers
to error messages.

#### Implementation of

[Node](../interfaces/Node.md).[token](../interfaces/Node.md#token)

___

### whens

• `Readonly` **whens**: `ConditionalAlternative`[]

## Methods

### children

▸ **children**(): [`Node`](../interfaces/Node.md)[]

Return an array of child nodes.

#### Returns

[`Node`](../interfaces/Node.md)[]

#### Implementation of

[Node](../interfaces/Node.md).[children](../interfaces/Node.md#children)

#### Defined in

[src/builtin/tags/case.ts:146](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/case.ts#L146)

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

[src/builtin/tags/case.ts:101](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/case.ts#L101)

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

[src/builtin/tags/case.ts:127](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/case.ts#L127)
