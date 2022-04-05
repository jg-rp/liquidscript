---
id: "StrictUndefined"
title: "Class: StrictUndefined"
sidebar_label: "StrictUndefined"
sidebar_position: 0
custom_edit_url: null
---

An [Undefined](Undefined.md) type that throws an error whenever it appears
in a Liquid expression.

## Hierarchy

- [`Undefined`](Undefined.md)

  ↳ **`StrictUndefined`**

## Constructors

### constructor

• **new StrictUndefined**(`name`, `object?`, `hint?`)

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

• `get` **first**(): `void`

#### Returns

`void`

#### Defined in

[src/undefined.ts:53](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/undefined.ts#L53)

___

### last

• `get` **last**(): `void`

#### Returns

`void`

#### Defined in

[src/undefined.ts:57](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/undefined.ts#L57)

___

### size

• `get` **size**(): `void`

#### Returns

`void`

#### Defined in

[src/undefined.ts:61](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/undefined.ts#L61)

## Methods

### [iterator]

▸ **[iterator]**(): `Iterator`<`unknown`, `any`, `undefined`\>

#### Returns

`Iterator`<`unknown`, `any`, `undefined`\>

#### Defined in

[src/undefined.ts:45](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/undefined.ts#L45)

___

### [toLiquidPrimitive]

▸ **[toLiquidPrimitive]**(): `void`

#### Returns

`void`

#### Defined in

[src/undefined.ts:49](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/undefined.ts#L49)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Overrides

[Undefined](Undefined.md).[toString](Undefined.md#tostring)

#### Defined in

[src/undefined.ts:37](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/undefined.ts#L37)

___

### valueOf

▸ **valueOf**(): `void`

#### Returns

`void`

#### Defined in

[src/undefined.ts:41](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/undefined.ts#L41)

___

### from

▸ `Static` **from**(`name`): [`StrictUndefined`](StrictUndefined.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`StrictUndefined`](StrictUndefined.md)

#### Defined in

[src/undefined.ts:33](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/undefined.ts#L33)
