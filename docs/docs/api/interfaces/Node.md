---
id: "Node"
title: "Interface: Node"
sidebar_label: "Node"
sidebar_position: 0
custom_edit_url: null
---

## Implemented by

- [`AssignNode`](../classes/tags.AssignNode.md)
- [`BlockNode`](../classes/BlockNode.md)
- [`BreakNode`](../classes/tags.BreakNode.md)
- [`CaptureNode`](../classes/tags.CaptureNode.md)
- [`CaseNode`](../classes/tags.CaseNode.md)
- [`CommentNode`](../classes/tags.CommentNode.md)
- [`ContinueNode`](../classes/tags.ContinueNode.md)
- [`CycleNode`](../classes/tags.CycleNode.md)
- [`DecrementNode`](../classes/tags.DecrementNode.md)
- [`EchoNode`](../classes/tags.EchoNode.md)
- [`ForNode`](../classes/tags.ForNode.md)
- [`IfChangedNode`](../classes/tags.IfChangedNode.md)
- [`IfNode`](../classes/tags.IfNode.md)
- [`IncludeNode`](../classes/tags.IncludeNode.md)
- [`IncrementNode`](../classes/tags.IncrementNode.md)
- [`LiquidNode`](../classes/tags.LiquidNode.md)
- [`LiteralNode`](../classes/tags.LiteralNode.md)
- [`OutputStatementNode`](../classes/tags.OutputStatementNode.md)
- [`RenderNode`](../classes/tags.RenderNode.md)
- [`TableRowNode`](../classes/tags.TableRowNode.md)
- [`UnlessNode`](../classes/tags.UnlessNode.md)

## Properties

### captureOutput

• `Optional` `Readonly` **captureOutput**: `boolean`

Indicates that a node will never produce an output, even if it
has output statement child nodes.

#### Defined in

[src/ast.ts:24](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/ast.ts#L24)

___

### forceOutput

• `Optional` `Readonly` **forceOutput**: `boolean`

Indicates that nodes that do automatic whitespace suppression
should output this node regardless of its contents.

#### Defined in

[src/ast.ts:18](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/ast.ts#L18)

___

### token

• `Readonly` **token**: [`Token`](../classes/tokens.Token.md)

The token that started this node. Used to add line and column numbers
to error messages.

#### Defined in

[src/ast.ts:12](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/ast.ts#L12)

## Methods

### children

▸ **children**(): [`Node`](Node.md)[]

Return an array of child nodes.

#### Returns

[`Node`](Node.md)[]

#### Defined in

[src/ast.ts:42](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/ast.ts#L42)

___

### render

▸ **render**(`context`, `out`): `Promise`<`void`\>

Render this not to the given output stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | [`RenderContext`](../classes/RenderContext.md) | The active render context. |
| `out` | [`RenderStream`](RenderStream.md) | The stream to output to. |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/ast.ts:31](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/ast.ts#L31)

___

### renderSync

▸ **renderSync**(`context`, `out`): `void`

A synchronous version of `render`.

**`see`** [render](Node.md#render)

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](../classes/RenderContext.md) |
| `out` | [`RenderStream`](RenderStream.md) |

#### Returns

`void`

#### Defined in

[src/ast.ts:37](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/ast.ts#L37)
