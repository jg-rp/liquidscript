---
id: "tokens.TokenStream"
title: "Interface: TokenStream"
sidebar_label: "TokenStream"
custom_edit_url: null
---

[tokens](../namespaces/tokens.md).TokenStream

## Implemented by

- [`ExpressionTokenStream`](../classes/expressions.ExpressionTokenStream.md)
- [`TemplateTokenStream`](../classes/tokens.TemplateTokenStream.md)

## Properties

### current

• **current**: [`Token`](../classes/tokens.Token.md)

#### Defined in

[src/token.ts:30](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/token.ts#L30)

___

### peek

• **peek**: [`Token`](../classes/tokens.Token.md)

#### Defined in

[src/token.ts:31](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/token.ts#L31)

## Methods

### expect

▸ **expect**(`kind`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind` | `string` |

#### Returns

`void`

#### Defined in

[src/token.ts:33](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/token.ts#L33)

___

### expectTag

▸ **expectTag**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

#### Defined in

[src/token.ts:34](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/token.ts#L34)

___

### next

▸ **next**(): [`Token`](../classes/tokens.Token.md)

#### Returns

[`Token`](../classes/tokens.Token.md)

#### Defined in

[src/token.ts:32](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/token.ts#L32)
