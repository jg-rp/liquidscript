---
id: "tags.ContinueNode"
title: "Class: ContinueNode"
sidebar_label: "ContinueNode"
custom_edit_url: null
---

[tags](../namespaces/tags.md).ContinueNode

## Implements

- [`Node`](../interfaces/Node.md)

## Constructors

### constructor

• **new ContinueNode**(`token`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`Token`](tokens.Token.md) |

#### Defined in

[src/builtin/tags/for.ts:88](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L88)

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

[src/builtin/tags/for.ts:102](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L102)

___

### render

▸ **render**(): `Promise`<`void`\>

Render this not to the given output stream.

#### Returns

`Promise`<`void`\>

#### Implementation of

[Node](../interfaces/Node.md).[render](../interfaces/Node.md#render)

#### Defined in

[src/builtin/tags/for.ts:94](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L94)

___

### renderSync

▸ **renderSync**(): `void`

A synchronous version of `render`.

#### Returns

`void`

#### Implementation of

[Node](../interfaces/Node.md).[renderSync](../interfaces/Node.md#rendersync)

#### Defined in

[src/builtin/tags/for.ts:98](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L98)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/builtin/tags/for.ts:90](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L90)
