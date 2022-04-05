---
id: "LiquidNumber"
title: "Class: LiquidNumber"
sidebar_label: "LiquidNumber"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`LiquidNumber`**

  ↳ [`Float`](Float.md)

  ↳ [`Integer`](Integer.md)

## Constructors

### constructor

• **new LiquidNumber**(`val`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` \| `number` \| `Decimal` |

#### Defined in

[src/number.ts:14](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L14)

## Properties

### float

• `Abstract` **float**: `boolean`

#### Defined in

[src/number.ts:11](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L11)

___

### n

• `Readonly` **n**: `Decimal`

#### Defined in

[src/number.ts:12](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L12)

## Methods

### abs

▸ **abs**(): [`NumberT`](../modules.md#numbert)

#### Returns

[`NumberT`](../modules.md#numbert)

#### Defined in

[src/number.ts:22](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L22)

___

### ceil

▸ **ceil**(): [`NumberT`](../modules.md#numbert)

#### Returns

[`NumberT`](../modules.md#numbert)

#### Defined in

[src/number.ts:27](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L27)

___

### div

▸ **div**(`n`): [`NumberT`](../modules.md#numbert)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | [`N`](../modules.md#n) |

#### Returns

[`NumberT`](../modules.md#numbert)

#### Defined in

[src/number.ts:31](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L31)

___

### eq

▸ **eq**(`n`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | [`N`](../modules.md#n) |

#### Returns

`boolean`

#### Defined in

[src/number.ts:38](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L38)

___

### floor

▸ **floor**(): [`NumberT`](../modules.md#numbert)

#### Returns

[`NumberT`](../modules.md#numbert)

#### Defined in

[src/number.ts:42](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L42)

___

### gt

▸ **gt**(`n`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | [`N`](../modules.md#n) |

#### Returns

`boolean`

#### Defined in

[src/number.ts:46](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L46)

___

### gte

▸ **gte**(`n`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | [`N`](../modules.md#n) |

#### Returns

`boolean`

#### Defined in

[src/number.ts:50](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L50)

___

### isFinite

▸ **isFinite**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/number.ts:116](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L116)

___

### lt

▸ **lt**(`n`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | [`N`](../modules.md#n) |

#### Returns

`boolean`

#### Defined in

[src/number.ts:54](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L54)

___

### lte

▸ **lte**(`n`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | [`N`](../modules.md#n) |

#### Returns

`boolean`

#### Defined in

[src/number.ts:58](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L58)

___

### max

▸ **max**(`n`): [`NumberT`](../modules.md#numbert)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | [`N`](../modules.md#n) |

#### Returns

[`NumberT`](../modules.md#numbert)

#### Defined in

[src/number.ts:62](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L62)

___

### min

▸ **min**(`n`): [`NumberT`](../modules.md#numbert)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | [`N`](../modules.md#n) |

#### Returns

[`NumberT`](../modules.md#numbert)

#### Defined in

[src/number.ts:67](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L67)

___

### minus

▸ **minus**(`n`): [`NumberT`](../modules.md#numbert)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | [`N`](../modules.md#n) |

#### Returns

[`NumberT`](../modules.md#numbert)

#### Defined in

[src/number.ts:72](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L72)

___

### mod

▸ **mod**(`n`): [`NumberT`](../modules.md#numbert)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | [`N`](../modules.md#n) |

#### Returns

[`NumberT`](../modules.md#numbert)

#### Defined in

[src/number.ts:80](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L80)

___

### plus

▸ **plus**(`n`): [`NumberT`](../modules.md#numbert)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | [`N`](../modules.md#n) |

#### Returns

[`NumberT`](../modules.md#numbert)

#### Defined in

[src/number.ts:88](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L88)

___

### round

▸ **round**(`decimalPlaces?`): [`NumberT`](../modules.md#numbert)

#### Parameters

| Name | Type |
| :------ | :------ |
| `decimalPlaces?` | `number` |

#### Returns

[`NumberT`](../modules.md#numbert)

#### Defined in

[src/number.ts:96](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L96)

___

### times

▸ **times**(`n`): [`NumberT`](../modules.md#numbert)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | [`N`](../modules.md#n) |

#### Returns

[`NumberT`](../modules.md#numbert)

#### Defined in

[src/number.ts:104](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L104)

___

### trunc

▸ **trunc**(): [`NumberT`](../modules.md#numbert)

#### Returns

[`NumberT`](../modules.md#numbert)

#### Defined in

[src/number.ts:112](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L112)

___

### valueOf

▸ **valueOf**(): `number`

#### Returns

`number`

#### Defined in

[src/number.ts:18](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L18)
