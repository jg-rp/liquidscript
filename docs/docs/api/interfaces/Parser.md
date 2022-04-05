---
id: "Parser"
title: "Interface: Parser"
sidebar_label: "Parser"
sidebar_position: 0
custom_edit_url: null
---

## Implemented by

- [`TemplateParser`](../classes/TemplateParser.md)

## Methods

### parse

▸ **parse**(`stream`): [`Root`](../classes/Root.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`TokenStream`](tokens.TokenStream.md) |

#### Returns

[`Root`](../classes/Root.md)

#### Defined in

[src/parse.ts:15](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/parse.ts#L15)

___

### parseBlock

▸ **parseBlock**(`stream`, `end`): [`BlockNode`](../classes/BlockNode.md)

Parse a block of tokens from the given stream until an end
tag is found or the end of the stream is reached.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`TokenStream`](tokens.TokenStream.md) | A template token stream. |
| `end` | `Set`<`string`\> | A set of tag names that indicate the end of the block. |

#### Returns

[`BlockNode`](../classes/BlockNode.md)

#### Defined in

[src/parse.ts:25](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/parse.ts#L25)

___

### parseLiquid

▸ **parseLiquid**(`stream`): [`BlockNode`](../classes/BlockNode.md)

Like [parseBlock](Parser.md#parseblock), but read until the end of the stream.
Useful for the `liquid` tag.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`TokenStream`](tokens.TokenStream.md) | A template token stream. |

#### Returns

[`BlockNode`](../classes/BlockNode.md)

#### Defined in

[src/parse.ts:33](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/parse.ts#L33)
