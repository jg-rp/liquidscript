---
id: "IdentifierPathElement"
title: "Class: IdentifierPathElement"
sidebar_label: "IdentifierPathElement"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Literal`](Literal.md)<`number` \| `string`\>

  ↳ **`IdentifierPathElement`**

## Constructors

### constructor

• **new IdentifierPathElement**(`value`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` |

#### Inherited from

[Literal](Literal.md).[constructor](Literal.md#constructor)

#### Defined in

[src/expression.ts:131](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L131)

## Properties

### value

• `Readonly` **value**: `string` \| `number`

#### Inherited from

[Literal](Literal.md).[value](Literal.md#value)

## Methods

### equals

▸ **equals**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `unknown` |

#### Returns

`boolean`

#### Overrides

[Literal](Literal.md).[equals](Literal.md#equals)

#### Defined in

[src/expression.ts:242](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L242)

___

### evaluate

▸ **evaluate**(`context`): `Promise`<`string` \| `number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`Promise`<`string` \| `number`\>

#### Inherited from

[Literal](Literal.md).[evaluate](Literal.md#evaluate)

#### Defined in

[src/expression.ts:134](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L134)

___

### evaluateSync

▸ **evaluateSync**(`context`): `string` \| `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`string` \| `number`

#### Inherited from

[Literal](Literal.md).[evaluateSync](Literal.md#evaluatesync)

#### Defined in

[src/expression.ts:139](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L139)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Inherited from

[Literal](Literal.md).[toString](Literal.md#tostring)

#### Defined in

[src/expression.ts:147](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L147)
