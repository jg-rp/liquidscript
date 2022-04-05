---
id: "TemplateParser"
title: "Class: TemplateParser"
sidebar_label: "TemplateParser"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`Parser`](../interfaces/Parser.md)

## Constructors

### constructor

• **new TemplateParser**(`environment`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `environment` | [`Environment`](Environment.md) |

#### Defined in

[src/parse.ts:37](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/parse.ts#L37)

## Properties

### environment

• `Readonly` **environment**: [`Environment`](Environment.md)

## Methods

### getTag

▸ `Protected` **getTag**(`token`): [`Tag`](../interfaces/Tag.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`Token`](tokens.Token.md) |

#### Returns

[`Tag`](../interfaces/Tag.md)

#### Defined in

[src/parse.ts:78](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/parse.ts#L78)

___

### parse

▸ **parse**(`stream`): [`Root`](Root.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`TokenStream`](../interfaces/tokens.TokenStream.md) |

#### Returns

[`Root`](Root.md)

#### Implementation of

[Parser](../interfaces/Parser.md).[parse](../interfaces/Parser.md#parse)

#### Defined in

[src/parse.ts:39](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/parse.ts#L39)

___

### parseBlock

▸ **parseBlock**(`stream`, `end`): [`BlockNode`](BlockNode.md)

Parse a block of tokens from the given stream until an end
tag is found or the end of the stream is reached.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`TokenStream`](../interfaces/tokens.TokenStream.md) |
| `end` | `Set`<`string`\> |

#### Returns

[`BlockNode`](BlockNode.md)

#### Implementation of

[Parser](../interfaces/Parser.md).[parseBlock](../interfaces/Parser.md#parseblock)

#### Defined in

[src/parse.ts:53](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/parse.ts#L53)

___

### parseLiquid

▸ **parseLiquid**(`stream`): [`BlockNode`](BlockNode.md)

Like [parseBlock](TemplateParser.md#parseblock), but read until the end of the stream.
Useful for the `liquid` tag.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`TokenStream`](../interfaces/tokens.TokenStream.md) |

#### Returns

[`BlockNode`](BlockNode.md)

#### Implementation of

[Parser](../interfaces/Parser.md).[parseLiquid](../interfaces/Parser.md#parseliquid)

#### Defined in

[src/parse.ts:69](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/parse.ts#L69)

___

### parseStatement

▸ `Protected` **parseStatement**(`stream`): [`Node`](../interfaces/Node.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`TokenStream`](../interfaces/tokens.TokenStream.md) |

#### Returns

[`Node`](../interfaces/Node.md)

#### Defined in

[src/parse.ts:85](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/parse.ts#L85)
