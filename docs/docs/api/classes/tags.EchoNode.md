---
id: "tags.EchoNode"
title: "Class: EchoNode"
sidebar_label: "EchoNode"
custom_edit_url: null
---

[tags](../namespaces/tags.md).EchoNode

## Hierarchy

- [`OutputStatementNode`](tags.OutputStatementNode.md)

  ↳ **`EchoNode`**

## Implements

- [`Node`](../interfaces/Node.md)

## Constructors

### constructor

• **new EchoNode**(`token`, `expression`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`Token`](tokens.Token.md) |
| `expression` | [`Expression`](../interfaces/Expression.md) |

#### Inherited from

[OutputStatementNode](tags.OutputStatementNode.md).[constructor](tags.OutputStatementNode.md#constructor)

#### Defined in

[src/builtin/tags/statement.ts:27](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/statement.ts#L27)

## Properties

### expression

• `Readonly` **expression**: [`Expression`](../interfaces/Expression.md)

#### Inherited from

[OutputStatementNode](tags.OutputStatementNode.md).[expression](tags.OutputStatementNode.md#expression)

___

### forceOutput

• `Readonly` **forceOutput**: ``true``

Indicates that nodes that do automatic whitespace suppression
should output this node regardless of its contents.

#### Implementation of

[Node](../interfaces/Node.md).[forceOutput](../interfaces/Node.md#forceoutput)

#### Inherited from

[OutputStatementNode](tags.OutputStatementNode.md).[forceOutput](tags.OutputStatementNode.md#forceoutput)

#### Defined in

[src/builtin/tags/statement.ts:26](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/statement.ts#L26)

___

### token

• `Readonly` **token**: [`Token`](tokens.Token.md)

The token that started this node. Used to add line and column numbers
to error messages.

#### Implementation of

[Node](../interfaces/Node.md).[token](../interfaces/Node.md#token)

#### Inherited from

[OutputStatementNode](tags.OutputStatementNode.md).[token](tags.OutputStatementNode.md#token)

## Methods

### children

▸ **children**(): [`Node`](../interfaces/Node.md)[]

Return an array of child nodes.

#### Returns

[`Node`](../interfaces/Node.md)[]

#### Implementation of

[Node](../interfaces/Node.md).[children](../interfaces/Node.md#children)

#### Inherited from

[OutputStatementNode](tags.OutputStatementNode.md).[children](tags.OutputStatementNode.md#children)

#### Defined in

[src/builtin/tags/statement.ts:53](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/statement.ts#L53)

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

#### Inherited from

[OutputStatementNode](tags.OutputStatementNode.md).[render](tags.OutputStatementNode.md#render)

#### Defined in

[src/builtin/tags/statement.ts:29](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/statement.ts#L29)

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

#### Inherited from

[OutputStatementNode](tags.OutputStatementNode.md).[renderSync](tags.OutputStatementNode.md#rendersync)

#### Defined in

[src/builtin/tags/statement.ts:40](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/statement.ts#L40)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Overrides

[OutputStatementNode](tags.OutputStatementNode.md).[toString](tags.OutputStatementNode.md#tostring)

#### Defined in

[src/builtin/tags/echo.ts:28](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/tags/echo.ts#L28)
