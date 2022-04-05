---
id: "LaxUndefined"
title: "Class: LaxUndefined"
sidebar_label: "LaxUndefined"
sidebar_position: 0
custom_edit_url: null
---

An [Undefined](Undefined.md) type that evaluates to an empty string or `0`,
and can be indexed and iterated over without error.

## Hierarchy

- [`Undefined`](Undefined.md)

  ↳ **`LaxUndefined`**

## Constructors

### constructor

• **new LaxUndefined**(`name`, `object?`, `hint?`)

Create a new `Undefined` object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the undefined variable. |
| `object?` | `unknown` | The target object which does not have a property with the given name. |
| `hint?` | `string` | Optionally override the default "undefined" message. |

#### Inherited from

[Undefined](Undefined.md).[constructor](Undefined.md#constructor)

#### Defined in

[src/undefined.ts:17](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/undefined.ts#L17)

## Properties

### hint

• `Optional` `Readonly` **hint**: `string`

#### Inherited from

[Undefined](Undefined.md).[hint](Undefined.md#hint)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[Undefined](Undefined.md).[name](Undefined.md#name)

___

### object

• `Optional` `Readonly` **object**: `unknown`

#### Inherited from

[Undefined](Undefined.md).[object](Undefined.md#object)

## Accessors

### first

• `get` **first**(): `this`

#### Returns

`this`

#### Defined in

[src/undefined.ts:97](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/undefined.ts#L97)

___

### last

• `get` **last**(): `this`

#### Returns

`this`

#### Defined in

[src/undefined.ts:101](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/undefined.ts#L101)

___

### size

• `get` **size**(): `this`

#### Returns

`this`

#### Defined in

[src/undefined.ts:105](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/undefined.ts#L105)

## Methods

### [iterator]

▸ **[iterator]**(): `Iterator`<`unknown`, `any`, `undefined`\>

#### Returns

`Iterator`<`unknown`, `any`, `undefined`\>

#### Defined in

[src/undefined.ts:83](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/undefined.ts#L83)

___

### [toPrimitive]

▸ **[toPrimitive]**(`hint`): ``null`` \| ``""`` \| ``0``

#### Parameters

| Name | Type |
| :------ | :------ |
| `hint` | `string` |

#### Returns

``null`` \| ``""`` \| ``0``

#### Defined in

[src/undefined.ts:87](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/undefined.ts#L87)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Overrides

[Undefined](Undefined.md).[toString](Undefined.md#tostring)

#### Defined in

[src/undefined.ts:75](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/undefined.ts#L75)

___

### valueOf

▸ **valueOf**(): `string`

#### Returns

`string`

#### Defined in

[src/undefined.ts:79](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/undefined.ts#L79)

___

### from

▸ `Static` **from**(`name`): [`LaxUndefined`](LaxUndefined.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`LaxUndefined`](LaxUndefined.md)

#### Defined in

[src/undefined.ts:71](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/undefined.ts#L71)
