---
id: "BreakIteration"
title: "Class: BreakIteration"
sidebar_label: "BreakIteration"
sidebar_position: 0
custom_edit_url: null
---

An error thrown to indicate a Liquid for loop should be broken.

## Hierarchy

- [`LiquidInterrupt`](LiquidInterrupt.md)

  ↳ **`BreakIteration`**

## Constructors

### constructor

• **new BreakIteration**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Overrides

[LiquidInterrupt](LiquidInterrupt.md).[constructor](LiquidInterrupt.md#constructor)

#### Defined in

[src/errors.ts:391](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/errors.ts#L391)

## Properties

### message

• **message**: `string`

#### Inherited from

[LiquidInterrupt](LiquidInterrupt.md).[message](LiquidInterrupt.md#message)

___

### name

• **name**: `string`

#### Inherited from

[LiquidInterrupt](LiquidInterrupt.md).[name](LiquidInterrupt.md#name)

#### Defined in

docs/.yarn/cache/typescript-patch-30b732d1e2-6bf45caf84.zip/node_modules/typescript/lib/lib.es5.d.ts:1022

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[LiquidInterrupt](LiquidInterrupt.md).[stack](LiquidInterrupt.md#stack)

#### Defined in

docs/.yarn/cache/typescript-patch-30b732d1e2-6bf45caf84.zip/node_modules/typescript/lib/lib.es5.d.ts:1024

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

[LiquidInterrupt](LiquidInterrupt.md).[prepareStackTrace](LiquidInterrupt.md#preparestacktrace)

#### Defined in

.yarn/cache/@types-node-npm-17.0.21-7d68eb6a13-89dcd2fe82.zip/node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[LiquidInterrupt](LiquidInterrupt.md).[stackTraceLimit](LiquidInterrupt.md#stacktracelimit)

#### Defined in

.yarn/cache/@types-node-npm-17.0.21-7d68eb6a13-89dcd2fe82.zip/node_modules/@types/node/globals.d.ts:13

## Methods

### withToken

▸ **withToken**(`token`, `templateName?`): [`LiquidError`](LiquidError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`Token`](tokens.Token.md) |
| `templateName?` | `string` |

#### Returns

[`LiquidError`](LiquidError.md)

#### Defined in

[src/errors.ts:396](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/errors.ts#L396)

___

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

[LiquidInterrupt](LiquidInterrupt.md).[captureStackTrace](LiquidInterrupt.md#capturestacktrace)

#### Defined in

.yarn/cache/@types-node-npm-17.0.21-7d68eb6a13-89dcd2fe82.zip/node_modules/@types/node/globals.d.ts:4
