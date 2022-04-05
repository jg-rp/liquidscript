---
id: "tokens.TemplateTokenStream"
title: "Class: TemplateTokenStream"
sidebar_label: "TemplateTokenStream"
custom_edit_url: null
---

[tokens](../namespaces/tokens.md).TemplateTokenStream

## Implements

- [`TokenStream`](../interfaces/tokens.TokenStream.md)

## Constructors

### constructor

• **new TemplateTokenStream**(`tokens`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokens` | `IterableIterator`<[`Token`](tokens.Token.md)\> |

#### Defined in

[src/token.ts:41](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/token.ts#L41)

## Properties

### \_current

• `Private` **\_current**: [`Token`](tokens.Token.md)

#### Defined in

[src/token.ts:38](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/token.ts#L38)

___

### \_peek

• `Private` **\_peek**: [`Token`](tokens.Token.md)

#### Defined in

[src/token.ts:39](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/token.ts#L39)

## Accessors

### current

• `get` **current**(): [`Token`](tokens.Token.md)

#### Returns

[`Token`](tokens.Token.md)

#### Implementation of

[TokenStream](../interfaces/tokens.TokenStream.md).[current](../interfaces/tokens.TokenStream.md#current)

#### Defined in

[src/token.ts:46](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/token.ts#L46)

___

### peek

• `get` **peek**(): [`Token`](tokens.Token.md)

#### Returns

[`Token`](tokens.Token.md)

#### Implementation of

[TokenStream](../interfaces/tokens.TokenStream.md).[peek](../interfaces/tokens.TokenStream.md#peek)

#### Defined in

[src/token.ts:50](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/token.ts#L50)

## Methods

### \_next

▸ `Protected` **_next**(): [`Token`](tokens.Token.md)

#### Returns

[`Token`](tokens.Token.md)

#### Defined in

[src/token.ts:90](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/token.ts#L90)

___

### expect

▸ **expect**(`kind`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind` | `string` |

#### Returns

`void`

#### Implementation of

[TokenStream](../interfaces/tokens.TokenStream.md).[expect](../interfaces/tokens.TokenStream.md#expect)

#### Defined in

[src/token.ts:54](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/token.ts#L54)

___

### expectTag

▸ **expectTag**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

#### Implementation of

[TokenStream](../interfaces/tokens.TokenStream.md).[expectTag](../interfaces/tokens.TokenStream.md#expecttag)

#### Defined in

[src/token.ts:68](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/token.ts#L68)

___

### next

▸ **next**(): [`Token`](tokens.Token.md)

#### Returns

[`Token`](tokens.Token.md)

#### Implementation of

[TokenStream](../interfaces/tokens.TokenStream.md).[next](../interfaces/tokens.TokenStream.md#next)

#### Defined in

[src/token.ts:83](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/token.ts#L83)
