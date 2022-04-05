---
id: "tags.BreakNode"
title: "Class: BreakNode"
sidebar_label: "BreakNode"
custom_edit_url: null
---

[tags](../namespaces/tags.md).BreakNode

## Implements

- [`Node`](../interfaces/Node.md)

## Constructors

### constructor

• **new BreakNode**(`token`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`Token`](tokens.Token.md) |

#### Defined in

[src/builtin/tags/for.ts:68](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L68)

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

[src/builtin/tags/for.ts:82](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L82)

___

### render

▸ **render**(): `Promise`<`void`\>

Render this not to the given output stream.

#### Returns

`Promise`<`void`\>

#### Implementation of

[Node](../interfaces/Node.md).[render](../interfaces/Node.md#render)

#### Defined in

[src/builtin/tags/for.ts:74](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L74)

___

### renderSync

▸ **renderSync**(): `void`

A synchronous version of `render`.

#### Returns

`void`

#### Implementation of

[Node](../interfaces/Node.md).[renderSync](../interfaces/Node.md#rendersync)

#### Defined in

[src/builtin/tags/for.ts:78](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L78)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/builtin/tags/for.ts:70](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/for.ts#L70)
