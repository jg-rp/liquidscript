---
id: "drops.ForLoopDrop"
title: "Class: ForLoopDrop"
sidebar_label: "ForLoopDrop"
custom_edit_url: null
---

[drops](../namespaces/drops.md).ForLoopDrop

## Implements

- [`LiquidDispatchableSync`](../interfaces/LiquidDispatchableSync.md)
- `Iterable`<`unknown`\>

## Constructors

### constructor

• **new ForLoopDrop**(`name`, `it`, `length`, `parentloop`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `it` | `Iterator`<`unknown`, `any`, `undefined`\> |
| `length` | `number` |
| `parentloop` | [`ForLoopDrop`](drops.ForLoopDrop.md) \| [`Undefined`](Undefined.md) |

#### Defined in

[src/builtin/drops/forloop.ts:20](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/forloop.ts#L20)

## Properties

### \_index

• `Private` **\_index**: `number` = `-1`

#### Defined in

[src/builtin/drops/forloop.ts:18](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/forloop.ts#L18)

___

### it

• `Readonly` **it**: `Iterator`<`unknown`, `any`, `undefined`\>

___

### length

• `Readonly` **length**: `number`

___

### name

• `Readonly` **name**: `string`

___

### parentloop

• `Readonly` **parentloop**: [`ForLoopDrop`](drops.ForLoopDrop.md) \| [`Undefined`](Undefined.md)

___

### \_keys

▪ `Static` `Private` **\_keys**: `Set`<`string`\>

#### Defined in

[src/builtin/drops/forloop.ts:6](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/forloop.ts#L6)

## Accessors

### first

• `get` **first**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/builtin/drops/forloop.ts:65](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/forloop.ts#L65)

___

### index

• `get` **index**(): `number`

#### Returns

`number`

#### Defined in

[src/builtin/drops/forloop.ts:49](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/forloop.ts#L49)

___

### index0

• `get` **index0**(): `number`

#### Returns

`number`

#### Defined in

[src/builtin/drops/forloop.ts:53](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/forloop.ts#L53)

___

### last

• `get` **last**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/builtin/drops/forloop.ts:69](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/forloop.ts#L69)

___

### rindex

• `get` **rindex**(): `number`

#### Returns

`number`

#### Defined in

[src/builtin/drops/forloop.ts:57](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/forloop.ts#L57)

___

### rindex0

• `get` **rindex0**(): `number`

#### Returns

`number`

#### Defined in

[src/builtin/drops/forloop.ts:61](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/forloop.ts#L61)

## Methods

### [iterator]

▸ **[iterator]**(): `Iterator`<`unknown`, `any`, `undefined`\>

#### Returns

`Iterator`<`unknown`, `any`, `undefined`\>

#### Implementation of

Iterable.\_\_@iterator@87

#### Defined in

[src/builtin/drops/forloop.ts:27](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/forloop.ts#L27)

___

### [liquidDispatchSync]

▸ **[liquidDispatchSync]**(`name`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`unknown`

#### Implementation of

[LiquidDispatchableSync](../interfaces/LiquidDispatchableSync.md).[[liquidDispatchSync]](../interfaces/LiquidDispatchableSync.md#[liquiddispatchsync])

#### Defined in

[src/builtin/drops/forloop.ts:36](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/forloop.ts#L36)

___

### step

▸ **step**(): `void`

#### Returns

`void`

#### Defined in

[src/builtin/drops/forloop.ts:45](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/forloop.ts#L45)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/builtin/drops/forloop.ts:41](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/forloop.ts#L41)
