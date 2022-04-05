---
id: "expressions.ExpressionTokenStream"
title: "Class: ExpressionTokenStream"
sidebar_label: "ExpressionTokenStream"
custom_edit_url: null
---

[expressions](../namespaces/expressions.md).ExpressionTokenStream

## Implements

- [`TokenStream`](../interfaces/tokens.TokenStream.md)

## Constructors

### constructor

• **new ExpressionTokenStream**(`tokens`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokens` | `IterableIterator`<[`Token`](tokens.Token.md)\> |

#### Defined in

[src/expressions/tokens.ts:91](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L91)

## Properties

### \_buf

• `Private` **\_buf**: `undefined` \| [`Token`](tokens.Token.md) = `undefined`

#### Defined in

[src/expressions/tokens.ts:89](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L89)

___

### \_current

• `Private` **\_current**: [`Token`](tokens.Token.md)

#### Defined in

[src/expressions/tokens.ts:87](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L87)

___

### \_peek

• `Private` **\_peek**: [`Token`](tokens.Token.md)

#### Defined in

[src/expressions/tokens.ts:88](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L88)

## Accessors

### current

• `get` **current**(): [`Token`](tokens.Token.md)

#### Returns

[`Token`](tokens.Token.md)

#### Implementation of

[TokenStream](../interfaces/tokens.TokenStream.md).[current](../interfaces/tokens.TokenStream.md#current)

#### Defined in

[src/expressions/tokens.ts:100](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L100)

___

### peek

• `get` **peek**(): [`Token`](tokens.Token.md)

#### Returns

[`Token`](tokens.Token.md)

#### Implementation of

[TokenStream](../interfaces/tokens.TokenStream.md).[peek](../interfaces/tokens.TokenStream.md#peek)

#### Defined in

[src/expressions/tokens.ts:104](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L104)

## Methods

### \_next

▸ `Protected` **_next**(): [`Token`](tokens.Token.md)

#### Returns

[`Token`](tokens.Token.md)

#### Defined in

[src/expressions/tokens.ts:148](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L148)

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

[src/expressions/tokens.ts:128](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L128)

___

### expectPeek

▸ **expectPeek**(`kind`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind` | `string` |

#### Returns

`void`

#### Defined in

[src/expressions/tokens.ts:138](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L138)

___

### expectTag

▸ **expectTag**(): `void`

#### Returns

`void`

#### Implementation of

[TokenStream](../interfaces/tokens.TokenStream.md).[expectTag](../interfaces/tokens.TokenStream.md#expecttag)

#### Defined in

[src/expressions/tokens.ts:96](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L96)

___

### next

▸ **next**(): [`Token`](tokens.Token.md)

#### Returns

[`Token`](tokens.Token.md)

#### Implementation of

[TokenStream](../interfaces/tokens.TokenStream.md).[next](../interfaces/tokens.TokenStream.md#next)

#### Defined in

[src/expressions/tokens.ts:108](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L108)

___

### push

▸ **push**(`token`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`Token`](tokens.Token.md) |

#### Returns

`void`

#### Defined in

[src/expressions/tokens.ts:120](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expressions/tokens.ts#L120)
