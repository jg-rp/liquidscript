---
id: "drops.TableRowLoopDrop"
title: "Class: TableRowLoopDrop"
sidebar_label: "TableRowLoopDrop"
custom_edit_url: null
---

[drops](../namespaces/drops.md).TableRowLoopDrop

## Implements

- [`LiquidDispatchableSync`](../interfaces/LiquidDispatchableSync.md)
- `Iterable`<`unknown`\>

## Constructors

### constructor

• **new TableRowLoopDrop**(`name`, `it`, `length`, `ncols`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `it` | `Iterator`<`unknown`, `any`, `undefined`\> |
| `length` | `number` |
| `ncols` | `number` |

#### Defined in

[src/builtin/drops/tablerowloop.ts:25](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L25)

## Properties

### \_col

• `Private` **\_col**: `number` = `0`

#### Defined in

[src/builtin/drops/tablerowloop.ts:23](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L23)

___

### \_index

• `Private` **\_index**: `number` = `-1`

#### Defined in

[src/builtin/drops/tablerowloop.ts:21](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L21)

___

### \_row

• `Private` **\_row**: `number` = `1`

#### Defined in

[src/builtin/drops/tablerowloop.ts:22](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L22)

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

### ncols

• `Readonly` **ncols**: `number`

___

### \_keys

▪ `Static` `Private` **\_keys**: `Set`<`string`\>

#### Defined in

[src/builtin/drops/tablerowloop.ts:7](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L7)

## Accessors

### col

• `get` **col**(): `number`

#### Returns

`number`

#### Defined in

[src/builtin/drops/tablerowloop.ts:84](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L84)

___

### col0

• `get` **col0**(): `number`

#### Returns

`number`

#### Defined in

[src/builtin/drops/tablerowloop.ts:88](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L88)

___

### col\_first

• `get` **col_first**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/builtin/drops/tablerowloop.ts:92](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L92)

___

### col\_last

• `get` **col_last**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/builtin/drops/tablerowloop.ts:96](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L96)

___

### first

• `get` **first**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/builtin/drops/tablerowloop.ts:76](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L76)

___

### index

• `get` **index**(): `number`

#### Returns

`number`

#### Defined in

[src/builtin/drops/tablerowloop.ts:60](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L60)

___

### index0

• `get` **index0**(): `number`

#### Returns

`number`

#### Defined in

[src/builtin/drops/tablerowloop.ts:64](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L64)

___

### last

• `get` **last**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/builtin/drops/tablerowloop.ts:80](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L80)

___

### rindex

• `get` **rindex**(): `number`

#### Returns

`number`

#### Defined in

[src/builtin/drops/tablerowloop.ts:68](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L68)

___

### rindex0

• `get` **rindex0**(): `number`

#### Returns

`number`

#### Defined in

[src/builtin/drops/tablerowloop.ts:72](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L72)

___

### row

• `get` **row**(): `number`

#### Returns

`number`

#### Defined in

[src/builtin/drops/tablerowloop.ts:100](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L100)

## Methods

### [iterator]

▸ **[iterator]**(): `Iterator`<`unknown`, `any`, `undefined`\>

#### Returns

`Iterator`<`unknown`, `any`, `undefined`\>

#### Implementation of

Iterable.\_\_@iterator@87

#### Defined in

[src/builtin/drops/tablerowloop.ts:32](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L32)

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

[src/builtin/drops/tablerowloop.ts:41](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L41)

___

### step

▸ **step**(): `void`

#### Returns

`void`

#### Defined in

[src/builtin/drops/tablerowloop.ts:50](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L50)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/builtin/drops/tablerowloop.ts:46](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/drops/tablerowloop.ts#L46)
