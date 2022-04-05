---
id: "Integer"
title: "Class: Integer"
sidebar_label: "Integer"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`LiquidNumber`](LiquidNumber.md)

  ↳ **`Integer`**

## Constructors

### constructor

• **new Integer**(`val`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` \| `number` \| `Decimal` |

#### Inherited from

[LiquidNumber](LiquidNumber.md).[constructor](LiquidNumber.md#constructor)

#### Defined in

[src/number.ts:14](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L14)

## Properties

### float

• `Readonly` **float**: ``false``

#### Overrides

[LiquidNumber](LiquidNumber.md).[float](LiquidNumber.md#float)

#### Defined in

[src/number.ts:131](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L131)

___

### n

• `Readonly` **n**: `Decimal`

#### Inherited from

[LiquidNumber](LiquidNumber.md).[n](LiquidNumber.md#n)

#### Defined in

[src/number.ts:12](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L12)

## Methods

### abs

▸ **abs**(): [`NumberT`](../modules.md#numbert)

#### Returns

[`NumberT`](../modules.md#numbert)

#### Inherited from

[LiquidNumber](LiquidNumber.md).[abs](LiquidNumber.md#abs)

#### Defined in

[src/number.ts:22](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L22)

___

### ceil

▸ **ceil**(): [`NumberT`](../modules.md#numbert)

#### Returns

[`NumberT`](../modules.md#numbert)

#### Inherited from

[LiquidNumber](LiquidNumber.md).[ceil](LiquidNumber.md#ceil)

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

#### Inherited from

[LiquidNumber](LiquidNumber.md).[div](LiquidNumber.md#div)

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

#### Inherited from

[LiquidNumber](LiquidNumber.md).[eq](LiquidNumber.md#eq)

#### Defined in

[src/number.ts:38](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L38)

___

### floor

▸ **floor**(): [`NumberT`](../modules.md#numbert)

#### Returns

[`NumberT`](../modules.md#numbert)

#### Inherited from

[LiquidNumber](LiquidNumber.md).[floor](LiquidNumber.md#floor)

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

#### Inherited from

[LiquidNumber](LiquidNumber.md).[gt](LiquidNumber.md#gt)

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

#### Inherited from

[LiquidNumber](LiquidNumber.md).[gte](LiquidNumber.md#gte)

#### Defined in

[src/number.ts:50](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L50)

___

### isFinite

▸ **isFinite**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[LiquidNumber](LiquidNumber.md).[isFinite](LiquidNumber.md#isfinite)

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

#### Inherited from

[LiquidNumber](LiquidNumber.md).[lt](LiquidNumber.md#lt)

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

#### Inherited from

[LiquidNumber](LiquidNumber.md).[lte](LiquidNumber.md#lte)

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

#### Inherited from

[LiquidNumber](LiquidNumber.md).[max](LiquidNumber.md#max)

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

#### Inherited from

[LiquidNumber](LiquidNumber.md).[min](LiquidNumber.md#min)

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

#### Inherited from

[LiquidNumber](LiquidNumber.md).[minus](LiquidNumber.md#minus)

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

#### Inherited from

[LiquidNumber](LiquidNumber.md).[mod](LiquidNumber.md#mod)

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

#### Inherited from

[LiquidNumber](LiquidNumber.md).[plus](LiquidNumber.md#plus)

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

#### Inherited from

[LiquidNumber](LiquidNumber.md).[round](LiquidNumber.md#round)

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

#### Inherited from

[LiquidNumber](LiquidNumber.md).[times](LiquidNumber.md#times)

#### Defined in

[src/number.ts:104](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L104)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/number.ts:133](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L133)

___

### trunc

▸ **trunc**(): [`NumberT`](../modules.md#numbert)

#### Returns

[`NumberT`](../modules.md#numbert)

#### Inherited from

[LiquidNumber](LiquidNumber.md).[trunc](LiquidNumber.md#trunc)

#### Defined in

[src/number.ts:112](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L112)

___

### valueOf

▸ **valueOf**(): `number`

#### Returns

`number`

#### Inherited from

[LiquidNumber](LiquidNumber.md).[valueOf](LiquidNumber.md#valueof)

#### Defined in

[src/number.ts:18](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L18)
