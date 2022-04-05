---
id: "Tag"
title: "Interface: Tag"
sidebar_label: "Tag"
sidebar_position: 0
custom_edit_url: null
---

A class that implements the `Tag` interface is responsible for
parsing one or more tokens from a token stream, and returning
an {@link ast.Node} to be added into the abstract syntax tree.

## Implemented by

- [`AssignTag`](../classes/tags.AssignTag.md)
- [`BreakTag`](../classes/tags.BreakTag.md)
- [`CaptureTag`](../classes/tags.CaptureTag.md)
- [`CaseTag`](../classes/tags.CaseTag.md)
- [`CommentTag`](../classes/tags.CommentTag.md)
- [`ContinueTag`](../classes/tags.ContinueTag.md)
- [`CycleTag`](../classes/tags.CycleTag.md)
- [`DecrementTag`](../classes/tags.DecrementTag.md)
- [`EchoTag`](../classes/tags.EchoTag.md)
- [`ForTag`](../classes/tags.ForTag.md)
- [`IfChangedTag`](../classes/tags.IfChangedTag.md)
- [`IfTag`](../classes/tags.IfTag.md)
- [`IncludeTag`](../classes/tags.IncludeTag.md)
- [`IncrementTag`](../classes/tags.IncrementTag.md)
- [`LiquidTag`](../classes/tags.LiquidTag.md)
- [`OutputStatement`](../classes/tags.OutputStatement.md)
- [`RenderTag`](../classes/tags.RenderTag.md)
- [`TableRowTag`](../classes/tags.TableRowTag.md)
- [`TemplateLiteral`](../classes/tags.TemplateLiteral.md)
- [`UnlessTag`](../classes/tags.UnlessTag.md)

## Methods

### parse

▸ **parse**(`stream`, `environment`): [`Node`](Node.md)

Create a syntax tree node by parsing tokens from the token
stream.

If implementing a block tag (one with a start and end tag),
the stream should be left with the end tag as its current
token.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`TokenStream`](tokens.TokenStream.md) | A stream of template tokens. |
| `environment` | [`Environment`](../classes/Environment.md) | The active environment. |

#### Returns

[`Node`](Node.md)

#### Defined in

[src/tag.ts:22](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/tag.ts#L22)
